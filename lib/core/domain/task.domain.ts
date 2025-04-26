export interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface CreateTaskInput {
  title: string;
}
