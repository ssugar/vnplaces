
function generateLogo(){
    var svgContainer = d3.select(".fixedHeader").append("svg")
        .attr("width", 100)
        .attr("height", 40);
    
    var circle = svgContainer.append("circle")
        .attr("cx", 20)
        .attr("cy", 20)
        .attr("r", 10);
}