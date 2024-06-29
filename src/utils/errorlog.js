const { ErrorLog } = require('../../database/models/errorlog');

export const logError = async (error) => {
    try {
        await ErrorLog.create({
            message: error.message,
            stack: error.stack,
            code: error.code || null
        });
        console.log('Error logged to the database');
    } catch (dbError) {
        console.error('Failed to log error to the database:', dbError);
    }
};

