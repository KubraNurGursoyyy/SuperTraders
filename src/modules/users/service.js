import {logError} from "../../utils/errorlog.js";


export async function getUsersShares (userID) {
    try{
        //kişinin portfolyosene ulaşmak. oradan kişideki hisseleri geitmek

        //kullanıcıda hangi hisseler var ona bakıyorum
        return await db.Portfolio.findAll({
                where: {userId: userID},
                include: {
                    model: db.QuantityOfSharesInPortfolio,
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
