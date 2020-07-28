import React from 'react';
import ACpage from './Service/ACpage';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ACpage} />
  
    </div>
  );
}

export default App;
