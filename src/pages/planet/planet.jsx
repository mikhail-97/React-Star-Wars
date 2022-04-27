import {PlanetDetails, Spinner, withSwapiService} from "../../components";
import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import PersonList from "../../components/person/PersonList";

const compose = (...funcs) => (comp) => {
    return funcs.reduceRight((prevResult, fn) => fn(prevResult), comp)
}

const Component = ({match, getData, getPersonsForPlanet}) => {
    const { id } = match.params
    const [isLoadingPlanet, setLoadingPlanet] = useState(false)
    const [planet, setPlanet] = useState(null)
    const [isLoadingPersons, setLoadingPersons] = useState(true)
    const [persons, setPersons] = useState([])

    useEffect(() => {
        function getPlanet() {
            setLoadingPlanet(true)
            getData(id).then((result) => {
                setPlanet(result)
                setLoadingPlanet(false)
            })
        }
        getPlanet()
    }, [])

    useEffect(() => {
        function getPersons() {
            if (planet) {
                setLoadingPersons(true)
                getPersonsForPlanet(planet.residents).then((result) => {
                    setPersons(result)
                    setLoadingPersons(false)
                })
            }
        }
        getPersons()
    }, [planet, getPersonsForPlanet])

    return (
        <div>
            {isLoadingPlanet ? <Spinner /> : <PlanetDetails planet={planet}/>}
            {<PersonList persons={persons} loading={isLoadingPersons}/>}
        </div>
    )
}


const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPlanet,
        getPersonsForPlanet: swapiService.getPersonForPlanet,
    }
}

export const Planet = compose(withRouter, withSwapiService(mapMethodsToProps))(Component)