const express = require("express");
const shortid = require("shortid");

const server = express();
server.use(express.json());

let users = [];

// Make sure server is working with a request to the home route
server.get("/", (req, res) => {
  res.send("Server is working!");
});

// Create a user
server.post("/api/users", (req, res) => {
  const user = req.body;

  if (!user.name) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name for the user" });
  } else if (!user.bio) {
    res
      .status(400)
      .json({ errorMessage: "Don't forget to add the user's bio" });
  }

  user.id = shortid();

  users.push(user);

  res
    .status(201)
    .json({ successMessage: "Successfully created user", user: user });
});

// Get a list of users
server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// Get a user with a specified id
server.get("/api/users/:id", (req, res) => {
  const userID = req.params.id.toLocaleLowerCase();

  users.map((user) => {
    if (user.id.toLocaleLowerCase() === userID) {
      res.status(200);
    } else {
      res.status(404).send(`User with ID ${userID} not found.`);
    }
  });
});

const port = 8000;
server.listen(port, () => {
  console.log("Server is up and running at port 8000");
});
