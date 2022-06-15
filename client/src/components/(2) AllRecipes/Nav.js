import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllRecipes, getDiets, getRecipeByTitle, resetFilteredRecipes } from '../../redux/actions'
import { filtersActionFunction } from '../../redux/actions'
import {
	FILTER_BY_ASCENDENT_TITLE,
	FILTER_BY_DESCENDENT_TITLE,
	FILTER_BY_ASCENDENT_HEALTHSCORE,
	FILTER_BY_DESCENDENT_HEALTHSCORE,
	FILTER_BY_DIET_TIPE,
} from '../../redux/actionNamesAndBackendLinks'
import RenderizeFilteredRecipes from './RenderizeFilteredRecipes'
import AllRecipes from './AllRecipes'

function Nav() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const navigateToCreateRecipe = () => {
		navigate('/')
	}

	//DISPATCH DE FILTROS EN REDUX
	useEffect(() => {
		dispatch(getAllRecipes())
		dispatch(getDiets())
	}, [dispatch])
	//PARA PASARLE EL NOMBRE AL COMPONENTE QUE RENDEREZA POR NOMBRE O TODOS LOS 100 DE LA API Y DB
	const [filteredByDietTypeState, setFilteredByDietTypeState] = useState(false)
	const recipesState = useSelector((state) => state.recipes)
	const filteredRecipesState = useSelector((state) => state.filteredRecipes)
	const diets = useSelector((state) => state.diets)

	const mappedDietsToRender = diets?.map((d) => {
		return <option key={d.name}>{d.name}</option>
	})
	const renderer = () => {
		if (filteredRecipesState.length === 0 && filteredByDietTypeState === true) {
			return <> There are 0 results with this diet filter</>
		}
		if (filteredRecipesState.length === 0 && recipesState.length > 0 && filteredByDietTypeState === true) {
			const currentItems = recipesState.slice(indexOfFirstItem, indexOfLastItem)
			return <AllRecipes allRecipes={currentItems} />
		}
		if (filteredRecipesState.length > 0) {
			const currentItems = filteredRecipesState.slice(indexOfFirstItem, indexOfLastItem)
			return <RenderizeFilteredRecipes filteredRecipesState={currentItems} />
		}
		if (true) {
			console.log('no hay title ni filtrados para buscar entonces all recipes renderiza api y db')
			const currentItems = recipesState.slice(indexOfFirstItem, indexOfLastItem)

			return <AllRecipes allRecipes={currentItems} />
		}
	}

	const handleTitleSubmit = (e) => {
		e.preventDefault()
		if (e.target[0].value !== '') {
			dispatch(getRecipeByTitle(e.target[0].value))
		}
		console.log('Este es el title actual que se busco ' + e.target[0].value)
		dispatch(resetFilteredRecipes())
	}

	//Manejo de estado del paginado
	const [maxItemsInRenderingArray, setMaxItemsInRenderingArray] = useState()
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage] = useState(9)
	const [totalAllRecipesLength, setTotalAllRecipes] = useState(recipesState.length)
	const [totalFilteredRecipesLength, setTotalFilteredRecipes] = useState(filteredRecipesState.length)

	const indexOfLastItem = currentPage * itemsPerPage //1x9=9 2x9=18 3x9=27 4x9=36 5x9=45 6x9=54
	const indexOfFirstItem = indexOfLastItem - itemsPerPage

	return (
		<Fragment>
			<div>Logo </div>
			<form
				onSubmit={(e) => {
					handleTitleSubmit(e)
					setCurrentPage(1)
				}}>
				<input type='text'></input>
				<button type='submit'>Click to search recipe name</button>
			</form>
			<br />
			<button onClick={navigateToCreateRecipe}> Create Recipe </button>
			<div className='filters'>
				<div>
					<h1>Pagination Test</h1>
					<p>Total Recipes: {totalAllRecipesLength}</p>
					<p>Total Filtered Recipes: {totalFilteredRecipesLength}</p>
					<p>Items per page: {itemsPerPage}</p>
					<p>Current page: {currentPage}</p>
					<p>Index of first item: {indexOfFirstItem}</p>
					<p>Index of last item: {indexOfLastItem}</p>

					<button
						onClick={() => {
							if (indexOfFirstItem < filteredRecipesState.length) {
								setCurrentPage(currentPage + 1)
							}
							if (indexOfFirstItem < recipesState.length) {
								setCurrentPage(currentPage + 1)
							}
						}}>
						Next page
					</button>
					<button
						onClick={() => {
							if (indexOfFirstItem > 0) {
								setCurrentPage(currentPage - 1)
							}
						}}>
						Previous page
					</button>
				</div>

				<div> Filters </div>

				<button
					onClick={() => {
						dispatch(filtersActionFunction(FILTER_BY_ASCENDENT_TITLE))
					}}>
					ORDER UP
				</button>
				<button
					onClick={() => {
						dispatch(filtersActionFunction(FILTER_BY_DESCENDENT_TITLE))
					}}>
					ORDER DOWN
				</button>
				<button
					onClick={() => {
						dispatch(filtersActionFunction(FILTER_BY_ASCENDENT_HEALTHSCORE))
					}}>
					HEALTHSCORE DOWN
				</button>
				<button
					onClick={() => {
						dispatch(filtersActionFunction(FILTER_BY_DESCENDENT_HEALTHSCORE))
					}}>
					HEALTHSCORE UP
				</button>

				<div>Filter by diet type</div>

				<select
					onChange={(e) => {
						dispatch(filtersActionFunction(FILTER_BY_DIET_TIPE, e.target.value))
						setFilteredByDietTypeState(true)
					}}>
					<option value='none'> Select an Option </option>
					{mappedDietsToRender}
				</select>
				<br />
				{renderer()}
			</div>
		</Fragment>
	)
}

export default Nav
