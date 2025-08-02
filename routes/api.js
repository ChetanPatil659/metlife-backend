import express from 'express';
import { addInfo, addQuiz, getRecommendation } from '../controllers/userController.js';
const router = express.Router();

// GET /api - API information
router.get('/', (req, res) => {
  res.json({
    message: 'PNB MetLife Backend API',
    version: '1.0.0',
    documentation: 'API documentation coming soon'
  });
});

router.post('/add-info', addInfo);
router.post('/add-quiz', addQuiz);
router.get('/get-recommendation', getRecommendation);

// GET /api/status - API status
router.get('/status', (req, res) => {
  res.json({
    status: 'operational',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

export default router; 