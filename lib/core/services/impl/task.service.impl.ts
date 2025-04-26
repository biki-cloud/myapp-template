import { inject, injectable } from "tsyringe";
import type { ITaskRepository } from "@/lib/core/repositories/interface/task.repository.interface";
import type { ITaskService } from "@/lib/core/services/interface/task.service.interface";
import type {
  Task,
  CreateTaskInput,
} from "@/lib/core/domain/interface/task.domain";

@injectable()
export class TaskService implements ITaskService {
  constructor(
    @inject("TaskRepository")
    private readonly taskRepository: ITaskRepository
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async add(input: CreateTaskInput): Promise<Task> {
    return this.taskRepository.add(input);
  }

  async toggle(id: string): Promise<Task | undefined> {
    return this.taskRepository.toggle(id);
  }
}
