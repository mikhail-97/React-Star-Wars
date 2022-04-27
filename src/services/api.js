
export class Api {
    apiBase = 'https://swapi.dev/api'
    imageBase = 'https://starwars-visualguide.com/assets/img'




    extractId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/
        return item.url.match(idRegExp)[1]
    }

    transformPlanet = (planet) => {
        return {
            id: this.extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter,
            climate: planet.climate,
            terrain: planet.terrain,
            residents: planet.residents,
            type: "planet"
        };
    }

    getResource = async (url, isAllUrl) => {
        const res = await fetch(isAllUrl ? isAllUrl : `${this.apiBase}${url}`)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json()
    }


    getPlanets = async (page = 1) => {
        const res = await this.getResource(`/planets/?page=${page}`)

        return {list: res.results.map(
            this.transformPlanet),
            previous: this.getPageId(res.previous),
            next: this.getPageId(res.next),
        }
    }

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}/`)
        return this.transformPlanet(planet)
    }

    transformPerson = (person) => {
        return {
            id: this.extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color,
            hairColor: person.hair_color,
            mass: person.mass,
            height: person.height,
            type: "person"
        }
    }

    getPersonImage = ({ id }) => {
        return `${this.imageBase}/characters/${id}.jpg`
    }

    getPersonForPlanet = async (residents) => {
       const res = await Promise.all(residents.map(async (url) => {
           const r = await fetch(url)

           if (!r.ok) {
               throw new Error(`Could not fetch ${url}` +
                   `, received ${res.status}`)
           }

           return await r.json()
       }))

       const transformedPersons = res.map((item) => this.transformPerson(item))

        return transformedPersons.map( (item) => {
            const image =  this.getPersonImage({id: item.id})
            return {
                ...item,
                image,
            }
        })
    }

    getPageId = (url) => {
        const pos = url ? url.lastIndexOf('?page=') : null

        if (!pos) {
            return -1
        }

        const id = url.slice(pos + '?page='.length, url.length)
        return Number(id)
    }
}