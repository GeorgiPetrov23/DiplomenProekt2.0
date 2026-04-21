import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    username: { 
        type: String, 
        required: [true, 'Username is required'],
        minLength: [5, 'Username must be at least 5 characters long']
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        minLength: [10, 'Email must be at least 10 characters long'],
        validate: [/@[A-Za-z0-9]+\.[A-Za-z0-9]+$/, 'Invalid email address!']
    },
    password: { 
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters long']
    }
});

userSchema.virtual('rePassword')
.set(function(value){
    if(value !== this.password){
        throw new Error('Passwords do not match!');
    }
});

userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;
});

const User = model('User', userSchema);

export default User;