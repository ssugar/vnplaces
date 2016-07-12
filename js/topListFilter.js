var filterVal = 2000;

function initFilterAndCount(filterThresh){
    var filterDiv = d3.select(".slideFilter");

    var filterLabel = filterDiv.append("label")
        .attr("for", "filter-input");

    filterLabel.append("span")
        .attr("id", "filter-pre-label")
        .text('+1 > ');

    filterLabel.append("span")
        .attr("id", "filter-value")
        .text(filterThresh);

    filterDiv.append("input")
        .attr("id", "filter-input")
        .attr("type", "range")
        .attr("step", "100")
        .attr("min", "1000")
        .attr("max", "5000")
        .attr("style", "width=100%")
        .attr("value", +filterThresh);

    filterDiv.append("span")
        .attr("id", "filter-pre-count")
        .text(" = ");

    filterDiv.append("span")
        .attr("id", "rest-count");

    filterDiv.append("span")
        .attr("id", "filter-post-count")
        .html('<i class="material-icons">restaurant</i>');
}

function watchFilterInput(data){
    d3.select("#filter-input").on("input", function() {
        filterVal = +this.value;
        d3.select('#filter-value').text(filterVal);            
        clearTable();
        refreshTable("Avg", data);
    });
}

initFilterAndCount(filterVal);
