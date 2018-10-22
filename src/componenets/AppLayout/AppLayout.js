import React, { Component } from 'react';
import './AppLayout.css';
import AppHeader from '../AppHeader/AppHeader';
import AppBody from "../AppBody/AppBody";

class AppLayout extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="cssAppHeaderBg">
                    <div className="cssAppHeader">
                        <AppHeader/>
                    </div>
                </div>
                <div className="cssAppBody">
                    <AppBody/>
                </div>
            </React.Fragment>
        )
    }
}

export default AppLayout;
