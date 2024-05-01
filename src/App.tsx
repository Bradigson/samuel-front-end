import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/home/select.music.home';
import AllRouters from './routes/select.music.routers';
import Header from './components/cuzton_components/header/select.music.header';
import Products from './components/all_service_provider/music.select.products';

function App() {
  return (
    <div className="App">
      <AllRouters/>
    </div>
  );
}

export default App;
