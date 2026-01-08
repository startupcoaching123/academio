const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const chatRoutes = require('./routes/chat');
const connectToMongo = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectToMongo();
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/admin', require("./routes/admin"));

// Health Check
app.get('/', (req, res) => {
  res.send('Academio Backend is running');
});

// Start Server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
