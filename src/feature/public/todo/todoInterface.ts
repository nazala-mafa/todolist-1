export type Todo = {
  activity_group_id: number;
  id: number;
  is_active: number;
  priority: string;
  title: string;
};

export type CreateTodoRequest = Pick<
  Todo,
  "activity_group_id" | "priority" | "title"
>;
export type UpdateTodoRequest = {
  todo_id: number;
  body: CreateTodoRequest;
};
