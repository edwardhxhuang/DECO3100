var trace1 = {
    x: [36.8],
    y: ['Australia '],  
    name: 'Australia',
    type: 'bar',
    orientation: 'h',
    marker: {
        color: countryColours.aus
    }
};
  
var trace2 = {
    x: [7.2],
    y: ['Timor-Leste '],
    name: 'Timor-Leste',
    type: 'bar',
    orientation: 'h',
    marker: {
        color: countryColours.tim
    }
};

var trace3 = {
    x: [4.3],
    y: ['Indonesia '],
    name: 'Indonesia',
    type: 'bar',
    orientation: 'h',
    marker: {
        color: countryColours.ind
    }
};

var trace4 = {
    x: [2.8],
    y: ['Afghanistan '],
    name: 'Afghanistan',
    type: 'bar',
    orientation: 'h',
    marker: {
        color: countryColours.afg
    }
};

var trace5 = {
    x: [1.9],
    y: ['Solomon Islands '],
    name: 'Solomon Islands',
    type: 'bar',
    orientation: 'h',
    marker: {
        color: countryColours.sol
    }
};

var trace6 = {
    x: [0.7],
    y: ['Papua New Guinea '],
    name: 'Papua New Guinea',
    type: 'bar',
    marker: {
        color: countryColours.png
    }, 
    orientation: 'h'
};

var data = [trace6, trace5, trace4, trace3, trace2, trace1];

var layout = {
    font: {
        family: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
        size: 12
      },
    barmode: 'stack',
    margin: {
        l: 120,
        t:10,
        b:30
    },
    showlegend: false
};

        

Plotly.newPlot('doctor-density', data, layout, config);