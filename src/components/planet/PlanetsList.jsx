import React, {useState, useEffect, useCallback} from "react";
import './planet-list.css';
import { Link } from 'react-router-dom'
import {withSwapiService} from "../hoc-helpers";
import {Spinner} from "../spinner";
import {useQueryParams} from "../../hooks";

const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPlanets,
    }
}

const ListItem = ({name, id, population, climate}) => {
    return (
        <Link className="list-group-item"
            key={ id }
              to={`/planet/${id}`}
           >
            <div>name: { name }</div>
            <div>population: {population} </div>
            <div>climate: {climate} </div>
        </Link>
    )
}

const Navigation = ({previousPage, nextPage}) => {
    return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Link to={`?page=${previousPage}`}>
                    <button disabled={previousPage === -1}>
                        Previous
                    </button>
                </Link>
                <Link to={`?page=${nextPage}`}>
                    <button disabled={nextPage === -1}>
                        Next
                    </button>
                </Link>
            </div>
    )
}


const Component = ({getData}) => {
    const [isLoading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [previousPage, setPrevious] = useState(null)
    const [nextPage, setNext] = useState(null )
    const query = useQueryParams()
    const queryPage = query.get('page')

    useEffect(() => {
         function getPlanets() {
            setLoading(true)
             console.log(queryPage);
             getData(queryPage).then(({list, previous, next}) => {
                setLoading(false)
                setPrevious(previous)
                setNext(next)
                setItems(list)
            })
        }

        getPlanets()
    }, [queryPage, getData])

    return (
        <div style={{marginTop: 60, display: 'flex', flexDirection: 'column'}}>
            {isLoading ? <Spinner/> : (
                    <div className="grid">
                        {!isLoading ? items.map((item) => <ListItem key={item.id} {...item} />) : <Spinner />}
                    </div>
            )}
            <div style={{marginTop: 20, marginBottom: 30, flexGrow: 1}}>
                <Navigation previousPage={previousPage} nextPage={nextPage}/>
            </div>
        </div>

    )
}

export const PlanetsList = withSwapiService(mapPlanetMethodsToProps)(Component)
