import React from 'react'

import './not-found-indicator.css'
import icon from './death-star.png'

export const EmptyList = () => {
    return (
        <div className="jumbotron">
            <div className="not-found-indicator d-flex">
                <div>
                    <img src={icon} alt="error icon"/>
                </div>
                <div className="not-found-description">
                    <span className="boom">Oops...</span>
                    <span>
                        looks like no one lives on this planet :(
                    </span>
                    <span>
                        We invite you to settle on this planet
                    </span>
                </div>
            </div>
        </div>
    )
}

