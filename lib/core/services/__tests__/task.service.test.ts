import "reflect-metadata";
import { container } from "tsyringe";
import { TaskService } from "@/lib/core/services/impl/task.service.impl";
import type { ITaskRepository } from "@/lib/core/repositories/interface/task.repository.interface";
import type { Task } from "@/lib/core/domain/interface/task.domain";

describe("TaskService", () => {
  let taskService: TaskService;
  let mockTaskRepository: jest.Mocked<ITaskRepository>;

  beforeEach(() => {
    mockTaskRepository = {
      findAll: jest.fn(),
      add: jest.fn(),
      toggle: jest.fn(),
    };
    container.register("TaskRepository", { useValue: mockTaskRepository });
    taskService = container.resolve(TaskService);
    jest.clearAllMocks();
  });

  it("should return all tasks", async () => {
    const tasks: Task[] = [{ id: "1", title: "test", isDone: false }];
    mockTaskRepository.findAll.mockResolvedValue(tasks);
    const result = await taskService.findAll();
    expect(result).toEqual(tasks);
    expect(mockTaskRepository.findAll).toHaveBeenCalled();
  });

  it("should add a task", async () => {
    const task = { id: "1", title: "new", isDone: false };
    mockTaskRepository.add.mockResolvedValue(task);
    const result = await taskService.add({ title: "new" });
    expect(result).toEqual(task);
    expect(mockTaskRepository.add).toHaveBeenCalledWith({ title: "new" });
  });

  it("should toggle a task", async () => {
    const toggled = { id: "1", title: "t", isDone: true };
    mockTaskRepository.toggle.mockResolvedValue(toggled);
    const result = await taskService.toggle("1");
    expect(result).toEqual(toggled);
    expect(mockTaskRepository.toggle).toHaveBeenCalledWith("1");
  });
});
