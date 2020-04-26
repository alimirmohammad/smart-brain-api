const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const handleRegister = require("./controllers/register");
const handleProfile = require("./controllers/profile");
const imageFunctions = require("./controllers/image");
const handleSignIn = require("./controllers/signin");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "ali",
    password: "48235015",
    database: "smart-brain",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.json("It is working!"));
app.post("/signin", handleSignIn(db, bcrypt));
app.post("/register", handleRegister(db, bcrypt));
app.get("/profile/:id", handleProfile(db));
app.put("/image", imageFunctions.handleImage(db));
app.post("/imageurl", imageFunctions.handleApiCall);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `app is running on port ${process.env.PORT ? process.env.PORT : 3000}`
  );
});
