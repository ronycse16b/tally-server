import colors from 'colors';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import dataRoute from './routes/dataRoute.js';
import cors from "cors";



// dotenv configuration
dotenv.config();

// database connection
connectDB()


// rest objects
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));



// routes

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/data',dataRoute)





// rest api
app.get('/', (req, res) => {

    res.send("Wellcome to tally app")

})

// PORT
const PORT = process.env.PORT || 5500;


// run listen
app.listen(PORT, () => {

    console.log(colors.inverse(`server running on port ${PORT}`));
})