import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const register = (username, email, password) =>{
    //TODO: Check if user exists
    return User.create({ username, email, password });
};

const login = async (email, password) => {
    //TODO: Check if user exists
    const user = await User.findOne({ email });

    if(!user){
        throw new Error('User does not exist!')
    }
    //TODO: Validate password

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error('Invalid password!');
    }


    //TODO: Generate JWT token
    const payload = {_id: user._id, email};
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' }); 

    //TODO: Return JWT token

    return token;
};

export default {
    register,
    login
}