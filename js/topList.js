var filterVal = 2000;
var jsonData;

function initTopList(){ 
    d3.tsv("assets/summarizeData.txt", function(data) 
    {
        jsonData = data.filter(function(d)
        {
            if(d["Count"] > filterVal){
                return d;
            }
        });
        d3.select('#rest-count').text(jsonData.length);            
 
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

        d3.select("#filter-input").on("input", function() {
            filterVal = +this.value;
            d3.select('#filter-value').text(filterVal);            
            clearTable();
            refreshTable(null);
        });

        refreshTable(null);


        function refreshTable(sortOn)
        {
            jsonData = data.filter(function(d)
            {
                if(d["Count"] > filterVal){
                    return d;
                }
            });
            d3.select('#rest-count').text(jsonData.length);            

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
                .attr("class","htmlLabel")
                .on("click", function(d){ return refreshTable(d);});

            htmlLabels.append("p")
                .attr("class","description")
                .html(function(d,i) { 
                    if(i == 0){
                        return '<i class="material-icons">restaurant</i>'; 
                    }
                    else if (i == 1){
                        return '<i class="material-icons">whatshot</i>'; 
                    }
                    else if(i == 2){
                        return '<i class="material-icons">plus_one</i>'; 
                    }
                    else{
                        return '<i class="material-icons">whatshot</i>' + '<i class="material-icons">merge_type</i>' + '<i class="material-icons">plus_one</i>'; 
                    }
                })
                .on("click", function(d){ return refreshTable(d);});

            // fill the table	
            // select rows
            var rows = rowsGrp.selectAll("g.row").data(jsonData, function(d){ 
                return d.Name; 
            });
            
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
            var cells = rows.selectAll("g.cell").data(function(d){
                return d3.values(d);
            });
            
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

function clearTable(){
    d3.select(".rowsGrp").html("");
}

function initFilterAndCount(filterThresh){
        var filterLabel = d3.select(".slideFilter").append("label")
            .attr("for", "filter-input");

        filterLabel.append("span")
            .attr("id", "filter-value")
            .text(filterThresh);

        filterLabel.append("input")
            .attr("id", "filter-input")
            .attr("type", "range")
            .attr("value", filterThresh)
            .attr("step", "100")
            .attr("min", "1000")
            .attr("max", "5000")
            .attr("width", "50%");

        filterLabel.append("span")
            .attr("id", "rest-count");
}

initFilterAndCount(filterVal);

initTopList();

