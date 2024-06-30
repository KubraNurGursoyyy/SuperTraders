import {getUsersShares} from "../users/service.js";
import {errorHandling} from "../../utils/errorhandling.js";
import {logError} from "../../utils/errorlog.js";
import {respObject} from "../../helper/responseobject.js";
import {isShareModifiedLastHour, update} from "./service.js";
import httpStatus from "http-status";
import moment from "moment";
import Model from  "../../../database/models/index.js";


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
