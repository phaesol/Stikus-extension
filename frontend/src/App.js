import React from 'react';
import ACpage from './Service/ACpage';
import DFpage from './Service/DFpage';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={DFpage} />
      <Route exact path="/hello" component={ACpage} />
    </div>
  );
}

export default App;
