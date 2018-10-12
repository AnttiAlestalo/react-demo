import React from 'react'

const Homepage = () => (
    <React.Fragment>
        <div className="cssPageHeader">
            Welcome to React demo application!
        </div>
        <div className="cssPageBody">
            <p>This application shows how some common web application features are build with React. This is a single page application.</p>
            <p>
                Routing: <a href="https://reacttraining.com/react-router/web/" rel="noopener noreferrer" target="_blank">React Router</a><br/>
                Internationalization: <a href="https://react.i18next.com/" rel="noopener noreferrer" target="_blank">react-i18next</a><br/>
                Icons: <a href="https://github.com/FortAwesome/react-fontawesome" rel="noopener noreferrer" target="_blank">react-fontawesome</a><br/>
                Dropdown menu: <a href="https://www.npmjs.com/package/react-simple-dropdown" rel="noopener noreferrer" target="_blank">React Simple Dropdown</a><br/>

                AJAX: <br/>
                Popup: <br/>
            </p>
        </div>
    </React.Fragment>
);

export default Homepage
