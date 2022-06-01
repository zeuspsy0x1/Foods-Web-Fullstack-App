import {
	ADD_RECIPE,
    SHOW_ALL_RECIPES,
    SHOW_RECIPE_BY_ID,
    SHOW_RECIPE_BY_TITLE,
    SHOW_DIETS_TO_MAP,
    SHOW_ERROR,
} from './actionNamesAndBackendLinks';

const initialState = {
	recipes: [],
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
			/* case SHOW_FILTERED_BY_DIETS:
			return {
				...state,
				error: action.payload,
			}; */
		default:
			return state; // cuando no tenemos  una accion para agregar, se retorna el estado.
	}
};

export default reducer;