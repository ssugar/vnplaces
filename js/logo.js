
function generateLogo(){
    var svgContainer = d3.select(".fixedHeader").append("svg")
        .attr("width", 100)
        .attr("height", 40);
    
    //svgContainer.append("circle")
    //    .attr("cx", 20)
    //    .attr("cy", 20)
    //    .attr("r", 10);

    svgContainer.append("rect")
        .attr("x", 10)
        .attr("y", 10)
        .attr("width", 5)
        .attr("height", 5);

    svgContainer.append("rect")
        .attr("x", 10)
        .attr("y", 17)
        .attr("width", 5)
        .attr("height", 5);

}

generateLogo();