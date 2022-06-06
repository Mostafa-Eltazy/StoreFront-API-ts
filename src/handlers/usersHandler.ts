import { User } from "../models/users";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import client from "../database";
dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const con = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await con.query(sql);
      con.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Failed to fetch users due to ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    const hashedPassword = bcrypt.hashSync(
      user.password + BCRYPT_PASSWORD,
      parseInt(SALT_ROUNDS as string, 10)
    );

    try {
      const con = await client.connect();
      const sql =
        "INSERT INTO users(firstName,lastName,password_digest) VALUES ($1, $2, $3) RETURNING *";
      const result = await con.query(sql, [
        user.firstName,
        user.lastName,
        hashedPassword,
      ]);
      con.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to Create user due to ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM users WHERE id=($1)`;
      const result = (await con.query(sql, [id])).rows[0];
      con.release();
      return result;
    } catch (err) {
      throw new Error(`Failed to find user ${id} due to ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM users WHERE id=($1)`;
      const result = (await conn.query(sql, [id])).rows;
      conn.release();
      return result[0];
    } catch (err) {
      throw new Error(`couldnt delete user with id${id}. ${err}`);
    }
  }

  async authenticateUser(
    fname: string,
    lname: string,
    password: string
  ): Promise<User | any> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM users WHERE firstName=($1) AND lastName =($2);";

      const result = await conn.query(sql, [fname, lname]);

      if (result.rows.length) {
        const user = result.rows[0];

        if (
          bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password_digest)
        ) {
          return user;
        }
      }
    } catch (err) {
      throw new Error(`couldnt access user's data for validation`);
    }
    return null;
  }
}
