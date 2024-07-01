'use strict';

import * as fs from 'node:fs';
import * as path from 'node:path';
import { Sequelize } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';

// Convert `import.meta.url` to __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Use dynamic import to load the config
const configPath = pathToFileURL(path.join(__dirname, '/../config/config.js')).href;
const configModule = await import(configPath);
const config = configModule.default[env]; // Assuming your config.js uses ES module exports

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all model files in the directory
const files = fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
});

// Dynamically import each model file and initialize it
for (const file of files) {
  const modelPath = pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(modelPath);
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Associate models if they have associations defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
