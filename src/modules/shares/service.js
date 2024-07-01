import {logError} from "../../utils/errorlog.js";
import Model from "../../../database/models/index.js";
import moment from "moment";
import {getPayment, getUsersWalletAndBalance} from "../wallets/service.js";
import {getUserPortfolio} from "../users/service.js";
import {isHaveShare} from "../portfolios/service.js";
import {sequelize} from "../../../sequelize.js";
import {increaseQuantityOfShare} from "../quantityofshares/service.js";
import {addTraceRecord} from "../tracerecords/service.js";


export async function buyShareTransaction (UserID, desiredShare, quantity, totalPrice) {
    let transaction;

    try {
        transaction = await sequelize.transaction();

        const isShareAdded = await addShareToPortfolio(UserID, desiredShare, quantity, { transaction });
        if (!isShareAdded.success) {
            await transaction.rollback();
            return { success: false, message: "Failed to add share to portfolio." };
        }

        // Cüzdandan parayı kes
        const isBalanceDecreased = await getPayment(UserID, totalPrice, { transaction });
        if (!isBalanceDecreased) {
            await transaction.rollback();
            return { success: false, message: "Payment failed." };
        }

        //tracerecordsa ekle
        //buy true sell false
        const isAddedToTraceRecord = await addTraceRecord("BUY", quantity, desiredShare,UserID, totalPrice, { transaction });
        if (!isAddedToTraceRecord.success) {
            await transaction.rollback();
            return { success: false, message: isAddedToTraceRecord.message};
        }

        // Her şey sorunsuz
        await transaction.commit();

        return { success: true, message: "Share purchase successful." };

    } catch (error) {
        // Hata durumunda transaction'ı rollback yap
        if (transaction) await transaction.rollback();

        error.code = error.code || 'INTERNAL_SERVER_ERROR';
        try {
            await logError(error);
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
        return { success: false, message: error.message || "An unexpected error occurred." };
    }
}

export async function addShareToPortfolio (UserID, shareID, Quantity, options = {}) {
    const transaction = options.transaction; // transaction parametresini al

    try{
        //ilk adım portfolyeye istenen hisseyi ekle
        //eğer hisse varsa miktar arttır yoksa yeni ekle

        //ilk önce kullanıcının portfolyesini getir
        let userPortfolioID = await getUserPortfolio(UserID);
        userPortfolioID = userPortfolioID.dataValues.portfolioID;

        //portfolyede istenen hisse var mı. varsa miktarı arttır
        const isPortfolioHasShare = await isHaveShare(userPortfolioID, shareID);
        console.log(isPortfolioHasShare)
        if(isPortfolioHasShare){
            //miktarı arrtır. updateQuanatityOfShares
            let isQuantityIncreased = await increaseQuantityOfShare(userPortfolioID, shareID, Quantity, { transaction });
            if(isQuantityIncreased){
                console.log("Quality increased successfully.")
                return {success : true, message: "Quality increased successfully."};
            }
        }else{
            //yoksa yeni ekle. bunda QuanatityOfShares'e yeni kayıt mı ekleyeceksin.aynen
            const quantityOfShares = {
                portfolioID : userPortfolioID,
                shareID : shareID,
                quantity : Quantity
            }
            const created = await Model.QuantityOfSharesInPortfolios.create(quantityOfShares,{ transaction });
            if(created){
                console.log("New share successfully added to portfolio")
                return {success : true, message: "New share successfully added to portfolio"};
            }
        }
    }catch(error){
        error.code = error.code || 'INTERNAL_SERVER_ERROR';

        try {
            await logError(error);
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
        return { success : false, message: error};
    }

}


export async function isUserHaveEnoughBalance (UserID, desiredShare, quantity) {
    try{

        const _desiredSharePrice= await getSharesSpecificColumn(desiredShare,"price")

        let desiredBalance = quantity * _desiredSharePrice[0].dataValues.price ;

        let userWallet = await getUsersWalletAndBalance(UserID);
        if(!userWallet){
            return { success : false, message: "User does not have enough balance", walletID: userWallet.dataValues.id, balance: userWallet.dataValues.balance, desiredBalance: desiredBalance};
        }

        if(userWallet.dataValues.balance < desiredBalance){
            return { success : false, message: "User does not have enough balance", walletID: userWallet.dataValues.id, balance: userWallet.dataValues.balance, desiredBalance: desiredBalance};
        }
        else
            return { success : true, message: "User have enough balance.", walletID: userWallet.dataValues.id, balance: userWallet.dataValues.balance , desiredBalance: desiredBalance};

    }catch(error){
        error.code = error.code || 'INTERNAL_SERVER_ERROR';

        try {
            await logError(error);
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
        return { success : false, message: error};
    }

}

export async function update(_b) {
    try{
        const Price = parseFloat(_b.Price);
        const ShareID = _b.ShareID;

        const share = await Model.Shares.findOne({
            where: { id: ShareID },
            attributes: ['id','symbol','price','createdAt','updatedAt'],
        });

        let newShare = {
            price: Price
        }

        if (!share) {
            return { success : false, message: "Share not found."};
        }else if(share.price === Price)
            return { success : false, message: "There isn't any change in share."};
        else{
            const [affectedRows] = await Model.Shares.update(
                newShare,
                { where: { id: ShareID } }
            );
            if(affectedRows > 0){
                return { success : true, message: "Update succesfully "};
            }else
                return { success : false, message: "There aren't any rows affected."};
        }

    }catch (error) {
        error.code = error.code || 'INTERNAL_SERVER_ERROR';
        try {
            await logError(error);
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
        return { success : false, message: error};
    }
}

export async function isShareModifiedLastHour (shareID, time) {
    try{
        let _shareLatestModified = await getSharesSpecificColumn(shareID,"updatedAt")

        let updatedAt = moment(_shareLatestModified[0].dataValues.updatedAt).local();

        console.log(_shareLatestModified,updatedAt);

        let requestedTime= moment(time, 'hh:mm').local();
        console.log("updatedAt", updatedAt);
        console.log("requestedTime", requestedTime);

        console.log("isMoreThanOneHours:", moment.duration(requestedTime.diff(updatedAt)).asHours());

        return !(moment.duration(requestedTime.diff(updatedAt)).asHours() >= 1)

    }catch(error){
        error.code = error.code || 'INTERNAL_SERVER_ERROR';

        try {
            await logError(error);
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
        return error;
    }

}

export async function getSharesSpecificColumn(shareID,specificColumn) {
    return await Model.Shares.findAll({
        where: {id: shareID},
        attributes: [`${specificColumn}`],
    });
}