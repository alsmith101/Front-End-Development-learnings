$(document).ready(function() { 

  var $wikiElem = $('.wiki-articles');
  
$(".search-wiki").click(function() { 
 
   $("form").empty();
  
   $("form").append('<input type = "text" placeholder="Wikipedia Article Search" id="input" value=""></input>');
  
  return false;
}); 
  
  
  $("#random-wiki").click(function() { 
 
  window.open("https://en.wikipedia.org/wiki/Special:Random",  "width=100,height=100"); 
  
  return false;
}); 
  
$(".searchBar").submit(function(event) {

$wikiElem.empty();
var searchItem = $('#input').val();

var wiki_url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+searchItem+' &format=json&callback=?';

$.ajax({
  url: wiki_url,
  dataType:'JSONP',
  success(data) {

  console.log(data);
    
  var articles = data[1];
  var text = data[2];
  var urls = data[3];
    
  console.log(articles);  
  var i = 0;
 // for(i=1; i<articles.length; i++) {  
    
    $wikiElem.append('<div class="heading"><a href="'+urls[i]+'" target="_blank">'+articles[i]+'</div>');
    $wikiElem.append('<div class="text">'+text[i]+'</div>');
    
    $wikiElem.addClass('wiki');
  //}
    
    $('#next').click(function(){
      //console.log(i);
      i=i+1;
      while (i<articles.length) {
      $wikiElem.empty();
      $wikiElem.removeClass('wiki');
      $wikiElem.append('<div class="heading"><a href="'+urls[i]+'" target="_blank">'+articles[i]+'</div>');
      $wikiElem.append('<div class="text">'+text[i]+'</div>');
    
      $wikiElem.addClass('wiki');
      console.log(i);
      return i;
      }
    });
    
      $('#previous').click(function(){
     
      if(i!=0) {
      i=i-1  
      $wikiElem.empty();
      $wikiElem.removeClass('wiki');
      $wikiElem.append('<div class="heading"><a href="'+urls[i]+'" target="_blank">'+articles[i]+'</div>');
      $wikiElem.append('<div class="text">'+text[i]+'</div>');
    
      $wikiElem.addClass('wiki');
      }
    });
    
}
  

});
    return false; 
});                   
           
});

