
function generateLogo(){
    var svgContainer = d3.select(".fixedHeader").append("svg")
        .attr("width", 100)
        .attr("height", 40);
    
    svgContainer.append("circle")
        .attr("cx", 20)
        .attr("cy", 20)
        .attr("r", 10);

    svgContainer.append("circle")
        .attr("cx", 30)
        .attr("cy", 30)
        .attr("r", 10);

}

generateLogo();