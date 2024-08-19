import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

// Connect to the MongoDB database using the URI stored in .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Import the Person model
import person from "./models/person.models.js";

const person_1 = new person({
  name: "Abiola",
  age: 22,
  favouriteFoods: ["bread", "pasta"],
});
person_1
  .save()
  .then((person) => console.log("person saved:", person))
  .catch((error) => console.error("Error saving person:", error));

// Import the Person model
import Person from "./models/person.models.js";

// Array of people to create
const arrayOfPeople = [
  { name: "zee", age: 25, favouriteFoods: ["fries", "coffe"] },
  { name: "keerah", age: 20, favouriteFoods: ["ramen", "cake"] },
  { name: "ese", age: 25, favouriteFoods: ["Burgers", "Pizza"] },
];

// Create multiple records in the database
Person.create(arrayOfPeople)
  .then((data) => {
    console.log("People created:", data);
  })
  .catch((err) => {
    console.error("Error creating people:", err);
  });

// Find all people with the name "zee"
person
  .find({ name: "zee" })
  .then((data) => {
    console.log("Person found:", data);
  })
  .catch((err) => {
    console.error("Error finding person:", err);
  });

person
  .findOne({ favouriteFoods: "Pizza" })
  .then((data) => console.log("Person found:", data))
  .catch((err) => console.error("Error finding person:", err));

person
  .findById("66c338c6670d854c9c268ded")
  .then((data) => console.log("Person found by ID:", data))
  .catch((err) => console.error("Error finding person by ID:", err));

person
  .findById("66c3388da8c0c78df9889fff")
  .then((person) => {
    if (!person) throw new Error("Person not found");

    // Add "hamburger" to the favouriteFoods array
    person.favouriteFoods.push("hamburger");

    // Save the updated document
    return person.save();
  })
  .then((updatedPerson) => console.log("Updated Person:", updatedPerson))
  .catch((err) => console.error("Error updating person:", err));

person
  .findOneAndUpdate(
    { name: "ese" }, // Search by name
    { age: 20 }, // Update age to 20
    { new: true } // Return the updated document
  )
  .then((updatedPerson) => console.log("Person updated:", updatedPerson))
  .catch((err) => console.error("Error updating person:", err));

person
  .findByIdAndDelete("66c338c6670d854c9c268ded")
  .then((removedPerson) => console.log("Person removed:", removedPerson))
  .catch((err) => console.error("Error removing person:", err));

// Delete all people with the name
person
  .deleteMany({ name: "ese" })
  .then((result) => console.log("People removed:", result))
  .catch((err) => console.error("Error removing people:", err));

person
  .find({ favoriteFoods: "bread" })
  .sort("keerah") // Sort by name
  .limit(2) // Limit to 2 results
  .select("-age") // Exclude age from the results
  .exec()
  .then((data) => console.log("People found:", data))
  .catch((err) => console.error("Error finding people:", err));
