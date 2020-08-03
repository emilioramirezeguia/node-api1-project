const express = require("express");
const shortid = require("shortid");

const server = express();
server.use(express.json());

let users = [];

server.get("/", (req, res) => {
  res.send("Server is working!");
});

server.post("/api/users", (req, res) => {
  const user = req.body;

  user.id = shortid();

  users.push(user);

  res.status(201).json(users);
});

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

const port = 8000;
server.listen(port, () => {
  console.log("Server is up and running at port 8000");
});
