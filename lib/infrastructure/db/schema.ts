import {
  pgSchema,
  serial,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

import { getSchema } from "./env";

// スキーマを定義
export const schema = pgSchema(getSchema());

export const tasks = schema.table("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  isDone: boolean("is_done").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type TaskRow = typeof tasks.$inferSelect;
export type InsertTaskRow = typeof tasks.$inferInsert;
