const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const plaidRoutes = require('./routes/plaid');
const goalRoutes = require('./routes/goals');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/plaid', plaidRoutes);
app.use('/api/goals', goalRoutes);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
