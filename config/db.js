import mongoose from "mongoose";
 const connectDB = async () => {

    try {
        
        const conn = await mongoose.connect(`mongodb+srv://dbuser-rony-16b:DL825Q5kksIWkQtB@cluster0.qnzupqp.mongodb.net/tally-app`);
        console.log(`Connected to MongoDB database ${conn.connection.host}`.bgMagenta.white);

    } catch (error) {
        console.log(`error connecting to MongoDB ${error}`.bgRed.white);
    }


}

export default connectDB;