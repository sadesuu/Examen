import axios from "axios"
import Global from "../Global"

export default class servicePersonajes {
    getAllPersonajes = async () => {
        let url = Global.apiSeries
        let req = "api/Personajes"
        let res = await axios.get(url + req)

        return res.data.value || res.data
    }

    getPersonajesByIdSerie = async (idSerie) => {
        const personajes = await this.getAllPersonajes()

        return personajes.filter((personaje) => personaje.idSerie === Number(idSerie))
    }

    createPersonaje = async (personaje) =>{
        let url = Global.apiSeries
        let req = "api/Personajes"
        let res = await axios.post(url + req, personaje)

        return res.data
    }

    editPersonaje = async (idPersonaje, idSerie) =>{
        let url = Global.apiSeries
        let req = "api/Personajes/" + idPersonaje+"/"+idSerie
        let res = await axios.put(url + req)

        return res.data
    }   
}
