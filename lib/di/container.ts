import "reflect-metadata";
import { container } from "tsyringe";
import { TaskRepository } from "@/lib/core/repositories/impl/task.repository.impl";
import { TaskService } from "@/lib/core/services/impl/task.service.impl";

container.registerSingleton("TaskRepository", TaskRepository);
container.registerSingleton("TaskService", TaskService);

export { container };
