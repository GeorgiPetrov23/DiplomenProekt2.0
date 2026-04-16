import { Router } from 'express';
import authService from '../services/authService.js';

const router = Router();

router.get('/register', (req, res) =>{
    res.render('auth/register', { title: 'Register Page' });
});

router.post('/register', async (req, res) => {
    const { username, email, password, rePassword } = req.body;

    await authService.register(username, email, password);

    res.redirect('/auth/login');
});

router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login Page' });
});
    

export default router;