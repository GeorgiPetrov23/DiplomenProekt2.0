import {connect, set} from 'mongoose';

const dbUrl = 'mongodb://localhost:27017/Recipe-Site';

set('runValidators', true);

export default async function mongooseInit() {
    try {
        await connect(dbUrl);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Cannot connect to MongoDB:' + err.message);
    }
}
