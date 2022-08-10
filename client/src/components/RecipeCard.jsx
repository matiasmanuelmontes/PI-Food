
import React from 'react';
import '../styledComponents/recipeCard.css';

export default function RecipeCard({ name, image, diets, healthScore }) {

    var dietsName = [];

    if (typeof diets[0] === "object") {
        diets.map((el) => {
            dietsName.push(el.name + ", ")
        })
    } else {
        dietsName = diets
    }

    return (<div>

        <h3>{name}</h3>
        <h4>{healthScore}</h4>
        <h5>{dietsName}</h5>
        <img src={image} alt="imagen" class="imgVid" />

    </div>)
}