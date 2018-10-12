import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Homepage from '../Homepage/Homepage'
import Customers from '../Customers/Customers'
import Reports from '../Reports/Reports'

const AppBody = () => (
    <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/customers' component={Customers}/>
        <Route exact path='/reports' component={Reports}/>
    </Switch>
);

export default AppBody