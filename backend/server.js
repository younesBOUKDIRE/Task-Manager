const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/tasks', taskRoutes);

const PORT = 5000;  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
