
const initialState = {
  recipes: [],
  filteredRecipes: [],
  diets: [],
  detail: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_RECIPES':
      return {
        ...state,
        recipes: action.payload,
        filteredRecipes: action.payload,
       
      }

     case 'SEARCH_RECIPE':
      return {
        ...state,
        filteredRecipes: action.payload
      } 

     case 'SORT':

      var newOrderedRecipes = []

      if (action.payload === 'ORDER_A-Z') {

        let orderedRecipes = [...state.recipes]
        let array = orderedRecipes

        for (let i = 0; i < array.length - 1; i++) {
          for (let j = 0; j < array.length - 1 - i; j++) {

            if (array[j].name > array[j + 1].name) {

              let tmp = array[j];
              array[j] = array[j + 1];
              array[j + 1] = tmp;
            }
          }
        }
        newOrderedRecipes = array;
      }
 
       if (action.payload === 'ORDER_Z-A') {

        let orderedRecipes = [...state.recipes]
        let array = orderedRecipes

        for (let i = 0; i < array.length - 1; i++) {
          for (let j = 0; j < array.length - 1 - i; j++) {

            if (array[j].name < array[j + 1].name) {

              let tmp = array[j];
              array[j] = array[j + 1];
              array[j + 1] = tmp;
            }
          }
        }
        newOrderedRecipes = array;
      }

      return {
        ...state,
        filteredRecipes: newOrderedRecipes
      }

      case 'SORT_HEALTH_SCORE':

      var newOrderedRecipes = []

      if (action.payload === 'HEALTH_SCORE_ASCENDENT') {

        let orderedRecipes = [...state.recipes]
        let array = orderedRecipes

        for (let i = 0; i < array.length - 1; i++) {
          for (let j = 0; j < array.length - 1 - i; j++) {

            if (array[j].healthScore > array[j + 1].healthScore) {

              let tmp = array[j];
              array[j] = array[j + 1];
              array[j + 1] = tmp;
            }
          }
        }
        newOrderedRecipes = array;
      }
 
       if (action.payload === 'HEALTH_SCORE_DESCENDENT') {

        let orderedRecipes = [...state.recipes]
        let array = orderedRecipes

        for (let i = 0; i < array.length - 1; i++) {
          for (let j = 0; j < array.length - 1 - i; j++) {

            if (array[j].healthScore < array[j + 1].healthScore) {

              let tmp = array[j];
              array[j] = array[j + 1];
              array[j + 1] = tmp;
            }
          }
        }
        newOrderedRecipes = array;
      }

      return {
        ...state,
        filteredRecipes: newOrderedRecipes
      }

     case 'FILTER_BY_DIET' :

      var allRecipes = state.recipes

      for (let n = 0; n < allRecipes.length; n++){
        for ( let m = 0; m < allRecipes[n].diets.length; m++){
          if (typeof allRecipes[n].diets[m] === 'object'){
            allRecipes[n].diets[m] =  allRecipes[n].diets[m].name
            } 
          } 
        }

        /* console.log (allRecipes) */
      
      const dietFiltered = action.payload === 'ALL' ? allRecipes :
        allRecipes.filter(el => el.diets.includes(action.payload))

      return {
        ...state,
        filteredRecipes: dietFiltered
      } 

      case 'POST_RECIPE':

      return {
        ...state,
      }  

       case 'GET_DIETS':

      return {
        ...state,
        diets: action.payload
      } 

      /* case 'GET_RECIPE_DETAIL':
      return {
        ...state,
        detail: action.payload,
      } */
      
    default:
      return state
  }
}