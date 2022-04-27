import React from 'react'

import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <div className="header d-flex">
            <h3>
                <Link to="/">StarWars Library</Link>
            </h3>
        </div>
    )
}