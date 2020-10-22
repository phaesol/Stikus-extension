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

const { store, persistor } = configureStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
              </Switch>
            </SubContainer>
          </MainContainer>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;

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
  border: 1px solid red;
  position: relative;
  box-sizing: border-box;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 15px;
`;
