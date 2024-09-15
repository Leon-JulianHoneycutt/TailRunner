import express from 'express';

import * as dotenv from 'dotenv';
dotenv.config();

import debug from 'debug';
const debugIndex = debug('app:index');

import { dogOwnerRouter } from './routes/api/dogOwner.js';

const app = express()
const port = 3000

//Middle tier
app.use(express.urlencoded({extended: true})); //Parse URl-encoded bodies to req.body
//
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  debugIndex(`Example app listening on port http://localhost:${port}`)
});

app.use('/api/dogOwners', dogOwnerRouter);