import { useState } from 'react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { searchRecipe } from '../actions';
import '../styledComponents/searchBar.css';
import { axiosURL } from "../index";


export default function SearchBar() {

    const [search, setSearch] = useState('')
    let dispatch = useDispatch()

    function onSubmit(event) {
        event.preventDefault();
        dispatch(searchRecipe(search));  
        setSearch('')
    }

    function onInputChange(event) {
        event.preventDefault();
        setSearch(event.target.value)
        console.log(search)
    }

    function redirectHome(event) {
        event.preventDefault();
        window.location.href = `${axiosURL}/recipes/`;
    }

    function redirectAddRecipe(event) {
        event.preventDefault();
        window.location.href = `${axiosURL}/recipes/addRecipe`;
    }


    return <div class="searchBackground">
        <form onSubmit={onSubmit}>
            <input type="text" class="search" onChange={onInputChange} value={search} />
            <input type="submit" class="search" value="Search" />
        </form>
        <button name="redirectHome" class="home" onClick={redirectHome}>Home</button>
        <button name="redirectAddRecipe" class="home" onClick={redirectAddRecipe}>Add Recipe</button>
    </div>
}