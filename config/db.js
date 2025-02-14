// config/db.js

require('pg'); // Ensure PostgreSQL driver is loaded
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Default values, can be overridden by environment variables
const dbHost = process.env.DB_HOST 
const dbPort = process.env.DB_PORT || 14657;
const dbName = process.env.DB_NAME;  //Required - set in .env
const dbUser = process.env.DB_USER;  //Required - set in .env
const dbPassword = process.env.DB_PASSWORD;  //Required - set in .env

// Check that the proper env is passed
if (!dbName || !dbUser || !dbPassword){
  throw new Error("Missing database credentials in .env file");
}



// const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
//   host: dbHost,
//   dialect: 'postgres',
//   port: dbPort,
//   logging: false, // Disable SQL query logging,
//   dialectOptions: {
//     ssl: {
//       require: false, // Enforce SSL
//       rejectUnauthorized: true, // Or false if you still have self-signed issues, but try true first
//       ca: caCert
//     },
//   },
//   pool: {  // Connection pool configuration
//     max: 10,    // Maximum number of connection in pool
//     min: 0,      // Minimum number of connection in pool
//     acquire: 30000, // The maximum time, in milliseconds, that a connection can be reserved.
//     idle: 10000     // The maximum time, in milliseconds, that a connection can be idle before being released.
//   },
// });

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  port: dbPort,
  logging: false, // Disable SQL query logging,
  dialectOptions: {
        ssl: false, //
      },
      pool: {  // Connection pool configuration
        max: 10,    // Maximum number of connection in pool
        min: 0,      // Minimum number of connection in pool
        acquire: 30000, // The maximum time, in milliseconds, that a connection>
        idle: 10000     // The maximum time, in milliseconds, that a connection>
      },
  } //
);

const connectDatabase = async () => {
  try {
    await sequelize.authenticate(); // Test the connection
    console.log('Database connected successfully using config file!');
  } catch (error) {
    console.error('Unable to connect to the database using config file:', error);
    process.exit(1); // Exit if the database connection fails
  }
};

module.exports = sequelize; // Export the sequelize instance
module.exports.connectDatabase = connectDatabase; // Export the connection function