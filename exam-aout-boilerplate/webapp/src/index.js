import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom'
import { JokesProvider } from 'contexts/JokesContext';
import 'index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<JokesProvider><Router> <App /> </Router></JokesProvider>);
