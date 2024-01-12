function init() {
    const bellyButton = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    d3.json(bellyButton).then(function(data) {

        let names = data.names

        let dropdownMenu = d3.select("#selDataset");
        for (i = 0; i < names.length; i++) {
            dropdownMenu.append("option").text(names[i]).property("value", names[i])
        }
    })

drawCharts("940");
drawMetadata("940");

}
// Fetch JSON data
function drawCharts(subject) {
    const bellyButton = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(bellyButton).then(function(data) {
    console.log(data)

    let sampleData = data.samples
    let currentSample = sampleData.filter(x => x.id == subject);
    console.log(currentSample)
    let sample = currentSample[0].sample_values
    let otu_id = currentSample[0].otu_ids
    console.log(otu_id)
    let otu_id_list = otu_id.map(id => `OTU ${id}`)
    let otu_label = currentSample[0].otu_labels
    let barData = [{
        x: sample.slice(0, 10).reverse(),
        y: otu_id_list.slice(0, 10).reverse(),
        text: otu_label.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
        marker: {
            color: "blue"
        }
    }];

    let layoutBar = {
        title: "Bar Chart"
    };

    Plotly.newPlot("bar", barData, layoutBar);

    let bubbleData = [{
        x: otu_id,
        y: sample,
        text: otu_label,
        mode: "markers",
        marker: {
            size: sample,
            color: otu_id
        }
    }];

    let layoutBubble = {
        title: "Bubble Chart"
    };

    Plotly.newPlot("bubble", bubbleData, layoutBubble);

});

}

init();

function optionChanged(pickName) {
    drawCharts(pickName);
    drawMetadata(pickName);
}

function drawMetadata(subject) {
    const bellyButton = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(bellyButton).then(function(data) {
    console.log(data)

    let metaData = data.metadata
    let currentSample = metaData.filter(x => x.id == subject);
    console.log(currentSample)
    let eth = currentSample[0].ethnicity;
    let gend = currentSample[0].gender;
    let ag = currentSample[0].age;
    let loc = currentSample[0].location;
    let bb = currentSample[0].bbtype;
    let wf = currentSample[0].wfreq;
    
    let panel = d3.select("#sample-metadata")
    panel.html("")
    panel.append("h5").text(`id: ${subject}`)
    panel.append("h5").text(`ethnicity: ${eth}`)
    panel.append("h5").text(`gender: ${gend}`)
    panel.append("h5").text(`age: ${ag}`)
    panel.append("h5").text(`location: ${loc}`) 
    panel.append("h5").text(`bbtype: ${bb}`)
    panel.append("h5").text(`wfreq: ${wf}`)
});

}