import Sequelize from 'sequelize';

const sequelize = new Sequelize('dev', 'postgres', 'dev', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});


const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

async function test() {
  try {
    await sequelize.authenticate();
    console.log('Connection esblished!');
    await User.sync({force: true});
    await User.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
    let users = await User.findAll();
    console.log(users);
  } catch(ex) {
    console.log(ex);
    throw ex;
  }


}

test();






