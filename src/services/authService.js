import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from '../lib/jwt.js';

const register = async (username, email, password, rePassword) =>{
    const userCount = await User.countDocuments({ email });

    if(userCount > 0){
        throw new Error('User with this email already exists!');
    }

    return User.create({ username, email, password, rePassword });
};

const login = async (email, password) => {
    const user = await User.findOne({ email });

    if(!user){
        throw new Error('User does not exist!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error('Invalid password!');
    }

    const payload = {_id: user._id, email};
    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' }); 

    return token;
};

export default {
    register,
    login
}