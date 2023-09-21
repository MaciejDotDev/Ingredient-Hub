import React from 'react';
import '../components/App.css'; // Import CSS file for styling.

function DeleteConfirmation({ recipe, onDelete, onCancel }) {
  // Handle the delete button click.
  const handleDelete = () => {
    // Call the onDelete function with the recipe data.
    onDelete(recipe);
    // Close the confirmation modal.
    onCancel();
  };

  return (
    <div className="confirmation">
      <p>Are you sure you want to delete this recipe?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default DeleteConfirmation;
