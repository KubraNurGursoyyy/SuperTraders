import {getUsersWalletAndBalance} from "../wallets/service.js";
import {logError} from "../../utils/errorlog.js";
import {getSharesSpecificColumn} from "../shares/service.js";
import Model from "../../../database/models/index.js";

export async function isHaveShare (PortfolioID, desiredShare) {
    try{
        let sharesInPortfolio = await Model.QuantityOfSharesInPortfolios.findAll({
            where: {portfolioID: PortfolioID},
            attributes: ['shareID'],
        });
        const shareIDs = sharesInPortfolio.map(share => share.shareID);
        console.log(shareIDs, desiredShare)
        return shareIDs.includes(desiredShare);
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
