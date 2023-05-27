import React, { useEffect, useState } from 'react'
import Home from './Pages/Home';
import Drink from './Pages/Drink';
import PageNotFound from './Pages/PageNotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {

  const API = "https://www.thecocktaildb.com/api/json/v1/1";

  const [myDrinks, setMyDrinks] = useState([]);

  // Fetch all Drinks using API
  const fetchAllDrinks = async () => {
    let response = await fetch(`${API}/search.php?s=`, {method : 'GET'});
    let drinksData = await response.json();
    let {drinks} = drinksData;
    setMyDrinks(drinks);
  }

  const fetchSearchedDrinks = async (search) => {
    if (search) {
      let response = await fetch(`${API}/search.php?s=${search}`, {method : 'GET'});
      let searchResults = await response.json();
      let {drinks} = searchResults;
      setMyDrinks(drinks);
    }
    else {
      fetchAllDrinks();
    }
  }

  useEffect(() => {
    fetchAllDrinks();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home myDrinks={myDrinks} fetchSearchedDrinks={fetchSearchedDrinks} />} />
        <Route path="/drink/:id" exact element={<Drink />} />
        <Route path="*" exact element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App