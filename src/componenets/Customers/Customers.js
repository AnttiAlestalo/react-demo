import React from 'react';
import { withNamespaces } from 'react-i18next';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import * as lib from "../../library";
import './Customers.css';

class Customers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            aHeaders: ["fName", "fEmail", "fPhone", "fCustomerId"],
            strSearch: "",
            strSortBy: "fName",
            bDescending: false,
            aCustomers: []
        };
    }

    componentDidMount() {
        let strUrl = window.location.href.indexOf("localhost") > 0 ? "http://localhost:3000/participants.json" : "http://www.aad.fi/aad/react1.nsf/vwCustomers?OpenView&" + Date.now();
        $.getJSON(strUrl, function(aJson) {
            aJson.pop();
            this.setState({
                aCustomers: aJson
            });
        }.bind(this))
            .fail(function(xhr) {
                console.log("ERROR: " + xhr.responseText);
            })
    }

    jsSortBy(strCol) {
        let aCustomers = this.state.aCustomers.slice();
        let bDescending = (strCol === this.state.strSortBy ? !this.state.bDescending : false);
        aCustomers.sort( lib.jsSort(strCol, (strCol === "fPhone"), bDescending) );
        this.setState({
            strSortBy: strCol,
            bDescending: bDescending,
            aCustomers: aCustomers
        })
    };

    jsSearchTable = (event) => {
        let strSearch = event.target.value.toLowerCase();
        this.setState({
            strSearch: strSearch
        })
    };

    jsAddPerson = () => {
        this.props.history.push("customers/0");
    };

    jsEditCustomer(id) {
        this.props.history.push("customers/" + id);
    }

    render() {
        const t = this.props.t;
        let aCustomers = this.state.aCustomers.slice();
        if (this.state.strSearch !== "") {
            aCustomers = aCustomers.filter(person => { return (
                (person.fName.toLowerCase().indexOf(this.state.strSearch) > -1) ||
                (person.fEmail.toLowerCase().indexOf(this.state.strSearch) > -1) ||
                (person.fPhone.toLowerCase().indexOf(this.state.strSearch) > -1)
            )});
        }

        let aIcons = this.state.aHeaders.map(strHeader => {
            return (this.state.strSortBy === strHeader ? (this.state.bDescending ? <FontAwesomeIcon icon={faLongArrowAltUp} color="green" className="cssSortIcon" /> : <FontAwesomeIcon icon={faLongArrowAltDown} color="green" className="cssSortIcon" />) : "")
        });

        return <React.Fragment>
            <table id="idParticipantsTable" className="cssTable">
                <caption>
                    {t('Customers')}
                    <input name="fFilterName" type="text" placeholder={t('Search')} value={this.state.strSearch} onChange={this.jsSearchTable} />
                    <button type="button" className="cssButDef" onClick={this.jsAddPerson}>{t('AddNew')}</button>
                </caption>
                <thead>
                <tr>
                    <th onClick={() => this.jsSortBy("fName")}>{t('Name')} {aIcons[0]}</th>
                    <th onClick={() => this.jsSortBy("fEmail")}>{t('Email')} {aIcons[1]}</th>
                    <th onClick={() => this.jsSortBy("fPhone")}>{t('PhoneNumber')} {aIcons[2]}</th>
                    <th onClick={() => this.jsSortBy("fCustomerId")}>{t('CustomerId')} {aIcons[3]}</th>
                </tr>
                </thead>
                <tbody>
                    {aCustomers.map(person => {
                        return <tr key={person.id} onClick={() => this.jsEditCustomer(person.id)}>
                            <td>{person.fName}</td>
                            <td>{person.fEmail}</td>
                            <td>{person.fPhone}</td>
                            <td>{person.fCustomerId}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </React.Fragment>
    }
}

export default withNamespaces('lang')(Customers)