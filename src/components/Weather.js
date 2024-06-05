// import React, { useEffect, useState } from "react";
// import { getWeather } from "../utils/api";
// import { Typography } from "@mui/material";

// const Weather = ({ lat, lon }) => {
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         const data = await getWeather(lat, lon);
//         setWeather(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchWeather();
//   }, [lat, lon]);

//   return (
//     <div>
//       {error ? (
//         <Typography color="error">{error}</Typography>
//       ) : (
//         weather && (
//           <div>
//             <Typography variant="h6">Current Weather</Typography>
//             <Typography variant="body1">
//               Temperature: {weather.current.temp}°C
//             </Typography>
//             <Typography variant="body2">
//               Weather: {weather.current.weather[0].description}
//             </Typography>
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default Weather;
