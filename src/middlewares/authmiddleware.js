import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth'];

    if(!token){     
       return next();
    }

    //TODO: Validate the token
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req. user = {
            _id: decodedToken._id,
            email: decodedToken.email
        }

        return next();
    }
    catch(err){
        res.clearCookie('auth');
        res.redirect('/auth/login');
        //TODO: Invalid token
    }
}