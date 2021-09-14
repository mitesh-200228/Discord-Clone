import React from 'react'

const StepUsername = ({ onNext }) => {
    return (
        <div>
            <div>Username</div>
            <button onClick={onNext}>Next</button>
        </div>
    )
}

export default StepUsername
