import React from "react";
import {Row} from "../row";
import './index.css'

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{ label }:</span>
            <span>{ item[field] }</span>
        </li>
    )
}

const PlanetInfoBlock = ({planet}) => {
    const {name, image, residents, ...rest} = planet

    return (
        <div>
            <h4>{ name }</h4>
            <ul className="list-group list-group-flush">
                {Object.keys(rest).map((field) => {
                    return <Record key={field} item={planet} field={field} label={field.toUpperCase()}/>
                })}
            </ul>
        </div>
    )
}
export const PlanetDetails = ({planet}) => {
    if (!planet) {
        return null
    }

    return (
        <div className="item-details card">
            <PlanetInfoBlock planet={planet} />
        </div>
    )
}