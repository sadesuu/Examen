import React, { Component } from 'react'
import servicePersonajes from '../Services/servicePersonajes'

export default class PersonajesComponent extends Component {
    service = new servicePersonajes()

    state = {
        personajes: []
    }

    loadPersonajes = async () => {
        try {
            const personajes = await this.service.getPersonajesByIdSerie(this.props.id)
            this.setState({
                personajes
            })
        } catch (error) {
            console.error('No se pudieron cargar los personajes', error)
        }
    }

    componentDidMount = async () => {
        await this.loadPersonajes()
    }

    componentDidUpdate = async (oldProps) => {
        if (oldProps.id !== this.props.id) {
            await this.loadPersonajes()
        }
    }

    render() {
        const { personajes } = this.state

        return (
            <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                        Serie #{this.props.id}
                    </p>
                    <h1 className="mt-1 text-3xl font-bold text-slate-900">
                        Personajes
                    </h1>
                </header>

                {personajes.length === 0 ? (
                    <p className="rounded-lg bg-slate-100 p-6 text-center text-slate-600">
                        Esta serie todavía no tiene personajes.
                    </p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {personajes.map((personaje) => (
                            <article
                                key={personaje.idPersonaje}
                                className="overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-slate-200 transition-transform hover:-translate-y-1 hover:shadow-xl"
                            >
                                <img
                                    src={personaje.imagen}
                                    alt={`Imagen de ${personaje.nombre}`}
                                    className="h-64 w-full object-cover"
                                />
                                <div className="p-5">
                                    <h2 className="text-xl font-semibold text-slate-900">
                                        {personaje.nombre}
                                    </h2>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        )
    }
}
