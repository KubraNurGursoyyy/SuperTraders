import {logError} from "../../utils/errorlog.js";
import Model from "../../../database/models/index.js";
import moment from "moment";

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


        console.log(newShare)

        if (!share) {
            console.log(`No share found with ID: ${ShareID}`);
            return false;
        }

        if (share.Price === Price) {
            console.log('No changes detected in Price.');
            return false;
        }

        const [affectedRows] = await Model.Shares.update(
            newShare,
            { where: { id: ShareID } }
        );

        if (affectedRows > 0) {
            console.log(`Successfully updated Price for Share with id ${ShareID}.`);
            return true;
        } else {
            console.log(`Failed update.`);
            return false;
        }

    }catch (error) {
        error.code = error.code || 'INTERNAL_SERVER_ERROR';
        try {
            await logError(error);
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
        return error;
    }
}

export async function isShareModifiedLastHour (shareID, time) {
    try{
        const _shareLatestModified  = await Model.Shares.findAll({
            where: { id: shareID },
            attributes: ['updatedAt'],
            }
        );

        let updatedAt = moment(_shareLatestModified[0].dataValues.updatedAt).local();
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