import React from 'react'

const Card = ({details, moveCardBy}) => {

    let {id, name, desc, role, image} = details;

    return (
        <div className='card' id={`card__${id}`} style={{transform : `translateX(-${moveCardBy}%)`}}>
            <img src={image} alt={name} className='card__image'/>
            <div className='card__details'>
                <h2 className='card__name'>{name}</h2>
                <p className='card__role'>{role}</p>
            </div>
            <p className='card__desc'>{desc}</p>
        </div>
    )
}

export default Card