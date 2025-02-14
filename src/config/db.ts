import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('grocery_app', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

export default sequelize;
