d3.tsv("{{ "/assets/summarizeData.txt" | prepend: site.baseurl }}", function(data) {
    var filteredData = data.filter(function(d)
    {
    if(d["Count"] > 1000)
    {
        return d;
    }
    });
    filteredData.forEach(function(d) {
    var avgRating = d.Value / d.Count;
    d3.select("body").select("div.home").select("div.restName").append("span").text(d.Name);
    d3.select("body").select("div.home").select("div.restName").append("span").html("<br/>");    
    d3.select("body").select("div.home").select("div.ratingTotal").append("span").text(d.Value);
    d3.select("body").select("div.home").select("div.ratingTotal").append("span").html("<br/>");   
    d3.select("body").select("div.home").select("div.ratingCount").append("span").text(d.Count);
    d3.select("body").select("div.home").select("div.ratingCount").append("span").html("<br/>");   
    d3.select("body").select("div.home").select("div.ratingAvg").append("span").text(avgRating);
    d3.select("body").select("div.home").select("div.ratingAvg").append("span").html("<br/>");   
    });
});
