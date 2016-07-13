function refreshSummaryDetail(){
    d3.text("assets/summarizeDetail.txt", function(data) {
        d3.select(".summaryDetail").append("span")
        .text(' Last data summary: ' + data + ' ICT ');
    });
}

function addCountAllRestaurants(data){
    var numFormatter = d3.format(",");
    console.log(numFormatter(data.length));

    var leftDiv = d3.select(".summaryDetailData").append("div")
    .attr("id", "sDD-left");
    
    leftDiv.append("p")
    .text(numFormatter(data.length));
    
    leftDiv.append("p")
    .attr("class", "summNumberText")
    .text("restaurants found");
}

function addAvgAllAvg(data){
    var avgFormatter = d3.format(".2f");

    var avgAllAvg = d3.mean(data, function(d){
        return +d.Avg;
    });

    console.log(avgFormatter(avgAllAvg));

    var rightDiv = d3.select(".summaryDetailData").append("div")
    .attr("id", "sDD-right");
    
    rightDiv.append("p")
    .text(avgFormatter(avgAllAvg) + ' / 5');
    
    rightDiv.append("p")
    .attr("class", "summNumberText")
    .text("avg all ratings");
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
    var middleDiv = d3.select(".summaryDetailData").append("div")
    .attr("id", "sDD-middle");
    
    middleDiv.append("p")
    .text(numFormatter(sumAllCount));
    
    middleDiv.append("p")
    .attr("class", "summNumberText")
    .text("comments found");
    
}



refreshSummaryDetail();
