import React from 'react';
import $ from 'jquery';
import { withNamespaces } from 'react-i18next';
import './CustomerEdit.css';
import {jsStrRight} from "../../library";

class CustomerRead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonCustomer: {},
        };
    }

    componentDidMount() {
        let strId = jsStrRight(window.location.href, "/");
        let strUrl = "http://www.aad.fi/aad/react1.nsf/vwCustomer/" + strId + "?OpenDocument&" + Date.now();
        $.getJSON(strUrl, function(json) {
            this.setState({
                jsonCustomer: json
            });
        }.bind(this))
            .fail(function(xhr) {
                console.log("ERROR: " + xhr.responseText);
            })
    }

    jsCloseCustomer = () => {
        this.props.history.push("/customers");
    };
    jsEditCustomer = () => {
        this.props.history.push("/customers/edit/" + this.state.jsonCustomer.id);
    };

    render() {
        const t = this.props.t;
        let jsonCustomer = this.state.jsonCustomer;
        return (
            <React.Fragment>
                <div className="cssPageHeader">
                    {t('Customer')}
                    <span>
                        <button type="button" onClick={this.jsEditCustomer} className="cssButDef">{t('Edit')}</button>
                    </span>
                </div>
                <div className="cssPageBody">
                    <fieldset id="idFormPerson">
                        <div className="cssFormRow">
                            <div>{t('Status')}:</div>
                            <div>{t(jsonCustomer.fStatus)}</div>
                        </div>
                        <div className="cssFormRow">
                            <div>{t('FirstName')}:</div>
                            <div>{jsonCustomer.fFirstName}</div>
                        </div>
                        <div className="cssFormRow">
                            <div>{t('LastName')}:</div>
                            <div>{jsonCustomer.fLastName}</div>
                        </div>
                        <div className="cssFormRow">
                            <div>{t('Company')}:</div>
                            <div>{jsonCustomer.fCompany}</div>
                        </div>
                        <div className="cssFormRow">
                            <div>{t('StreetAddress')}:</div>
                            <div>{jsonCustomer.fStreetAddress}</div>
                        </div>
                        <div className="cssFormRow">
                            <div>{t('PostCode')}:</div>
                            <div>{jsonCustomer.fPostCode}</div>
                        </div>
                        <div className="cssFormRow">
                            <div>{t('City')}:</div>
                            <div>{jsonCustomer.fCity}</div>
                        </div>
                        <div className="cssFormRow">
                            <div>{t('Country')}:</div>
                            <div>{jsonCustomer.fCountry}</div>
                        </div>
                        <div className="cssFormRow">
                            <div>{t('Email')}:</div>
                            <div>{jsonCustomer.fEmail}</div>
                        </div>
                        <div className="cssFormRow">
                            <div>{t('PhoneNumber')}:</div>
                            <div>{jsonCustomer.fPhone}</div>
                        </div>

                        <div className="cssFormRow">
                            <div>{t('LastContacted')}:</div>
                            <div>{jsonCustomer.fContactDate}</div>
                        </div>
                        <div className="cssFormRow">
                            <div>{t('CustomerId')}:</div>
                            <div>{jsonCustomer.fCustomerId}</div>
                        </div>
                        <div className="cssFormRow">
                            <div>{t('AdditionalInfo')}:</div>
                            <div>{jsonCustomer.fAddInfo}</div>
                        </div>
                    </fieldset>
                </div>
            </React.Fragment>
        )
    }
}

export default withNamespaces('lang')(CustomerRead)