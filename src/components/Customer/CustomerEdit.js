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
import {jsStrRight} from "../../library";
import {jsLeft} from "../../library";

const aAllCountries = ["Afghanistan","Albania","Algeria","Amer.Virgin Is.","Andorra","Angola","Anguilla","Antarctica","Antigua/Barbads","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia-Herz.","Botswana","Bouvet Island","Brazil","Brit.Ind.Oc.Ter","Brit.Virgin Is.","Brunei Dar-es-S","Bulgaria","Burkina-Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Afr.Rep","Chad","Chile","China","Christmas Islnd","Coconut Islands","Colombia","Comoros","Congo","Cook Islands","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Dem.Reb. Congo","Denmark","Djibouti","Dominica","Dominican Rep.","Dutch Antilles","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guin","Eritrea","Estonia","Ethiopia","Faeroe","Falkland Islnds","Fiji","Finland","France","Frenc.Polynesia","French Guayana","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Heard/McDon.Isl","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Ivory Coast","Jamaica","Japan","Jersey C.I.","Jordan","Kazakhstan","Kenya","Kirghizstan","Kiribati","Kuwait","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islnds","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Minor Outl.Isl.","Moldavia","Monaco","Mongolia","Montserrat","Morocco","Mozambique","Myanmar","N.Mariana Islnd","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue Islands","Norfolk Island","North Korea","Norway","Oman","Pakistan","Palau","Panama","Pap. New Guinea","Paraguay","Peru","Philippines","Pitcairn Islnds","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","stateless","S.Tome,Principe","Samoa,American","San Marino","Saudi Arabia","Senegal","Serbia/Monteneg","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","Spain","Sri Lanka","St Kitts&amp;Nevis","St. Helena","St. Lucia","St. Vincent","St.Pier,Miquel.","Sth Sandwich Is","Sudan","Suriname","Svalbard","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikstan","Tanzania","Thailand","Togo","Tokelau Islands","Tonga","Trinidad,Tobago","Tunisia","Turkey","Turkmenistan","Turksh Caicosin","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay ","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Wallis,Futuna","Western Samoa","Yemen","Yugoslavia","Zambia","Zimbabwe"];
const jsonCountries = aAllCountries.map(strCountry => {
    return { value:strCountry, label:strCountry }
});

class CustomerEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonSelectedCountry: null,
            jsonCustomer: {
                "id":"0",
                "fGender": "",
                "fFirstName":"",
                "fLastName":"",
                "fCompany": "",
                "fStreetAddress": "",
                "fPostCode": "",
                "fCity": "",
                "fCountry": "",
                "fEmail": "",
                "fPhone": "",
                "fContactDate": null,
                "fCustomerId": ""
            },
            aInvalidFields: []
        };
    }

    componentDidMount() {
        moment.updateLocale('en', { week: { dow:1 } });
        window.scrollTo(0, 0);
        let strId = jsStrRight(window.location.href, "/");
        if (strId === "0") return;
        let strUrl = "http://www.aad.fi/aad/react1.nsf/vwCustomer/" + strId + "?OpenDocument&" + Date.now();
        $.getJSON(strUrl, function(json) {
            let jsonSelectedCountry = (json.fCountry === "" ? null : { value:json.fCountry, label:json.fCountry });
            json.fContactDate = (json.fContactDate === "" ? null : moment(json.fContactDate));
            this.setState({
                jsonSelectedCountry: jsonSelectedCountry,
                jsonCustomer: json
            });
        }.bind(this))
            .fail(function(xhr) {
                console.log("ERROR: " + xhr.responseText);
            })
    }

    jsDateChange = (oDate) => {
        let jsonCustomer = this.state.jsonCustomer;
        jsonCustomer.fContactDate = oDate;
        this.setState({
            jsonCustomer: jsonCustomer,
        });
    };

    jsSelectChange = (jsonSelected) => {
        let jsonCustomer = this.state.jsonCustomer;
        jsonCustomer.fCountry = (jsonSelected === null ? "" : jsonSelected.value);
        this.setState({
            jsonSelectedCountry: jsonSelected,
            jsonCustomer: jsonCustomer
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
        let jsonCustomer = this.state.jsonCustomer;
        jsonCustomer[strFieldName] = strFieldValue;
        this.setState({
            jsonCustomer: jsonCustomer,
            aInvalidFields: aInvalidFields
        })
    };

    jsValidateCustomer = () => {
        let aInvalidFields = [];
        let jsonCustomer = this.state.jsonCustomer;
        if (lib.jsTrim(jsonCustomer.fGender) === "") aInvalidFields.push("fGender");
        if (lib.jsTrim(jsonCustomer.fFirstName) === "") aInvalidFields.push("fFirstName");
        if (lib.jsTrim(jsonCustomer.fLastName) === "") aInvalidFields.push("fLastName");
        if (!lib.jsIsEmail(jsonCustomer.fEmail)) aInvalidFields.push("fEmail");
        if (aInvalidFields.length > 0) {
            this.setState({
                aInvalidFields: aInvalidFields
            });
            let strErrorMsg = "";
            if (aInvalidFields.indexOf("fGender") > -1 || aInvalidFields.indexOf("fName") > -1 || jsonCustomer.fEmail === "" || aInvalidFields.indexOf("fPhone") > -1) {
                strErrorMsg = "Please fill required fields.";
            }
            if (aInvalidFields.indexOf("fEmail") > -1) {
                strErrorMsg += " E-mail address is not valid.";
            }
            Popup.create({
                title: "Error",
                content: strErrorMsg,
                buttons: { right: ['ok'] }
            });
            return
        }
        this.jsSaveCustomer()
    };

    jsCloseCustomer = () => {
        if (this.state.jsonCustomer.id === "0") {
            this.props.history.push("/customers");
        } else {
            this.props.history.push("/customers/read/" + this.state.jsonCustomer.id);
        }
    };

    jsSaveCustomer = () => {
        let jsonCustomer = this.state.jsonCustomer;
        jsonCustomer.fContactDate = (jsonCustomer.fContactDate === null ? "" : jsonCustomer.fContactDate.format("YYYY-MM-DD"));
        let strUrl = jsonCustomer.id === "0" ? "http://www.aad.fi/aad/react1.nsf/frmCustomer?CreateDocument" : "http://www.aad.fi/aad/react1.nsf/0/" + jsonCustomer.id + "?SaveDocument";
        let strJson = $.param(jsonCustomer);
        $.ajax({
            type: "POST",
            url: strUrl,
            data: strJson,
            success: function(strResponse){
                if (strResponse.indexOf("^OK^") < 0) {
                    alert("AJAX Error: " + strResponse);
                    return;
                }
                if (jsonCustomer.id === "0") {
                    let strId = jsLeft(jsStrRight(strResponse, "^OK^"), 32);
                    this.props.history.push("/customers/read/" + strId);
                } else {
                    this.props.history.push("/customers/read/" + jsonCustomer.id);
                }
            }.bind(this),
            error: function (xhr){
                alert("AJAX Error: " + xhr.status + " " + xhr.statusText)
            }
        })
    };

    jsDelete = () => {
        if (!window.confirm('Are you sure you want to delete this customer?')) return;
        let strUrl = "http://www.aad.fi/aad/react1.nsf/vwCustomers/" + this.state.jsonCustomer.id + "?DeleteDocument";
        $.get(strUrl, function() {
            this.props.history.push("/customers");
        }.bind(this))
    };

    render() {
        const t = this.props.t;
        let jsonCustomer = this.state.jsonCustomer;
        let aInvalidFields = this.state.aInvalidFields;
        return (
            <React.Fragment>
                <div className="cssPageHeader">
                    {t('Customer')}
                    <span>
                        <button type="button" onClick={this.jsValidateCustomer} className="cssButOK cssButSave">{t('Save')}</button>
                        {jsonCustomer.id === "0" ? "" : <button type="button" onClick={this.jsDelete} className="cssButDanger">{t('Delete')}</button>}
                        <button type="button" onClick={this.jsCloseCustomer} className="cssButWarn">{t('Cancel')}</button>
                    </span>
                </div>
                <div className="cssPageBody">
                    <fieldset>
                        <form className="cssForm" id="idFormPerson">

                            <div className="cssFormRow">
                                <div>{t('FirstName')}: <i className="cssRequired"> </i></div>
                                <div>
                                    <input autoFocus name="fFirstName" type="text"
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
                                <div>{t('Gender')}: <i className="cssRequired"> </i></div>
                                <div onChange={event => this.jsInputChange(event)} className={"cssDivRadio" + (lib.jsInArray(aInvalidFields, "fGender") ? " cssInvalid" : "")}>
                                    <label><input type="radio" value="Male" name="fGender" checked={this.state.jsonCustomer.fGender === "Male"} />{t('Male')}</label>
                                    <label><input type="radio" value="Female" name="fGender" checked={this.state.jsonCustomer.fGender === "Female"} />{t('Female')}</label>
                                </div>
                            </div>

                            <div className="cssFormRow">
                                <div>{t('Company')}:</div>
                                <div>
                                    <input name="fCompany" type="text" value={jsonCustomer.fCompany} onChange={this.jsInputChange} />
                                </div>
                            </div>

                            <div className="cssFormRow">
                                <div>{t('StreetAddress')}:</div>
                                <div>
                                    <input name="fStreetAddress" type="text" value={jsonCustomer.fStreetAddress} onChange={this.jsInputChange} />
                                </div>
                            </div>

                            <div className="cssFormRow">
                                <div>{t('PostCode')}:</div>
                                <div>
                                    <input name="fPostCode" type="text" value={jsonCustomer.fPostCode} onChange={this.jsInputChange} />
                                </div>
                            </div>

                            <div className="cssFormRow">
                                <div>{t('City')}:</div>
                                <div>
                                    <input name="fCity" type="text" value={jsonCustomer.fCity} onChange={this.jsInputChange} />
                                </div>
                            </div>

                            <div className="cssFormRow">
                                <div>{t('Country')}:</div>
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
                                <div>{t('PhoneNumber')}:</div>
                                <div>
                                    <input name="fPhone" type="text" value={jsonCustomer.fPhone} onChange={this.jsInputChange} />
                                </div>
                            </div>

                            <div className="cssFormRow">
                                <div>{t('LastContacted')}:</div>
                                <div>
                                    <DatePicker
                                        selected={jsonCustomer.fContactDate}
                                        onChange={this.jsDateChange}
                                        dateFormat="D.M.YYYY"
                                        todayButton={"Today"}
                                        isClearable={true}
                                    />
                                </div>
                            </div>

                            <div className="cssFormRow">
                                <div>{t('CustomerId')}:</div>
                                <div>
                                    <input name="fCustomerId" type="text"
                                           value={jsonCustomer.fCustomerId}
                                           onChange={this.jsInputChange}
                                           className="cssFieldNumber"
                                    />
                                </div>
                            </div>

                            <div className="cssFormRow">
                                <div>{t('AdditionalInfo')}:</div>
                                <div>
                                    <textarea  name="fAddInfo" value={jsonCustomer.fAddInfo} onChange={this.jsInputChange} />
                                </div>
                            </div>

                        </form>
                    </fieldset>
                    <div className="cssFormButtons">
                        <span>
                            <button type="button" onClick={this.jsValidateCustomer} className="cssButOK cssButSave">{t('Save')}</button>
                            {jsonCustomer.id === "0" ? "" : <button type="button" onClick={this.jsDelete} className="cssButDanger">{t('Delete')}</button>}
                            <button type="button" onClick={this.jsCloseCustomer} className="cssButWarn">{t('Cancel')}</button>
                        </span>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withNamespaces('lang')(CustomerEdit)