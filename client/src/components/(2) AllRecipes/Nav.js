import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import AllRecipes from './AllRecipes'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getRecipeByTitle } from '../../redux/actions'
import { useState } from 'react'


function Nav() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const navigateToSomething = () => {
        navigate('/')

    }
    
    //PARA PASARLE EL NOMBRE AL COMPONENTE QUE RENDEREZA POR NOMBRE O TODOS LOS 100 DE LA API Y DB
    const [recipeTitle, setRecipeTitle] = useState('')
    const [recipeTitleFinal, setRecipeTitleFinal] = useState('')

    //DISPATCH DE FILTROS EN REDUX


    /* 
    1. Lista de filtros
    2. Action function que mande la action que le pido
    3. Reducer recibe la action y filtra recipes y lo manda a un nuevo array?????????? O al mismo? 
    */



    return (
      <Fragment>
          <div>Logo </div>
          
            <form onSubmit = {(e) => { e.preventDefault(); setRecipeTitleFinal(recipeTitle)}}>
                <input onChange = {(e) => setRecipeTitle(e.target.value)}></input>
                <button type = 'submit'>Click to search recipe name</button>
            </form>

              {/* <input onSubmit={ (e) => onSubmitInput(e) } placeholder='Search by name'></input> */}
          <br/>
          <button onClick={navigateToSomething}> Create Recipe </button>
          <div className = 'filters'>
                <div> Filters </div>
                <div> Diet Type </div>
                <div> Filters </div>
                <div> Name Order </div>
                <div> Filters </div>
                <div> Health Score </div>
                <div> Filters </div>
<br/>
                 <AllRecipes title={recipeTitleFinal}/>

          </div>
      </Fragment>
  )
}

export default Nav