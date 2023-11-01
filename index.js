import express from 'express';
import 'dotenv/config.js';

import { PostgresHelper } from './src/db/postgres/helper.js';

const app = express();

app.get('/', async (req, res) => {
  console.log('Inicio');
  const results = await PostgresHelper.query('SELECT * FROM users;');
  console.log(results);
  console.log('fim');
  res.send(JSON.stringify(results));
});

app.listen(3000, () => console.log('Server is running on port 3000'));
