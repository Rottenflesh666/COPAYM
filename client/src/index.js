import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import "./client.css";

import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from "react-hot-loader";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './routes';
import loginStore from './stores/login-store';
import managerStore from './stores/manager-store';

/*добавляем иконки в проект */
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faChartBar, faComments, faUsers,
    faRubleSign, faHome, faArrowLeft,
    faSignInAlt, faSignOutAlt, faExclamationTriangle,
    faUserPlus, faUserMinus, faUserTag,
    faHotTub, faTint, faBolt, faFire, faScrewdriver,  faThermometerThreeQuarters
} from '@fortawesome/free-solid-svg-icons';
library.add(faComments, faChartBar, faRubleSign, faExclamationTriangle,
    faHome, faSignInAlt, faSignOutAlt, faUsers, faArrowLeft,
    faUserPlus, faUserMinus, faUserTag,
    faHotTub, faTint, faBolt, faFire, faScrewdriver,  faThermometerThreeQuarters);

const store = {
  loginStore: loginStore,
  managerStore: managerStore
};


const root = document.createElement('div');
root.id = 'app';
document.body.appendChild(root);

const renderApp = Component => {
  render(
    <AppContainer>
      <Router>
        <Provider {...store}>
          <Component />
        </Provider>
      </Router>
    </AppContainer>,
    document.getElementById('app')
  );
};

renderApp(Routes);

if (module.hot) {
  module.hot.accept(() => renderApp(Routes));
}
