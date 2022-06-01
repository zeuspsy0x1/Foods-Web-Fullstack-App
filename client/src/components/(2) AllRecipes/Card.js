import React from 'react';
import './Card.css';
//import {Detail} from '../(3) RecipeDetail/Detail';
import { useNavigate } from 'react-router-dom';

function Card(props) {
	const navigate = useNavigate();

	const { title, id, image, diets } = props;

	const moveToDetailsOfTheVideogame = () => {
		navigate(`/detail/${id}`);
	};

	let dietsArr = diets?.map((d) => {
		//if ( d[0] === 'no diets') {return 'there are no diets for this recipe'}
		if(d.name) {return <li key={Math.random()}>{d.name}</li>;}// entra si diets es un array de Objetos
		if(d[0] !== 'no diets') {return <li key={Math.random()}>{d}</li>;} // entra si diets es un array de valores	
		else return 'no diets'
	}); 

	return (
		<>
			<div onClick={moveToDetailsOfTheVideogame} className='carta'>
				<img src={image} alt='recipe img' className='img' />{' '}
				<div className='contenedor'>
					{' '}
					<h4>
						<b>{title}</b>
					</h4>
					<p>{dietsArr}</p>
				</div>
			</div>
		</>
	);
}

export default Card;
