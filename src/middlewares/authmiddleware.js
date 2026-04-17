import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth'];

    if(!token){     
       return next();
    }


    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = {
            _id: decodedToken._id,
            email: decodedToken.email
        };

        req.user = user;
        req.isAuthenticated = true;
        res.locals.userId = user._id;
        res.locals.userEmail = user.email;
        res.locals.isAuthenticated = true;

        return next();
    }
    catch(err){
        res.clearCookie('auth');
        res.redirect('/auth/login');

    }
};

export const isAuth = (req, res, next) => {
    if(!req.isAuthenticated){
        return res.redirect('/auth/login');
    }
    return next();
    
}   