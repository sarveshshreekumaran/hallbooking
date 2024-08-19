require("dotenv").config();
const { connectDB } = require("./config/connectDB");
connectDB();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
let port = process.env.PRODUCTION_PORT || process.env.DEV_PORT;
const home = require("./routes/public_routes/homeRoutes");
const hall = require("./routes/public_routes/adminRoutes");
const bridegroom = require("./routes/public_routes/userRoutes");
const register_hall = require("./routes/privite_routes/bookingRoutes");

//middlewares
app.use(cors());
//public routes
app.use("/", home);
app.use("/hall", hall);
app.use("/bridegroom", bridegroom);
//privite routes
app.use("/register-hall", register_hall);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
