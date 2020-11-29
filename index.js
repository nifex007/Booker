const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const mongoSanitize = require('express-mongo-sanitize');
const errorHandler = require('./middlewares/errorHandler')
const connectDatabase = require('./config/database');


// Env vars
dotenv.config({ path: './config/config.env'})

// Database connection
connectDatabase();

// Routers
const bookings = require('./routes/bookings');
const resources = require('./routes/resources');
const inventory = require('./routes/inventory');
const auth = require('./routes/auth');



const app = express();

// Body parser
app.use(express.json());

const logger = (request, response, next) => {
    console.log(`${request.method} request at ${request.protocol}://${request.get('host')}${request.originalUrl}`);
    next();
};

app.use(logger);
app.use(mongoSanitize());


// Mount Routers
app.use('/api/v1', bookings);
app.use('/api/v1', resources);
app.use('/api/v1', inventory);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 8888;


const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`));

// Global Error Handling
process.on('unhandledRejection', (error, promise) => {
    console.error(`Unhandled error: ${error.message}`);
    // Terminate server and exit process
    server.exit(1);

});


