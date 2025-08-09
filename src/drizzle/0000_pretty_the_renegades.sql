CREATE TABLE `category_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_table_name_unique` ON `category_table` (`name`);--> statement-breakpoint
CREATE TABLE `word_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`word` text NOT NULL,
	`hint` text NOT NULL,
	`isGuessed` integer DEFAULT 0 NOT NULL,
	`categoryId` integer NOT NULL,
	FOREIGN KEY (`categoryId`) REFERENCES `category_table`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `word_table_word_unique` ON `word_table` (`word`);