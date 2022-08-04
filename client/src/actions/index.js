import axios from 'axios';

export function getRecipes(){
    return function(dispatch){
        axios.get('http://localhost:3001/api/recipes/allOrName')
        .then((recipes) => {
            dispatch({
                type: 'GET_RECIPES',
                payload: recipes.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

 export function searchRecipe(search){
    return function(dispatch){
        axios.get(`http://localhost:3001/api/recipes/allOrName?name=${search}`)
        .then((recipe) => {
            dispatch({
                type: 'SEARCH_RECIPE',
                payload: recipe.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
} 

export function sort(order){
    return {
        type: 'SORT',
        payload: order
    }
}

export function sortHealthScore(orderHealthScore){
    return {
        type: 'SORT_HEALTH_SCORE',
        payload: orderHealthScore
    }
}

export function filterRecipeByDiet(payload){
    return {
        type: 'FILTER_BY_DIET',
        payload
}
}

/* export function getGenres(){
    return function(dispatch){
        axios.get('http://localhost:3001/api/genres/')
        .then((genres) => {
            dispatch({
                type: GET_GENRES,
                payload: genres.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function postVidegame(payload){
    return async function(dispatch){
       const response = axios.post('http://localhost:3001/api/genres/', payload)
        console.log(response)
        return response;
        
    }
} */