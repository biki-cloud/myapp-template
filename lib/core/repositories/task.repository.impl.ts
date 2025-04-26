import { injectable } from "tsyringe";
import type { Task, CreateTaskInput } from "@/lib/core/domain/task.domain";

@injectable()
export class TaskRepository {
  private tasks: Task[] = [
    { id: 1, title: "最初のタスク", isCompleted: false },
  ];
  private nextId = 2;

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async add(input: CreateTaskInput): Promise<Task> {
    const task = { id: this.nextId++, title: input.title, isCompleted: false };
    this.tasks.push(task);
    return task;
  }

  async toggle(id: number): Promise<Task | undefined> {
    const task = this.tasks.find((t) => t.id === id);
    if (task) task.isCompleted = !task.isCompleted;
    return task;
  }
}
