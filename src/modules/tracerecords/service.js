import {logError} from "../../utils/errorlog.js";
import {getUserPortfolio} from "../users/service.js";
import Model from "../../../database/models/index.js";


export async function addTraceRecord (type, quantity, desiredShare,UserID, totalPrice, options = {}) {
    const transaction = options.transaction;

    try{
        let portfolioID = await getUserPortfolio(UserID)
        portfolioID = portfolioID.dataValues.portfolioID;
        const traceRecord = {
            type : type,
            quantity : quantity,
            shareID:desiredShare,
            portfolioID:portfolioID,
            time: Date.now(),
            priceAtTheTimeOfTraceRecord: totalPrice
        }
        const created = await Model.TraceRecords.create(traceRecord,{ transaction });
        if(created){
            console.log("New Trace Record successfully created")
            return {success : true, message: "New Trace Record successfully created"};
        }
        return {success : false, message: "Failed to create Trace Record."};


    }catch(error){
        error.code = error.code || 'INTERNAL_SERVER_ERROR';

        try {
            await logError(error);
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
        return {success : false, message: "Failed to create Trace Record."};
    }

}
