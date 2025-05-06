const express = require('express');
require('dotenv').config();
const app = express();
const config = require('./config');
const errorHandler = require('./src/middlewares/errorMiddleware');
const logger = require('./src/utils/logger');
const CWIRoutes = require('./src/routes/CWIRoutes');
const ADMINRoutes = require('./src/routes/SuperAdminRoutes');
const uploadRoutes =require('./src/routes/file.upload.router');
const cors = require('cors');
app.use(cors());
app.use(express.json());



// Define a basic route to test that the server is working
app.get('/', (req, res) => {
  res.send('Hello, world!');
});  
app.use('/CWIRoutes', CWIRoutes);
app.use('/ADMINRoutes', ADMINRoutes);
app.use('/file_upload', uploadRoutes);

app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error); // Pass 404 to global handler
});
app.get('/error', (req, res, next) => {
  try {
    throw new Error('Simulated error');
  } catch (error) {
    next(error); // Pass error to middleware
  }
});

// Global error handler
//app.use(errorHandler);

// Start server
const PORT = config.PORT || 3000;
const host = '0.0.0.0'; // This makes the server accessible externally (from any IP)
app.listen(PORT, () => {
  logger.info(`running at http://localhost:${PORT}`);
});