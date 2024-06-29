import models from "../../../database/models";
import {errorHandling} from "../../utils/errorhandling";
import {logError} from "../../utils/errorlog";
import respObject from "../../helper/responseobject";
const httpStatus = require('http-status');

const create = async (req, res) => {
    try {
        let _b = req.body;
        const created = await models.TraceRecord.create(_b);

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
        const  deleted = await models.TraceRecord.destroy({
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