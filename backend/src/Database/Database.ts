import mongoose from 'mongoose';

export class Database {
    public static async connect() {
        await mongoose.connect('mongodb://localhost/moon', { useNewUrlParser: true });
        console.log('connected to db');
    }
}