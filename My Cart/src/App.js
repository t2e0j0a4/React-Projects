import React, { useReducer, useEffect, useMemo } from 'react'
import Item from './Components/Item';

const App = () => {

  const API = "https://course-api.com/react-useReducer-cart-project";

  const [{cart, inCart, totalAmount}, dispatch] = useReducer((initialState, action) => {

    if (action.type === 'CART_ITEMS') {
      return {...initialState, cart : [...action.payload]};
    }

    if (action.type === 'INITIAL_VALS') {
      let {totalItems, totalValue} = action.payload;
      return {
        ...initialState, inCart: totalItems, totalAmount : totalValue
      }
    }

    if (action.type === 'UPDATE_CART') {
      return {...initialState, cart : [...action.payload]}
    }

  }, {
    cart : [],
    inCart : 0,
    totalAmount : 0
  });

  const fetchProducts = async () => {
    fetch(API, {method : 'GET'}).then((response) => response.json()).then((data) => {
      dispatch({ type : 'CART_ITEMS', payload : data });
    }).catch((error) => {console.log(error)});
  }

  useMemo(() => {
    let totalItems = 0, totalValue = 0;
    cart.forEach((item) => {
      totalItems += item.amount;
      totalValue += (item.amount * parseFloat(item.price));
    })
    dispatch({ type: 'INITIAL_VALS', payload : {totalItems, totalValue} });
  }, [cart]);


  const itemCount = (type, itemID) => {

    let updatedCart = cart.filter((item) => {
      if (item.id === itemID) {
        if (type === 'add') item.amount += 1;
        else return item.amount > 1 ? item.amount -= 1 : (item.id !== itemID);
      }

      return item;
    })

    dispatch({ type: 'UPDATE_CART', payload: updatedCart })
  }
    


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="app">
      {/* Simple Navbar For a Cart Showcase. */}
      <nav className="app__navbar">
        <p className="navbar__head">CART</p>
        <div className="navbar__cart">
          <ion-icon name="cart"></ion-icon>
          <span className="cart__value">{inCart}</span>
        </div>
      </nav>

      {/* Cart Items Showcase. */}

      <div className="app__cart">
        <h1 className="cart__head">YOUR CART</h1>
        {/* Cart Items List */}
        <div className="cart__items">
          {cart?.length > 0 ? (
            cart.map((item) => {
              return <Item key={item.id} item={item} itemCount={itemCount} />;
            })
          ) : (
            <p className="empty__cart">No Items In Cart!</p>
          )}
        </div>
        {/* Total Amount */}
        {cart?.length > 0 && (
          <div className="total__amt">
            <p className="total__p">TOTAL</p>
            <p className="total__p">$ {totalAmount.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App