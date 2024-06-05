import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";
import {
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const TaskInput = ({ toggleTaskInput }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Low");
  const [type, setType] = useState("Indoor");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task !== "") {
      const newTask = {
        task,
        priority,
        type,
        location: type === "Outdoor" ? location : "",
        date: new Date().toLocaleDateString(),
      };
      dispatch(addTask(newTask));
      setTask("");
      setPriority("Low");
      setType("Indoor");
      setLocation("");
      toggleTaskInput();
    } else {
      setError("Task cannot be blank");
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        marginY: 2,
        backgroundColor: "#e3f0ff",
      }}>
      <TextField
        label="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "white" }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <FormControl fullWidth margin="normal">
        <FormLabel>Priority</FormLabel>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          sx={{ backgroundColor: "white" }}>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
      <FormControl component="fieldset" fullWidth margin="normal">
        <FormLabel component="legend">Type</FormLabel>
        <RadioGroup row value={type} onChange={(e) => setType(e.target.value)}>
          <FormControlLabel value="Indoor" control={<Radio />} label="Indoor" />
          <FormControlLabel
            value="Outdoor"
            control={<Radio />}
            label="Outdoor"
          />
        </RadioGroup>
      </FormControl>
      {type === "Outdoor" && (
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "white" }}
        />
      )}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
        <Button
          onClick={handleAddTask}
          variant="contained"
          color="primary"
          sx={{ boxShadow: "none" }}>
          Add Task
        </Button>
        <Button
          onClick={toggleTaskInput}
          variant="outlined"
          color="error"
          sx={{ boxShadow: "none" }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default TaskInput;
