const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://Olena:pWAZvrjt1ewQDBBU@cluster1.bcgus9n.mongodb.net/HW03?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// pWAZvrjt1ewQDBBU password
