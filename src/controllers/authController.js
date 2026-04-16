import { Router } from 'express';
import authService from '../services/authService.js';

const router = Router();

router.get('/register', (req, res) =>{
    res.render('auth/register', { title: 'Register Page' });
});

router.post('/register', async (req, res) => {
    const { username, email, password, rePassword } = req.body;

    await authService.register(username, email, password);
    // console.log(username);
    // console.log(email);
    // console.log(password);
    // console.log(rePassword);

    res.redirect('/auth/login');
});
    

export default router;