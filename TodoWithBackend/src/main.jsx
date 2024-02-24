import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.css"
import App from './App.jsx'
import './App.css'
import {BrowserRouter as Router} from 'react-router-dom'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
