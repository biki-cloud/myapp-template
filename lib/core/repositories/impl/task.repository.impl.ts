import { inject, injectable } from "tsyringe";
import type {
  Task,
  CreateTaskInput,
} from "@/lib/core/domain/interface/task.domain";
import type { ITaskRepository } from "@/lib/core/repositories/interface/task.repository.interface";
import { db } from "@/lib/infrastructure/db/drizzle";
import { tasks } from "@/lib/infrastructure/db/schema";
import { eq } from "drizzle-orm";

@injectable()
export class TaskRepository implements ITaskRepository {
  async findAll(): Promise<Task[]> {
    const rows = await db.select().from(tasks).orderBy(tasks.createdAt);
    return rows.map((row) => ({
      id: String(row.id),
      title: row.title,
      isDone: row.isDone,
    }));
  }

  async add(input: CreateTaskInput): Promise<Task> {
    const [row] = await db
      .insert(tasks)
      .values({ title: input.title })
      .returning();
    return {
      id: String(row.id),
      title: row.title,
      isDone: row.isDone,
    };
  }

  async toggle(id: string): Promise<Task | undefined> {
    const [row] = await db
      .update(tasks)
      .set({ isDone: db.raw(`NOT is_done`) })
      .where(eq(tasks.id, Number(id)))
      .returning();
    return row
      ? { id: String(row.id), title: row.title, isDone: row.isDone }
      : undefined;
  }
}
