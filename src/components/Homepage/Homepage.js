import React from 'react'
import './Homepage.css';

class Homepage extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return <React.Fragment>
            <div className="cssPageHeader">Welcome to React demo application!</div>
            <div className="cssPageBody">
                <p className="cssFirstPara">This application shows how some common web application features could be build with React. This is a responsive Single Page Application.</p>
                <table className="cssTable" id="idHomepageTable">
                    <tbody>
                    <tr>
                        <td>Routing:</td>
                        <td><a href="https://reacttraining.com/react-router/web/" rel="noopener noreferrer" target="_blank">React Router</a></td>
                    </tr>
                    <tr>
                        <td>Internationalization:</td>
                        <td><a href="https://react.i18next.com/" rel="noopener noreferrer" target="_blank">react-i18next</a></td>
                    </tr>
                    <tr>
                        <td>Icons:</td>
                        <td><a href="https://github.com/FortAwesome/react-fontawesome" rel="noopener noreferrer" target="_blank">react-fontawesome</a></td>
                    </tr>
                    <tr>
                        <td>Dropdown menus:</td>
                        <td><a href="https://www.npmjs.com/package/react-simple-dropdown" rel="noopener noreferrer" target="_blank">React Simple Dropdown</a></td>
                    </tr>
                    <tr>
                        <td>AJAX:</td>
                        <td><a href="https://api.jquery.com/jQuery.ajax/" rel="noopener noreferrer" target="_blank">jQuery AJAX</a></td>
                    </tr>
                    <tr>
                        <td>Simple table with sorting and filtering:</td>
                        <td>Own code</td>
                    </tr>
                    <tr>
                        <td>Form with different field types; text, select, radio button, textarea:</td>
                        <td>Own code</td>
                    </tr>
                    <tr>
                        <td>Searchable select list:</td>
                        <td><a href="https://react-select.com/home" rel="noopener noreferrer" target="_blank">React Select</a></td>
                    </tr>
                    <tr>
                        <td>Date picker:</td>
                        <td><a href="https://www.npmjs.com/package/react-datepicker" rel="noopener noreferrer" target="_blank">React Date Picker</a></td>
                    </tr>
                    <tr>
                        <td>Form validation:</td>
                        <td>Own code</td>
                    </tr>
                    <tr>
                        <td>Popup:</td>
                        <td><a href="http://minutemailer.github.io/react-popup/" rel="noopener noreferrer" target="_blank">React Popup</a></td>
                    </tr>
                    <tr>
                        <td>Charts:</td>
                        <td><a href="https://github.com/jerairrest/react-chartjs-2" rel="noopener noreferrer" target="_blank">react-chartjs-2</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    }

}

export default Homepage
