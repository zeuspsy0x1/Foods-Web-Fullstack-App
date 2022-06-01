import React from 'react';
import { getRecipesById } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css';
//el click a cada carta de todos los juegos, abre Detail, nada mas.
//si le dan click a una, se toma el id de esa carta y se manda a Detail.
//detail hace fetch con ese id y trae toda la info de ese juego.

//Con el useParams traigo el id del videojuego que busco desde la url ej. localhost/detail/69
function Detail () {
	const dispatch = useDispatch();
	const params = useParams();
	
	//console.log(params);
	
	useEffect(() => {
		dispatch(getRecipesById(params.id));
	}, [dispatch, params.id]);
	
	const recipe =  useSelector((state) => state.recipeById);
	console.log(recipe)
	
	
	/*  //estos mapeos de plataformas y generos muestran los datos si los hay, si no no se muestran
	const listPlatforms = recipe.platforms?.map((p) => {
		return <li key={Math.random()}>{p}</li>; // le paso un random porque la probabilidad de colision es de 1 entre 7.000 billones
	}); */

	let dietsArr = [];
	let stepsArr;


	dietsArr = recipe.diets?.map((d) => {
		if ( d[0] === 'not diets' || d.lengt === 0 || d === null || d === undefined) {return 'there are no diets for this recipe'}
		if(d.name) {return <li key={Math.random()}>{d.name}</li>;}// entra si diets es un array de Objetos
		else {return <li key={Math.random()}>{d}</li>;} // entra si diets es un array de valores	
	}); 


	stepsArr = recipe.steps?.map((s) => {
		if ( s[0] === 'no steps' || s.lengt === 0 ) {return 'there are no steps for this dish'}
		if(s.step) {return <li key={Math.random()}>{s.step}</li>;}// entra si step en [0] es un array de Objetos
		else {return <li key={Math.random()}>{s}</li>;} // entra si steps es un array de valores de DB
	}); 
	

	const img = recipe.image;
	const rec = recipe.summary

	return (
		<>
			<div className='wrapper'>
				<div className='container'>
					<div className='i'> Name: {recipe.title}</div>
					<img src={img} alt='not found' className='card-img' />
					<hr />
					<div dangerouslySetInnerHTML={{__html: rec}}></div>
					<hr />
					<div>Health score: {recipe.healthScore}</div>
					<div>Diets: {dietsArr}</div>
					<ol>Steps: {stepsArr}</ol>
					<hr />
		
				</div>
			</div>
		</>
	);
}

export default Detail;
