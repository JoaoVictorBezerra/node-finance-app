import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';
import { response, error } from './helpers/index.js';
import validator from 'validator';

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const isAnValidUUID = validator.isUUID(httpRequest.params.userId, 4);

      if (!isAnValidUUID) {
        return error.userId();
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
