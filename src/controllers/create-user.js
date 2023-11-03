import { CreateUserUseCase } from '../use-cases/create-user.js';
import validator from 'validator';

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const isValidPassword = params.password.length > 6;
      if (!isValidPassword) {
        return {
          statusCode: 400,
          body: {
            error: 'Password must be at least 6 characters',
          },
        };
      }

      const emailIsValid = validator.isEmail(params.email);
      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: {
            error: 'Invalid email. Please provider an valid email',
          },
        };
      }

      const requiredFields = ['first_name', 'last_name', 'email', 'password'];

      for (const field of requiredFields || params[field].trim().length === 0) {
        if (!params[field]) {
          return {
            statusCode: 400,
            body: {
              error: `Missing param: ${field}`,
            },
          };
        }
      }

      const createUserUseCase = new CreateUserUseCase();

      const createdUser = await createUserUseCase.execute(params);

      return {
        statusCode: 201,
        body: createdUser,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: {
          errorMessage: 'Internal server error',
        },
      };
    }
  }
}
