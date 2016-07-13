function refreshSummaryDetail()
{
    d3.text("assets/summarizeDetail.txt", function(data) {
        d3.select(".summaryDetail").append("span")
        .text(' Last data summary: ' + data + ' ICT ');
    });
}

refreshSummaryDetail();
