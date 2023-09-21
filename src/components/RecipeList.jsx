import React from 'react';
import '../components/App.css'; // Import CSS file for styling.

// RecipeList component receives recipes as a prop.
const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-list">
      {/* Map through each recipe and render its details */}
      {recipes.map((recipe, index) => (
        <div key={index} className="recipe-card">
          {/* Display the recipe name */}
          <h3>{recipe.name}</h3>
          <ul>
            {/* Check if there are ingredients for the recipe */}
            {recipe.ingredients.length > 0 ? (
              // If ingredients exist, map through them and display each ingredient
              recipe.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))
            ) : (
              // If no ingredients are added, display a message
              <li>No ingredients added</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
