import React from 'react';
import {Switch, Route, Link} from 'react-router-dom'

/* views */
import Home from './components/home';
import ManagerHome from './components/manager';
import ClientHome from './components/client';
import ClientData from './components/client/ClientData';
import Login from './components/login';
import PeopleList from './components/people-list';
import HeaderNavigation from "./components/HeaderNavigator";
import NotFound from "./components/notfound";


const Routes = () => (
    <div>
        <HeaderNavigation />

        <div className="indentTop">
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/manager/:id' component={PeopleList}/>
                <Route path='/manager' component={ManagerHome}/>
                <Route path='/client/:id/:id' component={ClientData}/>
                <Route path='/client/:id' component={ClientHome}/>
                <Route component={NotFound}/>
            </Switch>

        </div>


    </div>
);

export default Routes;