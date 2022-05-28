const { Recipe, Diet } = require('../db');
const express = require('express');
const axios = require('axios');
const { DB_API } = process.env;


const getDietsAndSendThemToDb = async () => {
	try {
		let dietsInDbOrNot = await Diet.findAll();
		if (dietsInDbOrNot.length !== 0) {console.log('---Diets are already in the db')}
		if (dietsInDbOrNot.length === 0) {
		const finalDiets = [
			"dairy free",
			"fodmap friendly",
			"gluten free",
			"ketogenic",
			"lacto ovo vegetarian",
			"paleolithic",
			"pescatarian",
			"primal",
			"vegan",
			"whole 30",
			"paleo",
		]

		for (let i = 0; i < finalDiets.length; i++) {
			Diet.findOrCreate({ where: {name: finalDiets[i]}})
		}
		}

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//ESTA ES LA PRIMERA FORMA QUE HICE, ME TRAJE 100 RECIPES, Y MAPEE LAS DIETAS DE ESOS 100, ME TRAJO 10, PERO MEJOR CREE EL ARRAY DE DIETS COMO DICE EN EL README
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/* let dietsInDbOrNot = await Diet.findAll();
		if (dietsInDbOrNot.length !== 0) {console.log('---Diets are already in the db');}
		if (dietsInDbOrNot.length === 0) {
		let diets = await axios.get(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_API}&addRecipeInformation=true&number=100`
		);
		let filtered = diets.data.results.map( d => d.diets)
		let str = filtered.join(',') // cojo diets, las convierto a string y luego la string a arr para el for
		let arr = str.split(',')
		let finalDiets = []
		for (let i = 0; i < arr.length; i++) {
			if (!finalDiets.includes(arr[i]) && arr[i] !== '') {
				finalDiets.push(arr[i])
			}
		}
		//console.log(finalDiets) 
		
		for (let i = 0; i < finalDiets.length; i++) {
			Diet.findOrCreate({ where: {name: finalDiets[i]}})
		}
		} */
	} catch (error) {
		console.log(error)
	}
}
const dbFetchAllDiets = async () => {
	let dietsFromDb = await Diet.findAll();

	let  mappedDietsToGetTheCorrectValues = dietsFromDb.map(d => d.dataValues)

	return mappedDietsToGetTheCorrectValues;
};
const dbFetchAllRecipes = async () => {
	let dietsFromDb = await Recipe.findAll({include: [
		{
			model: Diet,
			as: 'diets'//
		}
	]});

	let  mappedDietsToGetTheCorrectValues = dietsFromDb.map(d => d.dataValues)

	//console.log(mappedDietsToGetTheCorrectValues) 
	return mappedDietsToGetTheCorrectValues;
};
const dbFetchByTitle = async (title) => {

	//findOne where name is equal to the name passed in and include the Diets from that recipe
	try {
		let recipeFromDb = await Recipe.findOne({
			where: {
				title: title,
			},
			include: [
				{
					model: Diet,
					as: 'diets'
				}
			]
		});

		//console.log(recipeFromDb) 
		if (recipeFromDb === null) {
			return 'recipe not found in db';
		}
		
		return [recipeFromDb];
		
	} catch (error) {
		console.log(error)
	}
};

const dbFetchById = async (id) => {
	try {
		if (id.length < 36) {
			return 'recipe not found in db';
		}

		let recipeFromDb = await Recipe.findOne({
			where: {
				id: id,
			},
			include: [
				{
					model: Diet,
					as: 'diets'
				}
			]
		});
		//console.log(recipeFromDb) 
		if (recipeFromDb === null) {
			return 'recipe not found in db';
		}
		return [recipeFromDb];
	} catch (error) {
		console.log(error)
	}
};

const dbPostRecipe = async (recipeObject) => {

	try {
		const { title, summary, healthScore, image, recipeDiets, steps, created } = recipeObject;
		const recipe = {
				title: title,
                summary: summary,
                healthScore: healthScore,
                image: image,
                steps: steps,
				created: created,
		}
		//console.log(recipe);
		let recipeAndDietRelationship = [];
		let createRecipe = await Recipe.create(recipe);
		for (let i = 0; i < recipeDiets.length; i++) {
			//console.log(vApiGenres[i]);
			recipeAndDietRelationship[i] = await createRecipe.addDiet(recipeDiets[i]);
		}
		return 'Recipe and Diet relationship created';
	} catch (error) {
		console.log(error);
	}
}



module.exports = {
	getDietsAndSendThemToDb,
	dbFetchAllDiets,
	dbPostRecipe,
	dbFetchAllRecipes,
	dbFetchByTitle,
	dbFetchById,
};
