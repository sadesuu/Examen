import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import HomeComponent from './HomeComponent'
import SerieComponent from './SerieComponent'
import PersonajesComponent from './PersonajesComponent'
import CreatePersonaje from './CreatePersonaje'
import EditPersonajes from './EditPersonajes'

export default class Router extends Component {
    render() {
        function SeriesComponentElement(){
            const {id} = useParams()
            return <SerieComponent id = {id}/>
        }

        function PersonajesComponentElement(){
            const {id} = useParams()
            return <PersonajesComponent id = {id}/>
        }
        return (
            <BrowserRouter>
                <MenuComponent/>
                <main>
                    <Routes>
                        <Route path='/' element={<HomeComponent/>} />
                        <Route path='/serie/:id' element={<SeriesComponentElement/>} />
                        <Route path='/personajes/:id' element={<PersonajesComponentElement/>} />
                        <Route path='/nuevo-personaje' element={<CreatePersonaje/>} />
                        <Route path='/editar-personaje' element={<EditPersonajes/>} />




                    </Routes>
                </main>
            </BrowserRouter>
        )
    }
}
