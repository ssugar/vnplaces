function refreshSummaryDetail(){
    d3.text("assets/summarizeDetail.txt", function(data) {
        d3.select(".summaryDetail").append("span")
        .text(' Last data summary: ' + data + ' ICT ');
    });
}

function addCountAllRestaurants(data){
    console.log(data.length);

    d3.select(".summaryDetailData").append("div")
    .attr("id", "sDD-left")
    .append("span")
    .text(data.length);
}

function addAvgAllAvg(data){
    var avgAllAvg = d3.mean(data, function(d){
        return +d.Avg;
    });
    var avgFormatter = d3.format(".2f");

    console.log(avgFormatter(avgAllAvg));

    d3.select(".summaryDetailData").append("div")
    .attr("id", "sDD-right")
    .append("span")
    .text(avgFormatter(avgAllAvg));

}

function addCountAllComments(data){
    //d3.text("assets/summarizeCommentCount.txt", function(data) {
    //    console.log(data);
    //});
    var sumAllCount = d3.sum(data, function(d){
        return +d.Count;
    });
    console.log(sumAllCount);
    
}



refreshSummaryDetail();
