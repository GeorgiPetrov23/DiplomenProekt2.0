import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth'];

    if(!token){     
       return next();
    }

    //TODO: Validate the token
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decodedToken);
        //TODO: Add user data to request

        return next();
    }
    catch(err){
        //TODO: Invalid token
    }
}