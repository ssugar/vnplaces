var filterVal = 50;
var previousSort;

function initFilterAndCount(filterThresh){
    var filterDiv = d3.select(".slideFilter");

    var filterLabel = filterDiv.append("label")
        .attr("for", "filter-input");

    filterLabel.append("span")
        .attr("id", "filter-pre-label")
        .html('<i class="material-icons">plus_one</i><i class="material-icons">keyboard_arrow_right</i>');

    filterLabel.append("span")
        .attr("id", "filter-value")
        .text(filterThresh);

    filterDiv.append("input")
        .attr("id", "filter-input")
        .attr("type", "range")
        .attr("step", "10")
        .attr("min", "30")
        .attr("max", "400")
        .attr("style", "vertical-align:middle")
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
        scrollTableTop();
        previousSort = null;
        refreshTable("Avg", data);
    });
}

initFilterAndCount(filterVal);
