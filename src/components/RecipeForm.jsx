import React, { useState } from "react";
import '../components/App.css'; // Import CSS file for styling.

const RecipeForm = ({ addRecipe }) => {
  // Define state variables using the useState hook.
  const [recipeName, setRecipeName] = useState(""); // State for the recipe name.
  const [recipeIngredients, setRecipeIngredients] = useState([]); // State for the recipe ingredients.

  // Function to handle the creation of a new recipe.
  const handleCreateRecipe = () => {
    // Create a new recipe object with name and ingredients.
    const newRecipe = {
      name: recipeName,
      ingredients: recipeIngredients,
    };
    // Call a function (addRecipe) to add the new recipe to your app's state.
    addRecipe(newRecipe);
    // Reset form fields by clearing the state variables.
    setRecipeName("");
    setRecipeIngredients([]);
  };

  return (
    <div className="recipe-form">
      <h2>Create a Recipe</h2>
      {/* Input field for entering the recipe name */}
      <input
        type="text"
        placeholder="Recipe Name"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)} // Update recipeName state on input change to the value of the input field.
      />
      {/* List to display recipe ingredients */}
      <ul>
        {recipeIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      {/* Button to create the recipe */}
      <button onClick={handleCreateRecipe}>Create Recipe</button>
    </div>
  );
};

export default RecipeForm;
