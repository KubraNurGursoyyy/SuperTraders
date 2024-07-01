import {logError} from "../../utils/errorlog.js";
import Model from "../../../database/models/index.js";


export async function getUsersShares (userID) {
    try{
        //kullanıcıda hangi hisseler var ona bakıyorum
        let _portfolioID = await Model.Portfolios.findAll({
                where: {userID: userID},
                attributes: ['id']

            });
        _portfolioID = _portfolioID[0].dataValues.id

        let _shareIDs = await Model.QuantityOfSharesInPortfolios.findAll({
            where: {portfolioID: _portfolioID},
            attributes: ['shareID']
        });
        return _shareIDs.map(item => item.dataValues.shareID);

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

export async function getUserPortfolio(UserID) {
    return await Model.Users.findOne({
        where: {id: UserID},
        attributes: ['portfolioID'],
    });
}