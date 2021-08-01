import mongoose from 'mongoose';

export class Database {
    public static async connect() {
        await mongoose.connect('mongodb+srv://raz:raz@ztube.ujqsy.mongodb.net/moon?retryWrites=true&w=majority', { useNewUrlParser: true });
        console.log('connected to db');
    }
}