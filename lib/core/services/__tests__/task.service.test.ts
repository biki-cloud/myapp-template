import "reflect-metadata";
import { container } from "tsyringe";
import { TaskService } from "../task.service.impl";
import { TaskRepository } from "../../repositories/task.repository.impl";

describe("TaskService", () => {
  let service: TaskService;

  beforeEach(() => {
    container.clearInstances();
    container.registerSingleton(TaskRepository, TaskRepository);
    container.registerSingleton(TaskService, TaskService);
    service = container.resolve(TaskService);
  });

  it("タスク一覧を取得できる", async () => {
    const tasks = await service.getTasks();
    expect(Array.isArray(tasks)).toBe(true);
  });

  it("タスクを追加できる", async () => {
    const task = await service.addTask({ title: "テストタスク" });
    expect(task.title).toBe("テストタスク");
    const tasks = await service.getTasks();
    expect(tasks.some((t) => t.title === "テストタスク")).toBe(true);
  });

  it("タスクの完了状態を切り替えできる", async () => {
    const [first] = await service.getTasks();
    const prev = first.isCompleted;
    const toggled = await service.toggleTask(first.id);
    expect(toggled?.isCompleted).toBe(!prev);
  });
});
