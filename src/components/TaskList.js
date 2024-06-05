import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../redux/tasksSlice";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.items);
  const dispatch = useDispatch();
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async (location) => {
    const url = `https://api.shecodes.io/weather/v1/forecast?query=${location}&key=${apiKey}&units=metric`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };

  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    tasks.forEach(async (task) => {
      if (task.type === "Outdoor" && task.location && !weatherData[task.id]) {
        const data = await fetchWeather(task.location);
        setWeatherData((prevState) => ({ ...prevState, [task.id]: data }));
      }
    });
  }, [tasks]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "grey";
    }
  };

  return (
    <List>
      {tasks.map((task) => (
        <React.Fragment key={task.id}>
          <ListItem
            sx={{
              background: "#f2f2f2",
              marginY: 2,
              borderRadius: 2,
              position: "relative",
              padding: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                top: 20,
                left: 12,
                fontWeight: "bold",
                color: getPriorityColor(task.priority),
              }}
            >
              {task.priority} | {task.date}
            </Typography>
            <ListItemText
              sx={{ marginTop: 4 }}
              primary={task.task}
              primaryTypographyProps={{ variant: "h6" }}
              secondary={
                <>
                  {task.type === "Outdoor" &&
                    weatherData[task.id] &&
                    weatherData[task.id].daily &&
                    weatherData[task.id].daily[0] && (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span>
                          {weatherData[task.id].daily[0].condition.icon_url && (
                            <img
                              style={{ width: "50px" }}
                              src={
                                weatherData[task.id].daily[0].condition.icon_url
                              }
                              alt={weatherData[task.id].daily[0].description}
                            />
                          )}
                        </span>
                        <Typography variant="body2">
                          {task.location}:{" "}
                          {weatherData[task.id].daily[0].temperature.day}°C,{" "}
                          {weatherData[task.id].daily[0].condition.description}
                        </Typography>
                      </div>
                    )}
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => dispatch(deleteTask(task.id))}>
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};

export default TaskList;
