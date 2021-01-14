import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from 'App';
import store from 'app/store';

import * as serviceWorker from 'serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
