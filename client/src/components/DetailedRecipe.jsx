import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import '../styledComponents/detailedRecipe.css';
import axios from "axios";
import { axiosURL } from "../index";



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
    let history = useHistory()

    console.log(id)

    useEffect(() => {
        axios.get(`${axiosURL}/api/recipes/${id}`)
            .then((response) => {  // este response es videogame
                response.data.length > 0 ?
                    setMyRecipe(response.data[0]) :
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

    async function deleteRecipe(id) {
        if (myNewRecipe.createdInDb) {
            await axios.delete(`${axiosURL}/api/recipes/delete/${id}`);
            history.push('/recipes')
        }
    }

    return (
        <div className="detailBackGround">
            <Link to='/recipes/'>
                <button className="searchHomeButton">Home</button>
            </Link>

            {/* <button className="searchHomeButton" onClick={() => deleteRecipe(id)} onHov>Delete</button> */}
            {/* {myNewRecipe.createdInDb ? 
            <div>
                        </div>
                        </div>
                        :
                        <div></div>} */}
            {
                myNewRecipe ?
                    <div>
                        {myNewRecipe.createdInDb ?
                            <button className="searchHomeButton" onClick={() => deleteRecipe(id)} onHov>Delete</button> :
                            <div></div>}
                        <h1 className="titleDetail">{myNewRecipe.name}</h1>
                        <img src={myNewRecipe.image} alt="image" className="imgDet" />
                        <p className="titleDetail">Dish Summary: {myNewRecipe.dishSummary}</p>
                        <p className="healthScoreDetail">Healt Score: {myNewRecipe.healthScore}</p>
                        <p className="titleDetail">Step By Step: {myNewRecipe.createdInDb ? myNewRecipe.stepByStep : myNewRecipe.stepByStep.map(el => el + (' '))}</p>
                        
                        <ul className="listDetail" >Diets: {!myNewRecipe.createdInDb ?
                            myNewRecipe.diets.map(elem => (
                                <li className="dietItem" key={elem} >
                                    <a className="eachTagA" >{elem}</a>
                                </li>
                            )) :
                            myNewRecipe.diets.map(elem => (
                                <li className="dietItem" key={elem.name} >
                                    <a className="eachTagA" >{elem.name}</a>
                                </li>))
                        }
                        </ul >


                    </div> : <p>Loading..</p>
            }
        </div>
    )
}