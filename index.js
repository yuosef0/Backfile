const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 7000;

app.use(bodyParser.json()); // Parse JSON request bodies

const foods = [
    // ... (your food data)
];

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/", (req, res) => {
    res.json(foods);
});

app.post("/addfoods", (req, res) => {
    const newFood = req.body;
    foods.push(newFood);
    console.log(newFood);
    res.send("Added");
});

app.delete("/deletefood/:foodId", (req, res) => {
    const foodId = parseInt(req.params.foodId, 10);
    const foodIndex = foods.findIndex((food) => food.id === foodId);

    if (foodIndex !== -1) {
        const deletedFood = foods.splice(foodIndex, 1)[0];
        console.log(`Deleted food with ID: ${foodId}`);
        res.json(deletedFood);
    } else {
        console.log(`Food with ID ${foodId} not found`);
        res.status(404).send("Food not found");
    }
});

app.patch("/updatefood/:foodId", (req, res) => {
    const foodId = parseInt(req.params.foodId, 10);
    const updatedFood = req.body;

    const foodToUpdate = foods.find((food) => food.id === foodId);

    if (foodToUpdate) {
        foodToUpdate.name = updatedFood.name || foodToUpdate.name;
        foodToUpdate.mealType = updatedFood.mealType || foodToUpdate.mealType;
        foodToUpdate.price = updatedFood.price || foodToUpdate.price;
        console.log(`Updated food with ID: ${foodId}`);
        res.json({ message: "Food updated successfully", food: foodToUpdate });
    } else {
        console.log(`Food with ID ${foodId} not found`);
        res.status(404).json({ message: "Food not found" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
