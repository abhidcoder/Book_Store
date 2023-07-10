import React from 'react';
import ReactDOM from 'react-dom';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import App from './App';
import CheckOut from './checkOut';
import {BookProvider} from './createContext'
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
  <BookProvider>
  <BrowserRouter>
  <Routes>
    <Route index element={<App/>} />
    <Route path="/check_out" element={<CheckOut/>} />
  </Routes>
  </BrowserRouter>
  </BookProvider>
  </div>
);