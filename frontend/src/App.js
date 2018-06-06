import React, {Component, Fragment} from 'react';
import {Route, Router} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import Default from './default/view';
import DefaultHeader from './default/DefaultHeader'
import Category from './category/view';
import Post from './post/view';
import './App.css';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {createLogger} from 'redux-logger';
import createBrowserHistory from 'history/createBrowserHistory'
import NotFound from './utils/NotFound'

const history = createBrowserHistory()

const logger = createLogger()
const store = createStore(reducer, compose(applyMiddleware(thunk, logger), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

class App extends Component {
    render() {
        return (<div className="App">
            <Provider store={store}>
                <Router history={history}>
                    <Fragment>
                        <DefaultHeader/>
                        <Route exact="exact" path='/' render={() =>< Default />}/>
                        <Route exact="exact" path='/:category' render={() =>< Category />}/>
                        <Route path='/notfound' render={() =>< NotFound />}/>
                        <Route path='/:category/:postId' render={() =>< Post />}/>

                    </Fragment>
                </Router>
            </Provider>
        </div>);
    }
}

export default App;
