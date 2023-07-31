const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//Import Routes
const userRoutes = require("./routes/user.route");
const transferRoutes = require("./routes/transfer.route");

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/transfers", transferRoutes);

app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: "error",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
