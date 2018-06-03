import React, { Component,Fragment } from 'react';
import { Route,Switch } from 'react-router-dom';
import { createStore, applyMiddleware ,compose} from 'redux';
import {Provider } from 'react-redux';
import Default from './default/view';
import Category from './category/view';
import Post from './post/view';
import './App.css';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { createLogger } from 'redux-logger';

const logger= createLogger()
const store = createStore(
    reducer,
    compose(applyMiddleware(thunk,logger),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

)
class App extends Component {
  render() {
    return (
      <div className="App">
          <Provider store={store}>
              <Switch>
                  <Route
                      exact
                      path='/'
                      component={Default}
                      />
                  <Route
                      path='/category'
                     component={Category}
                      />
                  <Route
                      path='/post'
                     component={Post}
                      />
              </Switch>
          </Provider>
      </div>
    );
  }
}

export default App;
