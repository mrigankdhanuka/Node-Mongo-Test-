import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from './config/environment.js';
import { connectDatabase } from './config/database.js';
import personRoutes from './routes/person.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Connect to MongoDB
connectDatabase();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Serve static files from Angular app
app.use(express.static(join(__dirname, '../dist/demo')));

// API Routes
app.use('/api/person', personRoutes);

// Angular app route handler - Send index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/demo/browser/index.html'));
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});