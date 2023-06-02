const express = require("express");
const errorHandler = require("./middlewares/error-handler");
const app = express();
const port = process.env.PORT || 3000;
const routers = require("./routes");

app.use(express.json());
app.use(routers);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello!",
  });
});

app.use(errorHandler);

app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Sorry, URL not found!",
  });
});

app.listen(port, () => {
  console.log(`Run app in port ${port}`);
});
