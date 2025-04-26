"use server";
import { container } from "@/lib/di/container";
import type { ITaskService } from "@/lib/core/services/interface/task.service.interface";
import type { CreateTaskInput } from "@/lib/core/domain/interface/task.domain";

function getTaskService(): ITaskService {
  return container.resolve<ITaskService>("TaskService");
}

export async function getTasks() {
  return getTaskService().findAll();
}

export async function addTask(input: CreateTaskInput) {
  return getTaskService().add(input);
}

export async function toggleTask(id: string) {
  return getTaskService().toggle(id);
}
