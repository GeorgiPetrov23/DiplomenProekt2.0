import { Router } from 'express';
import recipeService from '../services/recipeService.js';

const router = Router();

router.get('/cookbook', (req, res) => {
    const recipes = recipeService.getAll();
    res.render('home/cookbook', { recipes });
});

router.get('/create', (req, res) => {
    res.render('create');
});
export default router;