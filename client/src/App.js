import React, { createContext ,useReducer} from 'react'
import 'bootstrap/dist/css/bootstrap.css'

import { Routes, Route } from "react-router-dom";

import './css/style.css'

import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout'
import ErrorPage from './components/ErrorPage';
import { initialState } from './components/reducer/useReducer';
import { reducer } from './components/reducer/useReducer';

export const userContext = createContext();

const App = () => {

  //conteext API 
  const [state, dispatch] = useReducer(reducer, initialState)


  return (
    <>
      <userContext.Provider value={{state , dispatch}}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>

      </userContext.Provider>

    </>
  )
}

export default App