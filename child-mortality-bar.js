var trace1 = {
    x: ['Australia', 'Papua New Guinea', 'Indonesia', 'Solomon Islands', 'Afghanistan', 'Timor'],
    y: [4.17, 57.46, 29.15, 28.83, 55.77, 39.07],
    marker:{
      color: [countryColours.aus, countryColours.png, countryColours.ind, countryColours.sol, countryColours.afg, countryColours.tim]
    },
    type: 'bar'
  };
  
  var data = [trace1];
  
  var layout = {
    margin: {
        // l: 50,
        // r: 50,
        b: 70,
        t: 10,
    }
  };
  
  Plotly.newPlot('child-mortality-bar', data, layout,config);