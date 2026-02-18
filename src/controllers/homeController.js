import { Router } from 'express';
import recipeService from '../services/recipeService.js';

const router = Router();



router.get('/', (req, res) => {
  res.render('home');
});

router.get('/about', (req, res) => {
    res.render('home/about');
});

export default router;