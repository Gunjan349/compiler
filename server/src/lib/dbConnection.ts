import mongoose from 'mongoose';

export const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName : "CodeRun"
        });
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.error("Error connecting to MongoDB", err);
    }
}