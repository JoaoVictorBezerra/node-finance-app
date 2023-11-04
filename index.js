import express from 'express';
import 'dotenv/config.js';
import { CreateUserController } from './src/controllers/create-user.js';
import { GetUserByIdController } from './src/controllers/get-user-by-id.js';
import { routes } from './src/constants/routes.js';
import { UpdateUserController } from './src/controllers/update-user.js';

const app = express();
app.use(express.json());

app.get(routes.HOME, (req, res) =>
  res.send(
    JSON.stringify({
      status: 200,
      message: 'Working!',
      timestamp: new Date(),
    }),
  ),
);

app.post(routes.USER, async (request, response) => {
  try {
    const createUserController = new CreateUserController();

    const { statusCode, body } = await createUserController.execute(request);

    response.status(statusCode).send(body);
  } catch (error) {
    console.error(error);
    response.status(500).send({
      message: 'Internal server error',
    });
  }
});

app.patch(`${routes.USER}/:userId`, async (request, response) => {
  try {
    const updateUserController = new UpdateUserController();

    const { statusCode, body } = await updateUserController.execute(request);

    response.status(statusCode).send(body);
  } catch (error) {
    console.error(error);
    response.status(500).send({
      message: 'Internal server error',
    });
  }
});

app.get(`${routes.USER}/:userId`, async (request, response) => {
  try {
    const getUserByIdController = new GetUserByIdController();

    const { statusCode, body } = await getUserByIdController.execute(request);

    response.status(statusCode).send(body);
  } catch (error) {
    console.error(error);
    response.status(500).send({
      message: 'Internal server error',
    });
  }
});

app.listen(3000, () => console.log('Listening on port 3000'));
