import { runInThisContext } from "vm";
import DB from "../configs/database";

export type Product = {
  id?: Number;
  productName: String;
  productPrice: Number;
  productCategory?: Number;
};

export class ProdouctStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.row;
    } catch (err) {
      throw new Error(`Could not add product ${err}`);
    }
  }
  async show(id: Number): Promise<Product> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM products WHERE id = ($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get the producct ${err}`);
    }
  }
  async create(product: Product): Promise<Product> {
    try {
      const conn = await DB.connect();
      const sql =
        "INSERT INTO products (product_name ,product_price, product_category) VALUES($1,$2,$3) RETURNING *";
      await conn.query(sql, [
        product.productName,
        product.productPrice,
        product.productCategory,
      ]);
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Colud not get ${err}`);
    }
  }
  async createCategory(categoryName: String): Promise<String> {
    try {
      const conn = await DB.connect();
      const sql =
        "INSERT INTO categorys (category_name) VALUES($1) RETURNING *";
      const result = await conn.query(sql, [categoryName]);
      conn.release();
      return categoryName;
    } catch (err) {
      throw new Error(`Could not add category ${err}`);
    }
  }
}
