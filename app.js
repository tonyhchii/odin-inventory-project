const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const mainPageRouter = require("./routes/mainPageRouter");
const dotenv = require("dotenv");
const cardPageRouter = require("./routes/cardPageRouter");
const addCardPageRouter = require("./routes/addCardPageRouter");
dotenv.config();

//view engine set to EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//can use style sheets in public folder
app.use(express.static(assetsPath));
//receive req.body objects
app.use(express.urlencoded({ extended: true }));
app.use("/", mainPageRouter);
app.use("/cards", cardPageRouter);
app.use("/add", addCardPageRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Now listening on PORT ${PORT}`);
});
