import Sequelize from 'sequelize';
import sequelize from '../db/connection';
import { hashWithSalt, compare } from '../crypto/crypt';

const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    // Automatically gets converted to SERIAL for postgres
    autoIncrement: true,
  },
  email: {
    type: Sequelize.TEXT,
    unique: true,
  },
  password: {
    type: Sequelize.TEXT,
  },
}, {
  // By default Sequelize uses createdAt, updatedAt
  // using underscore changes this to created_at, updated_at
  underscored: true,
});

async function hashPassword(user, options) {
  try {
    user.password = await hashWithSalt(user.password);
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}

User.beforeCreate(hashPassword);


export default User;
