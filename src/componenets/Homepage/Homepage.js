import React from 'react'

const Homepage = () => (
    <React.Fragment>
        <div className="cssPageHeader">
            Welcome to React demo application!
        </div>
        <div className="cssPageBody">
            <p className="cssFirstPara">This application shows how some common web application features are build with React. This is a single page application.</p>
            <p>
                Routing: <a href="https://reacttraining.com/react-router/web/" rel="noopener noreferrer" target="_blank">React Router</a><br/>
                Internationalization: <a href="https://react.i18next.com/" rel="noopener noreferrer" target="_blank">react-i18next</a><br/>
                Icons: <a href="https://github.com/FortAwesome/react-fontawesome" rel="noopener noreferrer" target="_blank">react-fontawesome</a><br/>
                Dropdown menus: <a href="https://www.npmjs.com/package/react-simple-dropdown" rel="noopener noreferrer" target="_blank">React Simple Dropdown</a><br/>
                AJAX: <a href="https://api.jquery.com/jQuery.ajax/" rel="noopener noreferrer" target="_blank">jQuery AJAX</a><br/>
                Simple table with sorting and filtering: Own code<br/>
                Form with all different field types, text, select, radio button, checkbox, textarea: Own code<br/>
                Searchable select list: <br/>
                Date picker: <br/>
                Form validation: Own code<br/>
                Popup: <a href="http://minutemailer.github.io/react-popup/" rel="noopener noreferrer" target="_blank">React Popup</a><br/>
                Bar chart: <br/>
            </p>
        </div>
    </React.Fragment>
);

export default Homepage
