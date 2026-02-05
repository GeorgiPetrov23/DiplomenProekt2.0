import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/test', (req, res) => {
    res.send('Test route works!');
});

router.get('/about', (req, res) => {
    res.render('home/about');
});

export default router;