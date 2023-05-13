import express from "express";
import db from "./database/Connection.js";
import router from "./routes/routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5005



try {
  await db.authenticate()
  console.log("koneksi berhasil")
} catch (error) {
  console.log(error.stack)
}

app.use(express.json());
app.use(router)

app.listen(port, () => {
  console.log(`server berjalan pada port : ${port}`)
})