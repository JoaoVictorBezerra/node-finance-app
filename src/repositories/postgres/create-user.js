import 'dotenv/config.js';
import { PostgresHelper } from '../../db/postgres/helper.js';
import { PostgresFindUserByIdRepository } from './find-user-by-id.js';

export class PostgresCreateUserRepository {
  async execute(createUserParams) {
    await PostgresHelper.query(
      'INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
      [
        createUserParams.id,
        createUserParams.first_name,
        createUserParams.last_name,
        createUserParams.email,
        createUserParams.password,
      ],
    );

    const user = new PostgresFindUserByIdRepository();

    return user.execute(createUserParams.id);
  }
}
