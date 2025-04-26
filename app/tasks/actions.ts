"use server";
import { container } from "@/lib/di/container";
import { TaskService } from "@/lib/core/services/task.service.impl";
import type { CreateTaskInput } from "@/lib/core/domain/task.domain";

function getTaskService() {
  return container.resolve(TaskService);
}

export async function getTasks() {
  return getTaskService().getTasks();
}

export async function addTask(input: CreateTaskInput) {
  return getTaskService().addTask(input);
}

export async function toggleTask(id: number) {
  return getTaskService().toggleTask(id);
}
