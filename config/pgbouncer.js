require('dotenv').config();
const { Sequelize } = require('sequelize');

// Initialize Sequelize using .env variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "127.0.0.1",
    port: 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PgBouncer connection successful!');
    await sequelize.close();
  } catch (error) {
    console.error('❌ PgBouncer connection failed:', error.message);
  }
})();
