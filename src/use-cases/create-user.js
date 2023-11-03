import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { FindUserByEmailRepository } from '../repositories/postgres/find-user-by-email.js';

export class CreateUserUseCase {
  async execute(createUserParams) {
    const findUserByEmailRepository = new FindUserByEmailRepository();
    const userAlreadyExists = await findUserByEmailRepository.execute(
      createUserParams.email,
    );

    if (userAlreadyExists) {
      return {
        statusCode: 400,
        body: {
          error: 'E-mail already in use',
        },
      };
    }

    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    const postgresCreateUserRepository = new PostgresCreateUserRepository();

    const createdUser = await postgresCreateUserRepository.execute(user);

    return createdUser;
  }
}
