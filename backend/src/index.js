const express = require("express");
const bodyParser = require("body-parser");

const PORT = parseInt(process.env.PORT || "8000", 10);
const app = express();

app.use(bodyParser.json());

app.use("/healthcheck", require("./controllers/healthcheck"));

const server = app.listen(PORT, () =>
  console.log(`🚀 Backend: http://localhost:${PORT}`)
);
