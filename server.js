const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const sequelize = require('./config/db'); // Sequelize instance
const authRoute = require('./routes/authRoute')
const housedataRoute = require('./routes/houseDataRoute')

const cors = require('cors'); // Import the cors middleware


 // Routes

const app = express();

// Check required environment variables before starting the server
if (!process.env.PORT) {
  console.error('Error: Missing required PORT environment variable');
  process.exit(1);
}

// Middleware
app.use(morgan('common')); // Logs all requests
app.use(express.json()); // Parse JSON bodies

// --- Configure CORS with specific origin ---
const corsOptions = {
  origin: ['http://localhost:5173','https://somukoi.netlify.app','https://admin.somukoi.com'], // Allow requests from your Netlify frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
  credentials: true, // If you need to send cookies in cross-origin requests (if applicable)
  allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers (if needed)
};

app.use(cors(corsOptions)); // Apply CORS middleware with specific options


// Sync the database and connect
(async () => {
  try {
    await sequelize.authenticate(); // Test database connection
    console.log('Database connected successfully!');

    await sequelize.sync({ alter: true }); // Sync models with the database
    console.log('Database synced successfully!');
  } catch (error) {
    console.error('Error syncing database:', error.message);
    process.exit(1); // Exit the application if the database connection fails
  }
})();


// Test Route
app.use('/test', (req, res) => {
  res.send('Hello world!');
});

app.use('/api/auth',authRoute)
app.use('/api/housedata',housedataRoute)

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong, please try again later.' });
});

// Export app (useful for testing or starting in a separate file)
module.exports = app;