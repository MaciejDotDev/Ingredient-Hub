import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/App.css';
import FoodItem from '../components/FoodItem';
import RecipeForm from '../components/RecipeForm';
import MyIngredients from '../components/MyIngredients';
import RecipeList from '../components/RecipeList';
import { v4 as uuidv4 } from 'uuid';
import EditRecipeModal from '../components/EditRecipeModal';
import DeleteConfirmation from '../components/DeleteConfirmation';
import API_KEY from '../api.js';

const apikey = API_KEY;

function App() {
  // Constants for the API key and URL
  const API_KEY = `${apikey}`;
  const API_URL = 'https://api.calorieninjas.com/v1/nutrition';

  // State variables
  const [query, setQuery] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem('recipes')) || []
  );
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [myIngredients, setMyIngredients] = useState(
    JSON.parse(localStorage.getItem('myIngredients')) || []
  );

  // State variables for modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);

  // Function to open the edit recipe modal
  const openEditModal = (recipe) => {
    setEditRecipe(recipe);
    setShowEditModal(true);
  };

  // Function to close the edit recipe modal
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditRecipe(null);
  };

  // Function to handle editing a recipe
  const handleEditRecipe = (editedRecipe) => {
    // Find the index of the edited recipe in the recipes array and update it
    const updatedRecipes = [...recipes];
    const index = updatedRecipes.findIndex((r) => r.name === editedRecipe.name);
    if (index !== -1) {
      updatedRecipes[index] = editedRecipe;
      setRecipes(updatedRecipes);
    }
    closeEditModal();
  };

  // State variables for delete confirmation modal
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteRecipe, setDeleteRecipe] = useState(null);

  // Function to open the delete confirmation modal
  const openDeleteConfirmation = (recipe) => {
    setDeleteRecipe(recipe);
    setShowDeleteConfirmation(true);
  };

  // Function to close the delete confirmation modal
  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setDeleteRecipe(null);
  };

  // Function to handle deleting a recipe
  const handleDeleteRecipe = (recipeToDelete) => {
    // Filter out the recipe to delete from the recipes array
    const updatedRecipes = recipes.filter((recipe) => recipe.name !== recipeToDelete.name);
    setRecipes(updatedRecipes);
    closeDeleteConfirmation();
  };

  // Function to add an ingredient to a recipe
  const addIngredientToRecipe = (recipeName, ingredient) => {
    if (recipeName && ingredient) {
      const updatedRecipes = recipes.map((recipe) => {
        if (recipe.name === recipeName) {
          return { ...recipe, ingredients: [...recipe.ingredients, ingredient] };
        }
        return recipe;
      });
      setRecipes(updatedRecipes);
    }
  };

  // Function to add an ingredient to "My Ingredients"
  const addIngredientToMyIngredients = (ingredient) => {
    if (!myIngredients.includes(ingredient)) {
      setMyIngredients([...myIngredients, ingredient]);
    }
  };

  // Function to remove an ingredient from "My Ingredients"
  const removeIngredientFromMyIngredients = (ingredient) => {
    const updatedIngredients = myIngredients.filter((item) => item !== ingredient);
    setMyIngredients(updatedIngredients);
  };

  // Function to search for food using the API
  const searchFood = async (query) => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'X-Api-Key': API_KEY,
        },
        params: {
          query: query,
        },
      });
      setFoodItems(response.data?.items || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle the search button click
  const handleSearch = () => {
    searchFood(query);
  };

  // Function to handle key press (Enter key) for searching
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Save recipes to local storage when the recipes state changes
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  // Save "My Ingredients" to local storage when the myIngredients state changes
  useEffect(() => {
    localStorage.setItem('myIngredients', JSON.stringify(myIngredients));
  }, [myIngredients]);

  return (
    <div className="app">
      <h1>Welcome to Ingredient Hub</h1>
      <div className="search">
        <input
          placeholder="Search for Food"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {/* Render RecipeForm component */}
      <RecipeForm
        addRecipe={(recipe) => setRecipes([...recipes, recipe])}
        selectedIngredients={selectedIngredients}
      />
      {/* Render MyIngredients component*/}
      <MyIngredients
        foodItems={foodItems}
        addIngredientToMyIngredients={addIngredientToMyIngredients}
        removeIngredientFromMyIngredients={removeIngredientFromMyIngredients}
        myIngredients={myIngredients}
        setSelectedIngredients={setSelectedIngredients}
        recipes={recipes}
      />
      <div className="recipe-search">
        <h2>All Recipes</h2>
        {/* Render RecipeList component */}
        <RecipeList
          recipes={recipes}
          onEditRecipe={openEditModal}
          onDeleteRecipe={openDeleteConfirmation}
        />
      </div>

      {/* Render EditRecipeModal component if showEditModal is true */}
      {showEditModal && (
        <EditRecipeModal
          recipe={editRecipe}
          onSave={handleEditRecipe}
          onClose={closeEditModal}
        />
      )}

      {/* Render DeleteConfirmation component if showDeleteConfirmation is true */}
      {showDeleteConfirmation && (
        <DeleteConfirmation
          recipe={deleteRecipe}
          onDelete={handleDeleteRecipe}
          onCancel={closeDeleteConfirmation}
        />
      )}

      {/* Render FoodItem components */}
      {foodItems.length > 0 ? (
        <div className="container">
          {foodItems.map((food, index) => (
            <FoodItem
              key={index}
              food={food}
              addIngredientToRecipe={addIngredientToRecipe}
              recipes={recipes}
              setSelectedIngredients={setSelectedIngredients}
              addIngredientToMyIngredients={addIngredientToMyIngredients}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h1>No Food Items Found</h1>
        </div>
      )}
    </div>
  );
}

export default App;
