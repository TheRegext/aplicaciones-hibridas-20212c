import {promises} from 'fs'

export async function getAll() {
    return promises.readFile('./data/personajes.json')
        .then(function (data) {
            const personajes = JSON.parse(data.toString())
            return personajes.filter(function(e){
                return e.deleted != true
            })
        })
        .catch(function (err) {
            return err            
        })
}


// esta funcion usa async ya que siempre que devuelve una promesa, se debe convertir a una funcion asincrona
export async function create(entity){
        return promises.readFile('./data/personajes.json')
        .then(function (data) {
            const personajes = JSON.parse(data.toString())
            
            entity.id = personajes.length + 1

            personajes.push(entity);

            //al devolver una promesa, el siguiente then se ejecuta solo si esta promesa da exito
            return promises.writeFile('./data/personajes.json', JSON.stringify(personajes)) 
        })
        //Este then solo se ejecuta si la promesa retornada es exitosa
        .then(function () {
            return entity
        })
        .catch(function (err) {
           return err
        })
       
}

export default {
    getAll,
    create
}