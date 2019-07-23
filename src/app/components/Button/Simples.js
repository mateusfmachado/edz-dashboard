import React from 'react';
import {Link} from 'react-router-dom';

const Button = ({ type, onClick, label }) => (
    <div className="Button">
        <button
            onClick={onClick}
            className={`button button-${ type || 'default' }`} >
            { label }
        </button>
    </div>
)

const ButtonSimples = ({ type, rota, onClick, label }) => {
    if(rota){
        return (
            <Link to={rota}>
                <Button type={type} onClick={onClick} label={label} />
            </Link>
        );
    } 
    else return <Button type={type} onClick={onClick} label={label} />
}

export default ButtonSimples;