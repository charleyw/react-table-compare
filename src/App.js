import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './AntDTable';
import FixedDataTable from './FixedDataTable';

class App extends Component {
  render() {
    return (
      <FixedDataTable/>
    );
  }
}

export default App;
