import React from 'react'

const Item = ({itemDetails}) => {

    let {id, itemImage, itemName, itemDesc, itemOf} = itemDetails;

    return (
        <div className='item__card' id={`item__card-${id}`}>
            <img src={itemImage} alt={itemName} className='item__image'/>
            <div className="item__head">
                <h3 className='item__name'>{itemName}</h3>
                <p className='item__of'>{itemOf}</p>
            </div>
            <p className='item__desc'>{itemDesc}</p>
        </div>
    )
}

export default Item