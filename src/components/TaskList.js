import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../redux/tasksSlice";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.items);
  const dispatch = useDispatch();

  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          sx={{
            background: "#f2f2f2",
            marginY: 2,
            borderRadius: 2,
          }}>
          <ListItemText
            primary={task.task}
            secondary={
              <React.Fragment>
                Priority:
                <Typography
                  sx={{
                    color:
                      task.priority === "High"
                        ? "red"
                        : task.priority === "Medium"
                        ? "orange"
                        : task.priority === "Low"
                        ? "green"
                        : "grey",
                    fontWeight: 600,
                  }}
                  component="span"
                  variant="body2">
                  {`${task.priority}`}
                </Typography>
              </React.Fragment>
            }
          />
          <IconButton onClick={() => dispatch(deleteTask(task.id))}>
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
