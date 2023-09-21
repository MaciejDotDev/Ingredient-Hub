import React, { useState } from "react";
import '../components/App.css'; // Import CSS file for styling.

// FoodItem component receives food, addIngredientToRecipe, recipes, setSelectedIngredients, and addIngredientToMyIngredients as props.
const FoodItem = ({ food, addIngredientToRecipe, recipes, setSelectedIngredients, addIngredientToMyIngredients }) => {
  const { name, calories } = food;
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [ingredientToAdd, setIngredientToAdd] = useState("");

  // Function to handle adding an ingredient to a recipe.
  const handleAddIngredient = () => {
    if (selectedRecipe && ingredientToAdd) {
      // Call the addIngredientToRecipe function with the selected recipe and ingredientToAdd
      addIngredientToRecipe(selectedRecipe, ingredientToAdd);
      // Reset ingredient input
      setIngredientToAdd("");
    }
  };

  // Function to handle adding an ingredient to "My Ingredients".
  const handleAddToMyIngredients = () => {
    // Call the addIngredientToMyIngredients function with the name of the food
    addIngredientToMyIngredients(name);
  };

  return (
    <div className="food-item">
      <h2>Please select a recipe and type the ingredient you want to add</h2>
      {/* Display the food name */}
      <h3>{name}</h3>
      {/* Display the calories */}
      <p>{calories} calories</p>
      <h3>Recipe:</h3>
      <select
        value={selectedRecipe}
        onChange={(e) => setSelectedRecipe(e.target.value)}
      >
        {/* Default option */}
        <option value="" disabled>
          Select a Recipe
        </option>
        {/* Map through recipes and create options for each */}
        {recipes.map((recipe) => (
          <option key={recipe.name} value={recipe.name}>
            {recipe.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Ingredient"
        value={ingredientToAdd}
        onChange={(e) => setIngredientToAdd(e.target.value)}
      />
      {/* Button to add the ingredient to a recipe */}
      <button onClick={handleAddIngredient}>Add to Recipe</button>
      {/* Button to add the ingredient to My Ingredients */}
      <button onClick={handleAddToMyIngredients}>Add to My Ingredients</button>
    </div>
  );
};

export default FoodItem;
