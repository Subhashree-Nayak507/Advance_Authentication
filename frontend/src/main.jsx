import {BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import authStore from "./store/authStore.js"
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
    <Provider store={authStore}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>

    
)
