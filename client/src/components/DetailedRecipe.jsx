import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
/* import { useDispatch, useSelector } from "react-redux"; */
/* import { getRecipeDetail } from "../actions"; */
import '../styledComponents/paginated.css';
import axios from "axios";


export default function RecipeDetail(/* props */) {

    /* console.log('props')
    console.log(props)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecipeDetail(props.match.params.id))
    }, [dispatch])

    const myRecipe = useSelector((state) => state.detail) */

    const [myRecipe, setMyRecipe] = useState(null)
    let { id } = useParams()
    console.log(id)
    useEffect(() => {
        axios.get(`http://localhost:3001/api/recipes/${id}`)
            .then((response) => {  // este response es videogame
                response.data.length > 0 ?
                setMyRecipe(response.data[0]):
                setMyRecipe(response.data)
            })
        return () => {
            setMyRecipe(null)   // al hacer esto estoy haciendo un cleanup, si se usa redux necesito hacer esto
        }
    }, [])

    console.log('myRecipe')
    console.log(myRecipe)

    var myNewRecipe = {}
     myNewRecipe = myRecipe


 /*    function dietFilterDb(arg) {
        let filteredDietsDb = []
        arg.map((element1) => { filteredDietsDb.push(element1.name)})
        return filteredDietsDb
    }

    function dietFilter(arg) {
        let filteredDiets = []
        arg.map((element2) => { filteredDiets.push(element2 + " - ")})
        return filteredDiets
    } */

    console.log('myNewRecipe')
    console.log(myNewRecipe)

    
    return (
        <div>
            <Link to='/recipes/'>
                <button>Home</button>
            </Link>
            {
                myNewRecipe ?
                    <div>
                        <h1>I am {myNewRecipe.name}</h1>
                        <img src={myNewRecipe.image} alt="image" />
                        <h2>Dish Summary {myNewRecipe.dishSummary}</h2>
                        <p>Healt Score {myNewRecipe.healthScore}</p>
                        <h3>Step By Step: {myNewRecipe.stepByStep}</h3>
                        {/*  <h3>Step By Step: {!myNewRecipe.createdInDb ? myNewRecipe.stepByStep : myNewRecipe.stepByStep.map(el => el + (' '))}</h3>  */}  
                        {/* <ul  className="listDetail" >Diets {!myNewRecipe.createdInDb ? myNewRecipe.diets : myNewRecipe.diets.map(el => el.name + (', '))}</ul >  */}
                         {/* <ul  className="listDetail" >Diets {!myNewRecipe.createdInDb ? dietFilter(myNewRecipe.diets) : dietFilterDb(myNewRecipe.diets)}</ul > */}  
                         <ul  className="listDetail" >Diets: {!myNewRecipe.createdInDb ? 
                        myNewRecipe.diets.map(elem => ( 
                        <li  className="number"   key={elem} >
                        <a   className="eachA" >{elem}</a>
                        </li>
                        )):
                        myNewRecipe.diets.map(elem => ( 
                            <li  className="number"   key={elem.name} >
                            <a   className="eachA" >{elem.name}</a>
                            </li>))
                            }
                        </ul >  
                        

                    </div> : <p>Loading..</p>
            }
        </div>
    )
}