import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import Card from './Card';


function RenderizeFilteredRecipes() {


    const allFilteredRecipes = useSelector((state) => state.filteredRecipes);
	
    if (allFilteredRecipes.length > 0) {
        const mapedFiltered = allFilteredRecipes.map((item) => {
            return (
                <Fragment key={item.id.toString()}>
                     <Card title={item.title} id={item.id} image={item.image} diets={item.diets}/>
                </Fragment>
            );
        });
        return mapedFiltered;
    }

    else {
        return <> 
        'Sorry, but there are no recipes for this kind of filter'
    </>
    }

}

export default RenderizeFilteredRecipes