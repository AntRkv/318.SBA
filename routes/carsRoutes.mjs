import express from "express";
import fs from "fs";
import path from "path";
import cars from "../data/cars.mjs"; 
const router = express.Router();
const __dirname = path.resolve();


function renderFile(filePath, replacements, res) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file.");
    }

    for (const key in replacements) {
      data = data.replace(new RegExp(`#${key}#`, "g"), replacements[key]);
    }

    res.send(data);
  });
}

router.get("/new", (req, res) => {
  const filePath = path.join(__dirname, "views/newCar.file");
  renderFile(filePath, {}, res);
});

router.post("/", (req, res) => {
  if (req.body.make && req.body.model && req.body.year) {
    let newCar = {
      id: cars.length + 1,
      make: req.body.make,
      model: req.body.model,
      year: parseInt(req.body.year),
    };

    cars.push(newCar);
    res.redirect("/api/cars"); 
  } else {
    res.send("Incorrect Info");
  }
});


router.get("/", (req, res) => {
  let carList = cars
    .map(
      (car) => `
        <li>
          <div class="car-info">
            ${car.make} ${car.model} (${car.year})
          </div>
          <div class="car-actions">
            <form action="/api/cars/${car.id}?_method=DELETE" method="POST">
              <button type="submit" class="btn btn-delete">Delete</button>
            </form>
            <button class="btn btn-edit" onclick="location.href='/api/cars/${car.id}/edit'">Edit</button>
            <button class="btn btn-show" onclick="location.href='/api/cars/${car.id}'">Show</button>
          </div>
        </li>
      `
    )
    .join("");

  const filePath = path.join(__dirname, "views/showAllCars.file");
  renderFile(filePath, { content: carList }, res);
});

router.delete("/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const carIndex = cars.findIndex((c) => c.id === carId);

  if (carIndex !== -1) {
    cars.splice(carIndex, 1);
    res.redirect("/api/cars");
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

router.get("/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const car = cars.find((c) => c.id === carId);

  if (car) {
    const filePath = path.join(__dirname, "views/showCar.file");
    renderFile(filePath, car, res);
  } else {
    res.status(404).send("Car not found");
  }
});

router.get("/:id/edit", (req, res) => {
  const carId = parseInt(req.params.id);
  const car = cars.find((c) => c.id === carId);

  if (car) {
    const filePath = path.join(__dirname, "views/editCar.file");
    renderFile(filePath, car, res);
  } else {
    res.status(404).send("Car not found");
  }
});

router.patch("/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const carIndex = cars.findIndex((c) => c.id === carId);

  if (carIndex !== -1) {
    cars[carIndex].make = req.body.make;
    cars[carIndex].model = req.body.model;
    cars[carIndex].year = parseInt(req.body.year);
    res.redirect("/api/cars");
  } else {
    res.status(404).send("Car not found");
  }
});

export default router;
