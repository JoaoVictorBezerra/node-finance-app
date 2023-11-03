import { PostgresHelper } from '../../db/postgres/helper.js';

export class FindUserByEmailRepository {
  async execute(email) {
    const user = await PostgresHelper.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );
    if (user.length > 0) {
      return true;
    }
    return false;
  }
}
