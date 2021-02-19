function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

    // 3. Create a variablesthat holds the samples array. 
    var samplesData = data.samples;

    //console.log(samplesData);

    // 4. Create a variable that filters the samples for the 
    //object with the desired sample number.
    var resultArray = samplesData.filter(samplesData => samplesData.id == sample);

    //console.log(resultArray)

    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    //console.log(result);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = result.otu_ids;
    var otuLabs = result.otu_labels;
    var otuVals = result.sample_values;

    //console.log(otuIds,":",otuLabs,":",otuVals);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last.
    //var sortYticks = otuIds.map((a) => a);
    
    var yticks = otuIds.slice(0,10);//sortYticks.slice(0,10);
    //yticks.sort((a,b) => b-a);

    var xval = otuVals.slice(0,10);
    //xval.sort((a,b) => b-a);

    var labels = otuLabs.slice(0,10);

    console.log(yticks);
    console.log(xval);
    console.log(labels);

    // 8. Create the trace for the bar chart. 
    var barData =[{
        x: xval,
        y: yticks,
        text: labels,
        orientation: "h",
        width: 12,
        type: "bar"
    }];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Baceteria Cultures Found",
      yaxis: {
        //tickmode: "array",
        bargap: 0.8,
        tickvals: yticks,
        ticktext: yticks
      }
    };

    var config = {responsive: true};

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout, config);

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuIds,
      y: otuVals,
      text: otuLabs,
      mode: 'markers',
      marker: {
        size: otuVals,
        color: otuIds
      }
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures per Sample',
      showlegend: false,
      height: 600,
      width: 600
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.

    // Create a variable that holds the first sample in the array.
  

    // 2. Create a variable that holds the first sample in the metadata array.
    

    // Create variables that hold the otu_ids, otu_labels, and sample_values.


    // 3. Create a variable that holds the washing frequency.
   

    // Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    //var yticks = 

    // Create the trace for the bar chart. 
    //var barData = [
      
    ];
    // Create the layout for the bar chart. 
    //var barLayout = {
      
    };

    // Use Plotly to plot the data with the layout. 

    // Create the trace for the bubble chart.
    //var bubbleData = [
   
    ];

    // Create the layout for the bubble chart.
    var bubbleLayout = {
      
    };

    // D2: 3. Use Plotly to plot the data with the layout.
   
    
    // 4. Create the trace for the gauge chart.
    //var gaugeData = [
     
    ];
    
    // 5. Create the layout for the gauge chart.
    //var gaugeLayout = { 
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    //Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
