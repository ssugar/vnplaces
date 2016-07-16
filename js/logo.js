
function generateLogo(){
    var spacer = 2;
    var boxSize = 5;
    var startX = 0;
    var startY = 0;
    var maxX = 100;
    var maxY = 40
    var margin = 10

    var svgContainer = d3.select(".fixedHeader").append("svg")
        .attr("width", 100)
        .attr("height", 40);
    
    //svgContainer.append("circle")
    //    .attr("cx", 20)
    //    .attr("cy", 20)
    //    .attr("r", 10);


    //drawing E

    for(i = 0; i < 2; i++) {
    svgContainer.append("rect")
        .attr("x", startX + margin)
        .attr("y", (startY + margin + (boxSize * i) + (spacer*i)))
        .attr("width", boxSize)
        .attr("height", boxSize);
    }

}

generateLogo();