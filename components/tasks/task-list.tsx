import type { Task } from "@/lib/core/domain/task.domain";
import { Button } from "@/components/ui/button";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
}

export function TaskList({ tasks, onToggle }: TaskListProps) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center gap-2">
          <Button
            variant={task.isCompleted ? "secondary" : "outline"}
            onClick={() => onToggle(task.id)}
            className={task.isCompleted ? "line-through text-gray-400" : ""}
          >
            {task.title}
          </Button>
        </li>
      ))}
    </ul>
  );
}
