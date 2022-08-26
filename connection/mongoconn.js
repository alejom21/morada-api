const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/morada_db";

const main = async () => {
    await mongoose.connect(url);
    console.log('connection succes with mongo');
};

main().catch(error => console.log('error concting with mongo', error));
