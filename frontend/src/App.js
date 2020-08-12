import React from 'react';
import ACpage from './Service/ACpage';
import DFpage from './Service/DFpage';
import DoctorFitPage from './Service/DoctorFitPage';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <MainContainer>
        <Route exact path="/" component={DoctorFitPage} />
        <Route exact path="/ddd" component={DFpage} />
        <Route exact path="/hello" component={ACpage} />
      </MainContainer>
      
    </div>
  );
}

export default App;


const MainContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`;