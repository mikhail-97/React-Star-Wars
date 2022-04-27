import React, {useCallback, useState} from "react";
import './person-list.css';
import {EmptyList} from "../errors";
import {Spinner} from "../spinner";

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{ label }: </span>
            <span>{ item[field] }</span>
        </li>
    )
}

const RadioButton = ({text, name, value, checked, onChange, id,}) => {

    const handleChange = useCallback(
        ({currentTarget: {id}}) => {
            onChange(id);
        },
        [onChange]
    );
    return (
        <label className="filterLabel">
            <input
                checked={checked}
                className="btn-check"
                id={id}
                name={name}
                onChange={handleChange}
                type="radio"
                value={value}
            />
            <span className="item-gender">
                {text}
            </span>
        </label>
    )
}

const Filter = ({setCurrentGender, gender = 'all'}) => {

    const list = [
        {
            id: 'all',
            name: 'gender',
            text: 'All',
            checked: gender === 'all'
        },
        {
            id: 'male',
            name: 'gender',
            text: 'Male',

        },
        {
            id: 'female',
            name: 'gender',
            text: 'Female',
        },
        {
            id: 'n/a',
            name: 'gender',
            text: 'n/a',
        },
    ]

    return (
        <div className="containerFilter">
            <div>Filter</div>
            <div className="d-flex">
                <div>
                    {list.map((item) => <RadioButton onChange={setCurrentGender} {...item}/>)}
                </div>

            </div>
        </div>
    )
}

const ListItem = ({image, id, ...rest}) => {
    return (
        <div className="list-group-item"
              key={ id }
        >
            <img src={image} alt={id}/>
            <ul className="list-group">
                {Object.keys(rest).map((field) => {
                    return <Record key={field} item={rest} field={field} label={field.toUpperCase()}/>
                })}
            </ul>
        </div>
    )
}

function PersonList({persons, loading}) {
    const [currentGender, setCurrentGender] = useState('all')

    if (loading && !persons) {
        return <Spinner />
    }

    if (!loading && persons.length <= 0) {
        return (
            <div className="" style={{marginTop: 20, marginBottom: 20}}><EmptyList/></div>
        )
    }

    const filteredByTag = currentGender === 'all' ? persons :  persons.filter((item) => currentGender === item.gender)
    return (
        <>
            <div style={{justifyContent: 'flex-end', display: 'flex'}}>
                <Filter setCurrentGender={setCurrentGender} gender={currentGender}/>
            </div>
            <div className="person-list grid">
                {filteredByTag.map((item) => <ListItem {...item}/>)}
            </div>
        </>
    )
}

export default PersonList