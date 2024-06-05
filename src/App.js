import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/authSlice";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import { Button, Grid, Box, Typography } from "@mui/material";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [showTaskInput, setShowTaskInput] = useState(false);

  const toggleTaskInput = () => {
    setShowTaskInput((prevState) => !prevState);
  };

  return (
    <div style={{ maxWidth: "850px", marginInline: "auto", paddingInline: 10 }}>
      <Box sx={{ flexGrow: 1 }} mt={4}>
        {isAuthenticated ? (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center">
              <Typography variant="h4" fontWeight={600}>
                To-Do X
              </Typography>
              <Button
                variant="contained"
                onClick={() => dispatch(logout())}
                sx={{ boxShadow: "none" }}>
                Logout
              </Button>
            </Box>

            <Welcome toggleTaskInput={toggleTaskInput} />
            {showTaskInput && (
              <Box mt={2}>
                <TaskInput toggleTaskInput={toggleTaskInput} />
              </Box>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TaskList />
              </Grid>
            </Grid>
          </>
        ) : (
          <Login />
        )}
      </Box>
    </div>
  );
};

export default App;
