import React, {Component} from 'react';
import {browserHistory, IndexRedirect, Route, Router, withRouter} from 'react-router';
import List from './containers/blogPosts/list';
import NotFoundPage from './components/NotFoundPage';
import Create from './containers/blogPosts/create';
import Update from './containers/blogPosts/update';

import 'bootstrap';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import '../app.css';

//prevent
Bootstrap.toString();

export default class App extends Component {

    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/">
                    <IndexRedirect to="/posts" />
                </Route>
                <Route path="/posts" component={List} />
                <Route path="/posts/create" component={withRouter(Create)} />
                <Route path="/posts/update/:postId" component={withRouter(Update)} />
                <Route path="*" component={NotFoundPage} />
            </Router>
        );
    }
}
