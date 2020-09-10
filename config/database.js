const mongoose = require('mongoose');

const connectDatabase = async () => {
    const connection = await  mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`Application connected to ${connection.connection.name} on host ${connection.connection.host} and port ${connection.connection.port}`)
}


module.exports = connectDatabase;


