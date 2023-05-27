import React , {useEffect, useState} from 'react'
import { v4 as uuidv4 } from "uuid";
import Item from './Components/Item';

const App = () => {

  // Retreving Data from Local Storage.
  const storeInLocalStorage = () => {
    let storedList = localStorage.getItem("mylist");
    if (storedList) {
      return JSON.parse(storedList);
    } else {
      return [];
    }
  };

  const [itemInput, setItemInput] = useState("");
  const [myList, setMyList] = useState(storeInLocalStorage());

  // Funtion updateMyList()
  const updateMyList = () => {
    if (itemInput) {
      let newItem = { id: uuidv4(), checked: false, name: itemInput };
      setMyList((prev) => [...prev, newItem]);
      setItemInput("");
    }
  };

  // Function updateItemCheck()
  const updateItemCheck = (itemID) => {
    let updatedList = myList.filter((item) => {
      if (item.id === itemID) {
        item.checked = !item.checked;
      }
      return item;
    });
    setMyList(updatedList);
  };

  // Function toDeleteItem()
  const toDeleteItem = (itemID) => {
    let updatedList = myList.filter((item) => item.id !== itemID);
    setMyList(updatedList);
  };

  // Updating Local Storage every time adding new Item.
  useEffect(() => {
    localStorage.setItem("mylist", JSON.stringify(myList));
  }, [myList]);

  return (
    <div className="grocery__page">
      <h1>What Grocery ?</h1>
      <div className="grocery__box">
        <div className="grocery__input">
          <input
            type="text"
            placeholder="Item Name..."
            value={itemInput}
            onChange={(e) => {
              setItemInput(e.target.value);
            }}
          />
          <button type="button" onClick={() => updateMyList()}>
            Add
          </button>
        </div>
        <div className="grocery__list">
          {myList?.length !== 0 ? (
            myList.map((listItem) => {
              return (
                <Item
                  key={listItem.id}
                  list={listItem}
                  updateItemCheck={updateItemCheck}
                  toDeleteItem={toDeleteItem}
                />
              );
            })
          ) : (
            <p className="empty__list">Empty List!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App