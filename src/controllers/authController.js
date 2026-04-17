import { Router } from 'express';
import authService from '../services/authService.js';

const router = Router();

router.get('/register', (req, res) =>{
    res.render('auth/register', { title: 'Register Page' });
});

router.post('/register', async (req, res) => {
    const { username, email, password, rePassword } = req.body;

    await authService.register(username, email, password);
    const token = await authService.login(email, password);

    res.cookie('auth',token, { httpOnly: true });

    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login Page' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.cookie('auth',token, { httpOnly: true });

    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
});
    

export default router;