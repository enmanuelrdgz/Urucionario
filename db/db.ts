import { Level, Word } from '@/domain/types';
import mockLevels from '@/utils/mocks';
import * as SQLite from 'expo-sqlite';

/**
  * Guarda un nivel en la base de datos.
 */
export async function saveLevel(level: Level): Promise<Level> {
  const db = await SQLite.openDatabaseAsync('mydb.db');

  await db.withTransactionAsync(async () => {
    await db.runAsync(`DELETE FROM GuessedWords WHERE level_id = ?`, [level.id]);
    await db.runAsync(`DELETE FROM UnguessedWords WHERE level_id = ?`, [level.id]);

    for (const word of level.guessedWords) {
      await db.runAsync(
        `INSERT INTO GuessedWords (id, word, hint, level_id) VALUES (?, ?, ?, ?)`,
        [word.id, word.word, word.hint, level.id]
      );
    }

    for (const word of level.unGessedWords) {
      await db.runAsync(
        `INSERT INTO UnguessedWords (id, word, hint, level_id) VALUES (?, ?, ?, ?)`,
        [word.id, word.word, word.hint, level.id]
      );
    }
  });

  await db.closeAsync();
  return level;
}

export async function fetchLevels(): Promise<Level[]> {
  const db = await SQLite.openDatabaseAsync('mydb.db');

  // Verificar si la tabla Level existe
  const tableCheck = await db.getAllAsync<{ name: string }>(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='Level'"
  );

  // Si no existe la tabla, crear estructura e insertar datos mock
  if (tableCheck.length === 0) {
    await db.withTransactionAsync(async () => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Level (
          id INTEGER PRIMARY KEY,
          name TEXT,
          image INTEGER,
          description TEXT
        );
      `);
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS GuessedWords (
          id INTEGER PRIMARY KEY,
          word TEXT,
          hint TEXT,
          level_id INTEGER
        );
      `);
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS UnguessedWords (
          id INTEGER PRIMARY KEY,
          word TEXT,
          hint TEXT,
          level_id INTEGER
        );
      `);

      for (const level of mockLevels) {
        await db.runAsync(
          'INSERT INTO Level (id, name, image, description) VALUES (?, ?, ?, ?)',
          [level.id, level.name, level.image, level.description]
        );

        for (const word of level.guessedWords) {
          await db.runAsync(
            'INSERT INTO GuessedWords (id, word, hint, level_id) VALUES (?, ?, ?, ?)',
            [word.id, word.word, word.hint, level.id]
          );
        }

        for (const word of level.unGessedWords) {
          await db.runAsync(
            'INSERT INTO UnguessedWords (id, word, hint, level_id) VALUES (?, ?, ?, ?)',
            [word.id, word.word, word.hint, level.id]
          );
        }
      }
    });
  }

  // Leer los niveles
  const levelsRows = await db.getAllAsync<Level>('SELECT * FROM Level');
  const levels: Level[] = [];

  for (const row of levelsRows) {
    const guessedWords = await db.getAllAsync<Word>(
      'SELECT id, word, hint FROM GuessedWords WHERE level_id = ?',
      [row.id]
    );

    const unguessedWords = await db.getAllAsync<Word>(
      'SELECT id, word, hint FROM UnguessedWords WHERE level_id = ?',
      [row.id]
    );

    levels.push({
      ...row,
      guessedWords,
      unGessedWords: unguessedWords,
    });
  }

  return levels;
}