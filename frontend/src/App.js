import React from 'react';
import ACpage from './Service/ACpage';
import DFpage from './Service/DFpage';
import DoctorFitPage from './Service/DoctorFitPage';

import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <Route exact path="/" component={DoctorFitPage} />
      <Route exact path="/ddd" component={DFpage} />
      <Route exact path="/hello" component={ACpage} />
    </div>
  );
}

export default App;
