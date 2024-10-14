import express from "express";
import methodOverride from "method-override";
import path from "path";
import fs from "fs";
import carRoutes from "./routes/carsRoutes.mjs"; 
import {
  requestLogger,
  addProcessingInfo,
  errorHandler,
} from "./middleware/logger.mjs";

const app = express();
const PORT = 3000;
const __dirname = path.resolve(); 

app.use(express.static(path.join(__dirname, "public")));

app.use(requestLogger); 
app.use(addProcessingInfo); 
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.redirect("/api/cars");
});
app.use("/api/cars", carRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
