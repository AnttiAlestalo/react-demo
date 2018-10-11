import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Homepage from '../Homepage/Homepage'
import Customers from '../Customers/Customers'

const SiteBody = () => (
    <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/customers' component={Customers}/>
    </Switch>
);

export default SiteBody
