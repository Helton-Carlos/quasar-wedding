import { DatabaseSync } from "node:sqlite";

export const db = new DatabaseSync("./wedding.db");

db.exec(`CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);

db.exec(`CREATE TABLE IF NOT EXISTS guest(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    confirmed TEXT NOT NULL
)`);

db.exec(`CREATE TABLE IF NOT EXISTS supplier(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    categories TEXT NOT NULL,
    phone TEXT NOT NULL,
    price TEXT NOT NULL
)`);

db.exec(`CREATE TABLE IF NOT EXISTS gift(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    status TEXT NOT NULL,
    idGuest INTEGER NOT NULL
)`);
