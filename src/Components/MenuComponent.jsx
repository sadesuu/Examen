import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import serviceSeries from '../Services/serviceSeries'

const linkClasses = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
        ? 'bg-slate-900 text-white'
        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`




export default class MenuComponent extends Component {
    service = new serviceSeries()
    state = {
        isSeriesOpen: false,
        series: []
    }

    toggleSeriesMenu = () => {
        this.setState(({ isSeriesOpen }) => ({
            isSeriesOpen: !isSeriesOpen
        }))
    }

    closeSeriesMenu = () => {
        this.setState({ isSeriesOpen: false })
    }

        loadSeries = async () => {
        let datos = await this.service.getAllSeries()
        this.setState({
            series: datos
        })
    }

    componentDidMount = async () => {
        await this.loadSeries()
    }

    render() {
        const { isSeriesOpen } = this.state

        return (
            <nav className="bg-slate-800 shadow-lg" aria-label="Navegación principal">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <NavLink
                        to="/"
                        className="text-xl font-bold tracking-tight text-white"
                        onClick={this.closeSeriesMenu}
                    >
                        Series
                    </NavLink>

                    <div className="flex items-center gap-1">
                        <NavLink to="/" className={linkClasses}>
                            Home
                        </NavLink>
                        <NavLink to="/nuevo-personaje" className={linkClasses}>
                            Nuevo personaje
                        </NavLink>
                        <NavLink to="/editar-personaje" className={linkClasses}>
                            Modificar personaje
                        </NavLink>

                        <div className="relative">
                            <button
                                type="button"
                                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                                aria-expanded={isSeriesOpen}
                                aria-haspopup="true"
                                onClick={this.toggleSeriesMenu}
                            >
                                Series
                                <svg
                                    className={`h-4 w-4 transition-transform ${isSeriesOpen ? 'rotate-180' : ''
                                        }`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            {isSeriesOpen && (
                                <div className="absolute right-0 z-10 mt-2 max-h-80 w-64 overflow-y-auto rounded-lg bg-white p-2 shadow-xl ring-1 ring-black ring-opacity-5">
                                    {this.state.series.map((s) => (
                                        <NavLink
                                            key={s.idSerie}
                                            to={`/serie/${s.idSerie}`}
                                            onClick={this.closeSeriesMenu}
                                            className="block rounded-md px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-indigo-700"
                                        >
                                            {s.nombre}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
