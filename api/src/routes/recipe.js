/* require('dotenv').config(); */
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { Op, addDiet } = require('sequelize');
const { getKey } = require('../keys');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const API_KEYA = getKey();

const getRecipeApi = async function () {

    let recipeApi
    let recipeInfo
    let recipeInfoStepByStep
    let stepByStep1


    recipeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEYA}&addRecipeInformation=true&number=100`)

    recipeInfoStepByStep = await recipeApi.data.results.map(el => {

        if (el.analyzedInstructions[0] !== undefined) {
            stepByStep1 = el.analyzedInstructions[0].steps.map(elem => elem.step)
        } else {
            stepByStep1 = ["There is no stepByStep"]
        }
        return stepByStep1
    })


    recipeInfo = await recipeApi.data.results.map(el => {
        return {
            id: el.id,
            name: el.title,
            dishSummary: el.summary.replace(/<[^>]+>/g, ""), // regex utilizado para eliminar tags en la descripcion
            healthScore: el.healthScore,
            // la propiedad stepByStep se incorpora a continuacion
            image: el.image,
            diets: el.diets
        };
    });

    for (let i = 0; i < recipeInfo.length; i++) {
        recipeInfo[i].stepByStep = recipeInfoStepByStep[i]
    }

    /* console.log(recipeInfo) */

    return recipeInfo;
}

const getRecipeDb = async function () {

    return await Recipe.findAll({
        /* include: Diet, */
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllRecipes = async function () {

    const apiInfo = await getRecipeApi();
    const dbInfo = await getRecipeDb();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;

}



router.get('/', async (req, res, next) => {

    console.log(API_KEYA)

    try {

        const name = req.query.name
        let totalRecipes = await getAllRecipes();
        /* console.log (totalRecipes) */
        if (name) {
            let recipeName = await totalRecipes.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            recipeName.length ?
                res.status(200).send(recipeName) :
                res.status(404).send("Cant find the recipe")
        } else {
            res.status(200).send(totalRecipes)
        }

    } catch (error) {
        next(error)
    }

})

/* router.get('/:id', async (req, res) => {

   const id = req.params.id
  let totalRecipes = await getAllRecipes();
  console.log(id)
  
  console.log(totalRecipes)
  
   if (id){
      let recipeId = await totalRecipes.filter(el => el.id === id)
      console.log("recipeId")
      console.log(recipeId)
      recipeId > - 1 ?
      res.status(200).send(recipeId) :
      res.status(404).send("Cant find the recipe")
  } 

})  */

router.get('/:id', async (req, res, next) => {    // el next esta para que luego se vaya al siguiente middleware, que es el control de errores que esta en app

    try {

        let recipe;
        let recipeApi
        let recipeInfoStepByStep

        const id = req.params.id;

        if (typeof id === "string" && id.length > 8) {
            recipe = await Recipe.findAll({
                where: { id: id },
                include: {
                    model: Diet,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                }
            })

        } else {
            response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEYA}`)
            recipeApi = response.data

            if (recipeApi.analyzedInstructions[0] !== undefined) {
                recipeInfoStepByStep = recipeApi.analyzedInstructions[0].steps.map(elem => elem.step)
            } else {
                recipeInfoStepByStep = ["There is no stepByStep"]
            }

            recipe = {
                id: recipeApi.id,
                name: recipeApi.title,
                dishSummary: recipeApi.summary.replace(/<[^>]+>/g, ""), //delete text tags
                healthScore: recipeApi.healthScore,
                stepByStep: recipeInfoStepByStep,
                image: recipeApi.image,
                diets: recipeApi.diets
            };

        }

        res.status(201).send(recipe)

    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {    // el next esta para que luego se vaya al siguiente middleware, que es el control de errores que esta en app
    try {
        var { name, dishSummary, healthScore, stepByStep, image, createdInDb, diets } = req.body;

        function toUpperCasefunc(arg) {
            var b = arg[0].toUpperCase() + arg.substring(1)
            return b
        }
        name = toUpperCasefunc(name)

        let newRecipe = await Recipe.create({
            name,
            dishSummary,
            healthScore,
            stepByStep,
            image,
            createdInDb
        })

        let dietDb = await Diet.findAll({
            where: { name: diets }
        })

        await newRecipe.addDiet(dietDb)

        res.status(201).send(newRecipe)

    } catch (error) {
        next(error)
    }
})

/*  router.put('/put/:id', function(req, res) {

   Recipe.findByPk(req.params.id).then(function(recipe) {
     recipe.update({
                   name: req.body.name,
                   dishSummary: req.body.dishSummary,
                   healthScore: req.body.healthScore,
                   stepByStep : req.body.stepByStep,
                   image: req.body.image,
                   diets: req.body.diets
     }).then((recipe) => {
       res.json(recipe);
     });
   });
 }); */

 router.delete('/delete/:id', function(req, res) {

    Recipe.findByPk(req.params.id)
    .then(function(recipe) {
      recipe.destroy();
    })
    .then((recipe) => {
      res.sendStatus(200);
    });
  });


module.exports = router;