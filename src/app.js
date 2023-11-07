const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//TODO: Create your GET Request Route Below:
app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findByPk(id);
  res.json(restaurant);
});

app.post("/restaurants", async (req, res) => {
  const newRest = await Restaurant.create(req.body);
  res.json(newRest);
});

app.put("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findByPk(id);
  restaurant.update(req.body);
  res.json(restaurant);
  console.log("ok");
});

app.delete("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findByPk(id);
  await restaurant.destroy();
  res.send("destroyed");
});

module.exports = app;
