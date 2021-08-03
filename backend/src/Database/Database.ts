import mongoose from 'mongoose';

export class Database {
    public static async connect() {
        await mongoose.connect('mongodb+srv://raz:raz@cluster0.ujqsy.mongodb.net/moon?retryWrites=true&w=majority', { useNewUrlParser: true });
        // await mongoose.connect('mongodb://localhost/moon', { useNewUrlParser: true });
        console.log('connected to db');
    }
}