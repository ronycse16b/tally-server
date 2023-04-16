import mongoose from "mongoose";
const categorySchema = new mongoose.Schema([{

    name: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    slug:{
        type: String,
        lowercase: true,

    },
    photo:{
        type: String,
    }
 
}], { timestamps: true })

export default mongoose.model('Category', categorySchema);