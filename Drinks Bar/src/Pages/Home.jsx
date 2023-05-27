import React from 'react'
import EachItem from '../Components/EachItem'

const Home = ({myDrinks}) => {

  return (
    <main className='home__page'>
      <div className="main__center">
        <h1 className='home__head'>Drinks Bar</h1>
        {/* Search Option */}
        {/* <div className="home__search">
          <input type="text" placeholder='Search Drink...'/>
          <button type='button'>Search</button>
        </div> */}
        {/* Drinks List */}
        <div className="drinks__list">
          {/* <h2 className='drinks__head'>Drinks</h2> */}
          {/* List */}
          <div className="all__drinks">
            {
              myDrinks.map((drink) => {
                return (
                  <EachItem key={drink.idDrink} drink={drink}/>
                )
              })
            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home