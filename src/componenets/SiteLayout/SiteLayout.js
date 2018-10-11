import React, { Component } from 'react';
import './SiteLayout.css';
import SiteHeader from '../SiteHeader/SiteHeader';
import SiteBody from "../SiteBody/SiteBody";

class SiteLayout extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="cssSiteHeaderBg">
                    <div className="cssSiteHeader">
                        <SiteHeader/>
                    </div>
                </div>
                <div className="cssSiteBodyBg">
                    <div className="cssSiteBody" id="idPage">
                        <SiteBody/>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default SiteLayout;
