import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import ITaskList from "interface/ITaskList";
import HttpClient from "services/HttpClient";
import { RootState } from "store/Store";

interface TaskListState extends ITaskList {
  loading: boolean;
  entities: ITaskList[];
}

const initialState: TaskListState = {
  loading: false,
  title: "",
  entities: [],
};

const Http = new HttpClient();

export const FetchTaskListAsync = createAsyncThunk(
  "taskList/fetchTaskList",
  async ({ token }: { token: string }) => {
    const response = await Http.get("660/lists", token);
    return response.data;
  }
);
export const CreateTaskListAsync = createAsyncThunk(
  "taskList/createTaskList",
  async ({
    title,
    token,
    user_id,
  }: {
    title: string;
    token: string;
    user_id: number;
  }) => {
    const response = await Http.post(
      "660/lists",
      {
        title: title,
        user_id: user_id,
      },
      token
    );
    return response.data;
  }
);

export const DestroyTaskListAsync = createAsyncThunk(
  "taskList/destroyTaskList",
  async ({ id }: { id: number }) => {
    const response = await Http.delete(`lists/${id}`);
    return response.data;
  }
);

export const EditTaskListAsync = createAsyncThunk(
  "taskList/editTaskList",
  async ({
    id,
    title,
    user_id,
    token,
  }: {
    id: number;
    title: string;
    token: string;
    user_id: number;
  }) => {
    const response = await Http.patch(
      `lists/${id}`,
      {
        title: title,
        user_id: user_id,
      },
      token
    );

    return response.data;
  }
);

const taskListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(FetchTaskListAsync.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(FetchTaskListAsync.fulfilled, (state, action) => {
      state.loading = false;
      const lists = action.payload as ITaskList[];
      const newEntities = [] as { [key: number]: ITaskList };
      lists.forEach((list: ITaskList) => {
        newEntities[list.id as number] = list as ITaskList;
      });
      state.entities = newEntities as ITaskList[];
    })
    .addCase(FetchTaskListAsync.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(CreateTaskListAsync.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(CreateTaskListAsync.fulfilled, (state, action) => {
      state.loading = false;
      const list = action.payload as ITaskList;
      state.entities[list.id as number] = list;
    })
    .addCase(CreateTaskListAsync.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(DestroyTaskListAsync.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(DestroyTaskListAsync.fulfilled, (state, action) => {
      state.loading = false;
      const deletedTaskId = action.meta.arg.id as number;
      delete state.entities[deletedTaskId as number];
    })
    .addCase(DestroyTaskListAsync.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(EditTaskListAsync.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(EditTaskListAsync.fulfilled, (state, action) => {
      state.loading = false;
      const list = action.payload as ITaskList;
      state.entities[list.id as number].title = (action.payload as any).title;
    })
    .addCase(EditTaskListAsync.rejected, (state, action) => {
      state.loading = false;
    });
});

export const taskListState = (state: RootState) => state.taskList;

export default taskListReducer;
