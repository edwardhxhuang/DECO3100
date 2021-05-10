
function make_plot(csv_data){
    let afg_data = csv_data.filter(d => d.country == "Afghanistan");

    //Normalising data with max mins, and converting strings into numbers
    let mortality_data = afg_data.map(d => Number(d.mortality))
    let min_mortality = Math.min(...mortality_data)
    let max_mortality = Math.max(...mortality_data)

    //Storing values into arrays and then using the strech function to normalise the data
    let regression_data = afg_data.map(d => [stretch(d.year, 1950, 2017, 0, 1),
                                                 stretch(d.mortality, min_mortality, max_mortality, 0, 1)])

    //Regressor is trained
    let regression_result = regression.polynomial(regression_data, {order: 3});

    //Regressor is used to make predictions
    let afg_extension_x = [];
    let afg_extension_y = [];
    for(let year = 2018; year < 2031; year++){
        let prediction = regression_result.predict(stretch(year, 1950, 2017, 0, 1))[1]  
        afg_extension_x.push(year);
        afg_extension_y.push(stretch(prediction, 0, 1, min_mortality, max_mortality));
    }

    //Same process is repeated for the other countries (probs should use some kind of loop but i aint got time for dat)
    let png_data = csv_data.filter(d => d.country == "Papua New Guinea");
    let png_mortality_data = png_data.map(d => Number(d.mortality))
    let png_min_mortality = Math.min(...png_mortality_data)
    let png_max_mortality = Math.max(...png_mortality_data)
    let png_regression_data = png_data.map(d => [stretch(d.year, 1950, 2017, 0, 1),
                                                  stretch(d.mortality, png_min_mortality, png_max_mortality, 0, 1)])
    let png_regression_result = regression.polynomial(png_regression_data, {order: 6});
    let png_extension_x = [];
    let png_extension_y = [];
    for(let year = 2018; year < 2029; year++){
        let png_prediction = png_regression_result.predict(stretch(year, 1950, 2017, 0, 1))[1]

        png_extension_x.push(year);
        png_extension_y.push(stretch(png_prediction, 0, 1, png_min_mortality, png_max_mortality));
    }

    let sol_data = csv_data.filter(d => d.country == "Solomon Islands");
    let sol_mortality_data = sol_data.map(d => Number(d.mortality))
    let sol_min_mortality = Math.min(...sol_mortality_data)
    let sol_max_mortality = Math.max(...sol_mortality_data)
    let sol_regression_data = sol_data.map(d => [stretch(d.year, 1950, 2017, 0, 1),
                                                  stretch(d.mortality, sol_min_mortality, sol_max_mortality, 0, 1)])
    let sol_regression_result = regression.polynomial(sol_regression_data, {order: 5});
    let sol_extension_x = [];
    let sol_extension_y = [];
    for(let year = 2018; year < 2031; year++){
        let sol_prediction = sol_regression_result.predict(stretch(year, 1950, 2017, 0, 1))[1]

        sol_extension_x.push(year);
        sol_extension_y.push(stretch(sol_prediction, 0, 1, sol_min_mortality, sol_max_mortality));
    }

    let ind_data = csv_data.filter(d => d.country == "Indonesia");
    let ind_mortality_data = ind_data.map(d => Number(d.mortality))
    let ind_min_mortality = Math.min(...ind_mortality_data)
    let ind_max_mortality = Math.max(...ind_mortality_data)
    let ind_regression_data = ind_data.map(d => [stretch(d.year, 1950, 2017, 0, 1),
                                                  stretch(d.mortality, ind_min_mortality, ind_max_mortality, 0, 1)])
    let ind_regression_result = regression.polynomial(ind_regression_data, {order: 2});
    let ind_extension_x = [];
    let ind_extension_y = [];
    for(let year = 2018; year < 2031; year++){
        let ind_prediction = ind_regression_result.predict(stretch(year, 1950, 2017, 0, 1))[1]

        ind_extension_x.push(year);
        ind_extension_y.push(stretch(ind_prediction, 0, 1, ind_min_mortality, ind_max_mortality));
    }

    let tim_data = csv_data.filter(d => d.country == "Timor");
    let tim_mortality_data = tim_data.map(d => Number(d.mortality))
    let tim_min_mortality = Math.min(...tim_mortality_data)
    let tim_max_mortality = Math.max(...tim_mortality_data)
    let tim_regression_data = tim_data.map(d => [stretch(d.year, 1950, 2017, 0, 1),
                                                  stretch(d.mortality, tim_min_mortality, tim_max_mortality, 0, 1)])
    let tim_regression_result = regression.polynomial(tim_regression_data, {order: 5});
    let tim_extension_x = [];
    let tim_extension_y = [];
    for(let year = 2018; year < 2031; year++){
        let tim_prediction = tim_regression_result.predict(stretch(year, 1950, 2017, 0, 1))[1]

        tim_extension_x.push(year);
        tim_extension_y.push(stretch(tim_prediction, 0, 1, tim_min_mortality, tim_max_mortality));
    }

    Plotly.d3.csv("https://raw.githubusercontent.com/edwardhxhuang/DECO3100/main/child-mortality-data.csv", function (data) {
    processData(data);
    });

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
            tim.push(row['Timor']);
        }
        makePlot(year,aus,afg,ind,png,sol,tim)
    };

    
    function makePlot(year,aus,afg,ind,png,sol,tim){
    var traces = [{
        x: year,
        y: aus,
        name: 'Australia',
        showlegend: false,
        line: {
            color: countryColours.aus
        },
    },
        {
        x: year,
        y: afg,
        name: 'Afghanistan',
        showlegend: false,
        line: {
            color: countryColours.afg
        }
    },
    {
        x: year,
        y: ind,
        name: 'Indonesia',
        showlegend: false,
        line: {
            color: countryColours.ind
        }
    },
    {
        x: year,
        y: png,
        name: 'Papua New Guinea',
        showlegend: false,
        line: {
            color: countryColours.png
        }
    },
    {
        x: year,
        y: sol,
        name: 'Solomon Islands',
        showlegend: false,
        line: {
            color: countryColours.sol
        }
    },
    {
        x: year,
        y: tim,
        name: 'Timor',
        showlegend: false,
        line: {
            color: countryColours.tim
        }
    },
    // adding predictive extensions as separate trace
    {
        x: afg_extension_x,
        y: afg_extension_y,
        mode: 'lines',
        name: 'Afghanistan',
        hovertemplate: 'Predicted: %{y:.1f}',
        line: {
            dash: 'dashdot',
            width: 2,
            color: countryColours.afg
        }
    },
    {
        x: png_extension_x,
        y: png_extension_y,
        mode: 'lines',
        name: 'Papua New Guinea',
        hovertemplate: 'Predicted: %{y:.1f}',
        line: {
            dash: 'dashdot',
            width: 2,
            color: countryColours.png
        }
    },
    {
        x: sol_extension_x,
        y: sol_extension_y,
        mode: 'lines',
        name: 'Solomon Islands',
        hovertemplate: 'Predicted: %{y:.1f}',
        line: {
            dash: 'dashdot',
            width: 2,
            color: countryColours.sol
        }
    },
    {
        x: ind_extension_x,
        y: ind_extension_y,
        mode: 'lines',
        name: 'Indonesia',
        hovertemplate: 'Predicted: %{y:.1f}',
        line: {
            dash: 'dashdot',
            width: 2,
            color: countryColours.ind
        }
    },
    {
        x: tim_extension_x,
        y: tim_extension_y,
        mode: 'lines',
        name: 'Timor',
        hovertemplate: 'Predicted: %{y:.1f}',
        line: {
            dash: 'dashdot',
            width: 2,
            color: countryColours.tim
        }
    },
    {
        x: [2018,2030],
        y: [25, 25],
        mode: 'lines',
        name: '2030 Goal',
        hovertemplate: 'Target: %{y:.1f}',
        line: {
            dash: 'dot',
            width: 1,
            color: '#000000'
        }
    }
    ];

    var layout = {
        margin: {
            l: 30,
            r: 0,
            t: 10,
            b: 0 
        },
        xaxis: {
            range: [2016, 2031],
            autorange: false,
            rangeslider: { range: ['1980', '2030'] },
        },
        yaxis: {
            range: [0, 61],
            autorange: false,
        },
        legend: {
            font: {
                family: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                size: 12
              },
            x: 1,
            y: 0.5
          }
        // showlegend: false
        };

    Plotly.newPlot("child-mortality-predictor",traces,layout, config)
}
}


Plotly.d3.csv("https://raw.githubusercontent.com/edwardhxhuang/DECO3100/main/mortality.csv", make_plot);

//This stretch function is actually just the map function from p5.js
function stretch(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};