const express = require("express");

const db = require("./data/db");

const server = express();

server.use(express.json());

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`=== server is running on PORT ${PORT} ===`)
});

server.get("/", (req, res) => {
  // res.status(200).json(" ===  API is working === ")
  res.send(" ===  API is working === ")
});
  