import { settingModalSlice } from "./../feature/public/activity/activityService";
import { todoApi, todoSortSlice } from "./../feature/public/todo/todoService";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { activityApi } from "../feature/public/activity/activityService";

export const store = configureStore({
  reducer: {
    todoSort: todoSortSlice.reducer,
    activitySettingModal: settingModalSlice,
    [activityApi.reducerPath]: activityApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      activityApi.middleware,
      todoApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
