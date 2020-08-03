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
      .json({ errorMessage: "Please provide a name for the user." });
  } else if (!user.bio) {
    res
      .status(400)
      .json({ errorMessage: "Don't forget to add the user's bio." });
  }

  user.id = shortid();

  users.push(user);

  res
    .status(201)
    .json({ successMessage: "Successfully created user.", user: user });
});

// Get a list of users
server.get("/api/users", (req, res) => {
  try {
    if (users.length) {
      res
        .status(200)
        .json({ successMessage: "Here's your list of users.", users: users });
    } else {
      res.status(200).json({ successMessage: "No users created yet." });
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: "There was an error retrieving the list of users.",
    });
  }
});

// Get a user with a specified id
server.get("/api/users/:id", (req, res) => {
  try {
    const userID = req.params.id;
    console.log("Searching for user ID: ", userID);

    users.map((user) => {
      if (user.id === userID) {
        res.status(200).json({
          successMessage: `Here's the user with ID '${userID}'.`,
          user: user,
        });
      } else {
        res
          .status(404)
          .json({ errorMessage: `User with ID '${userID}' was not found.` });
      }
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "There was an error retrieving the user's information.",
    });
  }
});

const port = 8000;
server.listen(port, () => {
  console.log("Server is up and running at port 8000");
});
