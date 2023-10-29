const myhttp = require("http")

const port=7000

const foods = [
    { id: 1, name: "Burger", mealType: "Lunch", price: 25 },
    { id: 2, name: "Pizza", mealType: "Dinner", price: 28 },
    { id: 3, name: "Salad", mealType: "Lunch", price: 22 },
    { id: 4, name: "Pasta", mealType: "Dinner", price: 27 },
    { id: 5, name: "Sushi", mealType: "Dinner", price: 24 },
    { id: 6, name: "Sandwich", mealType: "Lunch", price: 24 },
    { id: 7, name: "Steak", mealType: "Dinner", price: 24 },
    { id: 8, name: "Soup", mealType: "Lunch", price: 24 },
    { id: 9, name: "Fish & Chips", mealType: "Dinner", price: 24 },
    { id: 10, name: "Taco", mealType: "Lunch", price: 24 },
];


const server = myhttp.createServer((req,res)=>{

    if (req.url=="/" && req.method=="GET") {
    res.end(JSON.stringify(foods))

}else if (req.url === "/addfoods" &&req.method === "POST" ){
    req.on('data',(chunk)=>{
        let newfoods = foods.push(JSON.parse(chunk))
        console.log(newfoods);
    })
    
    res.end("added")
}else if (req.url.startsWith("/`deletefood`/") && req.method === "DELETE") {
    const foodsId = req.url.split("/")[2]; 
    
    const foodIndex = foods.findIndex(food => food.id === parseInt(foodsId, 10));
    
    if (foodIndex !== -1) {
        const deletedfood = foods.splice(foodIndex, 1)[0];
        console.log(`Deleted food with ID: ${foodId}`);
        res.end(`Deleted food: ${JSON.stringify(deletedfood)}`);
    } else {
        console.log(`food with ID ${foodId} not found`);
        res.end("food not found");
    }
}
else if (req.url.startsWith("/updatefood/") && req.method === "PATCH") {
const foodId = parseInt(req.url.split("/")[2], 10); 

req.on('data',(chunk)=>{
    console.log(chunk);
    const updatedfood = JSON.parse(chunk);``
    
    
    
    const foodToUpdate = foods.find(food => food.id === foodId);
    
    if (foodToUpdate) {
        foodToUpdate.name = updatedfood.name || foodToUpdate.name;
        foodToUpdate.mealType = updatedfood.mealType || foodToUpdate.mealType;
        foodToUpdate.price = updatedfood.price || foodToUpdate.price;
        console.log(`Updated food with ID: ${foodId}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ messprice: "food updated successfully", food: foodToUpdate }));
    } else {
        console.log(`food with ID ${foodId} not found`);
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ messprice: "food not found" }));
    }
        
    });

}
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
