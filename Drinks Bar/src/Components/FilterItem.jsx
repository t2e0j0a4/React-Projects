import React from 'react'
import { Link } from 'react-router-dom';

const FilterItem = ({drink}) => {

    let {strDrink, strDrinkThumb, idDrink} = drink;

    return (
        <div className='filter__drink' id={`filter__drink-${idDrink}`}>
            <img src={strDrinkThumb} alt={strDrink} />
            <div className="filter__drink-details">
                <p>{strDrink}</p>
                <Link to={`/drink/${idDrink}`}>Details</Link>
            </div>
        </div>
    )
}

export default FilterItem