import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth'];

    if(!token){     
       return next();
    }


    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decodedToken);

        req.user = {
            _id: decodedToken._id,
            email: decodedToken.email
        };

        console.log(req.user);

        return next();
    }
    catch(err){
        res.clearCookie('auth');
        res.redirect('/auth/login');

    }
}