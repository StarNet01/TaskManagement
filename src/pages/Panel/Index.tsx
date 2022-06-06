import { Button, Grid, TextField } from "@mui/material";
import TopBar from "components/TopBar";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import {
  CreateTaskListAsync,
  FetchTaskListAsync,
  taskListState,
} from "store/taskList/TaskListSlice";
import TaskListBox from "components/TaskListBox";
import useLocalStorage from "hooks/useLocalStorage";
import IUser from "interface/IUser";

interface IListTask {
  title: string;
}

const Index = () => {
  const [showListInput, setShowListInput] = useState(false);
  const [userToken] = useLocalStorage("token", "");
  const [userData] = useLocalStorage<IUser>("user", {} as IUser);
  const taskList = useAppSelector(taskListState);
  const dispatch = useAppDispatch();
  const taskListForm = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values: IListTask) => {
      dispatch(
        CreateTaskListAsync({
          title: values.title,
          token: userToken,
          user_id: userData.id as number,
        })
      ).then(() => {
        showListInput && setShowListInput(false);
      });
    },
  });

  useEffect(() => {
    dispatch(
      FetchTaskListAsync({
        token: userToken,
      })
    );
  }, [dispatch, userToken]);

  return (
    <>
      <TopBar />

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        {taskList.entities.map((list) => {
          return list ? (
            <TaskListBox
              id={list.id as number}
              title={list.title}
              key={list.id}
            ></TaskListBox>
          ) : null;
        })}

        <Grid item xs={12} sm={6} md={4} lg={3} mt={4} mb={2}>
          {showListInput ? (
            <Box
              sx={{ textAlign: "right" }}
              component="form"
              onSubmit={taskListForm.handleSubmit}
            >
              <TextField
                id="list-title"
                fullWidth
                label="عنوان لیست"
                variant="standard"
                required
                name="title"
                value={taskListForm.values.title}
                onChange={taskListForm.handleChange}
                error={
                  taskListForm.touched.title &&
                  Boolean(taskListForm.errors.title)
                }
                helperText={
                  taskListForm.touched.title && taskListForm.errors.title
                }
              />
              <Box mt={2}>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => setShowListInput(false)}
                  type="button"
                >
                  لغو
                </Button>
                <LoadingButton
                  loading={taskList.loading}
                  loadingPosition="start"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  ایجاد لیست
                </LoadingButton>
              </Box>
            </Box>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                borderStyle: "dashed",
                width: "100%",
                borderColor: "#999",
                textAlign: "center",
                lineHeight: "2.5",
              }}
              onClick={() => setShowListInput(true)}
            >
              ایجاد لیست جدید <AddIcon />
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
