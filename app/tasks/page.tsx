import { TaskList } from "@/components/tasks/task-list";
import { getTasks, addTask, toggleTask } from "@/app/tasks/actions";

export default async function TasksPage() {
  const tasks = await getTasks();

  async function handleAdd(title: string) {
    "use server";
    await addTask({ title });
  }

  async function handleToggle(id: string) {
    "use server";
    await toggleTask(id);
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">タスク管理</h1>
      <TaskList tasks={tasks} onAdd={handleAdd} onToggle={handleToggle} />
    </main>
  );
}
