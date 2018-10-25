import React from 'react';
import './AppLayout.css';
import AppHeader from '../AppHeader/AppHeader';
import AppBody from "../AppBody/AppBody";

function AppLayout() {
    return (
        <React.Fragment>
            <div className="cssAppHeaderBg">
                <div className="cssAppHeaderBgTop"></div>
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

export default AppLayout;
