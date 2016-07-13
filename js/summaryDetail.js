function refreshSummaryDetail(){
    d3.text("assets/summarizeDetail.txt", function(data) {
        d3.select(".summaryDetail").append("span")
        .text(' Last data summary: ' + data + ' ICT ');
    });
}

function addCountAllRestaurants(data){
    var numFormatter = d3.format(",");
    console.log(numFormatter(data.length));

    d3.select(".summaryDetailData").append("div")
    .attr("id", "sDD-left")
    .append("p")
    .text(numFormatter(data.length))
    .append("p")
    .attr("font-size", "10px")
    .text("total restaurants");
}

function addAvgAllAvg(data){
    var avgFormatter = d3.format(".2f");

    var avgAllAvg = d3.mean(data, function(d){
        return +d.Avg;
    });

    console.log(avgFormatter(avgAllAvg));

    d3.select(".summaryDetailData").append("div")
    .attr("id", "sDD-right")
    .append("p")
    .text(avgFormatter(avgAllAvg))
    .append("p")
    .attr("font-size", "10px")
    .text("average all avg");
}

function addCountAllComments(data){
    //d3.text("assets/summarizeCommentCount.txt", function(data) {
    //    console.log(data);
    //});
    var numFormatter = d3.format(",");
    var sumAllCount = d3.sum(data, function(d){
        return +d.Count;
    });
    console.log(numFormatter(sumAllCount));
    d3.select(".summaryDetailData").append("div")
    .attr("id", "sDD-middle")
    .append("p")
    .text(numFormatter(sumAllCount))
    .append("p")
    .attr("font-size", "10px")
    .text("total comments");
    
}



refreshSummaryDetail();
