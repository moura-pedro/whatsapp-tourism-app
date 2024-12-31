const express = require('express');
const connectDB = require('./db'); // Adjust the path if needed
const activityRoutes = require('./routes/routes'); // Adjust path as needed

// Initialize the app
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Tourism App!');
});

// Use the routes
app.use('/api', activityRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

