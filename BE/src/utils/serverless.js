const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const todoRoutes = require('../routes/todoRoutes');

// Create Express app
const app = express();

// Enhanced CORS middleware
app.use(cors({
  origin: '*',  // Allow all origins (not recommended for production)
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Mount routes with no prefix (Vercel handles the /api/todos part)
app.use('/', todoRoutes);

// Create a wrapper that ensures proper promise resolution
const createServerlessHandler = (app) => {
  // Create the handler
  const handler = serverless(app, {
    binary: false,
    provider: {
      // Force promise resolution
      respondWithErrors: true,
      stripResponseHeaders: ['transfer-encoding']
    }
  });

  // Return a wrapped function that properly handles promises
  return async (req, res) => {
    try {
      // Await the handler explicitly
      await handler(req, res);
    } catch (error) {
      console.error('Serverless handler error:', error);
      
      // Make sure we always send a response
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Internal server error',
          message: 'The server encountered an unexpected condition'
        });
      }
    }
  };
};

// Export function to create handler
module.exports = createServerlessHandler(app);