// Filename - index.js
// Import the necessary modules
import mongoose from "mongoose";

// Define the User Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
  favouriteFoods: {
    type: [String],
    required: true,
    trim: true,
  },
});

// Create a User model using the schema
const person = mongoose.model("Person", personSchema);

// Export the model so it can be used in other parts of the application
export default person;
