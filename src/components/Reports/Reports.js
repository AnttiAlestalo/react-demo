import React from 'react'
import {Bar, Pie} from 'react-chartjs-2';
import './Reports.css';
import $ from "jquery";
import { withNamespaces } from 'react-i18next';

let jsonDataBar = {
    labels: [],
    datasets: [{
        label: 'Customers',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: []
    }]
};

let jsonDataPie = {
    labels: [],
    datasets: [{
        backgroundColor: ['#57b46d', '#FF6384'],
        data: []
    }]
};

class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonDataBar: jsonDataBar,
            jsonDataPie: jsonDataPie
        };
    }

    componentDidMount() {
        const t = this.props.t;
        let strUrl = window.location.href.indexOf("localhost") > 0 ? "http://localhost:3000/customers.json" : "http://www.aad.fi/aad/react1.nsf/vwCustomers?OpenView&" + Date.now();
        $.getJSON(strUrl, function(json) {
            json.pop();
            let aBarLabels = [];
            let aPieLabels = ['Male', 'Female'];
            let aPieData = [0, 0];
            for (let i = 0; i < json.length; i++) {
                aPieData[aPieLabels.indexOf(json[i].fGender)] += 1;
                if (aBarLabels.indexOf(json[i].fCountry) < 0) {
                    aBarLabels.push(json[i].fCountry)
                }
            }
            aBarLabels.sort();
            let aBarData = [];
            for (let i = 0; i < aBarLabels.length; i++) {
                aBarData.push(0);
            }
            for (let i = 0; i < json.length; i++) {
                aBarData[aBarLabels.indexOf(json[i].fCountry)] += 1;
            }
            jsonDataBar.labels = aBarLabels;
            jsonDataBar.datasets[0].data = aBarData;
            jsonDataPie.labels = [t('Male') + ": " + aPieData[0], t('Female') + ": " + aPieData[1]];
            jsonDataPie.datasets[0].data = aPieData;
            this.setState({
                jsonDataBar: jsonDataBar,
                jsonDataPie: jsonDataPie
            });
        }.bind(this))
            .fail(function(xhr) {
                console.log("ERROR: " + xhr.responseText);
            })
    }

    render() {
        const t = this.props.t;
        return <React.Fragment>
            <div className="cssPageHeader">{t('CustomersByCountry')}</div>
            <div className="cssPageBody">
                <div>
                    <Bar
                        data={this.state.jsonDataBar}
                        width={600}
                        height={300}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        stepSize: 1
                                    }
                                }]
                            }
                        }}
                    />
                </div>
                <br/><br/><br/>
                <div className="cssPageHeader">{t('CustomersByGender')}</div>
                <div className="cssPieContainer">
                    <Pie data={this.state.jsonDataPie} />
                </div>
            </div>
        </React.Fragment>
    }
}

export default withNamespaces('lang')(Reports)
