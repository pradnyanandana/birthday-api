const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(
      `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}${
        process.env.NODE_ENV === "test" ? "test" : ""
      }${process.env.DATABASE_PARAM}`
    );

    console.log("Connected to MongoDB @ 27017");
  } catch (err) {
    console.log(err);
  }
};

const disconnect = async () => {
  await mongoose.connection.close();
};

module.exports = {
  connect,
  disconnect,
};
