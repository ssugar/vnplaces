function initTopList(){ 
    d3.tsv("assets/summarizeData.txt", function(data) 
    {
        var jsonData = data.filter(function(d)
        {
            if(d["Count"] > 2000){
                return d;
            }
        });

        var w = window;
        var fieldHeight = 30;
        var firstColMultiplier = 3;
        var numOfCols = (1 * firstColMultiplier) + 3;

        if(w.innerWidth < 775){
            var fieldWidth = (w.innerWidth - 30) / numOfCols;
        }
        else{
            var fieldWidth = 124;
        }


        //using total data rows + 1 for header time height + 1 for padding
        var tableHeight = (jsonData.length + 1) * (fieldHeight + 2); 

        var margin = {top: 0, right: 30, bottom: 30, left: 0},
            width = 960 - margin.left - margin.right,
            height = tableHeight - margin.top - margin.bottom;

        var canvasHeader = d3.select(".containerHeader").append("svg")
            .attr("class", "canvas")
            .attr("width", "100%")
            .attr("height", "31")
            //.attr("viewbox", "0, 0, 100, 100")        
            //.attr("preserveAspectRatio", "xMinYMin meet")        
            .append("g")
            .attr("transform", "translate(0,0)");

        var canvas = d3.select(".container").append("svg")
            .attr("class", "canvas")
            .attr("width", "100%")
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var headerGrp = canvasHeader.append("g").attr("class", "headerGrp");
        var rowsGrp = canvas.append("g").attr("class","rowsGrp");

        var previousSort = null;

        refreshTable(null);

        function refreshTable(sortOn)
        {
            // create the table header	
            var header = headerGrp.selectAll("g")
            .data(d3.keys(jsonData[0]))
            .enter().append("g")
            .attr("class", "header")
            .attr("transform", function (d, i){
                if(i == 0){
                    return "translate(" + i * (fieldWidth * firstColMultiplier) + ",0)";            
                }
                else{
                    return "translate(" + (i + firstColMultiplier - 1) * fieldWidth + ",0)";
                }
            })
            .on("click", function(d){ return refreshTable(d);});

            foreignObjects = header.append("foreignObject")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", function (d, i){
                if(i == 0){
                    return ((fieldWidth*firstColMultiplier)-1); 
                }
                else{
                    return (fieldWidth-1); 
                }
            })
            .attr("height", fieldHeight);

            htmlDOMs = foreignObjects.append("xhtml:body")
                .style("margin",0)
                .style("padding",0)

            htmlLabels = htmlDOMs.append("div")
                .attr("class","htmlLabel");

            htmlLabels.append("p")
                .attr("class","description")
                .html(function(d,i) { 
                    if(i == 0){
                        return '<i class="material-icons">restaurant</i>'; 
                    }
                    else{
                        return '<i class="material-icons">whatshot</i>'; 
                    }
                });



            //header.append("text")
            //.attr("x", function(d, i){
            //    if(i == 0){
            //        return (fieldWidth / 2 * firstColMultiplier);
            //    }
            //    else{
            //        return (fieldWidth / 2);
            //    }
            //})
            //.attr("y", fieldHeight / 2)
            //.attr("dy", ".35em")
            //.text(String);
            
            // fill the table	
            // select rows
            var rows = rowsGrp.selectAll("g.row").data(jsonData, 
            function(d){ return d.Name; });
            
            // create rows	
            var rowsEnter = rows.enter().append("svg:g")
            .attr("class","row")
            .attr("transform", function (d, i){
                return "translate(0," + (i) * (fieldHeight+1) + ")";
            })
        .on("click", function(d){
                //calling gmap.js initialize function
            initialize("ho chi minh " + d.Name);
            });

            // select cells
            var cells = rows.selectAll("g.cell").data(function(d){return d3.values(d);});
            
            // create cells
            var cellsEnter = cells.enter().append("svg:g")
            .attr("class", "cell")
            .attr("transform", function (d, i){
                if(i == 0){
                    return "translate(" + i * (fieldWidth * firstColMultiplier) + ",0)";            
                }
                else{
                    return "translate(" + (i + firstColMultiplier - 1) * fieldWidth + ",0)";
                }
            });
            
            cellsEnter.append("rect")
            .attr("width", function (d, i){
                if(i == 0){
                    return ((fieldWidth * firstColMultiplier)-1); 
                }
                else{
                    return (fieldWidth-1); 
                }
            })
            .attr("rx", 2)
            .attr("ry", 2)
            .attr("height", fieldHeight);	
            
            cellsEnter.append("text")
            .attr("x", function (d, i){
                if(i == 0){
                    return (fieldWidth / 2 * firstColMultiplier);
                }
                else{
                    return (fieldWidth / 2);
                }
            })
            .attr("y", fieldHeight / 2)
            .attr("dy", ".35em")
            .text(String);
            
            //update if not in initialisation
            if(sortOn !== null) {
                // update rows
                if(sortOn != previousSort){
                    rows.sort(function(a,b){return sort(b[sortOn], a[sortOn]);});
                    previousSort = sortOn;
                }
                else{
                    rows.sort(function(a,b){return sort(a[sortOn], b[sortOn]);});			
                    previousSort = null;
                }
                rows.transition()
                .duration(500)
                .attr("transform", function (d, i){
                    return "translate(0," + (i) * (fieldHeight+1) + ")";
                });
            }
        }
    });
}

function sort(a,b){
    if(typeof a == "string"){
        if(+a){
            return +a > +b ? 1 : +a == +b ? 0 : -1;            
        }
        else{
            return a.localeCompare(b);
        }
    }
    else if(typeof a == "number"){
        return a > b ? 1 : a == b ? 0 : -1;
    }
    else if(typeof a == "boolean"){
        return b ? 1 : a ? -1 : 0;
    }
}

initTopList();