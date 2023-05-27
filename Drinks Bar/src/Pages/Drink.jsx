import React, { useEffect, useState } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

const Drink = () => {
  let navigate = useNavigate();
  let {id} = useParams();
  let API = "https://www.thecocktaildb.com/api/json/v1/1";

  // Fetch Particular Drink
  const [drink, setDrink] = useState({});
  let {idDrink, strDrink, strCategory, strAlcoholic, strGlass, strInstructions, strDrinkThumb, strMeasure1} = drink;

  const fetchDrinkDetails = async () => {
    const response = await fetch(`${API}/lookup.php?i=${id}`);
    const drink = await response.json();
    setDrink(drink.drinks[0]);
  }

  useEffect(() => {
    fetchDrinkDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="each__drink" id={`each__drink-${idDrink}`}>

      <div className="explore__more">
        <button type='button' onClick={() => {
          navigate('/');
        }}>Explore</button>
      </div>

      <div className="main__center">

        {/* Drink Thumbnail */}
        <div className="each__drink-image">
          <img src={strDrinkThumb} alt={strDrink} />
        </div>

        {/* Drink Details */}
        <div className="each__drink-details">
          <p><span>Drink</span> : {strDrink}</p>
          <p><span>Glass</span> : {strGlass}</p>
          <p><span>Category</span> : {strCategory}</p>
          <p><span>Alcoholic</span> : {strAlcoholic}</p>
          <p><span>Measure</span> : {strMeasure1}</p>
          <p><span>Instructions</span> : {strInstructions}</p>
        </div>

      </div>
    </div>
  )
}

export default Drink