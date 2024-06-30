import {logError} from "../../utils/errorlog.js";
import Model from "../../../database/models/index.js";
import moment from "moment";

export async function update(_b) {
    try{
        const Price = _b.Price;
        const UpdatedAt = moment(_b.Time, 'hh:mm').toDate();

        return await Model.Shares.update({
            Price: Price,
            UpdatedAt: UpdatedAt
        }, {
            where: {
                id: _b.ShareID
            }
        });

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

        let updatedAt = moment(_shareLatestModified[0].dataValues.updatedAt).utc();
        let requestedTime= moment(time, 'hh:mm');
        console.log("updatedAt", updatedAt);
        console.log("requestedTime", requestedTime);

        console.log("isMoreThanOneHours:", moment.duration(requestedTime.diff(updatedAt)).asHours() >= 1);

        return !moment.duration(requestedTime.diff(updatedAt)).asHours() >= 1

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