import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://52.55.58.97:6069/ingredients';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');

  // Fetch the ingredients from the API on component mount
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setIngredients(response.data);
      })
      .catch(error => {
        console.error('Error fetching ingredients:', error);
      });
  }, []);

  const handleAddIngredient = () => {
    if (newIngredient.trim() === '') {
      alert('Please enter an ingredient');
      return;
    }

    axios.post(API_URL, { text: newIngredient })
      .then(response => {
        console.log(response.data);
        setIngredients([...ingredients, { text: newIngredient }]);
        setNewIngredient('');
      })
      .catch(error => {
        console.error('Error adding ingredient:', error);
      });
  };

  return (
    <div className="App">
      <h1>Ingredients List</h1>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.text}</li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          placeholder="Enter a new ingredient"
        />
        <button onClick={handleAddIngredient}>Add Ingredient</button>
      </div>
    </div>
  );
}

export default App;
