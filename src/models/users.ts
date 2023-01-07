import bcrypt from "bcrypt";
import DB from "../configs/database";

let pepper: any;
let saltRounds: any;
pepper = process.env.BCRYPT_PASSWORD;
saltRounds = process.env.SALT_ROUNDS;

export type User = {
  id?: Number;
  firstName: String;
  lastName: String;
  password_digit: String;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.row;
    } catch (err) {
      throw new Error("Could not get all user info ${err}");
    }
  }
  async show(id: Number): Promise<User> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM users WHERE id = ($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user ${err}`);
    }
  }
  async create(user: User): Promise<User> {
    try {
      const conn = await DB.connect();
      const sql =
        "INSERT INTO users ( first_name, last_name ,password_digit) VALUES($1, $2, $3) RETURNING *";
      const hash = bcrypt.hashSync(
        user.password_digit + pepper,
        parseInt(saltRounds)
      );
      await conn.query(sql, [user.firstName, user.lastName, hash]);
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not create user ${err}`);
    }
  }
}
