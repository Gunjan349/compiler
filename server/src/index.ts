import express, { Request, Response } from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import {dbConnection} from './lib/dbConnection'
import {compilerRouter} from './routes/compilerRoutes'

const app = express();
app.use(express.json());
app.use(cors());
config();

dbConnection();


app.use('/compiler', compilerRouter)

app.listen(4000, () => {
    console.log('Server started on port 4000');
})