import { CreateUserUseCase } from '../use-cases/create-user.js';
import validator from 'validator';
import { response } from './helpers.js';

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const isValidPassword = params.password.length > 6;
      if (!isValidPassword) {
        response.badRequest({
          message: 'Password must be at least 6 characters',
        });
      }

      const emailIsValid = validator.isEmail(params.email);
      if (!emailIsValid) {
        response.badRequest({
          message: 'Invalid email. Please provider an valid email',
        });
      }

      const requiredFields = ['first_name', 'last_name', 'email', 'password'];

      for (const field of requiredFields || params[field].trim().length === 0) {
        if (!params[field]) {
          response.badRequest({ message: `Missing param: ${field}` });
        }
      }

      const createUserUseCase = new CreateUserUseCase();

      const createdUser = await createUserUseCase.execute(params);

      return response.created({ createdUser });
    } catch (error) {
      console.error(error);
      response.error({ message: 'Internal server error' });
    }
  }
}
