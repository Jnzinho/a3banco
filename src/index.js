const { Pool } = require('pg');
const mongoose = require('mongoose');
const mongoDBUrl = 'mongodb://localhost:27017/banco4'; // Update with your MongoDB connection string

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Event listener for successful connection
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB at ${mongoDBUrl}`);
});

// Event listener for connection error
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Event listener for disconnected
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

// Event listener for application termination
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
  port: 5432, // Default PostgreSQL port
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err);
  } else {
    console.log('PostgreSQL connected:', res.rows[0].now);
  }
  pool.end();
});
