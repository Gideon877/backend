import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRoutes from './routes/upload.routes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

/**
 * Security: CORS Configuration
 * Only allows requests from the Next.js frontend (Port 3000)
 */
app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Middleware to parse JSON request bodies
app.use(express.json());

/**
 * Health Check Route
 * Used to verify the API is online
 */
app.get('/', (req, res) => {
    res.send('OMS API is running...');
});

/**
 * API Routes
 * Mounts all upload-related endpoints under /api/upload
 */
app.use('/api', uploadRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});