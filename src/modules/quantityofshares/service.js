import {logError} from "../../utils/errorlog.js";
import Model from "../../../database/models/index.js";

async function updateQuantityOfShares(PortfolioID, desiredShare, QuantityDelta, options = {}) {
    const transaction = options.transaction;

    try {
        let exQuantity = await Model.QuantityOfSharesInPortfolios.findOne({
            where: { shareID: desiredShare, portfolioID: PortfolioID },
            attributes: ['quantity'],
        });

        exQuantity = exQuantity.dataValues.quantity;

        const newQuantity = Number(exQuantity) + Number(QuantityDelta);

        const [affectedRows] = await Model.QuantityOfSharesInPortfolios.update(
            { quantity: newQuantity },
            { where: { shareID: desiredShare, portfolioID: PortfolioID }, transaction }
        );

        return affectedRows > 0;
    } catch(error){
        error.code = error.code || 'INTERNAL_SERVER_ERROR';

        try {
            await logError(error);
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
        return error;
    }

}

export async function increaseQuantityOfShare(PortfolioID, desiredShare, Quantity, options = {}) {
    return await updateQuantityOfShares(PortfolioID, desiredShare, Quantity, options);
}

export async function decreaseQuantityOfShare(PortfolioID, desiredShare, Quantity, options = {}) {
    return await updateQuantityOfShares(PortfolioID, desiredShare, -Quantity, options);
}

export async function getQuantityOfSharesSpecificColumn(portfolioID,shareID,specificColumn) {
    return await Model.QuantityOfSharesInPortfolios.findOne({
        where: {portfolioID: portfolioID, shareID: shareID},
        attributes: [`${specificColumn}`],
    });
}