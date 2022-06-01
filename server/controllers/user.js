const bcrypt = require('bcryptjs');

const { db } = require("../models/user.model");

const signin = (req, res) => {
  const { username, password } = req.user;

  db.collection("User").findOne({ username: username })
  .then(user => {
      if (user) {
        return res.status(409).json({message: "username already exists"});
      } 
      else if (username && password) {
        bcrypt.hash(password, 12, (err, passwordHash) => {
          if (err) {
            return res.status(500).json({message: "couldnt hash the password"}); 
          } 
          else if (passwordHash) {
            return db.collection("User").insertOne(({
                username: username,
                password: passwordHash,
            }))
            .then((user) => {
              res.json({message: "user logged in"});
            })
            .catch(err => {
              console.log(err);
              res.status(502).json({message: "error while creating the user"});
            });
          };
        });
      } 
      else if (!password) {
        return res.status(400).json({message: "password not provided"});
      } 
      else if (!username) {
        return res.status(400).json({message: "username not provided"});
      };
  })
  .catch(err => {
    console.log('error', err);
  });
};

const login = (req, res) => {
  const { username, password } = req.user;

  db.collection("User").findOne({ username: username })
  .then(user => {
    if (!user) {
      return res.status(404).json({message: "user not found"});
    } 
    else {
      bcrypt.compare(password, user.password, (err, compareRes) => {
        if (err) {
          res.status(502).json({message: "error while checking user password"});
        } 
        else if (compareRes) {
          res.json({message: "user logged in"});
        } 
        else {
          res.status(401).json({message: "invalid pasword"});
        };
    });
    };
  })
  .catch(err => {
      console.log('error', err);
  });
};

module.exports = { signin, login };
