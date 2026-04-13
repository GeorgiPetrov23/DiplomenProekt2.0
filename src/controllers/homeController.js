import { Router } from 'express';
import recipeService from '../services/recipeService.js';

const router = Router();



router.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

router.get('/about', (req, res) => {
    res.render('home/about', { title: 'About Us' });
});

export default router;