$(document).ready(function(){
  
$("#newQuote").on("click", function(){

  var backgroundcolorArray =   ["#FFB6C1", "#FFAEB9", "#EEA2AD", "#FF82AB", "#8B475D", "#EE3A8C", "#8B8386", "#FFF0F5", "#FF83FA", "#8A2BE2", "#473C8B"];

var randomNumber =  Math.floor(Math.random()*backgroundcolorArray.length); 
var randomNumber1 =  Math.floor(Math.random()*backgroundcolorArray.length); 
  
 document.body.style.backgroundImage="linear-gradient(120deg,"+ backgroundcolorArray[randomNumber]+" 0%,"+backgroundcolorArray[randomNumber1]+" 100%)"             
 // document.body.style.backgroundColor=backgroundcolorArray[4]
                   
var $QuoteElem = $('.quote');
var $QuoterElem = $('.quoter');
$QuoteElem.text("");
$QuoterElem.text("");
  
$.ajax({
  type: 'GET',
  cache: false,
  dataType: 'JSON',
  url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1?",
  success: function(data){
  //$QuoteElem.text(data.content)
    $QuoteElem.html(data[0].content)
    $QuoterElem.html(data[0].title)
  
}
  
});

});

$("#tweet").on("click", function(){
    
var quoteText = $(".quote").text()+ ' - ' + $(".quoter").text();
      window.open("https://twitter.com/intent/tweet?text="+quoteText,  "width=100,height=100"); 
      

});
});