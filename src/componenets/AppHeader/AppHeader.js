import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withNamespaces } from 'react-i18next';
import { NavLink } from 'react-router-dom'
import './AppHeader.css';
import logo from './logo.svg';
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

function AppHeader(props) {
    const t = props.t;
    const { i18n } = props;

    return <React.Fragment>
        <Dropdown id="idDropdownSettings">
            <DropdownTrigger><FontAwesomeIcon icon={faCog} color="white" size="2x" title={t('Settings')} /></DropdownTrigger>
            <DropdownContent>
                <div>Select language:</div>
                <div className="cssSelection" onClick={() => i18n.changeLanguage('en')}>English</div>
                <div className="cssSelection" onClick={() => i18n.changeLanguage('fi')}>Finnish</div>
            </DropdownContent>
        </Dropdown>
        <div className="cssAppHeaderContainer">
            <img src={logo} className="cssAppLogo" alt="logo" />
            <div className="cssSiteTitle">{t('SiteTitle')}</div>

            <div className="cssTopNav">
                <NavLink exact to='/' rel="noopener noreferrer" activeClassName="cssNav1A">{t('Home')}</NavLink>
                <NavLink strict to='/customers' rel="noopener noreferrer" activeClassName="cssNav1A">{t('Customers')}</NavLink>
                <NavLink exact to='/reports' rel="noopener noreferrer" activeClassName="cssNav1A">{t('Reports')}</NavLink>
            </div>
        </div>
    </React.Fragment>
}

export default withNamespaces('lang')(AppHeader);