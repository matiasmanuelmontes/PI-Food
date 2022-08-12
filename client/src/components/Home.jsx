import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipes } from '../actions'
import { Link } from "react-router-dom";
import RecipeCard from './RecipeCard';
import Paginated from "./Paginated";
import { filterRecipeByDiet, sort, sortHealthScore } from "../actions";
import SearchBar from "./SearchbBar";
import '../styledComponents/home.css';

export default function Home() {

    let recipes = useSelector((state) => state.filteredRecipes)
    let dispatch = useDispatch()
    
    // Aqui comienza lo de paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [recipePerPage, setRecipePerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipePerPage // 4
    const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage // 0
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe) // 0 al 3

    const paginated = ( pageNumber ) => {
        setCurrentPage(pageNumber)
    } // aqui finaliza lo de paginado y se agrega al div

    useEffect(() => {
        dispatch(getRecipes())
    }, [])

    function onSelectChangeOrder(e) {
        e.preventDefault();
        dispatch(sort(e.target.value))
    }

    function onSelectChangeHealthScore(e) {
        e.preventDefault();
        dispatch(sortHealthScore(e.target.value))
    }

    function onSelectChangeFilterDiet(e) {
        e.preventDefault();
        dispatch(filterRecipeByDiet(e.target.value))
    }

    function handleOnClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    const dietsAll = useSelector((state) => state.diets)

    return (
        <div>
            <SearchBar />
            {/* <Link to='/recipes'> All Recipes</Link> */}
            <h1 className="homeTitlePincipal">Recipes Finder</h1>
            <button onClick={e => { handleOnClick(e) }}>
                Reset
            </button>
            <div>
                <select name="selectOrder" onChange={onSelectChangeOrder}>
                    <option value='ORDER_A-Z'>Order A-Z</option>
                    <option value='ORDER_Z-A'>Order Z-A</option>
                </select>
                <select name="selectHealthScoreOrder" onChange={onSelectChangeHealthScore}>
                    <option value='HEALTH_SCORE_ASCENDENT'>Health Score Ascendent</option>
                    <option value='HEALTH_SCORE_DESCENDENT'>Health Score Descendent</option>
                </select>
                <select name="selectFiler" onChange={e => onSelectChangeFilterDiet(e)}>
                    {/* <option value='ALL'>All</option>
                    <option value='lacto ovo vegetarian'>Vegetarian</option>
                    <option value='vegan'>Vegan</option>
                    <option value='gluten free'>Gluten Free</option> */}
                    <option value='ALL'>All</option>
                    {dietsAll && dietsAll.map((diet) => (
                        <option value={diet.name}>{diet.name}</option>
                    ))}
                </select>

                <Paginated
                    recipePerPage={recipePerPage}
                    recipes={recipes.length}
                    paginated={paginated}
                />
                {currentRecipes && currentRecipes.map((element) => {

                    return (
                        <div  className="homeCardGrid" >
                            <Link to={'/recipes/' + element.id}>
                                <RecipeCard
                                    id={element.id}
                                    name={element.name}
                                    image={element.image}
                                    dishSummary={element.dishSummary}
                                    healthScore={element.healthScore}
                                    stepByStep={element.stepByStep}
                                    diets={element.diets}
                                />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

