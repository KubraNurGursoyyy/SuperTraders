import respObject from "../helper/responseobject";
import {logError} from "../utils/errorlog";
import {errorHandling} from "../utils/errorhandling";
import getUsersShares from "../modules/users/controller";

//bunlar o modülün servisinde mi olmalı

//yenifiyat, bunu yaoan userıd, bu hisse onda var mı, saat kaç (en az 1 saat geçmiş mi)
//bodyde olanlar
const updateSharePrice = async (req, res) => {
    try {
        let _b = req.body;
        let user = _b.UserID;
        let sharesInUser = await getUsersShares(user);
        if(sharesInUser.includes(_b.shareID)){
            //hisse en son ne zaman değişmiş fiyatı min 1 saat önce değişmiş olmalı
        }

        return res.status(httpStatus.CREATED).send(respObject(0,'Created successfully.'));

    }catch (error) {
        error.code = error.code || 'INTERNAL_SERVER_ERROR';
        try {
            await logError(error);
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(respObject(1,'Failed',errorHandling(error)));
    }
}