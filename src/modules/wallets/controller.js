import models from "../../../database/models";
import {errorHandling} from "../../utils/errorhandling";
import respObject from "../../helper/responseobject";
const httpStatus = require('http-status');

const create = async (req, res) => {
    try {
        let _b = req.body;
        const created = await models.Wallet.create(_b);
        if(created)
            return res.status(httpStatus.CREATED).send(respObject(0,'Wallet created successfully.'));
        else
            return res.status(httpStatus.NOT_ACCEPTABLE).send(respObject(1,'Fail to create User.'));

    }catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(respObject(1,'Failed',errorHandling(error)));
    }
}

const remove = async (req, res) => {
    try {
        const  deleted = await models.Wallet.destroy({
            where:{ "id" : req.params.id },
        });
        if (deleted) {
            return res.status(httpStatus.OK).send(respObject(0,'Successfully deleted',deleted));
        }
        return res.status(httpStatus.NOT_FOUND).send(respObject(1,'Failure','Failure in delete.'));

    } catch (error) {
        console.log(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(respObject(1,'Failed',errorHandling(error)));
    }

}