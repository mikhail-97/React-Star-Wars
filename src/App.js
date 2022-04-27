import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import './App.css'
import {Planets, Planet} from './pages';
import {ErrorBoundary, Header, NotFoundIndicator, SwapiServiceProvider} from './components';
import {Api} from "./services/api";

const routeList = [
    {
        path: '/planets/',
        component: Planets,
        isExact: true,
    },
    {
        path: '/planet/:id',
        component: Planet,
        isExact: true,
    }
  ]


class App extends React.Component {
    state = {
        swapiService: new Api(),
        hasError: false,
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true })
    }


    render() {
        return (
            <ErrorBoundary>
                <div className="App">
                    <SwapiServiceProvider value={this.state.swapiService} >
                        <Router>
                            <Header/>
                            <Switch>
                                {routeList.map(({path, component, isExact}) =>
                                    <Route component={component} key={path} path={path} exact={isExact}/> )
                                }
                                <Redirect to={'/planets/?page=1'}/>
                                <Route component={NotFoundIndicator}/>
                            </Switch>
                        </Router>
                    </SwapiServiceProvider>
                </div>
            </ErrorBoundary>
        );
    }


}

export default App;
