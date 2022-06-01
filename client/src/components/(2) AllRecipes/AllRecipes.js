import React, { Fragment } from 'react';
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllRecipes } from '../../redux/actions';
import { getRecipeByTitle } from '../../redux/actions';


function AllRecipes(props) {
	const dispatch = useDispatch();

	//console.log(props.title)

	useEffect(() => {
		if (props.title && props.title !== '') {
			return dispatch(getRecipeByTitle(props.title)) //intento cargar por title, si no hay title, paso todos
		}
		else {
			console.log('no hay title para buscar entonces get all recipes renderiza api y db')
			return dispatch(getAllRecipes());
		}
	}, [dispatch, props.title]);

	const allRecipes = useSelector((state) => state.recipes);


	const mapeo = allRecipes.map((item) => {
		return (
			<Fragment key={item.id.toString()}>
				 <Card title={item.title} id={item.id} image={item.image} diets={item.diets}/>
			</Fragment>
		);
	});

	return mapeo;
}

export default AllRecipes;
