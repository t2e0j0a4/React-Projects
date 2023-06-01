import React from 'react'

const Item = ({item, itemCount}) => {

    let {id, title, price, amount, img} = item;

  return (
    <div className='each__item' id={`item__${id}`}>
        <div className="item__img">
            <img src={img} alt={title} />
            <p>{title}</p>
            <p>${price}</p>
        </div>
        <div className="cart__amt">
            <button type='button' onClick={() => itemCount('remove', id)}><ion-icon name="remove"></ion-icon></button>
            <span className='item__amt'>{amount}</span>
            <button type='button' onClick={() => itemCount('add', id)}><ion-icon name="add"></ion-icon></button>
        </div>
    </div>
  )
}

export default Item