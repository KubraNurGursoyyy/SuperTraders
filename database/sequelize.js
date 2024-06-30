
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database_name', 'username', 'password', {
    "username": "avnadmin",
    "password": "AVNS_c009GHOMBn35jDeXBG3",
    "database": "defaultdb",
    "host": "pg-3436a5ad-kubranur-db45.h.aivencloud.com",
    "dialect": "postgres",
    "port": "14349",
    "dialectOptions": {
        "ssl": {
            "require": true,
            "rejectUnauthorized": false
        }
    }
});

export default sequelize;
