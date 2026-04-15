import { Router } from 'express';

const router = Router();

router.get('/register', (req, res) =>{
    res.render('auth/register', { title: 'Register Page' });
})

export default router;