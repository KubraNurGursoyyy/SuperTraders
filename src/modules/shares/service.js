import {logError} from "../../utils/errorlog.js";

export async function isShareModifiedLastHour (shareID, time) {
    try{
        const _shareLatestModified  = await db.Shares.findAll({
            where: { shareId: shareID },
            attributes: ['updatedAt'],
            order: [['updatedAt', 'DESC']]

            }
        );

        const updatedAt = _shareLatestModified.updatedAt; // updatedAt değerini alıyoruz

        // "time" parametresini Date nesnesi olarak oluştur
        const comparisonTime = new Date(time);

        comparisonTime.setHours(17, 0, 0, 0);

        // "time" değerinden bir saat öncesini hesapla
        const oneHourAgo = new Date(comparisonTime.getTime() - (1 * 60 * 60 * 1000)); // "time"dan bir saat öncesi

        // updatedAt değerini oneHourAgo ile karşılaştır
        return updatedAt >= oneHourAgo;
        //false döndürmesi iyi true kötü
        return true;
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