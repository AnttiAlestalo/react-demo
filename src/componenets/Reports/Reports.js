import React from 'react'
import {Bar, Pie} from 'react-chartjs-2';
import './Reports.css';

const dataBar = {
    labels: ['Finland', 'United States', 'Germany', 'Spain', 'France', 'Poland', 'Italy'],
    datasets: [
        {
            label: 'Customers',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40, 0]
        }
    ]
};

const dataPie = {
    labels: ['Current', 'Old', 'New'],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#57b46d',
            '#FF6384',
            '#FFCE56'
        ]
    }]
};

const Reports = () => (
    <React.Fragment>
        <div className="cssPageHeader">Customers by country</div>
        <div className="cssPageBody">
            <div>
            <Bar
                data={dataBar}
                width={600}
                height={300}
                options={{
                    maintainAspectRatio: false
                }}
            />
            </div>
            <br/><br/><br/>
            <div className="cssPageHeader">Customers by status</div>
            <div className="cssPieContainer">
                <Pie data={dataPie} />
            </div>
        </div>
    </React.Fragment>
);

export default Reports
