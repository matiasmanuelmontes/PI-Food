import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../actions";
import '../styledComponents/addRecipe.css';

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Write a name please'
    } else if (!input.dishSummary) {
        errors.dishSummary = 'Write a dishSummary please'
    }
    return errors;
}

export default function AddRecipe() {

    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)
    const [errors, setErrors] = useState({});
    let history = useHistory()

    const [input, setInput] = useState({
        name: "",
        image: "",
        dishSummary: "",
        healthScore: "",
        stepByStep: "",
        diets: [],
    })

    function onInputChange(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: (e.target.value)
        });
        setErrors(validate({
            ...input,
            [e.target.name]: (e.target.value)
        }));
    }

    function onCheckboxChange(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }
    }

    function onSelectChange(e) {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }

    function onSubmit(e) {
        e.preventDefault()
        console.log(input)
        dispatch(postRecipe(input))
        alert("Recipe Created")
        setInput({
            name: "",
            image: "",
            dishSummary: "",
            healthScore: "",
            stepByStep: "",
            diets: [],
        })

        history.push('/home')

    }

    function handleDelete(element) {
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== element)
        })
    }

    useEffect(() => {
        dispatch(getDiets());
    }, []);

    function redirectHome(event) {
        event.preventDefault();
        window.location.href = "http://localhost:3000/home";
    }

    console.log(input)

    return (

        <div>
            <button name="redirectHome" class="home" onClick={redirectHome}>Home</button>
            <h1>Create your Recipe</h1>
            <form onSubmit={(e) => onSubmit(e)} class="addRecipeForm" >
                <div>
                    <label htmlFor="">Name: </label>
                    <input onChange={onInputChange} name="name" type="text" value={input.name} />
                    {errors.name && (
                        <p classname="error" >{errors.name}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="">Image: </label>
                    <input onChange={onInputChange} name="image" type="text" value={input.image} />
                </div>
                <div>
                    <label htmlFor="">DishSummary: </label>
                    <input onChange={onInputChange} name="dishSummary" type="text" value={input.dishSummary} />
                    {errors.dishSummary && (
                        <p classname='error' >{errors.dishSummary}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="">Health Score: </label>
                    <input onChange={onInputChange} name="healthScore" type="text" value={input.healthScore} />
                </div>
                <div>
                    <label htmlFor="">Step By Step: </label>
                    <input onChange={onInputChange} name="stepByStep" type="text" value={input.stepByStep} />
                </div>
                {/* <div>
                    <label htmlFor="">Diets: </label>
                    <label><input onChange={(e) => onCheckboxChange(e)} name="action" type="checkbox" value="Action" />Action</label>
                    <label><input onChange={(e) => onCheckboxChange(e)} name="adventure" type="checkbox" value="Adventure" />Adventure</label>
                    <label><input onChange={(e) => onCheckboxChange(e)} name="shooter" type="checkbox" value="Shooter" />Shooter</label>
                    <label><input onChange={(e) => onCheckboxChange(e)} name="indie" type="checkbox" value="Indie" />Indie</label>
                </div> */}
                <select name="selectDiet" onChange={(e) => onSelectChange(e)}>
                    {diets && diets.map((diet) => (
                        <option value={diet.name}>{diet.name}</option>
                    ))}
                </select>
                {/* <ul><li>{input.diets.map(el => el + ", ")}</li></ul> */}
                <button type='submit'>Create Recipe</button>
            </form>

            {input.diets.map(diet =>
                <div >
                    <p>{diet}</p>
                    <button onClick={() => handleDelete(diet)}>x</button>
                </div>
            )}
        </div>
    )
}
