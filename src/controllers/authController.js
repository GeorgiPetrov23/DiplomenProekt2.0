import { Router } from 'express';
import authService from '../services/authService.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const router = Router();

router.get('/register', (req, res) =>{
    res.render('auth/register', { title: 'Register Page' });
});

router.post('/register', async (req, res) => {
    const { username, email, password, rePassword } = req.body;
    
    try{
        await authService.register(username, email, password, rePassword);
    }catch(err){
        return res.render('auth/register', { title: 'Register Page', error: getErrorMessage(err), username, email });
    }

    const token = await authService.login(email, password);

    res.cookie('auth',token, { httpOnly: true });

    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login Page' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try{
        const token = await authService.login(email, password);
        res.cookie('auth',token, { httpOnly: true });
        res.redirect('/');
    }catch(err){
        return res.render('auth/login', { title: 'Login Page', error: getErrorMessage(err), email });
    }


});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
});
    

export default router;