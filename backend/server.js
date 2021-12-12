const express = require("express");
const cors = require("cors");

const app = express();


var corsOptions = {
  // ici tu défini quelle url a le droit d'accéder à ton api. C'est donc l'url du front qu'il faut mettre
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Backend online" });
});

// simple route
app.get("*", (req, res, next) => {
  console.log('GET ' + req.url)
  next()
});

app.post("*", (req, res, next) => {
  console.log('POST ' + req.url)
  next()
});

app.delete("*", (req, res, next) => {
  console.log('DELETE ' + req.url)
  next()
});

require("./routes/users")(app);
require("./routes/posts")(app);
require("./routes/comments")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});