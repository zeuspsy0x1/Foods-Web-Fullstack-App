const { Router } = require('express');
const { getById, getByTitle, allRecipes } = require('../controllers/apiFunctions');
const { dbFetchAllDiets, dbPostRecipe, dbFetchAllRecipes, dbFetchById, dbFetchByTitle } = require('../controllers/dbFunctions');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers

//Get /Diets from db
router.get('/getDiets', async function (req, res) {
	let response = await dbFetchAllDiets();

	if (response.length > 0) {
		res.status(200).json(response);
	} else {
		res.status(400).json({ message: 'there are no diets in db' });
	}
});

//GET /recipes
router.get('/allRecipes', async function (req, res) {
	
	const responseApi = await allRecipes()
	const responseDb = await dbFetchAllRecipes()

	//concatenate responseApi and responseDb
	let response = []
	
	if (Array.isArray(responseApi) && Array.isArray(responseDb)) {
		response = [...responseDb, ...responseApi]
	}
	if (responseApi === "no recipes found") {
		response = [...responseDb]
	}
	if (responseDb === null) {
		response = [...responseApi]
	}


	if (response.length > 0) {
		res.status(200).json(response);
	} else {
		res.status(400).json({ message: 'there was a problem loading all recipes' });
	}
});

//GET /recipes?name="..."  //////// http://localhost:5000/recipes?title=pasta
router.get('/recipes?', async function (req, res) {
	const { title } = req.query
	let	responseApi = await getByTitle(title)
	let	responseDb = await dbFetchByTitle(title)

//si no hay recipes en api/db
	if (responseDb === 'recipe not found in db' && responseApi === 'recipe not found') { 
	res.status(400).json({ message: 'there are no recipes with that name' });
	} 
//si SI hay recipes en api y en db
	if (responseDb !== 'recipe not found in db' && responseApi !== 'recipe not found') {
		let response = [...responseDb, ...responseApi]
		res.status(200).json(response);
	}
//si SI hay recipes en api y no en db 
	if (responseDb === 'recipe not found in db') {
		if (Array.isArray(responseApi)) {
			res.status(200).json(responseApi);
	}
//si SI hay recipes en db y no en api 
	if (responseApi === 'recipe not found') {
		if (Array.isArray(responseDb)) {
			res.status(200).json(responseDb);
	}
	}
	}
});

//GET /recipes/:id
//NO PUEDO DEJAR QUE PASEN IDS CON LETRAS, A MENOS DE QUE VAYA COMO UUID, ES DECIR + DE 36 CARACTERES
// cualquier id sirve para buscar en la api excepto si es mayor a 20 digitos
// Si es mayor a 20 digitos busca en la db
// si es mayor de 20, pero menor de 36 (la cantidad de caracteres de un UUID) dice que no hay con ese id porque ni lo busca si no tiene la longitud de 36 caracteres
router.get('/recipes/:id', async function (req, res) {
	console.log(req.params.id) 
	const responseApi = await getById(req.params.id);
	let responseDb = 'recipe not found in db';
	
	if (req.params.id.length > 20) {
		responseDb = await dbFetchById(req.params.id);
	}

	/* console.log(responseApi) 
	console.log(responseDb) */ 

	if (responseDb !== 'recipe not found in db') {
		res.status(200).json(responseDb);
	} else if (responseApi !== 'recipe not found') {
		res.status(200).json(responseApi);
	} else if (responseDb === 'recipe not found in db' && responseApi === 'recipe not found') {
		res.status(400).json({ message: 'there are no recipes with that id' });
	}
});

//POST /videogames/add
router.post('/recipes/add', async function (req, res) {
	try {
		const { recipe } = req.body;

		let result = await dbPostRecipe(recipe);

		if (result) {
			res.status(200).json({ message: 'recipe and relationships created successfully' });
		} else {
			res.status(400).json({ message: "Can't create a recipe without a recipe" });
		}

	}catch{
	console.error(error);
	} 
});

module.exports = router;
