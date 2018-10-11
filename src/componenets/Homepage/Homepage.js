import React from 'react'

const Homepage = () => (
    <React.Fragment>
        <div className="cssPageHeader">
            Welcome to React demo application!
        </div>
        <div className="cssPageBody">
            <p>This site is implemented with React.</p>
            <p>
                Routing: <a href="https://reacttraining.com/react-router/web/" rel="noopener noreferrer" target="_blank">React Router</a><br/>
                AJAX: <br/>
                Popup: <br/>
            </p>
        </div>
    </React.Fragment>
);

export default Homepage
