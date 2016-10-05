import Sequelize from 'sequelize';
import config from 'config';


const dbName = config.get('postgres.db');
const user = config.get('postgres.user');
const password = config.get('postgres.password');
const host = config.get('postgres.host');

const sequelize = new Sequelize(dbName, user, password, {
  host: host,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

export default sequelize;
