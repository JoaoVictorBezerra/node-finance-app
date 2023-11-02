import express from 'express';
import 'dotenv/config.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) =>
  res.send(
    JSON.stringify({
      status: 200,
      message: 'working!',
      timestamp: new Date(),
    }),
  ),
);

app.listen(3000, () => console.log('Server is running on port 3000'));
