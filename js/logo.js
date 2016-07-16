
function generateLogo(){
    var spacer = 2;
    var boxSize = 5;
    var startX = 0;
    var startY = 0;
    var maxX = 100;
    var maxY = 56;
    var margin = 10;

    var loopLimit = Math.floor((maxY - (margin*2)) / (boxSize + spacer));

    var svgContainer = d3.select(".fixedHeader").append("svg")
        .attr("width", 100)
        .attr("height", 56);

    //drawing E
    //First Line
    //for(i = 0; i < loopLimit; i++) {
    //    svgContainer.append("rect")
    //        .attr("x", startX + margin)
    //        .attr("y", (startY + margin + (boxSize * i) + (spacer*i)))
    //        .attr("width", boxSize)
    //        .attr("height", boxSize);
    //}

    //Second Line
    for(h = 0; h < 3; h++) {
        for(i = 0; i < loopLimit; i++) {
            if(i%2 == 0){  //only write on even loops to look like an E.
                svgContainer.append("rect")
                    .attr("x", startX + margin + (boxSize * h) + (spacer*h))
                    .attr("y", (startY + margin + (boxSize * i) + (spacer*i)))
                    .attr("width", boxSize)
                    .attr("height", boxSize);
            }
        }
    }
}

generateLogo();