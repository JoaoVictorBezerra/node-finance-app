import 'dotenv/config.js';
import { PostgresHelper } from '../../db/postgres/helper.js';

export class PostgresFindUserByIdRepository {
  async execute(id) {
    const results = await PostgresHelper.query(
      'SELECT * FROM users WHERE id = $1',
      [id],
    );

    return results[0];
  }
}
