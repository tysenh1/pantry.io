import Database from 'better-sqlite3';
import { type Database as Sqlite3Database } from 'better-sqlite3';

export const database: Sqlite3Database = new Database('./db.db');

