import { Router } from 'express';
import recipeService from '../services/recipeService.js';

const router = Router();



router.get('/', (req, res) => {
  res.render('home');
});

router.get('/cookbook', (req, res) => {
    const recipes = recipeService.getAll();
    res.render('home/cookbook', { recipes });
});

router.get('/about', (req, res) => {
    res.render('home/about');
});

export default router;