import axios from "axios"
import Global from "../Global"

export default class serviceSeries {
    getAllSeries = async () => {
        let url = Global.apiSeries
        let req = "api/Series"

        let res = await axios.get(url + req)

        return res.data
    }

    getSerieById = async (id) => {
        let url = Global.apiSeries
        let req = "api/Series/" + id

        let res = await axios.get(url + req)

        return res.data
    }

        getPersonajesByIdSerie = async (id) => {
        let url = Global.apiSeries()
        let req = "api/Series/PersonajeSerie" + id
        let res = await axios.get(url + req)

        return res.data
    }
}
