import { inject, injectable } from "tsyringe";
import type { Task, CreateTaskInput } from "@/lib/core/domain/task.domain";
import { TaskRepository } from "../repositories/task.repository.impl";

@injectable()
export class TaskService {
  constructor(@inject(TaskRepository) private readonly repo: TaskRepository) {}

  async getTasks(): Promise<Task[]> {
    return this.repo.findAll();
  }

  async addTask(input: CreateTaskInput): Promise<Task> {
    return this.repo.add(input);
  }

  async toggleTask(id: number): Promise<Task | undefined> {
    return this.repo.toggle(id);
  }
}
