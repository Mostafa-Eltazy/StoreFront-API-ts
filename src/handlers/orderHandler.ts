import { Order } from "../models/orders";
import client from "../database";

export class OrdersStore {
  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO orders(user_id, status) VALUES ($1,$2) RETURNING *`;
      const result = (await conn.query(sql, [order.user_id, order.status]))
        .rows[0];
      conn.release();
      return result;
    } catch (e) {
      throw new Error(`Could not create order. ${e}`);
    }
  }
  
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders`;
      const result = (await conn.query(sql)).rows;
      conn.release();
      return result;
    } catch (err) {
      throw new Error(`cannot get orders. ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE id=($1)`;
      const result = (await conn.query(sql)).rows[0];
      conn.release();
      return result;
    } catch (err) {
      throw new Error(`could not get specified order ${err}`);
    }
  }

  async getUserOrders(user_id: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1) AND status ='active'`;
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`could not get user orders ${err}`);
    }
  }
}
