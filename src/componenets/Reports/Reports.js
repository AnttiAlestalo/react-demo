import React from 'react'
import {Bar, Pie} from 'react-chartjs-2';
import './Reports.css';
import $ from "jquery";

let jsonDataBar = {
    labels: ['Finland', 'United States', 'Germany', 'Spain', 'France', 'Poland', 'Italy'],
    datasets: [{
        label: 'Customers',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40, 0]
    }]
};

let jsonDataPie = {
    labels: ['Current', 'Old', 'New'],
    datasets: [{
        data: [],
        backgroundColor: [
            '#57b46d',
            '#FF6384',
            '#FFCE56'
        ]
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

        let strUrl = window.location.href.indexOf("localhost") > 0 ? "http://localhost:3000/customers.json" : "http://www.aad.fi/aad/react1.nsf/vwCustomers?OpenView&" + Date.now();
        $.getJSON(strUrl, function(json) {
            json.pop();
            let aBarLabels = [];
            let aPieLabels = ['Current', 'Old', 'New'];
            let aPieData = [0, 0, 0];
            for (let i = 0; i < json.length; i++) {
                aPieData[aPieLabels.indexOf(json[i].fStatus)] += 1;
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
            jsonDataPie.datasets[0].data = aPieData;
            jsonDataBar.labels = aBarLabels;
            jsonDataBar.datasets[0].data = aBarData;
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
        return <React.Fragment>
            <div className="cssPageHeader">Customers by country</div>
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
                <div className="cssPageHeader">Customers by status</div>
                <div className="cssPieContainer">
                    <Pie data={this.state.jsonDataPie} />
                </div>
            </div>
        </React.Fragment>
    }
}

export default Reports
