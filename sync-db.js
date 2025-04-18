// sync-db.js
require('dotenv').config();
const sequelize  = require('./config/db'); // Adjust path to your sequelize instance

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established.');

    await sequelize.sync({ alter: true }); // Or force: true in dev only
    console.log('✅ DB schema synced successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to sync database:', error.message);
    process.exit(1);
  }
})();
