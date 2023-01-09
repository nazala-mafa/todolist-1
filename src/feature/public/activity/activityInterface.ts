import { Todo } from "../todo/todoInterface";

export type Activity = {
  id: number;
  title: string;
  created_at: string;
};

export type NewActivityRequest = {
  email: string;
  title: string;
};
export type NewActivityResponse = {
  id: number;
  title: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export interface DetailActivityResponse extends Activity {
  todo_items: Todo[];
}
