import React from 'react';
import { withNamespaces } from 'react-i18next';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import * as lib from "../../js/library";
import './Customers.css';

class Customers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            aHeaders: ["fName", "fEmail", "fPhone", "fCountry"],
            strSearch: "",
            strSortBy: "fName",
            bDescending: false,
            aCustomers: []
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let strUrl = window.location.href.indexOf("localhost") > 0 ? "http://localhost:3000/customers.json" : "http://www.aad.fi/aad/react1.nsf/vwCustomers?OpenView&" + Date.now();
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

    jsReadCustomer(id) {
        this.props.history.push("customers/read/" + id);
    }

    jsEditCustomer(id) {
        this.props.history.push("customers/edit/" + id);
    }

    render() {
        const t = this.props.t;
        let aCustomers = this.state.aCustomers.slice();
        if (this.state.strSearch !== "") {
            aCustomers = aCustomers.filter(customer => { return (
                (customer.fName.toLowerCase().indexOf(this.state.strSearch) > -1) ||
                (customer.fEmail.toLowerCase().indexOf(this.state.strSearch) > -1) ||
                (customer.fPhone.toLowerCase().indexOf(this.state.strSearch) > -1) ||
                (customer.fCountry.toLowerCase().indexOf(this.state.strSearch) > -1)
            )});
        }

        let aIcons = this.state.aHeaders.map(strHeader => {
            return (this.state.strSortBy === strHeader ? (this.state.bDescending ? <FontAwesomeIcon icon={faLongArrowAltUp} color="green" className="cssSortIcon" /> : <FontAwesomeIcon icon={faLongArrowAltDown} color="green" className="cssSortIcon" />) : "")
        });

        return <React.Fragment>
            <div className="cssPageBody">
                <table id="idCustomersTable" className="cssTable">
                    <caption>
                        {t('Customers')} <span className="cssSmall">({this.state.aCustomers.length})</span>
                        <input name="fFilterName" type="text" placeholder={t('Search')} value={this.state.strSearch} onChange={this.jsSearchTable} />
                        <button type="button" className="cssButDef" onClick={() => this.jsEditCustomer("0")}>{t('AddNew')}</button>
                    </caption>
                    <thead>
                    <tr>
                        <th onClick={() => this.jsSortBy("fName")}>{t('Name')} {aIcons[0]}</th>
                        <th onClick={() => this.jsSortBy("fEmail")}>{t('Email')} {aIcons[1]}</th>
                        <th onClick={() => this.jsSortBy("fPhone")}>{t('PhoneNumber')} {aIcons[2]}</th>
                        <th onClick={() => this.jsSortBy("fCountry")}>{t('Country')} {aIcons[3]}</th>
                    </tr>
                    </thead>
                    <tbody>
                        {aCustomers.map(customer => {
                            return <tr key={customer.id} onClick={() => this.jsReadCustomer(customer.id)}>
                                <td>{customer.fName}</td>
                                <td>{customer.fEmail}</td>
                                <td>{customer.fPhone}</td>
                                <td>{customer.fCountry}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    }
}

export default withNamespaces('lang')(Customers)