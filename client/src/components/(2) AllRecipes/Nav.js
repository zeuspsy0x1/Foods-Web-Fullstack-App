import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import AllRecipes from './AllRecipes'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {  getAllRecipes, getDiets } from '../../redux/actions'
import { useState } from 'react'
import RenderizeFilteredRecipes from './RenderizeFilteredRecipes'
import { filtersActionFunction } from '../../redux/actions'

import {FILTER_BY_ASCENDENT_TITLE,
    FILTER_BY_DESCENDENT_TITLE,
	FILTER_BY_ASCENDENT_HEALTHSCORE,
    FILTER_BY_DESCENDENT_HEALTHSCORE,
    FILTER_BY_DIET_TIPE } from '../../redux/actionNamesAndBackendLinks'


 function Nav () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const navigateToCreateRecipe = () => {
        navigate('/')
    }
    //PARA PASARLE EL NOMBRE AL COMPONENTE QUE RENDEREZA POR NOMBRE O TODOS LOS 100 DE LA API Y DB
    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState([])
    const [recipeTitle, setRecipeTitle] = useState('')
   
    //DISPATCH DE FILTROS EN REDUX
    useEffect(() => {
            dispatch(getAllRecipes());
            dispatch(getDiets());
    }, [dispatch])

    const recipesState =  useSelector(state => state.recipes)
    const filteredRecipesState = useSelector(state => state.filteredRecipes)
    const diets = useSelector(state => state.diets)

    const handleTitleSubmit = (e) => {e.preventDefault(); setRecipeTitle(e.target[0].value)}

    const mappedDietsToRender = diets?.map( d => {
        return <option key={d.name}>{d.name}</option> 
    })
     
    

    return (
      <Fragment>
          <div>Logo </div>
            <form onSubmit = {(e) => {handleTitleSubmit(e);}}>
                <input type={'text'}></input>
                <button type = 'submit'>Click to search recipe name</button>
            </form>
          <br/>
          <button onClick={navigateToCreateRecipe}> Create Recipe </button>
          <div className = 'filters'>

                <div> Filters </div>
                <div> Diet Type </div>
                <div> Filters </div>
                <div> Name Order </div>
                <div> Filters </div>
                <div> Health Score </div>
                <div> Filters </div>
                <button onClick={() => {dispatch(filtersActionFunction(FILTER_BY_ASCENDENT_TITLE));
                    setFilteredRecipes(filteredRecipesState)
                }}>ORDER UP</button>
                <button onClick={() => {dispatch(filtersActionFunction(FILTER_BY_DESCENDENT_TITLE));
                    setFilteredRecipes(filteredRecipesState)}}>ORDER DOWN</button>
                <button onClick={() => {dispatch(filtersActionFunction(FILTER_BY_ASCENDENT_HEALTHSCORE));
                    setFilteredRecipes(filteredRecipesState)
                }}>HEALTHSCORE UP</button>
                <button onClick={() => {dispatch(filtersActionFunction(FILTER_BY_DESCENDENT_HEALTHSCORE));
                    setFilteredRecipes(filteredRecipesState)}}>HEALTHSCORE DOWN</button>
                
                <div>Filter by diet type</div> 
                <select onChange={(e) => {console.log(e.target.value); dispatch(filtersActionFunction(FILTER_BY_DIET_TIPE, e.target.value))}}>
                  
                <option value="none" selected disabled hidden>Select an Option</option>
                    {mappedDietsToRender}
                </select>
                
            <br/>
                 {  filteredRecipesState.length > 0 ?
                    <RenderizeFilteredRecipes/> :
                    recipeTitle !== '' ?
                    <AllRecipes title={recipeTitle}/>:
                    <AllRecipes/> }
            
          </div>
      </Fragment>
  )
}
 

export default Nav