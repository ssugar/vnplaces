var maxX = 400;
var maxY = 56;
var spacer = 2;
var boxSize = 5;
var startX = 0;
var startY = 0;
var margin = 10;
var loopLimit = Math.floor((maxY - (margin*2)) / (boxSize + spacer));

var svgContainer = d3.select(".fixedHeader").append("svg")
    .attr("width", maxX)
    .attr("height", maxY);

function drawBox(startX, startY, boxSize, margin){
    svgContainer.append("rect")
        .attr("x", startX + margin)
        .attr("y", startY + margin)
        .attr("width", boxSize)
        .attr("height", boxSize);
}

function drawA(){
    //A
    for(h = 0; h < 5; h++) {
        for(i = 0; i < loopLimit; i++) {
            if((h == 0 && i < 3) || (h == 4 && i < 3)){
                //skip
            }
            else{
                if(h > 0 && h < 4 && i > 2){
                    //skip
                }
                else{
                    if((i == 0 && h != 2) || (h == 2 && i == 1)){
                        //skip
                    }
                    else{
                        drawBox(startX, startY, boxSize, margin);            
                    }
                }
            }
            startY = startY + boxSize + spacer;
        }
        startY = 0;
        startX = startX + boxSize + spacer;
    }
}

function drawE() {
    //E
    for(h = 0; h < 4; h++) {
        for(i = 0; i < loopLimit; i++) {
            if(i % 2 == 0 || h == 0){
                drawBox(startX, startY, boxSize, margin);
            }
            startY = startY + boxSize + spacer;
        }
        startY = 0;
        startX = startX + boxSize + spacer;
    }
}

function drawG() {
    //G
    for(h = 0; h < 4; h++) {
        for(i = 0; i < loopLimit; i++) {
            if(i == 0 || i == (loopLimit-1) || h == 0 || h == 3){
                if(h == 3 && i == 1){
                    //skip
                }
                else{
                    drawBox(startX, startY, boxSize, margin);            
                }
            }
            else{
                if(h == 2 && i == 2){
                    drawBox(startX, startY, boxSize, margin);
                }
            }
            startY = startY + boxSize + spacer;
        }
        startY = 0;
        startX = startX + boxSize + spacer;
    }
}

function drawI() {
    //I
    for(h = 0; h < 1; h++) {
        for(i = 0; i < loopLimit; i++) {
            drawBox(startX, startY, boxSize, margin);            
            startY = startY + boxSize + spacer;
        }
        startY = 0;
        startX = startX + boxSize + spacer;
    }
}

function drawO(){
    //O
    for(h = 0; h < 4; h++) {
        for(i = 0; i < loopLimit; i++) {
            if(i == 0 || i == (loopLimit-1) || h == 0 || h == 3){
                drawBox(startX, startY, boxSize, margin);            
            }
            startY = startY + boxSize + spacer;
        }
        startY = 0;
        startX = startX + boxSize + spacer;
    }
}

function drawS(){
    //S
    for(h = 0; h < 4; h++) {
        for(i = 0; i < loopLimit; i++) {
            if(i % 2 == 0 || h == 0 || h == 3){
                if((h == 0 && i == 3) || (h == 3 && i == 1)){
                    //skip
                }
                else{
                    drawBox(startX, startY, boxSize, margin);            
                }
            }
            startY = startY + boxSize + spacer;
        }
        startY = 0;
        startX = startX + boxSize + spacer;
    }
}

function generateLogo(){

    drawE();
    startX = startX + (spacer*2);
    drawO();
    startX = startX + (spacer*2);
    drawS();
    startX = startX + (spacer*2);
    drawA();
    startX = startX + (spacer*2);
    drawI();
    startX = startX + (spacer*2);
    drawG();
    startX = startX + (spacer*2);
    drawO();
}

generateLogo();