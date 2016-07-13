function refreshSummaryDetail(){
    d3.text("assets/summarizeDetail.txt", function(data) {
        d3.select(".summaryDetail").append("span")
        .text(' Last data summary: ' + data + ' ICT ');
    });
}

function addCountAllRestaurants(data){
    console.log(data.length);
}

function addAvgAllAvg(data){
    var avgAllAvg = d3.mean(data, function(d){
        return +d.Avg;
    });
    var avgFormatter = d3.format(".2f");
    console.log(avgFormatter(avgAllAvg));
}


refreshSummaryDetail();
