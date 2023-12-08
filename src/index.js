const { Pool } = require('pg');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const mongoDBUrl = 'mongodb://localhost:27017/banco4';
mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB at ${mongoDBUrl}`);
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection terminated due to application termination');
    process.exit(0);
  });
});

const pool = new Pool({
  user: 'jnzinho',
  host: 'localhost',
  database: 'api_deec',
  password: 'admin',
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err);
  } else {
    console.log('PostgreSQL connected:', res.rows[0].now);
  }
  pool.end();
});
