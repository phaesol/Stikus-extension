import React from 'react';
import ACpage from './Service/ACpage';
import NCpage from './Service/NCpage';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={NCpage} />
      <Route exact path="/hello" component={ACpage} />
    </div>
  );
}

export default App;
