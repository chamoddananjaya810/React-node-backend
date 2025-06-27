const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("./controller");
const req = require("express/lib/request");
const res = require("express/lib/response");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/users", (req, res) => {
  controller.getUsers((req, res, next) => {
    res.send();
  });
});

app.post("/createuser", (req, res) => {
  controller.addUser(req.body, (collack) => {
    res.send();
  });
});



app.post("/updateuser", (req, res) => {
  controller.updateUser(req.body, (collack) => {
    res.send(collack);
  });
});


app.post("/deleteuser", (req, res) => {
  controller.deleteUser(req.body, (collack) => {
    res.send(collack);
  });
});
module.exports = app;
