import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import {CompanyListPageConnected, EmployeeListPageConnected, FrontPage, NotFoundPage} from './pages';
import { NavigationAppBar, ErrorsConnected } from './components';

import './styles/styles.css';

class App extends Component {

    render() {
        return (
            <Router>
                <NavigationAppBar />
                <main role="main" className="container">
                    <ErrorsConnected />
                    <Switch>
                        <Route exact path="/" component={FrontPage} />
                        <Route path="/companies" component={CompanyListPageConnected} />
                        <Route path="/employees" component={EmployeeListPageConnected} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </main>
            </Router>
        );
    }
}

export default App;

