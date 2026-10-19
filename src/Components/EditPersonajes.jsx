import React, { Component } from 'react'
import serviceSeries from '../Services/serviceSeries'
import servicePersonajes from '../Services/servicePersonajes'
import { Navigate } from 'react-router-dom'

export default class EditPersonajes extends Component {
    servicePersonajes = new servicePersonajes()
    serviceSerie = new serviceSeries()

    state = {
        personajes: [],
        series: [],
        selectedPersonaje: '',
        selectedSerie: '',
        success: null
    }

    loadData = async () => {
        const [personajes, series] = await Promise.all([
            this.servicePersonajes.getAllPersonajes(),
            this.serviceSerie.getAllSeries()
        ])

        this.setState({
            personajes,
            series
        })
    }

    componentDidMount = async () => {
        await this.loadData()
    }
    handleChange = (event) => {
        let { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        if (!this.state.selectedPersonaje || !this.state.selectedSerie) {
            return
        }
        await this.servicePersonajes.editPersonaje(parseInt(this.state.selectedPersonaje), parseInt(this.state.selectedSerie))

        this.setState({
            success: "Correcto"
        })

    }

    render() {
        const {
            personajes,
            series,
            selectedPersonaje,
            selectedSerie,
            success
        } = this.state

        let personajeSeleccionado = personajes.find(
            personaje => personaje.idPersonaje === Number(selectedPersonaje)
        )

        let serieSeleccionada = series.find(
            serie => serie.idSerie === Number(selectedSerie)
        )

        if (success) {
            return <Navigate to={`/serie/${selectedSerie.idSerie}`} replace />

        }
        return (
            <div>
                <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-200 sm:p-8">
                        <header className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                                Personajes
                            </p>
                            <h1 className="mt-1 text-3xl font-bold text-slate-900">
                                Modificar personaje
                            </h1>
                        </header>

                        <form className="space-y-6" onSubmit={this.handleSubmit}>
                            <div>
                                <label
                                    htmlFor="selectedPersonaje"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Personaje
                                </label>
                                <select
                                    id="selectedPersonaje"
                                    name="selectedPersonaje"
                                    value={selectedPersonaje}
                                    onChange={this.handleChange}
                                    className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                >
                                    <option value="">Selecciona un personaje</option>
                                    {personajes.map((personaje, i) =>
                                        <option
                                            key={i}
                                            value={personaje.idPersonaje}
                                        >
                                            {personaje.nombre}
                                        </option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="selectedSerie"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Nueva serie
                                </label>
                                <select
                                    id="selectedSerie"
                                    name="selectedSerie"
                                    value={selectedSerie}
                                    onChange={this.handleChange}
                                    className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                >
                                    <option value="">Selecciona una serie</option>
                                    {series.map((serie, i) => (
                                        <option
                                            key={i}
                                            value={serie.idSerie}
                                        >
                                            {serie.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Modificar personaje
                            </button>
                        </form>
                    </div>
                </section>
                <div className="mx-auto flex max-w-2xl gap-4 px-4 pb-10 sm:px-6 lg:px-8">
                    {personajeSeleccionado && (
                        <div className="w-1/2 overflow-hidden rounded-lg bg-slate-100 p-3">
                            <img
                                className="h-28 w-full rounded-lg object-cover shadow-md"
                                src={personajeSeleccionado.imagen}
                                alt={personajeSeleccionado.nombre}
                            />
                        </div>
                    )}
                    {serieSeleccionada && (
                        <div className="w-1/2 overflow-hidden rounded-lg bg-slate-100 p-3">
                            <img
                                className="h-28 w-full rounded-lg object-cover shadow-md"
                                src={serieSeleccionada.imagen}
                                alt={serieSeleccionada.nombre}
                            />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
