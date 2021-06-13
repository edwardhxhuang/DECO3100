var state_data;

function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

function combine_and_filter(trump_tweets, obama_tweets, tsne_data_trump, tsne_data_obama) {
  //add tsne data to trump and obama tweets
  trump_tweets = trump_tweets.map((trump_tweet, index) => Object.assign(trump_tweet, tsne_data_trump[index]))
  obama_tweets = obama_tweets.map((obama_tweet, index) => Object.assign(obama_tweet, tsne_data_obama[index]))

  //add an author property
  for(let tweet of trump_tweets){
    tweet.author = "Trump"
  }
  for(let tweet of obama_tweets){
    tweet.author = "Obama"
  }
  
  //combine all tweets into one array
  // let tweets = [...trump_tweets, ...obama_tweets];
  let tweets = trump_tweets;
  

  //only include tweets containing one of these strings
  //Try experimenting with different search tags
  // tweets = tweets.filter(tweet => ["climate", "energy", "green", "solar"].some(topic => tweet.text.includes(topic)));
  // tweets = tweets.filter(tweet => ["jobs", "unemployment", "industry"].some(topic => tweet.text.includes(topic)));
  // tweets = tweets.filter(tweet => ["isis", "terrorists", "terrorism", ].some(topic => tweet.text.includes(topic)));
  // tweets = tweets.filter(tweet => ["color","africa", "black", "racial", "asia", "hispanic"].some(topic => tweet.text.includes(topic)));

  let corruptWords = ["fool", "false", "misleading","shifty", "plot",  "fabricate", "conspiracy", "collusion", "scandal", "illegal", "corrupt", "scam", "dishonest", "fake", "hoax", "witch", "rigged", "fraud", "crook", "counterfeit", "lamestream", "phoney"];

  let badPhrases = ["deep state"]

  let insultNames = ["connecticut"]

  let corruptTweets = tweets.filter(tweet => {

    // creates an array that looks like [ ['sentiment', 0.44444], [ 'text', 'fdsfdsf' ] ... ['token_0', 'fake' ] ... ['token_5', 'news' ] ]
    let entries = Object.entries(tweet);

    // creates a variable array that only includes the words by isolating the tokens and ignoring id, full tweet, etc. 
    let wordsInTweet = entries.filter(entry => entry[0].includes('token_')).map(tokenEntry => {
      return tokenEntry[1];
    });

    let checkForCorruptWords = wordsInTweet.some(word => {
      return word && corruptWords.includes(word.toLowerCase());
    });

    let checkForBadPhrases = badPhrases.some(badPhrase => {
        return tweet.text.toLowerCase().includes(badPhrase)
    });

    return checkForCorruptWords || checkForBadPhrases

  });
  // Counter used to to double check sentiment and tweet count from filter
  var count = 0
  var sentimentTotal = 0

  let insultTweets = tweets.filter(tweet => {
    let checkForInsultNames = insultNames.some(insultNames => {
      return tweet.text.toLowerCase().includes(insultNames)
    });
    if (checkForInsultNames == true) {
      count++;
      sentimentTotal += Number(tweet.sentiment)
    }
    return checkForInsultNames

  });




  //tweets = tweets.filter(tweet => [""].some(topic => tweet.text.includes(topic)));

  //Try out some of these other filters!
  //tweets = tweets.filter(tweet => tweet.text.includes("thank"))
  //tweets = tweets.filter(tweet => tweet.sentiment > 0.5) //positive tweets
  //tweets = tweets.filter(tweet => tweet.sentiment < 0) //negative tweets
  // tweets = tweets.filter(tweet => tweet.sentiment < -0.5) //negative tweets
  //tweets = tweets.filter(tweet => new Date(tweet.datetime) < new Date(2014, 0, 0))
  //tweets = tweets.filter(tweet => new Date(tweet.datetime) > new Date(2015, 6, 3) && new Date(tweet.datetime) < new Date(2015, 6, 5))
  console.log("Count: " + count)
  console.log("Sentiment Tally: " + sentimentTotal)
  console.log("Sentiment Average: " + (sentimentTotal / count))
  return insultTweets;
}

function make_map(rows, selection, colourblind) {
  console.log("selection")
  var selectedData;
  var scaleMin;
  var scaleMax;
  var scaleColours;
  var template;
  var custom;
  if (selection === 'mentions') {
    selectedData = unpack(rows, 'trump_mention_per_vote'),
    custom = unpack(rows, 'population'),
    scaleMin = 0, 
    scaleMax = 12.2,
    template = ("<b>%{text}</b><br>" +
    "Population: %{customdata}<br>" +
    "Mentions per electoral votes: %{z:.1f}<br>" +
    "<extra></extra>"),
    scaleColours = [
      [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
      [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
      [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
    ]
  }
  else {
    selectedData = unpack(rows, 'trump_sentiment'),
    custom = unpack(rows, 'trump_count'), 
    scaleMin = 0.12,
    scaleMax = 0.3,
    template = ("<b>%{text}</b><br>" +
    "Mentions: %{customdata}<br>" +
    "Sentiment: %{z:.1f}<br>" +
    "<extra></extra>")
    // colourblind check, change scale if so
    if (colourblind === true) {
      scaleColours = [
        [0, 'rgb(247, 0, 0)'], 
        [0.5, 'rgb(238, 255, 254)'],
        [1, 'rgb(127, 217, 91)']
      ]
    }
    else {
      scaleColours = [
        [0, 'rgb(255, 102, 101)'], 
        [0.5, 'rgb(238, 255, 254)'],
        [1, 'rgb(110, 185, 114)']
      ]
    }
  }
  var data = [{
    type: 'choropleth',
    locationmode: 'USA-states',
    locations: unpack(rows, 'code'),
    z: selectedData,
    text: unpack(rows, 'state'),
    customdata: custom, 
    hovertemplate: template,
    zmin: scaleMin,
    zmax: scaleMax,
    colorscale: scaleColours,
    colorbar: {
        title: 'Mentions',
        thickness: 10
    },
    marker: {
        line:{
            color: 'rgb(255,255,255)',
            width: 2
        }
    }
    }];

  var layout = {
      // title: 'Mentions of US States per electoral vote',
      geo:{
          scope: 'usa',
          showlakes: true,
          lakecolor: 'rgb(255,255,255)'
      },
      // width: 300,
      // height: 300,
      margin: {
        // l: 0,
        // r: 0,
        b: 0,
        t: 0,
        pad: 0
      }
  };

  Plotly.newPlot("states", data, layout, {showLink: false});
}

function make_barChart(csvData, selection) {
  var mentionsRange = [0,250];
  var popRange = [0,40000000];
  if (selection === 'most') {
    var mentions = csvData.filter(row => {
      popRange = [0,40000000]
      row = row.trump_count > 125
      return row
    })
  }
  else {
    mentionsRange = [0,50]
    popRange = [0,10000000];
    var mentions = csvData.filter(row => {
      row = row.trump_count < 8
      return row
    })
  }  

  console.log(popRange);

  let count = [], state = [], pop = []
  for (let i=0; i< mentions.length; i++) {
    row = mentions[i];
    count.push( row['trump_count'] );
    state.push( row['state'] );
    pop.push ( row['population'])
  }

  var data = [{
    x: state,
    y: count,
    name: 'Mentions',
    type: 'bar',
    offsetgroup: 1,
    yaxis: 'y1'
  },
  {
    x: state,
    y: pop,
    name: 'Population',
    type: 'bar',
    yaxis: 'y2',
    offsetgroup: 2,
    marker: {
      color: 'rgb(215, 215, 234)',
    }
  }
  ];
  
  var layout = {
    barmode: 'group',
    yaxis: {
      title: 'Twitter Mentions',
      range: mentionsRange
      },
    yaxis2: {
      title: 'State Population', 
      range: popRange,
      overlaying: 'y',
      side: 'right'
    },
    font: {
      family: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
      size: 12
    },
    margin: {
        l: 45,
        // r: 30,
        // b: 30,
        t: 0,
    },
    legend: {
      x: 0.8,
      y: 1.2
    }
  };
  Plotly.newPlot('states-bar', data, layout);
}


function make_plot(tweets){
  let data = [{
    x: tweets.map(d => d.x),
    y: tweets.map(d => d.y),
    customdata: tweets.map(d => convertToParagraph(d.sentiment + d.author + ": " + d.text, 64)),
    marker: {
      color: tweets.map(d => d.sentiment),
      // color: tweets.map(d => d.author=="Trump"?0:1), //color 0 if trump, 1 if obama
      size: 8,
      colorscale: [ //custom color scheme
        ['0.0', 'rgb(166, 55, 22)'],
        ['0.25', 'rgb(204, 115, 77)'],
        ['0.5', 'rgb(199, 205, 209)'],
        ['0.75', 'rgb(116, 149, 166))'],
        ['1.0', 'rgb(21, 96, 122)'],
      ]
    },
    mode: 'markers',
    type: 'scatter',
    hovertemplate:
      "%{customdata}" +
      "<extra></extra>", //hide extra tooltip info
  }];

  let layout = {
    hovermode: "closest", //hover closest by default
    xaxis: {
      visible: false,
    },
    yaxis: {
      visible: false,
    }
  }

  Plotly.newPlot('plotDiv', data, layout);
}

//from https://codereview.stackexchange.com/a/171857
function convertToParagraph(sentence, maxLineLength){
  let lineLength = 0;
  sentence = sentence.split(" ")
  return sentence.reduce((result, word) => {
    if (lineLength + word.length >= maxLineLength) {
      lineLength = word.length;
      return result + `<br>${word}`;
    } else {
      lineLength += word.length + (result ? 1 : 0);
      return result ? result + ` ${word}` : `${word}`;
    }
  }, '');
}

function runPlotly(filters) {
  const {barChart, plot, map} = filters
  Plotly.d3.csv("data/trump_presidential_tweets.csv", (trump_tweets) => {
    Plotly.d3.csv("data/obama_presidential_tweets.csv", (obama_tweets) => {
      Plotly.d3.csv("data/tsne_and_cluster/tsne_data_trump.csv", (tsne_data_trump) => {
        Plotly.d3.csv("data/tsne_and_cluster/tsne_data_obama.csv", (tsne_data_obama) => {
          Plotly.d3.csv('data/states.csv', (state_data) => {
            let tweets = combine_and_filter(trump_tweets, obama_tweets, tsne_data_trump, tsne_data_obama)
            console.log("middle")
            if (barChart) {
              make_barChart(state_data, barChart);
            }
            if (plot) {
              make_plot(tweets);
            }
            if (map) {
            make_map(state_data, map, colourblind);
            }
          });
        });
      });
    });
  });
}

runPlotly({barChart: "most", plot: true, map: "mentions"});

var barChartSelector = document.querySelector("#barChartSelector");
barChartSelector.addEventListener("change", updateBarChart, false);
function updateBarChart(event) {
  runPlotly({barChart: event.target.value})
}
var mapSelector = document.querySelector("#mapSelector");
mapSelector.addEventListener("change", mapChart, false);
function mapChart(event) {
  if (event.target.value === "sentiment") {
    document.getElementById('colourblind').style.visibility = 'visible';
  }
  else {
    document.getElementById('colourblind').style.visibility = 'hidden';
  }
  runPlotly({map: event.target.value})
}

//toggle for colourblindness
document.getElementById('colourblind').style.visibility = 'hidden'
var colourblind = false;
function colourToggle() {
  
  if (colourblind === false) {
    console.log(colourblind)
    colourblind = !colourblind
    document.getElementById("colourblind").className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded";
    document.getElementById("colourblind").value= "Colourblind Mode: On";
    }
    else {
      colourblind = false
      document.getElementById("colourblind").className = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
      document.getElementById("colourblind").value= "Colourblind Mode: Off";
    }
    runPlotly({map: "sentiment"})
  };