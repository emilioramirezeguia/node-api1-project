const express = require("express");
const shortid = require("shortid");

const server = express();
server.use(express.json());

let users = [];

// Make sure server is working with a request to the home route
server.get("/", (req, res) => {
  res.send("Server is working!");
});

// POST new user
server.post("/api/users", (req, res) => {
  const user = req.body;

  if (!user.name) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide a name for the user." });
  } else if (!user.bio) {
    return res
      .status(400)
      .json({ errorMessage: "Don't forget to add the user's bio." });
  }

  user.id = shortid();

  users.push(user);

  res.status(201).json({ successMessage: "Successfully created user.", user });
});

// GET list of users
server.get("/api/users", (req, res) => {
  if (users.length) {
    res
      .status(200)
      .json({ successMessage: "Here's your list of users.", users });
  } else {
    res.status(200).json({ successMessage: "No users created yet." });
  }
});

// GET user by id
server.get("/api/users/:id", (req, res) => {
  const userID = req.params.id;
  const user = users.find((user) => user.id === userID);

  if (user) {
    res.status(200).json({
      successMessage: `Here's the user with ID '${userID}'`,
      user,
    });
  } else {
    res
      .status(404)
      .json({ errorMessage: `The user with ID '${userID}' was not found.` });
  }
});

// DELETE user by id and return deleted user
server.delete("/api/users/:id", (req, res) => {
  const userID = req.params.id;
  const deletedUser = users.find((user) => user.id === userID);

  if (deletedUser) {
    users = users.filter((user) => user.id !== userID);
    res.status(200).json({
      successMessage: `User with ID '${userID}' was successfully deleted`,
      deletedUser,
    });
  } else {
    res
      .status(404)
      .json({ errorMessage: `The user with ID '${userID}' was not found.` });
  }
});

// UPDATE user by id
server.put("/api/users/:id", (req, res) => {
  const userID = req.params.id;
  const oldUser = users.find((user) => user.id === userID);
  const updates = req.body;

  if (oldUser) {
    if (!updates.name || !updates.bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else {
      const indexOldUser = users.findIndex((user) => user.id === userID);
      users[indexOldUser] = {
        ...users[indexOldUser],
        name: updates.name,
        bio: updates.bio,
      };
      res.status(200).json(users[indexOldUser]);
    }
  }
});

const port = 8000;
server.listen(port, () => {
  console.log("Server is up and running at port 8000");
});
