import express from 'express';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/authroute.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

//create express application
const app= express(); 

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// middleware is used to parse the JSON data from incoming request
app.use(express.json());

//allows parsing incoming Cookies
app.use(cookieParser());

app.use('/api/auth',authRoutes);

// Start the server
const port = process.env.PORT || 3000; 
app.listen(port, async () => {
    await connectDB();
    console.log(`Server running on http://localhost:${port}`);
});
