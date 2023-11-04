import { FindUserByEmailRepository } from '../repositories/postgres/find-user-by-email.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
import bcrypt from 'bcrypt';
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js';

export class UpdateUserUseCase {
  async execute(userId, updateUserParams) {
    const user = {
      ...updateUserParams,
    };

    // 1. Se o email estiver sendo atualizado, vericiar se ele já existe
    if (updateUserParams.email) {
      // 1.1. Se o email já existir, retornar um erro
      const findUserByEmailRepository = new FindUserByEmailRepository();
      const userAlreadyExists = await findUserByEmailRepository.execute(
        updateUserParams.email,
      );

      if (userAlreadyExists && userAlreadyExists.id !== userId) {
        throw new EmailAlreadyInUseError(updateUserParams.email);
      }
    }

    // 2. Se a senha estiver sendo atualizada, criptografar a nova senha
    if (updateUserParams.password) {
      const hashedPassword = (updateUserParams.password = await bcrypt.hash(
        updateUserParams.password,
        10,
      ));
      user.password = hashedPassword;
    }

    // 3. Chamar o repository para atualizar o usuário
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
    const updateUser = await postgresUpdateUserRepository.execute(userId, user);

    return updateUser;
  }
}
