const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

const fileFilter = function(req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];


  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }


  cb(null, true);
};

var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

var upload = multer({ storage: storage });


var corsOptions = {
  // Ici, on définit quelle URL a le droit d'accéder à l'API. C'est donc l'url du front qu'il faut mettre.
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

app.post("/upload", upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

app.use(function(err, req, res, next) {
  if (err.code === "LIMIT_FILE_TYPES") {
    res.status(422).json({ error: "Only images are allowed" });
    return;
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: `Too large. Max size is ${MAX_SIZE / 1000}Kb` });
    return;
  }

})

require("./routes/users")(app);
require("./routes/posts")(app);
require("./routes/comments")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});