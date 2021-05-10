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
    font: {
      family: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
      size: 12
    },
    margin: {
        l: 20,
        r: 30,
        b: 30,
        t: 10,
    }
  };
  
  Plotly.newPlot('child-mortality-bar', data, layout,config);