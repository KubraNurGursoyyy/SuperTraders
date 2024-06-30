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