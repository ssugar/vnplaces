
function generateLogo(){
    var spacer = 2;
    var boxSize = 5;
    var startX = 0;
    var startY = 0;
    var maxX = 100;
    var maxY = 56;
    var margin = 5;

    var svgContainer = d3.select(".fixedHeader").append("svg")
        .attr("width", 100)
        .attr("height", 56);
    
    //svgContainer.append("circle")
    //    .attr("cx", 20)
    //    .attr("cy", 20)
    //    .attr("r", 10);


    //drawing E
    var loopLimit = Math.floor((maxY - (margin*2)) / (boxSize + spacer));

    for(i = 0; i < loopLimit; i++) {
        if(i == 0){
            svgContainer.append("rect")
                .attr("x", startX + margin)
                .attr("y", startY + margin)
                .attr("width", boxSize)
                .attr("height", boxSize);
        }
        else{
            svgContainer.append("rect")
                .attr("x", startX + margin)
                .attr("y", (startY + margin + (boxSize * i) + (spacer*i)))
                .attr("width", boxSize)
                .attr("height", boxSize);
        }

    }
}

generateLogo();