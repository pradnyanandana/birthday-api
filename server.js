const app = require("./app");
const config = require("./core/config/config.dev");
const database = require("./database/connect");
const AlertService = require("./services/alert-service");
const alert = new AlertService();

const port = config.serverPort;

database.connect();
alert.start();

app.listen(port, () => {
  console.log(`Run app in port ${port}`);
});
