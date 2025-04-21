require('pg'); // Ensure PostgreSQL driver is loaded
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

const dbHost = process.env.DB_HOST;
const dbPort = parseInt(process.env.DB_PORT, 10) || 6432; // default to PgBouncer port
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

// Validate required env vars
if (!dbName || !dbUser || dbPassword === undefined) {
  throw new Error("❌ Missing required database credentials in .env file");
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  port: dbPort,
  logging: false, // disable SQL logging
  dialectOptions: {
    ssl: false, // set to true only if using SSL
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully using config file!');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    process.exit(1);
  }
};

module.exports = sequelize;
module.exports.connectDatabase = connectDatabase;
