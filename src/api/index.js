const express = require("express");
const app = express();
const port = 4000;

const user_model = require("./user_model");

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", (req, res) => {
  user_model
    .getUsers()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/users", (req, res) => {
  user_model
    .createUser(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/users/:id", (req, res) => {
  user_model
    .deleteUser(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/verifyToken/:token", (req, res) => {
  res.status(200).send(req.params.token);
});

app.post("/users/singin", (req, res) => {
  const dados = {
    user: {
      name: "Administrador",
      cpf: "123.456.789-10",
    },
    token: "1234",
  };

  res.status(200).send(JSON.stringify(dados));
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
