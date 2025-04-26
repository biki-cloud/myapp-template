import "reflect-metadata";
import { container } from "tsyringe";
import { TaskRepository } from "@/lib/core/repositories/task.repository.impl";
import { TaskService } from "@/lib/core/services/task.service.impl";

container.registerSingleton(TaskRepository, TaskRepository);
container.registerSingleton(TaskService, TaskService);

export { container };
