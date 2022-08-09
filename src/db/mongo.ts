import mongoose from 'mongoose';
import { User } from '../schema/user';
import { get } from '../service/user';

// Connection URL
const URL = 'mongodb://localhost:27017/privatevideos';

export async function connect() {
    try {
        console.log('Connecting to MongoDB')
        const connection = await mongoose.connect(URL);
        console.log('Connection to MongoDB succeed!')
    
        if((await get()).length === 0) {
            new User({
                email: 'iluzzamit@gmail.com',
                password: '123456',
                isAdmin: true,
                video: 'None'
            }).save()
        }
    
        return connection;
    } catch(e) {
        console.log('Failed to connect to MongoDB')
    }
}