var svgContainer = d3.select(".fixedHeader").append("svg")
    .attr("width", 100)
    .attr("height", 56);

function drawBox(startX, startY, boxSize, margin){
    svgContainer.append("rect")
        .attr("x", startX + margin)
        .attr("y", startY + margin)
        .attr("width", boxSize)
        .attr("height", boxSize);
}

function generateLogo(){
    var spacer = 2;
    var boxSize = 5;
    var startX = 0;
    var startY = 0;
    var maxX = 100;
    var maxY = 56;
    var margin = 10;

    var loopLimit = Math.floor((maxY - (margin*2)) / (boxSize + spacer));

    //E
    for(h = 0; h < 3; h++) {
        for(i = 0; i < loopLimit; i++) {
            if(i % 2 == 0 || h == 0){
                drawBox(startX, startY, boxSize, margin);
            }
            startY = startY + boxSize + spacer;
        }
        startY = 0;
        startX = startX + boxSize + spacer;
    }

    startX = startX + (spacer*2);

    //O
    for(h = 0; h < 4; h++) {
        for(i = 0; i < loopLimit; i++) {
            if(i == 0 || i == (loopLimit-1) || h == 0 || h == 3){
                drawBox(startX, startY, boxSize, margin)            
            }
            startY = startY + boxSize + spacer;
        }
        startY = 0;
        startX = startX + boxSize + spacer;
    }


}

generateLogo();