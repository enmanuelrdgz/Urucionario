import words from '@/src/assets/words.json';
import { Category, Word } from '@/src/domain/types';
import * as SQLite from 'expo-sqlite';


// esta funcion verifica si existe la tabla Category
// en caso de que no exista, crea las tablas Category y Wordm
// y llena las tablas con la informacion del archivo words.json

export function initDB(): void{
  debugger
  const db = SQLite.openDatabaseSync('v.db');
  db.runSync('DROP TABLE IF EXISTS Category');
  db.runSync('DROP TABLE IF EXISTS Word');
  const tableExists = db.getFirstSync<{ name: string }>(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='Category'");
  if (tableExists == null) {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS Category (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS Word (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        word TEXT NOT NULL UNIQUE,
        hint TEXT NOT NULL,
        isGuessed BOOLEAN NOT NULL DEFAULT 0,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES Category(id)
      );
    `);

    words.forEach((word) => {
      db.runSync(
        'INSERT OR IGNORE INTO Category (name, description) VALUES (?, ?)',[word.CATEGORY, word.DESCRIPTION]
      );
      const categoryId = db.getFirstSync<{ id: number }>(
        'SELECT id FROM Category WHERE name = ?',
        [word.CATEGORY]
      );
      if (categoryId) {
        db.runSync(
          'INSERT OR IGNORE INTO Word (word, hint, isGuessed, category_id) VALUES (?, ?, ?, ?)',
          [word.WORD, word.HINT, 0, categoryId.id]
        );
      }
    })
  }
  db.closeSync();//
}

// esta funcion obtiene todas las categorias de la base de datos
// y las devuelve como un array de objetos Category
export function getCategories(): Category[] {
  const db = SQLite.openDatabaseSync('v.db');
 
  const categoriesRows = db.getAllSync<Category>('SELECT * FROM Category');
  const categories: Category[] = [];

  for (const row of categoriesRows) {
    const words = db.getAllSync<Word>(
      'SELECT id, word, hint, isGuessed FROM Word WHERE category_id = ?',
      [row.id]
    );
    categories.push({
      ...row,
      words,
    });
  }//d

  db.closeSync();
  return categories;
}

// esta funcion actualiza el estado de una Word de isGuessed: false a isGuessed: true
export function updateWord(targetWordId: number): void {
  const db = SQLite.openDatabaseSync('v.db');
  
  db.runSync(
    'UPDATE Word SET isGuessed = ? WHERE id = ?',
    [1, targetWordId]
  );

  db.closeSync();
}