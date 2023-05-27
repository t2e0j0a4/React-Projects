import React from 'react'
import Error from "../Assets/Error.png";
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {

    let navigate = useNavigate();

    const redirectUser = () => {
        navigate('/');
    }

    return (
        <div className='page__error'>
            <div className="page__side1">
                <h1 className='error__code'>404</h1>
                <p className='error__msg'>Page Not Found</p>
                <button type='button' className='back__home' onClick={() => {redirectUser()}}>Back To Home</button>
            </div>
            <div className="page__side2">
                <img src={Error} alt="404" className='error__image'/>
            </div>
        </div>
    )
}

export default PageNotFound