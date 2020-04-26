const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "c654c345d5a343b49410d14d851be95e",
});

const handleApiCall = (req, res) => {
  const {input} = req.body;
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, input)
    .then((data) => res.json(data))
    .catch((err) => res.json("unable to communicate with the API"));
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => res.status(400).json("unable getting entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
