import React from 'react';
import { withNamespaces } from 'react-i18next';
import { NavLink } from 'react-router-dom'
import './SiteHeader.css';

function SiteHeader(props) {
    const t = props.t;
    const { i18n } = props;
    return <React.Fragment>
        <div className="cssSiteTitle">{t('SiteTitle')}</div>
        <div className="cssChangeLang">
            <button onClick={() => i18n.changeLanguage('en')}>en</button>
            <button onClick={() => i18n.changeLanguage('fi')}>fi</button>
        </div>
        <div className="cssTopNav">
            <NavLink exact to='/' rel="noopener noreferrer" activeClassName="cssNav1A">Home</NavLink>
            <NavLink strict to='/customers' rel="noopener noreferrer" activeClassName="cssNav1A">Customers</NavLink>
        </div>
    </React.Fragment>
}

export default withNamespaces('lang')(SiteHeader);