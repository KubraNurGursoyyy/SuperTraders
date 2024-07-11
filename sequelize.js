// sequelize.js dosyası

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// dotenv config
dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    hooks: {
        afterConnect: async (connection) => {
            try {
                await connection.query("SET SESSION CHARACTERISTICS AS TRANSACTION ISOLATION LEVEL SERIALIZABLE");
                console.log("Transaction isolation level set to SERIALIZABLE for this session.");
            } catch (error) {
                console.error("Error setting transaction isolation level: ", error);
            }
        }
    }
});

export { sequelize };
