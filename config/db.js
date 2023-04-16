import mongoose from "mongoose";
 const connectDB = async () => {

    try {
        
        const conn = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qnzupqp.mongodb.net/tally-app`);
        console.log(`Connected to MongoDB database ${conn.connection.host}`.bgMagenta.white);

    } catch (error) {
        console.log(`error connecting to MongoDB ${error}`.bgRed.white);
    }


}

export default connectDB;