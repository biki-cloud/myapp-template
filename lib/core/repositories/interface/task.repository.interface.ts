import type {
  Task,
  CreateTaskInput,
} from "@/lib/core/domain/interface/task.domain";

export interface ITaskRepository {
  findAll(): Promise<Task[]>;
  add(input: CreateTaskInput): Promise<Task>;
  toggle(id: string): Promise<Task | undefined>;
}
