import React, { useState } from 'react';
import '../components/App.css'; // Import CSS file for styling.

function EditRecipeModal({ recipe, onSave, onClose }) {
  // Initialize the state for the edited recipe with the provided recipe data.
  const [editedRecipe, setEditedRecipe] = useState({ ...recipe });

  // Handle input changes in the form fields.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the editedRecipe state with the new value.
    setEditedRecipe({
      ...editedRecipe,
      [name]: value,
    });
  };

  // Handle the save button click.
  const handleSave = () => {
    // Call the onSave function with the editedRecipe data.
    onSave(editedRecipe);
    // Close the modal.
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Recipe</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedRecipe.name}
            onChange={(e) => handleInputChange(e)} // Call handleInputChange on input change.
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={Array.isArray(editedRecipe.ingredients) ? editedRecipe.ingredients.join('\n') : ''}
            onChange={(e) => handleInputChange(e)} // Call handleInputChange on textarea change.
          />
        </div>
        <div className="form-actions">
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditRecipeModal;
