import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "@mui/material";

const TaskInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleAddTask = () => {
    if (task !== "" && priority !== "") {
      dispatch(addTask({ id: Date.now(), task, priority }));
      setTask("");
      setIsOpen(false);
      setError("");
    } else {
      setError("Task Cannot be null!");
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      sx={{
        background: "#b4d7ff",
        padding: 2,
        borderRadius: 4,
        height: isOpen && isMobile ? 220 : "auto",
      }}>
      <Box
        mb={2}
        mr={1}
        display="flex"
        justifyContent="flex-start"
        alignItems="left"
        flexDirection="row">
        <Box mr={2}>
          <Typography variant="body1" fontSize={20} color="text.secondary">
            Welcome to the new way to add tasks!
          </Typography>
          <Typography variant="body2" fontSize={18} fontWeight={600}>
            {currentDate}
          </Typography>
        </Box>
        {!isOpen && (
          <Button
            variant="outlined"
            onClick={() => setIsOpen(true)}
            sx={{ maxHeight: 60, minWidth: 140 }}>
            <AddIcon /> New Task
          </Button>
        )}
      </Box>
      <>
        {isOpen && (
          <Box
            gap={3}
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            height={55}>
            <Box gap={1} display="flex" height={55}>
              <Box display={"flex"} flexDirection={"column"}>
                <TextField
                  label="New Task"
                  value={task}
                  required
                  onChange={(e) => setTask(e.target.value)}
                />
                {error && !isMobile && (
                  <Typography color="error" pt={2}>
                    {error}
                  </Typography>
                )}
              </Box>

              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </Box>

            <Box gap={0.5} display="flex">
              <Button
                variant="contained"
                color="success"
                sx={{ boxShadow: "none" }}
                onClick={handleAddTask}>
                Add Task
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setIsOpen(false);
                  setTask("");
                  setError("");
                }}>
                <CloseIcon /> Close
              </Button>
            </Box>
            {error && isMobile && (
              <Typography color="error">{error}</Typography>
            )}
          </Box>
        )}
      </>
    </Box>
  );
};

export default TaskInput;
