import React from 'react'
import { Link } from 'react-router-dom';

const EachItem = ({drink}) => {

  let {idDrink, strAlcoholic, strDrink, strDrinkThumb, strGlass, strInstructions, strCategory} = drink;

  const getStringEllapse = (str) => {
    if (str.length > 70) {
      return str.slice(0, 68) + '...';
    }
  }

  return (
    <div className='drink' id={`drink__${idDrink}`}>
      <img src={strDrinkThumb} alt={strDrink} className='drink__image' />
      <div className="drink__details">
        <h4>{strDrink}</h4>
        <p>{strGlass}</p>
        <div>
          <p>{strCategory}</p>
          <p>{strAlcoholic}</p>
        </div>
      </div>
      <p className='drink__desc'>
        {strInstructions.length < 70 ? strInstructions : getStringEllapse(strInstructions)}
      </p>
      <Link to={`/drink/${idDrink}`}>Details</Link>
    </div>
  )
}

export default EachItem