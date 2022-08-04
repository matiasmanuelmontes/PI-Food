/* import {Link} from 'react-router-dom'; */
import React from 'react';
/* import '../componentSyles/videogame.css'; */

export default function RecipeCard({ name, image, diets, healthScore }) {

    return (<div>

        <h3>{name}</h3>
        <h4>{healthScore}</h4>
        <h5>{diets}</h5>
        <img src={image} alt="imagen" /* class="imgVid" */ />

    </div>)
}