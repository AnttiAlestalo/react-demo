import React from 'react';
import * as lib from "../../library";
import Popup from "react-popup/dist/index";
//import './Person.css';

class CustomerEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {"id":"0", "fName":"", "fEmail": "", "fPhone": ""}, //props.person,
            aInvalidFields: []
        }
    }

    jsInputChange = (event) => {
        let strFieldName = event.target.name;
        let strFieldValue = event.target.value;
        let aInvalidFields = this.state.aInvalidFields;
        if (lib.jsTrim(strFieldValue) === "" || (strFieldName === "fEmail" && !lib.jsIsEmail(strFieldValue))) {
            aInvalidFields = lib.jsAddToArray(aInvalidFields, strFieldName);
        } else {
            aInvalidFields = lib.jsRemoveFromArray(aInvalidFields, strFieldName);
        }
        let jsonPerson = JSON.parse(JSON.stringify(this.state.person));
        jsonPerson[strFieldName] = strFieldValue;
        this.setState({
            person: jsonPerson,
            aInvalidFields: aInvalidFields
        })
    };

    jsValidatePerson = () => {
        let aInvalidFields = [];
        let jsonPerson = this.state.person;
        if (lib.jsTrim(jsonPerson.fName) === "") aInvalidFields.push("fName");
        if (!lib.jsIsEmail(jsonPerson.fEmail)) aInvalidFields.push("fEmail");
        if (lib.jsTrim(jsonPerson.fPhone) === "") aInvalidFields.push("fPhone");
        if (aInvalidFields.length > 0) {
            this.setState({
                aInvalidFields: aInvalidFields
            });
            let strErrorMsg = "";
            if (aInvalidFields.indexOf("fName") > -1 || jsonPerson.fEmail === "" || aInvalidFields.indexOf("fPhone") > -1) {
                strErrorMsg = "Please fill required fields.";
            }
            if (jsonPerson.fEmail !== "") {
                strErrorMsg += " E-mail address is not valid.";
            }
            Popup.create({
                title: "Error",
                content: strErrorMsg,
                buttons: { right: ['ok'] }
            });
            return
        }
        this.props.jsSavePerson(jsonPerson)
    };

    render() {
        let jsonPerson = this.state.person;
        let aInvalidFields = this.state.aInvalidFields;
        return (

                    <form className="cssForm" id="idFormPerson">
                        <div className="cssFormRow">
                            <div>Name: </div>
                            <div>
                                <input name="fName" type="text"
                                       value={jsonPerson.fName}
                                       onChange={this.jsInputChange}
                                       className={"cssFieldText" + (lib.jsInArray(aInvalidFields, "fName") ? " cssInvalid" : "")}
                                       autoFocus
                                />
                            </div>
                        </div>
                        <div className="cssFormRow">
                            <div>Name: </div>
                            <div>
                                <input name="fEmail" type="text"
                                       value={jsonPerson.fEmail}
                                       onChange={this.jsInputChange}
                                       className={"cssFieldText" + (lib.jsInArray(aInvalidFields, "fEmail") ? " cssInvalid" : "")}
                                />
                            </div>
                        </div>
                        <div className="cssFormRow">
                            <div>Name: </div>
                            <div>
                                <input name="fPhone" type="text"
                                       value={jsonPerson.fPhone}
                                       onChange={this.jsInputChange}
                                       className={"cssFieldText" + (lib.jsInArray(aInvalidFields, "fPhone") ? " cssInvalid" : "")}
                                />
                            </div>
                        </div>
                        <div>
                            <span>
                                <button type="button" onClick={this.props.jsClosePerson} className="cssButWarn">Cancel</button>
                                <button type="button" onClick={this.jsValidatePerson} className="cssButOK cssButSave">&nbsp;Save&nbsp;</button>
                            </span>
                        </div>
                    </form>

        )
    }
}

export default CustomerEdit