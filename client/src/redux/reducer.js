import {
	ADD_RECIPE,
    SHOW_ALL_RECIPES,
    SHOW_RECIPE_BY_ID,
    SHOW_RECIPE_BY_TITLE,
    SHOW_DIETS_TO_MAP,
    SHOW_ERROR,
	FILTER_BY_ASCENDENT_TITLE,
    FILTER_BY_DESCENDENT_TITLE,
	FILTER_BY_ASCENDENT_HEALTHSCORE,
    FILTER_BY_DESCENDENT_HEALTHSCORE,
    FILTER_BY_DIET_TIPE } from './actionNamesAndBackendLinks';

const initialState = {
	recipes: [],
	filteredRecipes: [],
	diets: [],
	recipeById: {},
	error: {},
};

const reducer = function (state = initialState, action) {
	switch (action.type) {
		case SHOW_ALL_RECIPES:
			return {
				...state,
				recipes: action.payload,
			};
		case SHOW_RECIPE_BY_ID:
			return {
				...state,
				recipeById: action.payload[0],
			};
		case SHOW_RECIPE_BY_TITLE:
			return {
				...state,
				recipes: action.payload,
			};
        case SHOW_DIETS_TO_MAP:
                return {
                    ...state,
                    diets: action.payload,
                };
		case SHOW_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case FILTER_BY_ASCENDENT_TITLE:
		let asce = [...state.recipes.sort((a, b) => {
			if (a.title > b.title) {
				return 1;
			}
			if (a.title < b.title) {
				return -1;
			}
			return 0;
			})]
			return {...state, recipes: asce}
		case FILTER_BY_DESCENDENT_TITLE:

			let desce = [...state.recipes.sort((a, b) => {
				if (a.title < b.title) {
					return 1;
				}
				if (a.title > b.title) {
					return -1;
				} return 0;
			})]
			return {...state, recipes: desce};
		case FILTER_BY_ASCENDENT_HEALTHSCORE:
			let ascendentHealthScore = [...state.recipes.sort((a, b) => {return a.healthScore - b.healthScore})]
			return {...state, recipes: ascendentHealthScore}
		case FILTER_BY_DESCENDENT_HEALTHSCORE:
			let descendentHealthScore = [...state.recipes.sort((a, b) => {return b.healthScore - a.healthScore})]
			return {...state, recipes: descendentHealthScore}
		case FILTER_BY_DIET_TIPE:
		let dietSelected = action.payload 
		let recipesFilteredByDietType = [...state.recipes.filter((recipe) => { return recipe.diets.find(( (diet) => {return diet === dietSelected} ))})]
		console.log(recipesFilteredByDietType)
		return {...state, filteredRecipes: recipesFilteredByDietType}
		default:
			return state; // cuando no tenemos  una accion para agregar, se retorna el estado.
	}
};

export default reducer;