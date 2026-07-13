import { useState } from 'react'
import './App.css'
import AddFlight from './components/AddFlight'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ViewAll from './components/ViewAll'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<AddFlight />} />
          <Route path="add" element={<AddFlight/>} />
          <Route path="view" element={<ViewAll />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
