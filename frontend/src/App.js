import React from 'react';
// import ACpage from './Service/ACpage';
// import DFpage from './Service/DFpage';
import DoctorFitPage from './Service/DoctorFitPage';
import DoctorFitMenuPage from './Service/DotorFitMenuPage';

import { Route, Switch } from 'react-router-dom';

import store from './Redux/Store';
import { Provider } from 'react-redux';

import styled, { createGlobalStyle } from 'styled-components';
import NOTOSANSKR from './Styles/Fonts/NotoSansKR-Regular.otf';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <GlobalStyle></GlobalStyle>
        <MainContainer>
          <SubContainer>
            <Switch>
              <Route exact path="/" component={DoctorFitPage} />
              <Route exact path="/menu" component={DoctorFitMenuPage} />
            </Switch>
          </SubContainer>
        </MainContainer>
      </Provider>
    </div>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: NotoSansKR;
    font-style: normal;
    src: url(${NOTOSANSKR}) format('opentype');
  }
  body {
    margin: 0;
    padding: 0;
    font-family: NotoSansKR;
  }
`;

const MainContainer = styled.div`
    // border: 1px solid green;
    width: 100%;
    // display: -webkit-flex;
    // display: flex;
    
    // -webkit-justify-content: center;
    // justify-content: center;
    
    // // -webkit-align-items: center;
    // // align-items: center;

    // -webkit-flex-direction: column;
    // -moz-flex-direction: column;
    // -ms-flex-direction: column;
    // -o-flex-direction: column;
    // flex-direction: column;
`;

const SubContainer = styled.div`
    border: 1px solid green;
    max-width: 600px;
    min-height: 100vh;
    margin: 0 auto;
  `;