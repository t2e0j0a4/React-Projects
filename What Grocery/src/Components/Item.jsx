import React from 'react'

const Item = ({list, updateItemCheck, toDeleteItem}) => {

    let {id, name, checked} = list;

    return (
        <div id={`grocery__item-${id}`} className="grocery__item">
            <div className="item__details">
                <input className='item__check' type="checkbox" value={checked} onChange={() => updateItemCheck(id)}/>
                <p className={`item__name ${checked && 'item__checked'}`}>{name}</p>
            </div>
            <button type='button' className='item__delete' onClick={() => {toDeleteItem(id)}}>Delete</button>
        </div>
    )
}

export default Item