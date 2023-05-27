import React, {useState, useEffect} from 'react'
import menu from "./Data";
import {v4 as uuidv4} from "uuid";
import Item from './Components/Item';

const App = () => {

  // My Menu
  const [myMenu, setMyMenu] = useState(menu);
  
  // Extrating Menu Types for Menu Filterings
  const [menuTypes, setMenuTypes] = useState([]);
  const extractMenuTypes = () => {

    let typeList = Array.from(
      new Set(
        menu.map((item) => {
          let newItemType = item.itemOf;
          return newItemType;
        })
      )
    ).map((itemOf) => {
      let typeObj = { id: uuidv4(), type: itemOf };
      return typeObj;
    });

    setMenuTypes(typeList);
  }

  // Filter Selected
  const [filterSelected, setFilterSelected] = useState('');

  // Filter : filterProcess()
  const filterProcess = (filter) => {
    setFilterSelected(filter);
    if (filter === 'All') {
      setMyMenu(menu);
    }
    else {
      let filteredMenu = menu.filter((item) => item.itemOf === filter);
      setMyMenu(filteredMenu);
    }
  }
  
  // While Page Loads all my Item Types are Set! 😉
  useEffect(() => {
    extractMenuTypes();
    setMenuTypes((prev) => [{
      id : uuidv4(),
      type : "All"
    }, ...prev]);
    setFilterSelected('All');
  }, []);
  
  return (
    <div className='menu__page'>
      <h1 className='menu__head'>My Menu!</h1>

      {/* Main Menu Section : Items & Filter */}
      <div className="menu__box">

        {/* Menu Filtering */}
        <div className="menu__filter">
          <h2>Filter</h2>
          <div className="filter__btns">
            {
              menuTypes.map((type) => {
                return (
                  <button type='button' key={type.id} className={`filter__type ${filterSelected === type.type ? 'active' : ''}`} onClick={() => {filterProcess(type.type)}}>{type.type}</button>
                )
              })
            }
          </div>
        </div>

        {/* Menu Items */}
        <div className="menu__list">
          <h2>Menu Items</h2>
          <div className="list__items">
            {
              myMenu.map((item) => {
                return (
                  <Item key={item.id} itemDetails={item}/>
                )
              })
            }
          </div>
        </div>

      </div>

    </div>
  )
}

export default App