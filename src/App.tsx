import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import './App.scss'
import AppMenu from './components/AppMenu/AppMenu'
import CalculadoraEstatistica from './pages/CalculadoraEstatistica/CalculadoraEstatistica.page'
import GeradorDocumento from './pages/GeradorDocumento/GeradorDocumento'
import Home from './pages/Home/Home.page'
import LoginPage from './pages/Login/Login.page'
import MapChart from './pages/MapChart/MapChart.page'

function App() {
  return (
    <BrowserRouter>
    <AppWrapper>
      <AppMenu/>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='calculadora' element={<CalculadoraEstatistica/>}></Route>
          <Route path='map-chart' element={<MapChart/>}></Route>
          <Route path='gerador-documento' element={<GeradorDocumento/>}></Route>
          <Route path='/logout' element={<LoginPage/>}></Route>
        </Routes>
      </main>
    </AppWrapper>
    </BrowserRouter>
  )
}

export default App

const AppWrapper = styled.section`
  display: grid;
  grid-template-columns: auto 1fr;
  
  main {
    background-color: white;
    border-radius: 20px 0 0 20px;
    height: 100vh;
    overflow: scroll;
    padding: 50px;
  }
`;
