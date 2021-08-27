import React from 'react';
import MapAPI from './MapAPI';
import './App.css';


class App extends React.Component {

  render(){
    return (
      <div>
        <header >
          <h1>
            orchards
          </h1>
        </header>
        <MapAPI/>
      </div>
    )
  }
}
export default App;