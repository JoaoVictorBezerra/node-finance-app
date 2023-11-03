import express from 'express';
import 'dotenv/config.js';
import { CreateUserController } from './src/controllers/create-user.js';

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

app.post('/api/user', async (request, response) => {
  const createUserController = new CreateUserController();

  const { statusCode, body } = await createUserController.execute(request);

  response.status(statusCode).send(body);
});

app.listen(3000, () => console.log('Listening on port 3000'));
