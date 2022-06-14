import { Sequelize } from 'sequelize';
import config from './config';
import fs from 'fs';

/**
 * Create a sequelize instance using ca certificate and connection string.
 */
const sequelize = new Sequelize(config.CONNECTION_STRING, {
  logging: false,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync('ssl/ca-certificate.crt'),
    },
  },
});

export default sequelize;
