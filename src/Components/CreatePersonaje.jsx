import React, { Component } from 'react'
import servicePersonajes from '../Services/servicePersonajes'
import { Navigate } from 'react-router-dom'
import serviceSeries from '../Services/serviceSeries'

export default class CreatePersonaje extends Component {
    service = new servicePersonajes()
    serviceSeries = new serviceSeries()
    state = {
        form: {
            nombre: '',
            imagen: '',
            idSerie: ''
        },
        series: [],
        isLoading: false,
        error: null,
        success: null
    }

    handleChange = (event) => {
        const { name, value } = event.target

        this.setState(({ form }) => ({
            form: {
                ...form,
                [name]: value
            },
            error: null,
            success: null
        }))
    }

    loadSeries = async () => {
        let datos = await this.serviceSeries.getAllSeries()
        this.setState({
            series: datos
        })
    }

    createPersonaje = async (event) => {
        event.preventDefault()

        const { form } = this.state
        const personaje = {
            nombre: form.nombre.trim(),
            imagen: form.imagen.trim(),
            idSerie: Number(form.idSerie)
        }

        if (!personaje.nombre || !personaje.imagen || !personaje.idSerie) {
            this.setState({
                error: 'Completa todos los campos antes de guardar.'
            })
            return
        }

        this.setState({ isLoading: true, error: null, success: null })

        try {
            await this.service.createPersonaje(personaje)
            this.setState({
                form: {
                    nombre: '',
                    imagen: '',
                    idSerie: ''
                },
                isLoading: false,
                success: 'El personaje se ha creado correctamente.'
            })
        } catch (error) {
            console.error('No se pudo crear el personaje', error)
            this.setState({
                isLoading: false,
                error: 'No se pudo crear el personaje. Inténtalo de nuevo.'
            })
        }
    }

    componentDidMount = async () => {
        await this.loadSeries()
    }

    render() {
        const { form, isLoading, error, success } = this.state

        if (success) {
            return <Navigate to="/" replace />
        }

        return (
            <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-200 sm:p-8">
                    <header className="mb-8">
                        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                            Personajes
                        </p>
                        <h1 className="mt-1 text-3xl font-bold text-slate-900">
                            Crear personaje
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Añade un personaje indicando su nombre, imagen y serie.
                        </p>
                    </header>

                    <form className="space-y-6" onSubmit={this.createPersonaje}>
                        <div>
                            <label
                                htmlFor="nombre"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Nombre
                            </label>
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                value={form.nombre}
                                onChange={this.handleChange}
                                required
                                className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                placeholder="Ej. Jon Snow"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="imagen"
                                className="block text-sm font-medium text-slate-700"
                            >
                                URL de la imagen
                            </label>
                            <input
                                id="imagen"
                                name="imagen"
                                type="url"
                                value={form.imagen}
                                onChange={this.handleChange}
                                className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="idSerie"
                                className="block text-sm font-medium text-slate-700"
                            >
                                ID de la serie
                            </label>
                            <select
                                name="idSerie"
                                id="idSerie"
                                value={form.idSerie}
                                onChange={this.handleChange}
                                required
                                className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            >
                                <option value="" className="bg-white text-slate-500">
                                    Selecciona una serie
                                </option>
                                {this.state.series.map((s) => (
                                    <option
                                        key={s.idSerie}
                                        value={s.idSerie}
                                        className="bg-white text-slate-900"
                                    >
                                        {s.nombre}
                                    </option>
                                ))}
                            </select>

                        </div>

                        {error && (
                            <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </p>
                        )}

                        {success && (
                            <div>
                                <p role="status" className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                                    {success}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading ? 'Guardando...' : 'Crear personaje'}
                        </button>
                    </form>
                </div>
            </section>
        )
    }
}
