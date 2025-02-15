if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const router = require("./routers/index");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const errorHandling = require("./middleware/errorHandling");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.use(errorHandling);

app.listen(port, () => {
    console.log(`May you love me ${port}`)
  })