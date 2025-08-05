import express from 'express';
import 'dotenv/config';
import corsMiddleware from './src/middleware/corsConfig.js';
import errorMiddleware from './src/middleware/errorHandler.js';
import routes from './src/index.js';

// Initialize express
const app = express();

// Use CORS middleware
app.use(corsMiddleware);

// Middleware that enables parsing of raw json into req.body
app.use(express.json());

// Routes
app.use('/scenes', routes.scenes);

// Error handling middleware
app.use(errorMiddleware);

// Start server
app.listen(process.env.PORT, () => 
    console.log(`App listening on port ${process.env.PORT}`)
);