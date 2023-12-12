const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();


const contactsRouter = require("./routes/api/contacts.js");
const authPouter = require ("./routes/api/auth-router.js")

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("piblic"))

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authPouter);


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
