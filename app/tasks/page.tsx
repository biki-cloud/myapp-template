import { getTasks, addTask, toggleTask } from "./actions";
import { TaskList } from "@/components/tasks/task-list";
import { revalidatePath } from "next/cache";
import React from "react";

export default async function TasksPage() {
  const tasks = await getTasks();

  async function handleAdd(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    if (title) await addTask({ title });
    revalidatePath("/tasks");
  }

  async function handleToggle(id: number) {
    "use server";
    await toggleTask(id);
    revalidatePath("/tasks");
  }

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">タスク管理</h1>
      <form action={handleAdd} className="flex gap-2 mb-4">
        <input
          name="title"
          placeholder="新しいタスク"
          className="input input-bordered flex-1"
        />
        <button type="submit" className="btn btn-primary">
          追加
        </button>
      </form>
      <TaskList tasks={tasks} onToggle={handleToggle} />
    </main>
  );
}
