const childbirth_dataSource = "https://raw.githubusercontent.com/edwardhxhuang/DECO3100/main/skilled-childbirth-data.csv"

function loadData() {
  Plotly.d3.csv(childbirth_dataSource, function (data) {
    processData(data);
  });
}

// Pushing row data from the csv file into arrays
function processData(allRows) {
    let year = [], aus = [], afg = [], ind = [], png = [], sol = [], tim = [];
    for (i=0; i < allRows.length; i++) {
        let row = allRows[i];
        year.push(row['Year']);
        aus.push(row['Australia']);
        afg.push(row['Afghanistan']);
        ind.push(row['Indonesia']);
        png.push(row['Papua New Guinea']);
        sol.push(row['Solomon Islands']);
        tim.push(row['Timor-Leste']);
    }
    makePlot(year,aus,afg,ind,png,sol,tim)
};

function makePlot(year,aus,afg,ind,png,sol,tim){
    var traces = [{
        x: year,
        y: aus,
        mode: 'lines+markers',
        connectgaps: true,
        marker: {
          color: countryColours.aus
        },
        name: 'Australia',
    },
      {
        x: year,
        y: afg,
        mode: 'lines+markers',
        connectgaps: true,
        marker: {
          color: countryColours.afg
        },
        name: 'Afghanistan',
    },
    {
        x: year,
        y: ind,
        mode: 'lines+markers',
        connectgaps: true,
        marker: {
          color: countryColours.ind
        },
        name: 'Indonesia',
    },
    {
        x: year,
        y: png,
        mode: 'lines+markers',
        connectgaps: true,
        marker: {
          color: countryColours.png
        },
        name: 'Papua New Guinea',
    },
    {
        x: year,
        y: sol,
        mode: 'lines+markers',
        connectgaps: true,
        marker: {
          color: countryColours.sol
        },
        name: 'Solomon Islands',
    },
    {
        x: year,
        y: tim,
        mode: 'lines+markers',
        connectgaps: true,
        marker: {
          color: countryColours.tim
        },
        name: 'Timor-Leste',
    }
    ];

    var layout = {
        margin: {
          l: 50,
          r: 50,
          b: 30,
          t: 0,
          pad: 4
        },
        font: {
          family: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
          size: 12
        },
        xaxis: {
            range: [1980, 2019],
            autorange: true
        },
        yaxis: {
          range: [0, 100],
          autorange: true,
          ticksuffix: '%',
        },
        showlegend: false,
        legend: {
          y: 0.5,
          font: {
            size: 12
          }
        },
        annotations: [
          {
            x: 2015,
            y: 50.5,
            xref: 'x',
            yref: 'y',
            xanchor: 'left',
            text: '<b> AFG 50.5%</b>',
            font: {
              family: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
              color: countryColours.afg
              
            },
            showarrow: false
          },
          {
            x: 2015,
            y: 99.7,
            xref: 'x',
            yref: 'y',
            xanchor: 'left',
            text: '<b> AUS 99.7%</b>',
            font: {
              family: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
              color: countryColours.aus
              
            },
            showarrow: false
          },
          {
            x: 2018,
            y: 56.4,
            xref: 'x',
            yref: 'y',
            xanchor: 'left',
            text: '<b> PNG 56.4%</b>',
            font: {
              family: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
              color: countryColours.png
              
            },
            showarrow: false
          },
          {
            x: 2017,
            y: 90.9,
            xref: 'x',
            yref: 'y',
            xanchor: 'left',
            text: '<b> IDN 90.9%</b>',
            font: {
              family: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
              color: countryColours.ind
              
            },
            showarrow: false
          },
          {
            x: 2015,
            y: 86.2,
            xref: 'x',
            yref: 'y',
            xanchor: 'left',
            text: ' <b>SLB 86.2%</b>',
            font: {
              family: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
              color: countryColours.sol
              
            },
            showarrow: false
          },
          {
            x: 2016,
            y: 56.7,
            xref: 'x',
            yref: 'y',
            yanchor: 'bottom',
            text: '<b>TLS 50.5%</b>',
            font: {
              family: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
              color: countryColours.tim
              
            },
            showarrow: false
          }
        ]
        }
      
    Plotly.newPlot("childbirth-vis",traces,layout, config)
};

loadData();