import { PostgresFindUserByIdRepository } from '../repositories/postgres/find-user-by-id.js';

export class GetUserByIdUseCase {
  async execute(userId) {
    const getUserByIdRepository = new PostgresFindUserByIdRepository();

    const user = await getUserByIdRepository.execute(userId);

    return user;
  }
}
