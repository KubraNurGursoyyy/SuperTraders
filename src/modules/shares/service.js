import {logError} from "../../utils/errorlog.js";
import Model from "../../../database/models/index.js";
import moment from "moment";
import {getPayment, getUsersWalletAndBalance, makePayment} from "../wallets/service.js";
import {getUserPortfolio} from "../users/service.js";
import {isHaveShare} from "../portfolios/service.js";
import {sequelize} from "../../../sequelize.js";
import {
    decreaseQuantityOfShare,
    getQuantityOfSharesSpecificColumn,
    increaseQuantityOfShare
} from "../quantityofshares/service.js";
import {addTraceRecord} from "../tracerecords/service.js";
import models from "../../../database/models/index.js";
import quantityofsharesinportfolio from "../../../database/models/quantityofsharesinportfolio.js";

export async function sellShareTransaction (UserID,desiredShare,quantity, totalPrice) {
    let transaction;

    try {
        //cüzdana para ekle kullanıcıdan hisse düşür 0 olursa hisseyi kullanıcında sil bunlar transaction
        //cüzdana para ekle
        //eğer kullanıcıdaki miktar büyükse miktar düşür
        //eşitse sil
        //trace record ekle

        transaction = await sequelize.transaction();

        const isBalanceIncreased = await makePayment(UserID, totalPrice, { transaction });
        if (!isBalanceIncreased) {
            await transaction.rollback();
            return { success: false, message: "Payment failed" };
        }
        const decreaseShares = await decreaseShareFromPortfolio(UserID, desiredShare, quantity,{ transaction });
        if (!decreaseShares.success) {
            await transaction.rollback();
            return { success: false, message: decreaseShares.message };
        }

        //tracerecordsa ekle
        const isAddedToTraceRecord = await addTraceRecord("SELL", quantity, desiredShare,UserID, totalPrice, { transaction });
        if (!isAddedToTraceRecord.success) {
            await transaction.rollback();
            return { success: false, message: isAddedToTraceRecord.message};
        }
        // Her şey sorunsuz
        await transaction.commit();

        return { success: true, message: "Share sold successfuly.", Share: decreaseShares.message, TraceRecord: isAddedToTraceRecord.message, remainingShare: decreaseShares.remainingShare};

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

        return { success: true, message: "Share sold successfuly.", Share: isShareAdded.message, TraceRecord: isAddedToTraceRecord.message};

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


export async function decreaseShareFromPortfolio (UserID, shareID, Quantity, options = {}) {
    const transaction = options.transaction; // transaction parametresini al

    try{
        let userPortfolioID = await getUserPortfolio(UserID);
        userPortfolioID = userPortfolioID.dataValues.portfolioID;

        let QuantityInUser = await getQuantityOfSharesSpecificColumn(userPortfolioID,shareID,'quantity');

        QuantityInUser = QuantityInUser.dataValues.quantity;

        if(Number(Quantity) === Number(QuantityInUser)) {
            //sil
            const deleted = await models.QuantityOfSharesInPortfolios.destroy(
                {where: {shareID: shareID, portfolioID: userPortfolioID}, transaction}
            );
            if (deleted) {
                console.log("Since there was no stock left in the portfolio, " +
                    "this share was successfully removed from the portfolio.")
                return {
                    success: true, message: "Since there was no stock left in the portfolio, " +
                        "this share was successfully removed from the portfolio.",
                    remainingShare: 0
                };
            }
        }else if(Number(Quantity) < Number(QuantityInUser)){
            //miktarı düşür
            let isQuantityDecreased = await decreaseQuantityOfShare(userPortfolioID, shareID, Quantity, { transaction });
            if(isQuantityDecreased){
                return {success : true, message: "Quality decreased successfully.", remainingShare: Number(QuantityInUser) - Number(Quantity)};
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

export async function isUserHaveEnoughShare (UserID, desiredShare, quantity) {
    try{
        //kişinin portfölyösünde o share var mı
        //yoksa hata
        //varsa miktarı quantityye yeter mi
        let userPortfolioID = await getUserPortfolio(UserID);
        userPortfolioID = userPortfolioID.dataValues.portfolioID;

        //portfolyede istenen hisse var mı. varsa miktarı arttır
        const isPortfolioHasShare = await isHaveShare(userPortfolioID, desiredShare);

        if(!isPortfolioHasShare){
            return { success : false, message: "User does not have this share"};
        }else{
            //kişide bu share var demek
            //miktarı ne kadar
            let quantityOfShare = await getQuantityOfSharesSpecificColumn(userPortfolioID,desiredShare,'quantity')
            quantityOfShare = quantityOfShare.dataValues.quantity;
            if(Number(quantityOfShare) >= Number(quantity) && Number(quantityOfShare) !== 0){
                return { success : true, message: "User have enough of this share", QuantityInUser: quantityOfShare};
            }else
                return { success : false, message: "User does not have enough of this share", QuantityInUser: quantityOfShare};
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

        let requestedTime= moment(time, 'hh:mm').local();
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