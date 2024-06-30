import {getUsersShares} from "../users/service.js";
import {errorHandling} from "../../utils/errorhandling.js";
import {logError} from "../../utils/errorlog.js";
import {respObject} from "../../helper/responseobject.js";
import {isShareModifiedLastHour} from "./service.js";
import httpStatus from "http-status";


const create = async (req, res) => {
    try {
        let _b = req.body;
        const created = await Shares.create(_b);
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

const update = async (req, res) => {
    try{
        const { Price } = req.body.Price;

        const updated = await Shares.update(
            { Price },
            { where: { id : req.params.id }
        })
        if(updated)
            return res.status(httpStatus.CREATED).send(respObject(0,'Updated successfully.'));
        else
            return res.status(httpStatus.NOT_ACCEPTABLE).send(respObject(1,'Fail to update.'));

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
        const  deleted = await Shares.destroy({
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

//yenifiyat, bunu yaoan userıd, bu hisse onda var mı, saat kaç (en az 1 saat geçmiş mi)
//bodyde olanlar
export const updateSharePrice = async (req, res) => {
    try {
        let _b = req.body;
        let user = _b.UserID;
        //döndüğü değeri filtrelemen gerekecek
        let sharesInUser = await getUsersShares(user);
        if(sharesInUser.includes(_b.shareID)){
            //hisse en son ne zaman değişmiş fiyatı min 1 saat önce değişmiş olmalı
            //false döndürmesi iyi true kötü
            let isModified = await isShareModifiedLastHour(_b.shareID, _b.time);
            //bir saat önce değişmemşii
            if(!isModified){
                //update
                const updated = await update(_b);

                return res.status(httpStatus.OK).send(respObject(0,'Updated successfully.'));
            }
            return res.status(httpStatus.BAD_REQUEST).send(respObject(0,'Price updated within a hour.'));
        }
        return res.status(httpStatus.BAD_REQUEST).send(respObject(0,'User does not have this share.'));
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
