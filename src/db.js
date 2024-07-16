import { config } from 'dotenv';
import mongoose from 'mongoose'

config();
const host = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

// Es mi funcion que conecta a la base de datos. Como estamos modularizando necesitamos mandarla al index.
export const connectDB = async () => {
    try {
        // console.log(host, password)
        // await mongoose.connect('mongodb://localhost/pymerndb')
        await mongoose.connect(`mongodb+srv://${host}:${password}@cluster0.lrru3ws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('>>> DB is conect')
    } catch (error) {
        console.log(error)
    }
};
// 