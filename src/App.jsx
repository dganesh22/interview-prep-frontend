import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Dashboard from './pages/Home/Dashboard'
import InterviewPage from './pages/InterviewPrep/InterviewPage'
import LandingPage from './pages/LandingPage'
import NotFound from './pages/Default/NotFound'


function App() {
  return (
     <>
       <BrowserRouter>
        <Routes>
            <Route path={`/`} element={<LandingPage/>} />
            <Route path={`/login`} element={<Login/>} />
            <Route path={`/signup`} element={<Signup/>} />
            <Route path={`/dashboard`} element={<Dashboard/>} />
            <Route path={`/interview-prep/:sessionId`} element={<InterviewPage/>} />
            <Route path={`/*`} element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
     <Toaster  toastOptions={{
      className: "",
      style: {
        fontSize: "13px"
      }
     }} />
     </>
  )
}

export default App
