import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [recipeFormShown, showRecipeForm] = useState(false);
  const [recipeName, setRecipeName] = useState(false);
  const [instructions, setInstructions] = useState(false);
  const [recipe, setRecipe] = useState([]);


  let submitRecipe = (rec, instructions) => {
    let currentRecipes = recipe;
    let recipeCompiler = {
      recipe: '',
      instructions: ''
    };
    recipeCompiler.recipe = rec;
    recipeCompiler.instructions = instructions;
    console.log(recipeCompiler)
    currentRecipes.push(recipeCompiler);
    setRecipe([...recipe], recipeCompiler);
  };

  const DisplayRecipes = ({recipe}) => {
      return(
        <>
          {recipe.map((e, i) =>
          (
            <div key={i}>
              <div>Recipe Name: {e.recipe}</div>
              <div>Instructions: {e.instructions}</div>
            </div>
          ))}
        </>
      )
    }
  
  return (
    <div className='App'>
      <h1>My Recipes</h1>
      {
        recipeFormShown ? 
          <>
            <form id="recipe-form" name='recipe-form' onSubmit={submitRecipe}>
              <label htmlFor="newRecipeName">Recipe name: </label>
              <input type="text" id="newRecipeName" onChange={(e) => {setRecipeName(e.target.value)}}/>
              <label htmlFor="newRecipeInstructions">Instructions:</label>
              <textarea id="newRecipeInstructions" placeholder="write recipe instructions here..." onChange={(e) => {setInstructions(e.target.value)}}/>
              <input type="submit" onClick={(e) => {e.preventDefault(); submitRecipe(recipeName, instructions); document.querySelector('#current-status').textContent = 'My Recipes'}}/>
            </form>
          </>
          : 
            <button onClick={ () => showRecipeForm(!recipeFormShown) }>Add Recipe</button>
      }
      <p data-testid='recipe-list' id='current-status'>There are no recipes to list</p>
      <DisplayRecipes recipe={recipe}/>
    </div>
  );
}

export default App;
