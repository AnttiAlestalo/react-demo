import React from 'react';
import $ from 'jquery';
import { withNamespaces } from 'react-i18next';
import * as lib from "../../library";
import Popup from "react-popup/dist/index";
import Select from 'react-select';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import './CustomerEdit.css';

const jsonCountries = [
    { value:'Finland', label:'Finland' },
    { value:'Sweden', label:'Sweden' }
];

class CustomerEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonSelectedCountry: null,
            customer: {
                "id":"0",
                "fStatus": "",
                "fFirstName":"",
                "fLastName":"",
                "fCountry": "",
                "fEmail": "",
                "fPhone": "",
                "fContactDate": null},
            aInvalidFields: []
        }
    }

    componentDidMount() {
        moment.updateLocale('en', {
            week: { dow:1 },
        })
    }

    jsDateChange = (oDate) => {
        let jsonCustomer = JSON.parse(JSON.stringify(this.state.customer));
        jsonCustomer.fContactDate = oDate;
        this.setState({
            customer: jsonCustomer,
        });
    };

    jsSelectChange = (jsonSelected) => {
        let jsonCustomer = JSON.parse(JSON.stringify(this.state.customer));
        jsonCustomer.fCountry = (jsonSelected === null ? "" : jsonSelected.value);
        this.setState({
            jsonSelectedCountry: jsonSelected,
            customer: jsonCustomer
        })
    };

    jsInputChange = (event) => {
        let strFieldName = event.target.name;
        let strFieldValue = event.target.value;
        let aInvalidFields = this.state.aInvalidFields;
        if (lib.jsTrim(strFieldValue) === "" || (strFieldName === "fEmail" && !lib.jsIsEmail(strFieldValue))) {
            aInvalidFields = lib.jsAddToArray(aInvalidFields, strFieldName);
        } else {
            aInvalidFields = lib.jsRemoveFromArray(aInvalidFields, strFieldName);
        }
        let jsonCustomer = JSON.parse(JSON.stringify(this.state.customer));
        jsonCustomer[strFieldName] = strFieldValue;
        this.setState({
            customer: jsonCustomer,
            aInvalidFields: aInvalidFields
        })
    };

    jsValidateCustomer = () => {
        let aInvalidFields = [];
        let jsonCustomer = this.state.customer;
        if (lib.jsTrim(jsonCustomer.fStatus) === "") aInvalidFields.push("fStatus");
        if (lib.jsTrim(jsonCustomer.fFirstName) === "") aInvalidFields.push("fFirstName");
        if (lib.jsTrim(jsonCustomer.fLastName) === "") aInvalidFields.push("fLastName");
        if (!lib.jsIsEmail(jsonCustomer.fEmail)) aInvalidFields.push("fEmail");
        if (aInvalidFields.length > 0) {
            this.setState({
                aInvalidFields: aInvalidFields
            });
            let strErrorMsg = "";
            if (aInvalidFields.indexOf("fName") > -1 || jsonCustomer.fEmail === "" || aInvalidFields.indexOf("fPhone") > -1) {
                strErrorMsg = "Please fill required fields.";
            }
            if (jsonCustomer.fEmail !== "") {
                strErrorMsg += " E-mail address is not valid.";
            }
            Popup.create({
                title: "Error",
                content: strErrorMsg,
                buttons: { right: ['ok'] }
            });
            return
        }
        this.props.jsSaveCustomer(jsonCustomer)
    };

    jsCloseCustomer = () => {
        this.props.history.push("/customers");
    };

    jsSaveCustomer = (jsonPerson) => {
        let strUrl = jsonPerson.id === "0" ? "http://www.aad.fi/aad/react1.nsf/frmPerson?CreateDocument" : "http://www.aad.fi/aad/react1.nsf/0/" + jsonPerson.id + "?SaveDocument";
        let strJson = $.param(jsonPerson);
        $.ajax({
            type: "POST",
            url: strUrl,
            data: strJson,
            success: function(strResponse){
                if (strResponse.indexOf("^OK^") < 0) {
                    alert("AJAX Error: " + strResponse);
                    return;
                }
                let aParticipants = this.state.aParticipants.slice();
                let index = aParticipants.findIndex( item => item.id === jsonPerson.id );
                aParticipants[index] = jsonPerson;
                if (jsonPerson.id === "0") {
                    aParticipants[index].id = lib.jsLeft(lib.jsStrRight(strResponse, "^OK^"), 32);
                }
                aParticipants.sort( lib.jsSort("fName", false, false) );
                this.setState({
                    aParticipants: aParticipants,
                    strEditPersonId: null
                })
            }.bind(this),
            error: function (xhr){
                alert("AJAX Error: " + xhr.status + " " + xhr.statusText)
            }
        })
    };

    render() {
        const t = this.props.t;
        let jsonCustomer = this.state.customer;
        let aInvalidFields = this.state.aInvalidFields;
        return (
            <React.Fragment>
                <div className="cssPageHeader">
                    {t('Customer')}
                </div>
                <div className="cssPageBody">
                    <fieldset>
                        <form className="cssForm" id="idFormPerson">
                            <div className="cssFormRow">
                                <div>Status: <i className="cssRequired"> </i></div>
                                <div onChange={event => this.jsInputChange(event)} className={"cssDivRadio" + (lib.jsInArray(aInvalidFields, "fStatus") ? " cssInvalid" : "")}>
                                    <label><input type="radio" value="New" name="fStatus"/>New</label>
                                    <label><input type="radio" value="Current" name="fStatus"/>Current</label>
                                    <label><input type="radio" value="Old" name="fStatus"/>Old</label>
                                </div>
                            </div>
                            <div className="cssFormRow">
                                <div>{t('FirstName')}: <i className="cssRequired"> </i></div>
                                <div>
                                    <input name="fFirstName" type="text"
                                           value={jsonCustomer.fFirstName}
                                           onChange={this.jsInputChange}
                                           className={(lib.jsInArray(aInvalidFields, "fFirstName") ? "cssInvalid" : "")}
                                    />
                                </div>
                            </div>
                            <div className="cssFormRow">
                                <div>{t('LastName')}: <i className="cssRequired"> </i></div>
                                <div>
                                    <input name="fLastName" type="text"
                                           value={jsonCustomer.fLastName}
                                           onChange={this.jsInputChange}
                                           className={(lib.jsInArray(aInvalidFields, "fLastName") ? "cssInvalid" : "")}
                                    />
                                </div>
                            </div>
                            <div className="cssFormRow">
                                <div>Company: </div>
                                <div>
                                    <input name="fCompany" type="text" value={jsonCustomer.fCompany} onChange={this.jsInputChange} />
                                </div>
                            </div>
                            <div className="cssFormRow">
                                <div>Street address:</div>
                                <div>
                                    <input name="fStreetAddress" type="text" value={jsonCustomer.fStreetAddress} onChange={this.jsInputChange} />
                                </div>
                            </div>
                            <div className="cssFormRow">
                                <div>Post code:</div>
                                <div>
                                    <input name="fPostCode" type="text" value={jsonCustomer.fPostCode} onChange={this.jsInputChange} />
                                </div>
                            </div>
                            <div className="cssFormRow">
                                <div>City:</div>
                                <div>
                                    <input name="fCity" type="text" value={jsonCustomer.fCity} onChange={this.jsInputChange} />
                                </div>
                            </div>
                            <div className="cssFormRow">
                                <div>Country:</div>
                                <div>
                                    <Select name="fCountry"
                                        value={this.state.jsonSelectedCountry}
                                        onChange={this.jsSelectChange}
                                        options={jsonCountries}
                                        isClearable={true}
                                        isSearchable={true}
                                        className="cssSelectComponent"
                                        classNamePrefix="cssSelectComponent"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="cssFormRow">
                                <div>{t('Email')}: <i className="cssRequired"> </i></div>
                                <div>
                                    <input name="fEmail" type="text"
                                           value={jsonCustomer.fEmail}
                                           onChange={this.jsInputChange}
                                           className={(lib.jsInArray(aInvalidFields, "fEmail") ? "cssInvalid" : "")}
                                    />
                                </div>
                            </div>
                            <div className="cssFormRow">
                                <div>Phone number:</div>
                                <div>
                                    <input name="fPhone" type="text" value={jsonCustomer.fPhone} onChange={this.jsInputChange} />
                                </div>
                            </div>

                            <div className="cssFormRow">
                                <div>Last contacted:</div>
                                <div>
                                    <DatePicker
                                        selected={jsonCustomer.fContactDate}
                                        onChange={this.jsDateChange}
                                        dateFormat="D.M.YYYY"
                                        todayButton={"Today"}
                                        isClearable={true}
                                        locale="en-gb"
                                    />
                                </div>
                            </div>
                            <div className="cssFormRow">
                                <div>Customer id:</div>
                                <div>
                                    <input name="fCustomerId" type="text"
                                           value={jsonCustomer.fCustomerId}
                                           onChange={this.jsInputChange}
                                           className="cssFieldNumber"
                                    />
                                </div>
                            </div>
                            <div className="cssFormRow">
                                <div>Additional info:</div>
                                <div>
                                    <textarea  name="fAddInfo" value={jsonCustomer.fAddInfo} onChange={this.jsInputChange} />
                                </div>
                            </div>
                            <div className="cssFormButtons">
                                <span>
                                    <button type="button" onClick={this.jsValidateCustomer} className="cssButOK cssButSave">Save</button>
                                    <button type="button" onClick={this.jsCloseCustomer} className="cssButWarn">Cancel</button>
                                </span>
                            </div>
                        </form>
                    </fieldset>
                </div>
            </React.Fragment>
        )
    }
}

export default withNamespaces('lang')(CustomerEdit)