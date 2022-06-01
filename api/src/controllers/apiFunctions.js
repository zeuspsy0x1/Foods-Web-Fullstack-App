const { Recipe, Diet } = require('../db');
const express = require('express');
const axios = require('axios');
const { DB_API } = process.env;




const getById = async (id) => {
	try {
        if (id.length >= 7) {
            return 'recipe not found';
        }

		let recipeData = [];
        let idStringToNumber = parseInt(id)
		await axios.get(`https://api.spoonacular.com/recipes/${idStringToNumber}/information?apiKey=${DB_API}`).then((res) => {
			//console.log(res.data);
			let r = res.data;
			recipeData = [{
                id: r.id ? r.id : 'no id',
				title: r.title ? r.title : 'no title',
                summary: r.summary ? r.summary : 'no summary',
                healthScore: r.healthScore ? r.healthScore : 'no healthScore',
                image: r.image ? r.image : 'no image',
                diets: r.diets.length >0 ? r.diets : ['no diets'],
                steps: r.analyzedInstructions[0] ? r.analyzedInstructions[0].steps : ['no steps'],
			}];
            //console.log(recipeData);
		});

        return recipeData.length === 0 ? 'recipe not found' : recipeData;
     
	} catch (error) {
		console.log(error);
	}
};
const getByTitle = async (title) => {
	try {
		let recipeData;
		await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_API}&addRecipeInformation=true&number=10&query=${title}&number=9`).then((res) => {
			//console.log(res.data);
			let response = res.data.results
            recipeData = response.map(r => {
                return ({
                    id: r.id ? r.id : 'no id',
                    title: r.title ? r.title : 'no title',
                    summary: r.summary ? r.summary : 'no summary',
                    healthScore: r.healthScore ? r.healthScore : 'no healthScore',
                    image: r.image ? r.image : 'no image',
                    diets: r.diets.length > 0 ? r.diets : ['no diets'],
                    steps: r.analyzedInstructions[0] ? r.analyzedInstructions[0].steps : ['no steps'],
            })})
            //console.log(mappedRecipes);
		});
        //console.log(recipeData);
        
            return recipeData[0] === undefined ? 'recipe not found' : recipeData;

	} catch (error) {
		console.log(error);
	}
};
const allRecipes = async () => {
    try {
        let recipes = [];
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_API}&addRecipeInformation=true&number=100`).then((res) => {
            //console.log(res.data);
            let response = res.data.results
            recipes = response.map(r => {
                return ({
                    id: r.id ? r.id : 'no id',
                    title: r.title ? r.title : 'no title',
                    summary: r.summary ? r.summary : 'no summary',
                    healthScore: r.healthScore ? r.healthScore : 'no healthScore',
                    image: r.image ? r.image : 'no image',
                    diets: r.diets.length > 0 ? r.diets : ['no diets'],
                    steps: r.analyzedInstructions[0] ? r.analyzedInstructions[0].steps : ['no steps'],
            })})
            //console.log(mappedRecipes);
        });
        //console.log(recipes);
            return Array.isArray(recipes) ? recipes : 'no recipes found';
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getById,
    getByTitle,
    allRecipes,
};
