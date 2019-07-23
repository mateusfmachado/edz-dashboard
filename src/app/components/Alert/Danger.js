import React from 'react';

const AlertDanger = ({ error }) => {
    if(!error) return null;
    return (
        <div className="alert alert-danger">
            <span>
                {error.message}
            </span>
        </div>
    )
}

export default AlertDanger;