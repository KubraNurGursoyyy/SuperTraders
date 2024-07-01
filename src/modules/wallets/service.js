import Model from "../../../database/models/index.js";
import {logError} from "../../utils/errorlog.js";

export async function getUsersWalletAndBalance(UserID) {
    return await Model.Wallets.findOne({
        where: {userID: UserID},
        attributes: ['id','balance'],
    });
}

export async function getPayment (UserID, totalPrice, options = {}) {
    const transaction = options.transaction;

    try{
        let userWallet = await getUsersWalletAndBalance(UserID);

        let exBalance = userWallet.dataValues.balance;


        const newBalance = Number(exBalance) - Number(totalPrice);

        const [affectedRows] = await Model.Wallets.update(
            { balance: newBalance},
            { where: { userID: UserID}, transaction  }
        );
        return affectedRows > 0;
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

export async function makePayment (UserID, totalPrice, options = {}) {
    const transaction = options.transaction;

    try{
        let userWallet = await getUsersWalletAndBalance(UserID);

        let exBalance = userWallet.dataValues.balance;

        const newBalance = Number(exBalance) + Number(totalPrice);

        const [affectedRows] = await Model.Wallets.update(
            { balance: newBalance},
            { where: { userID: UserID}, transaction  }
        );
        return affectedRows > 0;
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