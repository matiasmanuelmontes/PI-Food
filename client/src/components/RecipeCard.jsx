
import React from 'react';
import '../styledComponents/recipeCard.css';

export default function RecipeCard({ name, image, diets, healthScore }) {

    var dietsName = [];

    if (typeof diets[0] === "object") {
        diets.map((el) => {
            dietsName.push(el.name + ", ")
        })
    } else {
        diets.map((el) => {
            dietsName.push(el + ", ")
        })
    }

    return (<div /* className='homeDietsDetail' */>

        <h3 className='homeTitleDetail'>{name}</h3>
        <p className='homeHealthScoreDetail'>Health Score: {healthScore}</p>
        <p className='homeDietsDetail'>Diets: {dietsName}</p>
        <img src={image} alt="imagen" class="imgRecipe" />

    </div>)
}