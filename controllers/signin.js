const handleSignIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  db.select("hash", "email")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select()
          .from("users")
          .where("email", "=", email)
          .then((user) => res.json(user[0]))
          .catch((err) => res.json("unable to get user"));
      } else {
        res.json("wrong credentials");
      }
    })
    .catch((err) => res.json("error happended"));
};

module.exports = handleSignIn;
