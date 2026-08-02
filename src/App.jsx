import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Create from './Components/Create'
import './App.css'
import List from './Components/List';
import { LoaderProvider } from './Components/LoaderContext';


function App() {
  // const { setLoading } = useLoader() 
  return (
    <LoaderProvider>
      <div className='container'>
        <h1>Contact Info</h1>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Create />} ></Route>
            <Route exact path='/contact-list' element={<List />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </LoaderProvider>
    // <></>
  )
}

export default App
