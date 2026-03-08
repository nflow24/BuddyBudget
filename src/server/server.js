const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const plaidRoutes = require('./routes/plaid');
const goalRoutes = require('./routes/goals');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/plaid', plaidRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/health', healthRoutes);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
