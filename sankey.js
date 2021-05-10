const countryColours = {
  aus: "3B82F6",
  png: "EF4444",
  ind: "EC4899",
  sol: "F59E0B",
  afg: "10B981",
  tim: "#374151"
}

const sankey = document.getElementById("sankey");

const config = {
  displayModeBar: false,
  responsive: true
};

var data = {
    type: "sankey",
    orientation: "h",
    valueformat: ".1f",
    valuesuffix: "$M",
    hoverlabel: {
      font: {
        family: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
        size: 12
      }
    },
    node: {
      pad: 15,
      thickness: 20,
      line: {
        color: "white",
        width: 0.5
      },
     label: ["Australia", 
        "Papua New Guinea", "Indonesia", "Solomon Islands", "Afghanistan", "East Timor"],
     color: [countryColours.aus, countryColours.png, countryColours.ind, countryColours.sol, countryColours.afg, countryColours.tim]
        },
  
    link: {
      source: [0,0,0,0,0],
      target: [1,2,3,4,5],
      value:  [512.3,255.7,122.3,80.0,73.0]
    }
  }
  
  var data = [data]
  
  var layout = {
    // title: "Australia's Top 5 Foreign Aid Recipients 19-20",
    font: {
      family: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
      size: 12
    },
    margin: {
      l: 50,
      r: 50,
      b: 10,
      t: 10,
      pad: 4
    }
  }
  
  Plotly.react('sankey', data, layout, config)