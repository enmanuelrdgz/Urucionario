import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const CategoryTable = sqliteTable("category_table", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull().unique(),
    description: text().notNull(),
});

export const WordTable = sqliteTable("word_table", {
    id: int().primaryKey({ autoIncrement: true }),
    word: text().notNull().unique(),
    hint: text().notNull(),
    isGuessed: int().notNull().default(0),
    categoryId: int().notNull().references(() => CategoryTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
});
