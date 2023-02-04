const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb+srv://sachin:sachin@cluster0.frgwbbs.mongodb.net/test", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`Connected ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
