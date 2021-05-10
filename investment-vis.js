var trace1 = {
    x: [12, 26, 16, 8, 7],
    y: ['PNG ', 'Indonesia ', 'Solomon Islands ', 'Afghanistan ', 'East Timor '],  
    name: 'Education',
    type: 'bar',
    orientation: 'h'
};
  
var trace2 = {
    x: [23, 2, 16, 10, 17],
    y: ['PNG ', 'Indonesia ', 'Solomon Islands ', 'Afghanistan ', 'East Timor '],
    name: 'Health',
    type: 'bar',
    orientation: 'h'
};

var trace3 = {
    x: [17, 18, 16, 0, 7],
    y: ['PNG ', 'Indonesia ', 'Solomon Islands ', 'Afghanistan ', 'East Timor '],
    name: 'Infrastructure and Trade',
    type: 'bar',
    orientation: 'h'
};

var trace4 = {
    x: [3, 11, 3, 16, 17],
    y: ['PNG ', 'Indonesia ', 'Solomon Islands ', 'Afghanistan ', 'East Timor '],
    name: 'Agriculture, Fisheries and Water',
    type: 'bar',
    orientation: 'h'
};

var trace5 = {
    x: [33, 31, 37, 39, 29],
    y: ['PNG ', 'Indonesia ', 'Solomon Islands ', 'Afghanistan ', 'East Timor '],
    name: 'Effective Governance',
    type: 'bar',
    orientation: 'h'
};

var trace6 = {
    x: [3, 7, 4, 21, 0],
    y: ['PNG ', 'Indonesia ', 'Solomon Islands ', 'Afghanistan ', 'East Timor '],
    name: 'Building Resilience',
    type: 'bar',
    orientation: 'h'
};

var trace7 = {
    x: [9, 5, 8, 6, 23],
    y: ['PNG ', 'Indonesia ', 'Solomon Islands ', 'Afghanistan ', 'East Timor '],
    name: 'General Development Support',
    type: 'bar',
    orientation: 'h'
};

var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7];

var layout = {
            barmode: 'stack',
            margin: {
                l: 120,
                t:10,
                b:20
            }
        };

        

Plotly.newPlot('investment-vis', data, layout, config);