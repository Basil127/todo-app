import mongoose from "mongoose"

const connection = {isConnected:null}

export const connectToDB = async()=>{
    try {
        if (connection.isConnected) {
            return;
        };
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to db');
        connection.isConnected = db.connections[0].readyState;
    } catch (e) {
        console.log(`Couldn't connect with the database: ${e}`);
    }
};