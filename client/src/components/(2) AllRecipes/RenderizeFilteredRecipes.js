import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

function RenderizeFilteredRecipes({ filteredRecipesState }) {
	//const filteredRecipesState = useSelector((state) => state.filteredRecipes)

	if (filteredRecipesState.length > 0) {
		const mapArr = filteredRecipesState?.map((item) => {
			return (
				<Fragment key={item.id.toString()}>
					<Card title={item.title} id={item.id} image={item.image} diets={item.diets} />
				</Fragment>
			)
		})
		return mapArr
	} else {
		return <> Sorry, but there are no recipes with this kind of filter </>
	}
}

export default RenderizeFilteredRecipes
