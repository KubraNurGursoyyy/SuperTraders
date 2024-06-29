import models from "../../../database/models";
import {errorHandling} from "../../utils/errorhandling";
import {logError} from "../../utils/errorlog";
import respObject from "../../helper/responseobject";
const httpStatus = require('http-status');

const create = async (req, res) => {
    try {
        let _b = req.body;
        const created = await models.Share.create(_b);
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
        let  _b = req.body;

        const updated = await models.Share.update(_b, {
            where: { id : req.params.id }
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
        const  deleted = await models.Share.destroy({
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