function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' +  cityStr
    
    $greeting.text('So you want to live at ' + address + '?');
    
    var imgURL =    "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + address;

    $body.append('<img src="'+imgURL+'">');


    var nytimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytimesUrl += '?' + $.param({
    'q': cityStr,
    'sort': "newest",
    'api-key': "f77bcc51902f4c0ba35f8fe910ae3878"
    });    

    $.getJSON(nytimesUrl, function(data){

	console.log(data);

	articles = data.response.docs;
	
	for(var i=0; i<articles.length;i++){
	   
 	var article = articles[i];
	$nytElem.append('<li class="article"><a href="'+article.web_url+'">'+article.headline.main+'</a>' + '<p>' + article.snippet + '</p>' + '</li>');
    };

}).fail(function(e){
	$nytHeaderElem.text('NY Times Articles Could Not be Loaded');	

});

    	wiki_url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+cityStr+"&format=json&callback=wikiCallback";
    	$.ajax({
    
    	url: wiki_url,
	dataType: 'JSONP',
	success: function(dataReturned){
	
	wiki_link =dataReturned[1];
	article = wiki_link[1];
	var url="http://en.wikipedia.org/wiki/"+article;
	$wikiElem.append('<li><a href="'+url+'">'+article+'</a></li>');
}
});

   
    return false;
};

$('#form-container').submit(loadData);
