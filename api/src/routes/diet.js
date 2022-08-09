/* require('dotenv').config(); */
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Recipe, Diet } = require('../db');
const {  Op } = require('sequelize');
const { getKey } = require('../keys');

 
const router = Router();

const API_KEYA = getKey();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/allDiets', async (req, res, next) => {

     const dietApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEYA}&addRecipeInformation=true&number=100`) 
    
    /* vegetarian, vegan, glutenFree  */
     
     const diets =  dietApi.data.results.map(el => el.diets)

     var dietEach = [];

        for (let h = 0; h < diets.length ; h++){
            dietEach = dietEach.concat(diets[h].map(el =>{return el}))
        }

        for ( let i = 0 ; i < dietEach.length; i++){
            await Diet.findOrCreate({
                where: { name: dietEach[i] },
            })}

            let allDiets = []  
            allDiets = await Diet.findAll()
            /* console.log("allDiets")  */
             /* console.log(allDiets)   */ 
             res.send(allDiets) 
     });

    /*  router.post('/allDiets/add', (req, res, next) => {    // el next esta para que luego se vaya al siguiente middleware, que es el control de errores que esta en app
    
        const {name} = req.body;
        Diet.create({ name})
        .then((newDiet) => {
            res.status(201).send(newDiet)
        })
    
        .catch(error => next(error))
    
    
    }) */

module.exports = router;