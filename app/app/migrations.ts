import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDatabase(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  const result = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  if (!result) return;
  const { user_version } = result;
  if (user_version >= DATABASE_VERSION) {
    return;
  }

  await db.execAsync(`CREATE TABLE IF NOT EXISTS pokemon (
    id INTEGER PRIMARY KEY AUTOINCREMENT
  )`);
}