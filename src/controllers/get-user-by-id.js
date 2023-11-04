import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';
import { response } from './helpers.js';
import validator from 'validator';

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const isAnValidUUID = validator.isUUID(httpRequest.params.userId, 4);

      if (!isAnValidUUID) {
        return response.badRequest({
          message: 'The provided user id is not valid.',
        });
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();

      const user = await getUserByIdUseCase.execute(httpRequest.params.userId);

      if (!user) {
        return response.notFound({ message: 'User not found' });
      }

      return response.success(user);
    } catch (error) {
      console.error(error);
      response.error({ message: 'Internal server error' });
    }
  }
}

/*
  Criação do repository.
  Criação do use case.
  Criação do controller.
  Criação da rota.
*/
