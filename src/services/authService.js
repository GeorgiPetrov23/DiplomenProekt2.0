import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from '../lib/jwt.js';

const register = (username, email, password) =>{
    return User.create({ username, email, password });
};

const login = async (email, password) => {
    const user = await User.findOne({ email });

    if(!user){
        throw new Error('User does not exist!')
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