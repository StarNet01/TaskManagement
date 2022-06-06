import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "store/user/UserSlice";
import taskListReducer from "./taskList/TaskListSlice";

const reducers = {
  user: userReducer,
  taskList: taskListReducer,
};

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
