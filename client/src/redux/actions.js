import axios from 'axios';

import {ADD_RECIPE,
    SHOW_ALL_RECIPES,
    SHOW_RECIPE_BY_ID,
    SHOW_RECIPE_BY_TITLE,
    SHOW_ERROR,
    SHOW_DIETS_TO_MAP,
    //FILTER_ALL_V,
    GET_DIETS_LINK,
    GET_ALL_RECIPES_LINK,
    GET_RECIPE_BY_TITLE_LINK,
    GET_RECIPE_BY_ID_LINK,
    POST_RECIPE_LINK} from './actionNamesAndBackendLinks';
// las acciones son la única fuente de información que se manda al store. Las envio al store usando store.dispatch().
export function getAllRecipes() {
	return function (dispatch) {
		//recibe el dispatch gracias a thunk y lo puedo ejeuctar para mandar la accion al reducer y que el reducer la mande al store.
		axios
			.get(GET_ALL_RECIPES_LINK)
			.then((res) => {
				return res.data;
			})
			.then((res) => {
				dispatch({
					type: SHOW_ALL_RECIPES,
					payload: res,
				});
			})
			.catch((err) => {
				console.log(err);
				dispatch({
					type: SHOW_ERROR,
					payload: { error: 'there was an error getting all recipes' },
				});
			});
	};
}
export function getRecipesById(id) {
	return function (dispatch) {
		axios
			.get(GET_RECIPE_BY_ID_LINK + id)
			.then((res) => {
				return res.data;
			})
			.then((res) => {
				dispatch({
					type: SHOW_RECIPE_BY_ID,
					payload: res,
				});
			})
			.catch((err) => {
				console.log(err);
				dispatch({
					type: SHOW_ERROR,
					payload: { error: 'no games with that id' },
				});
			});
	};
}
export function getRecipeByTitle(title) {
	return function (dispatch) {
		axios
			.get(GET_RECIPE_BY_TITLE_LINK + title)
			.then((res) => {
				return res.data;
			})
			.then((res) => {
				dispatch({
					type: SHOW_RECIPE_BY_TITLE,
					payload: res,
				});
			})
			.catch((err) => {
				console.log(err);
				dispatch({
					type: SHOW_ERROR,
					payload: { error: 'no games with that title' },
				});
			});
	};
}
export function getGenres() {
	return function (dispatch) {
		axios
			.get(GET_DIETS_LINK)
			.then((res) => {
				return res.data;
			})
			.then((res) => {
				dispatch({
					type: SHOW_DIETS_TO_MAP,
					payload: res,
				});
			})
			.catch((err) => {
				console.log(err);
				dispatch({
					type: SHOW_ERROR,
					payload: { error: 'no se pudieron traer los generos' },
				});
			});
	};
}

/* export function filter
SHOW_FILTERED_BY_DIETS
 */
/* 
export function filterById(state) {
	return function (dispatch) {
		dispatch({
			type: FILTER_ALL_V,
			payload: state,
		});
	};
} */