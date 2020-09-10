const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');


// Env vars
dotenv.config({ path: './config/config.env'})

// Database connection
connectDatabase();

// Routers
const bookings = require('./routes/bookings');


const app = express();

const logger = (request, response, next) => {
    console.log(`${request.method} request at ${request.protocol}://${request.get('host')}${request.originalUrl}`);
    next();
};

app.use(logger)
// Mount Routers
app.use('/api/v1', bookings)

const PORT = process.env.PORT || 8888;



app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`));

