import React from 'react';
import {Switch, Route, Link} from 'react-router-dom'

/* views */
import Home from './components/home';
import ManagerHome from './components/manager';
import ClientHome from './components/client';
import Login from './components/login';
import PeopleList from './components/people-list';
import HeaderNavigation from "./components/HeaderNavigator";


const Routes = () => (
    <div>
        <HeaderNavigation />

        <div className="indentTop">
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/manager/:id' component={PeopleList}/>
                <Route path='/manager' component={ManagerHome}/>
                <Route path='/client' component={ClientHome}/>
                {/*<Route path='/manager/home/:id' component={}/>*/}\
            </Switch>
        </div>


    </div>
);

export default Routes;

/*
 <div className="container-fluid">
        <div className="row bg-primary text-white h4 fixed-top">
                 <HeaderNavigation />
        </div>
        <div className="row py-5">
            <Link to="/login">Login</Link>

            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/manager/:id' component={PeopleList}/>
                <Route path='/manager' component={ManagerHome}/>
                <Route path='/client' component={ClientHome}/>

</Switch>
</div>
</div>
 */