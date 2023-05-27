import React, { useEffect, useState } from 'react'

import { Link, useParams, useNavigate } from 'react-router-dom'

const Drink = () => {
  let {id} = useParams();
  let navigate = useNavigate();
  let API = "https://www.thecocktaildb.com/api/json/v1/1";

  // Fetch Particular Drink
  const [drink, setDrink] = useState({});
  let {idDrink, strDrink, strCategory, strAlcoholic, strGlass, strInstructions, strDrinkThumb, strMeasure1} = drink;

  const fetchDrinkDetails = async () => {
    const response = await fetch(`${API}/lookup.php?i=${id}`);
    const drink = await response.json();
    let {drinks} = drink;
    if (!drinks) {
      return navigate('/pagenotfound');
    }
    setDrink(drinks[0]);
  }

  useEffect(() => {
    fetchDrinkDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="each__drink" id={`each__drink-${idDrink}`}>

      <div className="explore__more">
        <p><Link to='/'>Home</Link></p>
        <ion-icon name="chevron-forward"></ion-icon>
        <p>Drink</p>
      </div>

      <div className="main__center">

        {/* Drink Thumbnail */}
        <div className="each__drink-image">
          <img src={strDrinkThumb} alt={strDrink} />
        </div>

        {/* Drink Details */}
        <div className="each__drink-details">
          <div className="more__details">
            <h2>Drink :</h2>
            <p>{strDrink !== null ? strDrink : '-'}</p>
          </div>

          <div className="more__details">
            <h2>Glass :</h2>
            <p>{strGlass !== null ? strGlass : '-'}</p>
          </div>

          <div className="more__details">
            <h2>Category :</h2>
            <p>{strCategory !== null ? strCategory : '-'}</p>
          </div>

          <div className="more__details">
            <h2>Alcoholic :</h2>
            <p>{strAlcoholic !== null ? strAlcoholic : '-'}</p>
          </div>

          <div className="more__details">
            <h2>Measure :</h2>
            <p>{strMeasure1 !== null ? strMeasure1 : '-'}</p>
          </div>

          <div className="more__details">
            <h2>Instructions :</h2>
            <p>{strInstructions !== null ? strInstructions : '-'}</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Drink