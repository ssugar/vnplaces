var logomaxX = 210;
var logomaxY = 56;
var logospacer = 1;
var logoboxSize = 3;
var logostartX = 0;
var logostartY = 0;
var logomargin = 10;
var logoloopLimit = Math.floor((logomaxY - (logomargin*2)) / (logoboxSize + logospacer));

var svgLogoContainer = d3.select(".site-title").append("svg")
    .attr("width", logomaxX)
    .attr("height", logomaxY)
    .on("click", function(){
        window.location = "https://ssugar.github.io/vnplaces";
    });

var randomColor = (function(){
  var golden_ratio_conjugate = 0.618033988749895;
  var h = Math.random();

  var hslToRgb = function (h, s, l){
      var r, g, b;

      if(s == 0){
          r = g = b = l; // achromatic
      }else{
          function hue2rgb(p, q, t){
              if(t < 0) t += 1;
              if(t > 1) t -= 1;
              if(t < 1/6) return p + (q - p) * 6 * t;
              if(t < 1/2) return q;
              if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
              return p;
          }

          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
      }

      return '#'+Math.round(r * 255).toString(16)+Math.round(g * 255).toString(16)+Math.round(b * 255).toString(16);
  };
  
  return function(){
    h += golden_ratio_conjugate;
    h %= 1;
    return hslToRgb(h, 0.5, 0.60);
  };
})();

function drawBox(){
    //svgLogoContainer.append("rect")
    //    .attr("x", logostartX + logomargin)
    //    .attr("y", logostartY + logomargin)
    //    .attr("width", logoboxSize)
    //    .attr("height", logoboxSize);
    svgLogoContainer.append("circle")
        .attr("cx", logostartX + logomargin)
        .attr("cy", logostartY + logomargin)
        .attr("r", logoboxSize/1.5)
        .transition()
        .duration(4000)
        .each(animateLogo);

    function animateLogo() {
        var circle = d3.select(this);
        (function repeat() {
            circle = circle.transition()
                .attr("r", logoboxSize/1.25)
                .style({fill: randomColor})
            .transition()
                .attr("r", logoboxSize/1.5)
                .each("end", repeat)
                .style({fill: randomColor});
        })();
    }        
}

function drawA(){
    //A
    for(h = 0; h < 5; h++) {
        for(i = 0; i < logoloopLimit; i++) {
            if((h == 0 && i < 5) || (h == 4 && i < 5)){
                //skip
            }
            else{
                if(h > 0 && h < 4 && i > 4){
                    //skip
                }
                else{
                    if((i == 0 && h != 2) || (h == 2 && i > 0 && i < 4)){
                        //skip
                    }
                    else{
                        drawBox();            
                    }
                }
            }
            logostartY = logostartY + logoboxSize + logospacer;
        }
        logostartY = 0;
        logostartX = logostartX + logoboxSize + logospacer/2;
    }
}

function drawE() {
    //E
    for(h = 0; h < 3; h++) {
        for(i = 0; i < logoloopLimit; i++) {
            if(i == 0 || i == 4 || i == 8 || h == 0){
                drawBox();
            }
            logostartY = logostartY + logoboxSize + logospacer;
        }
        logostartY = 0;
        logostartX = logostartX + logoboxSize + logospacer/2;
    }
}

function drawG() {
    //G
    for(h = 0; h < 4; h++) {
        for(i = 0; i < logoloopLimit; i++) {
            if(i == 0 || i == (logoloopLimit-1) || h == 0 || h == 3){
                if(h == 3 && i > 0 && i < 4){
                    //skip
                }
                else{
                    drawBox();
                }
            }
            else{
                if(h == 2 && i == 4){
                    drawBox();
                }
            }
            logostartY = logostartY + logoboxSize + logospacer;
        }
        logostartY = 0;
        logostartX = logostartX + logoboxSize + logospacer/2;
    }
}

function drawI() {
    //I
    for(h = 0; h < 1; h++) {
        for(i = 0; i < logoloopLimit; i++) {
            drawBox();
            logostartY = logostartY + logoboxSize + logospacer;
        }
        logostartY = 0;
        logostartX = logostartX + logoboxSize + logospacer;
    }
}

function drawN(){
    //O
    for(h = 0; h < 9; h++) {
        for(i = 0; i < logoloopLimit; i++) {
            if(h == 0 || h == 8 || i == h){
                drawBox();
            }
            logostartY = logostartY + logoboxSize + logospacer;
        }
        logostartY = 0;
        logostartX = logostartX + logoboxSize - (logospacer*1.25);
    }
}

function drawO(){
    //O
    for(h = 0; h < 4; h++) {
        for(i = 0; i < logoloopLimit; i++) {
            if(i == 0 || i == (logoloopLimit-1) || h == 0 || h == 3){
                drawBox();
            }
            logostartY = logostartY + logoboxSize + logospacer;
        }
        logostartY = 0;
        logostartX = logostartX + logoboxSize + logospacer/2;
    }
}

function drawS(){
    //S
    for(h = 0; h < 4; h++) {
        for(i = 0; i < logoloopLimit; i++) {
            if(i == 0 || i == 4 || i == 8 || h == 0 || h == 3){
                if((h == 0 && i > 4 && i < 8) || (h == 3 && i > 0 && i < 4)){
                    //skip
                }
                else{
                    drawBox();
                }
            }
            logostartY = logostartY + logoboxSize + logospacer;
        }
        logostartY = 0;
        logostartX = logostartX + logoboxSize + logospacer/2;
    }
}

function drawT() {
    //T
    for(h = 0; h < 3; h++) {
        for(i = 0; i < logoloopLimit; i++) {
            if(h == 1 || i == 0) {
                drawBox();
            }
            logostartY = logostartY + logoboxSize + logospacer;
        }
        logostartY = 0;
        logostartX = logostartX + logoboxSize + logospacer;
    }
}

function drawU(){
    //U
    for(h = 0; h < 4; h++) {
        for(i = 0; i < logoloopLimit; i++) {
            if(i == (logoloopLimit-1) || h == 0 || h == 3){
                drawBox();
            }
            logostartY = logostartY + logoboxSize + logospacer;
        }
        logostartY = 0;
        logostartX = logostartX + logoboxSize + logospacer/2;
    }
}

function clearLogo(){
    logomaxX = 210;
    logomaxY = 56;
    logospacer = 1;
    logoboxSize = 3;
    logostartX = 0;
    logostartY = 0;
    logomargin = 10;
    logoloopLimit = Math.floor((logomaxY - (logomargin*2)) / (logoboxSize + logospacer));

    d3.select(".site-title").html("");
    
    svgLogoContainer = d3.select(".site-title").append("svg")
        .attr("width", logomaxX)
        .attr("height", logomaxY)
        .on("click", function(){
            window.location = "https://ssugar.github.io/vnplaces";
    });
}

function generateLogo(){

    drawE();
    logostartX = logostartX + (logospacer*2);
    drawA();
    logostartX = logostartX + (logospacer*2);
    drawT();
    logostartX = logostartX + (logospacer*6);

    drawO();
    logostartX = logostartX + (logospacer*2);
    drawU();
    logostartX = logostartX + (logospacer*2);
    drawT();
    logostartX = logostartX + (logospacer*6);

    drawS();
    logostartX = logostartX + (logospacer*2);
    drawA();
    logostartX = logostartX + (logospacer*2);
    drawI();
    logostartX = logostartX + (logospacer*2);
    drawG();
    logostartX = logostartX + (logospacer*2);
    drawO();
    logostartX = logostartX + (logospacer*2);
    drawN();
}

generateLogo();

//setTimeout(clearLogo, 8000);
//setTimeout(generateLogo, 8100);
//setTimeout(clearLogo, 16000);
//setTimeout(generateLogo, 16100);
