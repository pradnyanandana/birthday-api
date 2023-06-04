const app = require("./app");
const config = require("./core/config/config.dev");
const database = require("./database/connect");
const port = config.serverPort;

database.connect();

app.listen(port, () => {
  console.log(`Run app in port ${port}`);
});
