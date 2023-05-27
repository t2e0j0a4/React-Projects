import React, { useEffect, useState } from 'react'
import EachItem from '../Components/EachItem'
import FilterItem from '../Components/FilterItem';

const Home = ({myDrinks, fetchSearchedDrinks}) => {
  let API = "https://www.thecocktaildb.com/api/json/v1/1";
  const [searchInput, setSearchInput] = useState('');

  // Filtring
  const [filterDrinks, setFilterDrinks] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState('Alcoholic');

  // Fetch Filter Drinks
  const fetchFilterDrinks = async (type) => {
    setSelectedFilter(type);
    const response = await fetch(`${API}/filter.php?a=${type}`);
    const filterData = await response.json();
    let {drinks} = filterData;
    setFilterDrinks(drinks);
  }

  useEffect(() => {
    fetchFilterDrinks("Alcoholic");
    // eslint-disable-next-line
  }, []);

  return (
    <main className='home__page'>
      <div className="main__center">
        <h1 className='home__head'>Drinks Bar</h1>
        {/* Search Option */}
        <div className="home__search">
          <input type="text" placeholder='Search Drink...' value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              fetchSearchedDrinks(e.target.value);
            }
          }}/>
          <button type='button' onClick={() => {fetchSearchedDrinks(searchInput)}}>Search</button>
        </div>
        {/* Drinks List */}
        <div className="drinks__list">
          <h2 className='drinks__head'>Drinks</h2>
          {/* List */}
          <div className="all__drinks">
            {
              myDrinks?.length ? (
                myDrinks.map((drink) => {
                  return (
                    <EachItem key={drink.idDrink} drink={drink}/>
                  )
                })
              ) : (<p className='empty__list'>Empty!</p>)
            }
          </div>
        </div>
      </div>

      <div className="main__center">
        <h1 className='filter__head'>Your Choice</h1>

        {/* Filtering */}
        <div className="filter__section">
          <button type='button' className={`${selectedFilter === 'Alcoholic' ? 'active' : ''}`} onClick={() => {fetchFilterDrinks('Alcoholic')}}>Alcohol</button>
          <button type='button' className={`${selectedFilter === 'Non_Alcoholic' ? 'active' : ''}`} onClick={() => {fetchFilterDrinks('Non_Alcoholic')}}>Non Alcohol</button>
        </div>

        {/* Drinks List */}
        <div className="filter__list">
          {
            filterDrinks?.length ? (
              filterDrinks.map((drink) => {
                return (<FilterItem key={drink.idDrink} drink={drink}/>)
              })
            ) : (<p className='empty__list'>Empty!</p>)
          }
        </div>

      </div>

    </main>
  )
}

export default Home