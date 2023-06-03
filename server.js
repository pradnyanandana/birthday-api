const app = require("./app");
const config = require("./core/config/config.dev");
const AlertService = require("./services/alert-service");
const alert = new AlertService();

const mongoose = require("mongoose");
const port = config.serverPort;

mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB @ 27017");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

alert.start();

app.listen(port, () => {
  console.log(`Run app in port ${port}`);
});
