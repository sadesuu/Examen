import React, { Component } from 'react'
import serviceSeries from '../Services/serviceSeries'
import { NavLink } from 'react-router-dom'

export default class SerieComponent extends Component {
    service = new serviceSeries()

    state = {
        serie: null
    }

    getSerieById = async () => {
        try {
            const serie = await this.service.getSerieById(this.props.id)
            this.setState({
                serie
            })
        } catch (error) {
            console.error('No se pudo cargar la serie', error)
        }
    }

    componentDidMount = async () => {
        await this.getSerieById()
    }

    componentDidUpdate = async (oldProps) => {
        if (oldProps.id !== this.props.id) {
            this.setState({ serie: null })
            await this.getSerieById()
        }
    }

    render() {
        const { serie } = this.state

        if (!serie) {
            return null
        }

        return (
            <article className="mx-auto my-10 max-w-2xl overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-200">
                <img
                    src={serie.imagen}
                    alt={`Portada de ${serie.nombre}`}
                    className="h-72 w-full object-cover"
                />
                <div className="space-y-5 p-6">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                            Serie #{serie.idSerie}
                        </p>
                        <h1 className="mt-1 text-3xl font-bold text-slate-900">
                            {serie.nombre}
                        </h1>
                    </div>

                    <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <div className="rounded-lg bg-slate-100 p-4">
                            <dt className="text-sm text-slate-500">Puntuación</dt>
                            <dd className="mt-1 text-xl font-semibold text-slate-900">
                                {serie.puntuacion}
                            </dd>
                        </div>
                        <div className="rounded-lg bg-slate-100 p-4">
                            <dt className="text-sm text-slate-500">Año</dt>
                            <dd className="mt-1 text-xl font-semibold text-slate-900">
                                {serie.año}
                            </dd>
                        </div>
                    </dl>

                    <NavLink
                        to={`/personajes/${this.props.id}`}
                        className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Ver personajes
                    </NavLink>
                </div>
            </article>
        )
    }
}
