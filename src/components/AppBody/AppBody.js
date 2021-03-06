import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Homepage from '../Homepage/Homepage'
import Customers from '../Customers/Customers'
import CustomerEdit from '../Customer/CustomerEdit'
import CustomerRead from '../Customer/CustomerRead'
import Reports from '../Reports/Reports'

const AppBody = () => (
    <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/index.html' component={Homepage}/>
        <Route exact path='/customers' component={Customers}/>
        <Route path='/customers/read/' component={CustomerRead}/>
        <Route path='/customers/edit/' component={CustomerEdit}/>
        <Route exact path='/reports' component={Reports}/>
    </Switch>
);

export default AppBody
