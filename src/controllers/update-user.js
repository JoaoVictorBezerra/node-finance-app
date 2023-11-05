import validator from 'validator';
import { UpdateUserUseCase } from '../use-cases/update-user.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
import { response, error } from './helpers/index.js';
export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const isAnValidUUID = validator.isUUID(userId, 4);

      if (!isAnValidUUID) {
        return error.userId();
      }

      const updateUserParams = httpRequest.body;

      const allowedFields = ['first_name', 'last_name', 'email', 'password'];

      const someFieldNotAllowed = Object.keys(updateUserParams).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldNotAllowed) {
        return response.badRequest({
          message: 'Some provided field is not allowed!',
        });
      }

      if (updateUserParams.password) {
        const isValidPassword = updateUserParams.password.length > 6;
        if (!isValidPassword) {
          return error.poorPassword();
        }
      }

      if (updateUserParams.email) {
        const emailIsValid = validator.isEmail(updateUserParams.email);
        if (!emailIsValid) {
          return error.email();
        }
      }

      const updateUserUseCase = new UpdateUserUseCase();

      const updatedUser = await updateUserUseCase.execute(
        userId,
        updateUserParams,
      );

      return response.success(updatedUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return response.conflict({ message: error.message });
      }
      console.error(error);
      return response.error({ message: 'Internal server error' });
    }
  }
}
