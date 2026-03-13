import { Hono } from 'hono'
import mysql from "mysql2/promise";

const app = new Hono()

app.get('/', async (c) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "test_user",
    password: "password",
    database: "test",
    disableEval: true,
    debug: true,
  });

  const [results] = await connection.query('SHOW TABLES')

  return c.json(results)
})

export default app
