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

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.post("/api/users", (req, res) => {
  const newUser = req.body;

  db.insert(newUser)
    .then(user => {
      if (user) {
        res.status(201).json(user);
      } else {
        res.status(404).json({ message: "something bad happened" })
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: `user with id ${id} does not exist` });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(user => {
      if (user) {
        res.status(204).json({ deletedUser: user });
      } else {
        res.status(404).json({ message: `user with id ${id} does not exist` });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  db.update(id, updatedUser)
    .then(user => {
      if (user) {
        res.status(200).json({ updatedUser: user });
      } else {
        res.status(404).json({ message: `user with id ${id} does not exist` });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});
