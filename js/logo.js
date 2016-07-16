
function generateLogo(){
    var svgContainer = d3.select(".fixedHeader").append("svg")
        .attr("width", 100)
        .attr("height", 40);
    
    //svgContainer.append("circle")
    //    .attr("cx", 20)
    //    .attr("cy", 20)
    //    .attr("r", 10);


    //drawing E
    var spacer = 2;
    var boxSize = 5;
    var startPoint = 10;

    svgContainer.append("rect")
        .attr("x", startPoint)
        .attr("y", startPoint)
        .attr("width", boxSize)
        .attr("height", boxSize);

    svgContainer.append("rect")
        .attr("x", startPoint)
        .attr("y", (startPoint + boxSize + spacer))
        .attr("width", boxSize)
        .attr("height", boxSize);

}

generateLogo();