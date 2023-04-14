const express = require('express');
const app = express();
const { createChart } = require('astrology-js');

// Define a route to generate Kundli
app.get('/generateKundli', (req, res) => {
  // Fetch the required data from the request object
  const { dob, time, place } = req.query;

  // Parse the input data
  const date = new Date(dob);
  const [hours, minutes] = time.split(':').map(Number);

  // Generate the Kundli using astrology-js package
  const chart = createChart({
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    hour: hours,
    minute: minutes,
    latitude: place.latitude,
    longitude: place.longitude,
    timezone: place.timezone,
  });

  // Return the generated Kundli as a response
  res.send(chart);
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});