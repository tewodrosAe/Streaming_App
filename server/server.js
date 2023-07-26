const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(process.env.PORT,() => console.log("success"))
})
.catch((err) => console.log(err.message))







/* mongoose
  .connect("mongodb://localhost:27017/netflix", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(5000, () => {
  console.log("server started on port 5000");
});
 */