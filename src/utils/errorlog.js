
import ErrorLogs from '../../database/models/errorlog.js';


export const logError = async (error) => {
    try {
        await ErrorLogs.create({
            message: error.message,
            stack: error.stack,
            code: error.code || null
        });
        console.log('Error logged to the database');
    } catch (dbError) {
        console.error('Failed to log error to the database:', dbError);
    }
};

