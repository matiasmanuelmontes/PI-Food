const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipeRoute = require('./recipe'); // esto es lo que se agrega desde recipe
const dietRoute = require('./diet'); // esto es lo que se agrega desde diets 

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

 router.use('/recipes', recipeRoute);  // aqui se genera /api/recipes   (apilacion de rutas) 
 router.use('/diets', dietRoute); // aqui se genera /api/genre/*


module.exports = router;
