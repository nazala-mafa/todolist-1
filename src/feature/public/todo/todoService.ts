import { createSlice } from "@reduxjs/toolkit";
import { base_url } from "../../../app/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateTodoRequest, Todo, UpdateTodoRequest } from "./todoInterface";

export const todoApi = createApi({
  reducerPath: "todo-api",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: (builder) => ({
    createTodo: builder.mutation<Todo, CreateTodoRequest>({
      query: (body) => ({
        url: "todo-items",
        method: "POST",
        body: body,
      }),
    }),
    updateTodo: builder.mutation<Todo, UpdateTodoRequest>({
      query: ({ todo_id, body }) => ({
        url: `todo-items/${todo_id}`,
        method: "PATCH",
        body: body,
      }),
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (todo_id) => ({
        url: `todo-items/${todo_id}`,
        method: "DELETE",
      }),
    }),
    updateActiveTodo: builder.mutation<
      void,
      Pick<Todo, "is_active" | "priority" | "id">
    >({
      query: ({ is_active, priority, id }) => ({
        url: `todo-items/${id}`,
        method: "PATCH",
        body: { is_active, priority },
      }),
    }),
  }),
});

export const {
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useUpdateActiveTodoMutation,
} = todoApi;

export const todoSortSlice = createSlice({
  name: "todo.sort",
  initialState: {
    sort: "terbaru",
  },
  reducers: {
    setSort: (state, { payload }: { payload: string }) => {
      state.sort = payload;
    },
  },
});
