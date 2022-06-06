import {
  Divider,
  IconButton,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

interface ITaskItem {
  title: string;
  detail: string;
  status: boolean;
}

const TaskItem = ({ title, detail, status }: ITaskItem) => {
  return (
    <>
      <ListItem
        secondaryAction={
          <>
            {status ? (
              <IconButton edge="end" aria-label="checked" color="success">
                <CheckCircleOutlineOutlinedIcon />
              </IconButton>
            ) : (
              <IconButton edge="end" aria-label="unchecked" color="error">
                <CancelOutlinedIcon />
              </IconButton>
            )}

            <IconButton edge="end" aria-label="edit" color="primary">
              <EditOutlinedIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" color="error">
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </>
        }
      >
        <ListItemText primary={title} secondary={detail} />
      </ListItem>
      <Divider variant="middle" />
    </>
  );
};

export default TaskItem;
