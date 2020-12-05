import React from 'react';
import logo from './logo.svg';
import './App.css';
import PokeList from './components/pokeList'
import Visualizacion from './components/visualizacion'
import {FormattedMessage} from 'react-intl';

function App(props) {
  return (
    <div className="App">
      <h1><FormattedMessage id="Title"/></h1>
      <PokeList lan ={props.lan}/>
      <hr></hr>
      <Visualizacion lan ={props.lan}/>
    </div>
  );
}

export default App;
