const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DBURL);

        console.log("Connected to MongoDB successfully");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectToDB;
