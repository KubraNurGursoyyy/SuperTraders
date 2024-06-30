import {logError} from "../../utils/errorlog.js";
import Portfolio from "../../../database/models/portfolio.js";
import QuantityOfSharesInPortfolio from "../../../database/models/quantityofsharesinportfolio.js";

export async function getUsersShares (userID) {
    try{
        //kişinin portfolyosene ulaşmak. oradan kişideki hisseleri geitmek

        //kullanıcıda hangi hisseler var ona bakıyorum
        return await Portfolio.findAll({
                where: {userId: userID},
                include: {
                    model: QuantityOfSharesInPortfolio,
                    attributes: ['shareID']
                }
            }
        );
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
