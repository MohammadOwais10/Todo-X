import React from "react";
import { Button, Typography, Box } from "@mui/material";

const Welcome = ({ toggleTaskInput }) => {
  const currentDate = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  return (
    <Box
      sx={{
        backgroundColor: "#b7dfff",
        padding: 2,
        borderRadius: 2,
        color: "white",
        mt: 2,
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Typography variant="h5" sx={{ marginRight: 2 }} color={"#4a4a4a"}>
          Welcome to the new way to add tasks!
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={toggleTaskInput}
          sx={{ minWidth: 100, boxShadow: "none" }}>
          New Task
        </Button>
      </Box>
      <Typography variant="h3" sx={{ fontWeight: "bold" }} color={"black"}>
        {formattedDate}
      </Typography>
    </Box>
  );
};

export default Welcome;
