import DB from "../configs/database";

export type Order = {
  id?: Number;
  orderStatus: String;
  userId: String;
};

export class OrderStore {
  async indexOrder(): Promise<Order[]> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      return result.row;
    } catch (err) {
      throw new Error(`Colud not get ${err}`);
    }
  }
  async indexProductOrder(): Promise<Order[]> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM order_products";
      const result = await conn.query(sql);
      return result.row;
    } catch (err) {
      throw new Error(`Colud not get ${err}`);
    }
  }
  async create(order: Order): Promise<Order> {
    try {
      const conn = await DB.connect();
      const sql =
        "INSERT INTO orders (order_status ,user_id ) VALUES($1,$2) RETURNING *";
      const result = await conn.query(sql, [order.orderStatus, order.userId]);
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add order ${err}`);
    }
  }
  async createProductOrder(
    quantity: Number,
    orderId: Number,
    productId: Number
  ): Promise<Order> {
    try {
      const conn = await DB.connect();
      const sql =
        "INSERT INTO order_products (quantity , order_id, product_id) VALUES($1,$2,$3) RETURNING *";
      const result = await conn.query(sql, [quantity, orderId, productId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Colud not add product order ${err}`);
    }
  }
}
