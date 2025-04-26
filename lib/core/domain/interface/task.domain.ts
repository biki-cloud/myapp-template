export interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

export interface CreateTaskInput {
  title: string;
}
