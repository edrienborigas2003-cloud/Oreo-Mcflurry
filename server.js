const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use('/restaurants', require('./routes/restaurants'));
app.use('/favorites', require('./routes/favorites'));

// Test route
app.get('/', (req, res) => {
  res.send('Website is working.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});