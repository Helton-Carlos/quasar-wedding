import { DatabaseSync } from "node:sqlite";

export const db = new DatabaseSync("./wedding.db");

db.exec(`CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);
