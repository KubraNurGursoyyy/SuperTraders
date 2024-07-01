import {getUsersShares} from "../users/service.js";
import {errorHandling} from "../../utils/errorhandling.js";
import {logError} from "../../utils/errorlog.js";
import {respObject} from "../../helper/responseobject.js";
import {
    buyShareTransaction,
    getSharesSpecificColumn,
    isShareModifiedLastHour,
    isUserHaveEnoughBalance, isUserHaveEnoughShare, sellShareTransaction,
    update
} from "./service.js";
import httpStatus from "http-status";
import Model from  "../../../database/models/index.js";


export const sellShare = async (req, res) => {
    try {
        //kontrol edilecekler
        //kullanıcıda satmak istediği hisse var mı ve yeteri mi
        //fiyat getir
        //cüzdana para ekle kullanıcıdan hisse düşür 0 olursa hisseyi kullanıcında sil bunlar transaction

        let _b = req.body;
        let desiredShare = _b.ShareID;
        let userID = _b.UserID;
        let quantity = _b.Quantity;
        let transaction;

        //kullanıcın yeterince hissesi var mı
        let isHaveEnoughShare = await isUserHaveEnoughShare(userID, desiredShare, quantity);
        if(!isHaveEnoughShare.success){
            return res.status(httpStatus.BAD_REQUEST).send(respObject(1,isHaveEnoughShare));
        }else{
            //fiyatı getir
            let totalPrice = await getSharesSpecificColumn(desiredShare, "price");

            totalPrice = Number(totalPrice[0].dataValues.price) * Number(quantity);

            transaction = await sellShareTransaction(userID,desiredShare,quantity, totalPrice);
            if(!transaction.success){
                return res.status(httpStatus.BAD_REQUEST).send(respObject(1,"Failed in transaction",transaction));
            }
        }
        return res.status(httpStatus.OK).send(respObject(0,"Share sold successfully.",transaction));
    } catch (error) {
        error.code = error.code || 'INTERNAL_SERVER_ERROR';

        try {
            await logError(error);
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(respObject(1,'Failed',errorHandling(error)));
    }

}


export const buyShare = async (req, res) => {
    try {
        let _b = req.body;
        let desiredShare = _b.ShareID;
        let userID = _b.UserID;
        let quantity = _b.Quantity;
        let transaction;
        let isHaveEnoughBalance = await isUserHaveEnoughBalance(userID, desiredShare, quantity)
        if(!isHaveEnoughBalance.success){
            return res.status(httpStatus.BAD_REQUEST).send(respObject(1,"User doesn't have enough balance.",isHaveEnoughBalance));
        }else{
            transaction = await buyShareTransaction(userID,desiredShare,quantity,isHaveEnoughBalance.desiredBalance);
            if(!transaction.success){
                return res.status(httpStatus.BAD_REQUEST).send(respObject(1,"Failed in transaction",transaction));
            }
        }
        return res.status(httpStatus.OK).send(respObject(0,"Share purchased successfully.",transaction));
    } catch (error) {
        error.code = error.code || 'INTERNAL_SERVER_ERROR';

        try {
            await logError(error);
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(respObject(1,'Failed',errorHandling(error)));
    }

}

export const updateSharePrice = async (req, res) => {
    try {
        let _b = req.body;
        let user = _b.UserID;

        let sharesInUser = await getUsersShares(user);
        let desiredShare = _b.ShareID;
        let time = _b.Time
        if(sharesInUser.includes(desiredShare)){

            let isModified = await isShareModifiedLastHour(desiredShare, time);
            if(!isModified){
                const updated = await update(_b);
                if(updated.success){
                    return res.status(httpStatus.OK).send(respObject(0,'Updated successfully.'));
                }
                return res.status(httpStatus.BAD_REQUEST).send(respObject(1,updated.message));
            }
            return res.status(httpStatus.BAD_REQUEST).send(respObject(1,'Price updated within a hour.'));
        }
        return res.status(httpStatus.BAD_REQUEST).send(respObject(1,'User does not have this share.'));
    }catch (error) {
        error.code = error.code || 'INTERNAL_SERVER_ERROR';
        try {
            await logError(error);
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(respObject(1,'Failed',errorHandling(error)));
    }
}


const create = async (req, res) => {
    try {
        let _b = req.body;
        const created = await Model.Shares.create(_b);
        return res.status(httpStatus.CREATED).send(respObject(0,'Created successfully.'));

    }catch (error) {
        error.code = error.code || 'INTERNAL_SERVER_ERROR';
        try {
            await logError(error);
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(respObject(1,'Failed',errorHandling(error)));
    }
}

const remove = async (req, res) => {
    try {
        const  deleted = await Model.Shares.destroy({
            where:{ "id" : req.params.id },
        });
        if (deleted) {
            return res.status(httpStatus.OK).send(respObject(0,'Successfully deleted',deleted));
        }
        return res.status(httpStatus.NOT_FOUND).send(respObject(1,'Failure','Failure in delete.'));

    } catch (error) {
        error.code = error.code || 'INTERNAL_SERVER_ERROR';

        try {
            await logError(error);
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(respObject(1,'Failed',errorHandling(error)));
    }

}