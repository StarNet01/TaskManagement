import {
  Button,
  Card,
  CardHeader,
  Grid,
  Box,
  IconButton,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useAppDispatch } from "hooks/useAppDispatch";
import {
  DestroyTaskListAsync,
  EditTaskListAsync,
  taskListState,
} from "store/taskList/TaskListSlice";
import { useState } from "react";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import useLocalStorage from "hooks/useLocalStorage";
import IUser from "interface/IUser";
import { useAppSelector } from "hooks/useAppSelector";

interface IListTask {
  children?: JSX.Element;
  title: string;
  id: number;
}

const TaskListBox = ({ children, title, id }: IListTask) => {
  const [userToken] = useLocalStorage("token", "");
  const [userData] = useLocalStorage<IUser>("user", {} as IUser);
  const taskList = useAppSelector(taskListState);
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const taskListEditForm = useFormik({
    initialValues: {
      title: title,
      id: id,
    },
    onSubmit: (values: IListTask) => {
      dispatch(
        EditTaskListAsync({
          id: values.id,
          title: values.title,
          user_id: userData.id as number,
          token: userToken,
        })
      ).then(() => {
        setIsEdit(false);
      });
    },
  });

  const handleDelete = (id: number) => {
    return dispatch(DestroyTaskListAsync({ id }));
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3} mt={4} mb={2}>
        <Card
          variant="outlined"
          sx={{ backgroundColor: "#dbedff", borderRadius: "10px" }}
        >
          {isEdit ? (
            <>
              <Box
                sx={{ textAlign: "right", padding: 2 }}
                component="form"
                onSubmit={taskListEditForm.handleSubmit}
              >
                <TextField
                  id="list-title"
                  fullWidth
                  label="عنوان لیست"
                  required
                  variant="standard"
                  name="title"
                  value={taskListEditForm.values.title}
                  onChange={taskListEditForm.handleChange}
                  error={
                    taskListEditForm.touched.title &&
                    Boolean(taskListEditForm.errors.title)
                  }
                  helperText={
                    taskListEditForm.touched.title &&
                    taskListEditForm.errors.title
                  }
                />
                <Box mt={2}>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => setIsEdit(false)}
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
                    ویرایش عنوان
                  </LoadingButton>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <CardHeader
                title={title}
                action={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDelete(id)}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      color="primary"
                      onClick={() => setIsEdit(true)}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  </>
                }
              />

              <List>
                {children}
                <ListItem>
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
                  >
                    جدید <AddIcon />
                  </Button>
                </ListItem>
              </List>
            </>
          )}
        </Card>
      </Grid>
    </>
  );
};

export default TaskListBox;
