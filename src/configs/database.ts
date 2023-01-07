import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;
console.log(`Database in ${ENV}`);
let DB: any;

if (ENV === "dev") {
  DB = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}
if (ENV === "test") {
  DB = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default DB;
