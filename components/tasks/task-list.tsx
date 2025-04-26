import type { Task } from "@/lib/core/domain/interface/task.domain";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface TaskListProps {
  tasks: Task[];
  onAdd: (title: string) => void;
  onToggle: (id: string) => void;
}

export function TaskList({ tasks, onAdd, onToggle }: TaskListProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleAdd() {
    if (inputRef.current && inputRef.current.value.trim()) {
      onAdd(inputRef.current.value.trim());
      inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="タスクを追加"
          className="flex-1 border rounded px-2 py-1"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <Button type="button" onClick={handleAdd}>
          追加
        </Button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={() => onToggle(task.id)}
              className="accent-blue-500"
            />
            <span className={task.isDone ? "line-through text-gray-400" : ""}>
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
