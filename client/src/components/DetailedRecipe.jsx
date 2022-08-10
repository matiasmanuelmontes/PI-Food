import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from "../actions";

export default function RecipeDetail(props) {

    console.log('props')
    console.log(props)
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecipeDetail(props.match.params.id))
    }, [dispatch])

    const myRecipe = useSelector((state) => state.detail)

    console.log('myRecipe')
    console.log(myRecipe)

    var myNewRecipe = {}

    if (myRecipe.length > 0) {
        myNewRecipe = myRecipe[0]
    } else {
        myNewRecipe = myRecipe
    }

    console.log('myNewRecipe')
    console.log(myNewRecipe)

    return (
        <div>
            <Link to='/home'>
                <button>Home</button>
            </Link>
            {
                myNewRecipe ?
                    <div>
                        <h1>I am {myNewRecipe.name}</h1>
                        <img src={myNewRecipe.image} alt="image" />
                        <h2>Dish Summary {myNewRecipe.dishSummary}</h2>
                        <p>Healt Score {myNewRecipe.healthScore}</p>
                        <h3>Step By Step {myNewRecipe.stepByStep + ' ' || myNewRecipe.stepByStep.map(el => el + (' '))}</h3>
                        <h4>Diets {!myNewRecipe.createdInDb ? myNewRecipe.diets + ' ' : myNewRecipe.diets.map(el => el.name + (' '))}</h4 >
                    </div> : <p>Loading..</p>
            }
        </div>
    )
}