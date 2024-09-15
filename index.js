import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import debug from 'debug';
const debugIndex = debug('app:index');

const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  debugIndex(`Example app listening on port http://localhost:${port}`)
});