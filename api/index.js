const app = require('../server');

const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Gracefully handle termination signals
process.on('SIGINT', () => {
  console.log('🛑 Caught SIGINT. Shutting down...');
  server.close(() => {
    console.log('✅ Server closed.');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('🛑 Caught SIGTERM. Shutting down...');
  server.close(() => {
    console.log('✅ Server closed.');
    process.exit(0);
  });
});
