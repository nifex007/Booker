const express = require('express');
const dotenv = require('dotenv');

// Routers
const bookings = require('./routes/bookings');


// Env vars
dotenv.config({ path: './config/config.env'})


const app = express();


// Mount Routers
app.use('/api/v1/bookings', bookings)

const PORT = process.env.PORT || 8888;



app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`));

