import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
 
    name:{
        type:String,
        required:true,
        trim:true
    },
 
    gurdient: {
      type: String,
      required: true,
      trim:true
    },
    holding: {
      type: String,
      required: true,
    },
    male: {
      type: String,
      required: true,
    },
    female: {
      type: String,
      required: true,
    },
    house: {
      type: String,
      required: true,
    },
    houseLand:{
      type:String,
      required: true,
    },
    incomeSourse:{
      type:String,
      required: true,
    },
    mullaon: {
      type: String,
      required: true,

    },
    cor: {
      type: String,
      required: true,

    },
  },
  { timestamps: true }
);

export default mongoose.model("Entry-data", DataSchema);