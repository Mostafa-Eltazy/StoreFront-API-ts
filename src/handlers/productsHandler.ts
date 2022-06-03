import { Product } from "../models/product";
import client from "../database";

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const con = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await con.query(sql);
      con.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Failed to fetch products due to ${err}`);
    }
  }
  async show(id: string): Promise<Product> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM products WHERE id=($1)`;
      const result = (await con.query(sql, [id])).rows[0];
      con.release();
      return result;
    } catch (err) {
      throw new Error(`Failed to find product ${id} due to ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    
    console.log(product)

    try {
      const con = await client.connect();
      const sql =
      "INSERT INTO products(name,price) VALUES ($1, $2) RETURNING *";
      const result = await con.query(sql, [
        product.name,
        product.price,
      ]);
      con.release();
      console.log(result.rows[0])
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to Create product due to ${err}`);
    }
  }
}
