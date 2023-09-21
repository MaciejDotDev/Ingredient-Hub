import React, { useState, useEffect } from "react";
import '../components/App.css'; // Import CSS file for styling.

// MyIngredients component receives foodItems, addIngredientToMyIngredients, removeIngredientFromMyIngredients,
// myIngredients, setSelectedIngredients, and recipes as props.
const MyIngredients = ({
  foodItems,
  addIngredientToMyIngredients,
  removeIngredientFromMyIngredients,
  myIngredients,
  setSelectedIngredients,
  recipes,
}) => {
  const [selectedIngredients, setSelectedIngredientsState] = useState([]);
  const [matchingRecipes, setMatchingRecipes] = useState([]);

  // Effect to update the selected ingredients in the parent component
  useEffect(() => {
    setSelectedIngredients(selectedIngredients);
  }, [selectedIngredients]);

  // Function to handle checkbox changes for selected ingredients
  const handleCheckboxChange = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredientsState((prevSelected) =>
        prevSelected.filter((item) => item !== ingredient)
      );
    } else {
      setSelectedIngredientsState([...selectedIngredients, ingredient]);
    }
  };

  // Function to find matching recipes based on selected ingredients
  const findMatchingRecipes = (selectedIngredients) => {
    const matchingRecipes = recipes.filter((recipe) => {
      return selectedIngredients.every((ingredient) =>
        recipe.ingredients.includes(ingredient)
      );
    });
    setMatchingRecipes(matchingRecipes);
  };

  return (
    <div className="my-ingredients">
      {/* Display My Ingredients heading */}
      <h2>My Ingredients</h2>
      <ul>
        {myIngredients.map((ingredient, index) => (
          <li key={index}>
            {/* Checkbox for each ingredient */}
            <label>
              <input
                type="checkbox"
                checked={selectedIngredients.includes(ingredient)}
                onChange={() => handleCheckboxChange(ingredient)}
              />
              {ingredient}
            </label>
            {/* Button to remove the ingredient from My Ingredients */}
            <button onClick={() => removeIngredientFromMyIngredients(ingredient)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* Button to find matching recipes based on selected ingredients */}
      <button onClick={() => findMatchingRecipes(selectedIngredients)}>Find Matching Recipes</button>

      {/* Display matching recipes if any */}
      {matchingRecipes.length > 0 && (
        <div className="matching-recipes">
          <h3>My Ingredient-Based Recipes:</h3>
          <ul>
            {matchingRecipes.map((recipe, index) => (
              <li key={index}>{recipe.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyIngredients;
