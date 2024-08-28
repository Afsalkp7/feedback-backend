import express from 'express'
import bodyParser from 'body-parser'
import database from './database/connection.js'
import auth from './routes/auth.js'
import feed from './routes/feed.js'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express();

app.use(bodyParser.json())
app.use(cors())

database();

// Routes
app.use('/api/auth', auth);
app.use('/api/feed', feed);

app.get('/',(req,res)=>{
    res.status(200).json({msg:'connect'})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})

