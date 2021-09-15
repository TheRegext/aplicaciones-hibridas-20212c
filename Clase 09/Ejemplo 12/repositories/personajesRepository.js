import {promises} from 'fs'

export async function getAll() {
    return promises.readFile('./data/personajes.json')
        .then(function (data) {
            const personajes = JSON.parse(data.toString())
            return personajes
        })
        .catch(function (err) {
            return err            
        })
}

export default {
    getAll
}