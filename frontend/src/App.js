import React from "react";
// import ACpage from './Service/ACpage';
// import DFpage from './Service/DFpage';
import SelectMyPetPage from "./Service/Common/SelectMyPetPage";
import DoctorFitMenuPage from "./Service/Common/DotorFitMenuPage";

import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./Redux/Store";

import styled, { createGlobalStyle } from "styled-components";
import AddMyPetPage from "./Service/Common/AddMyPetPage";
import ModifyMyPetPage from "./Service/Common/ModifyMyPetPage";

import SurveyResult from "./Service/NutrientFit/SurveyResult";
import GoodnessOfFit from "./Service/NutrientFit/GoodnessOfFit";
import GoodnessOfFitContainer from "./containers/GoodnessOfFitContainer";

import PaymentPage from "./Service/NutrientFit/PaymentPage";
import RecommendFitContainer from "./containers/RecommendFitContainer";
import Loading from "./Components/Useful/Loading";
import NutrientPreviewModal from "./Components/NutrientFit/NutrientPreviewModal/NutrientPreviewModal";
import MusicMainPage from "./Service/MusicFit/MusicMainPage";
import ResultMaterialContainer from "./containers/ResultMaterialContainer";
import PaymentPageContainer from "./containers/PaymentPageContainer";
import SelfMake from "./Service/NutrientFit/SelfMake";
import SelfMakeContainer from "./containers/SelfMakeContainer";
import SelfMakeList from "./Service/NutrientFit/SelfMakeList";
import SelfMakeListContainer from "./containers/SelfMakeListContainer";

import PageNotFound from './Components/Useful/404';

const { store, persistor } = configureStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <GlobalStyle></GlobalStyle> */}
          <MainContainer>
            <SubContainer>
              <Switch>
                <Route exact path="/add-my-pet" component={AddMyPetPage} />
                <Route
                  exact
                  path="/modify-my-pet"
                  component={ModifyMyPetPage}
                />
                <Route exact path="/" component={SelectMyPetPage} />
                <Route exact path="/menu" component={DoctorFitMenuPage} />

                <Route
                  exact
                  path="/Recommend-survey"
                  component={RecommendFitContainer}
                />
                <Route
                  exact
                  path="/Survey-result"
                  component={ResultMaterialContainer}
                />
                <Route
                  exact
                  path="/goodness-of-fit"
                  component={GoodnessOfFitContainer}
                />
                <Route
                  exact
                  path="/payment-page"
                  component={PaymentPageContainer}
                />
                <Route exact path="/self-make" component={SelfMakeContainer} />
                <Route
                  exact
                  path="/selfmakelist"
                  component={SelfMakeListContainer}
                />
                <Route exact path="/loading" component={Loading} />

                <Route exact path="/music" component={MusicMainPage} />
                <Route component={PageNotFound} />
              </Switch>
            </SubContainer>
          </MainContainer>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;

// const GlobalStyle = createGlobalStyle`
//   @font-face {font-family: 'NotoSansKR'; font-style: normal; font-weight: 100; src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.otf) format('opentype');}
//   @font-face {font-family: 'NotoSansKR'; font-style: normal; font-weight: 300; src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.otf) format('opentype');}
//   @font-face {font-family: 'NotoSansKR'; font-style: normal; font-weight: 400; src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf) format('opentype');}
//   @font-face {font-family: 'NotoSansKR'; font-style: normal; font-weight: 500; src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.otf) format('opentype');}
//   @font-face {font-family: 'NotoSansKR'; font-style: normal; font-weight: 700; src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.otf) format('opentype');}
//   @font-face {font-family: 'NotoSansKR'; font-style: normal; font-weight: 900; src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.otf) format('opentype');}
//   * {box-sizing: border-box; -webkit-highlight: none; -webkit-tap-highlight-color: transparent; text-decoration: none;}
//   body {margin: 0; padding: 0; font-family: NotoSansKR;}
//   a {display: contents;}
// `;

const MainContainer = styled.div`
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
  /* border: 1px solid red; */
  position: relative;
  box-sizing: border-box;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 15px;
`;
