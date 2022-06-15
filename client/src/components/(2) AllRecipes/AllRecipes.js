import React, { Fragment } from 'react'
import Card from './Card'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllRecipes } from '../../redux/actions'
import { getRecipeByTitle } from '../../redux/actions'

function AllRecipes({ allRecipes }) {
	//const allRecipes = useSelector((state) => state.recipes) // manda los filtrados si hay title, si no hay title de receta valido, manda todas las recetas sin filtros.

	//console.log('no hay title ni filtrados para buscar entonces all recipes renderiza api y db')

	const mapeo = allRecipes?.map((item) => {
		return (
			<Fragment key={item.id.toString()}>
				<Card
					title={item.title}
					id={item.id}
					image={item.image}
					diets={item.diets}
					healthScore={item.healthScore}
				/>
			</Fragment>
		)
	})

	return mapeo
}

export default AllRecipes
