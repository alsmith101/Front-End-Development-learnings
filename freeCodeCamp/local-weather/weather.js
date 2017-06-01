//initially used http://ip-api.com//
//moving to http://freegeoip.net/ as it doesn't work on Chrome!//

$(document).ready(function() {
  var $icon  = $('.icon');
  var $tempbox;
  var $body  = $('body');
  var $cloud = $('.cloud');
  var $windBox = $('.windBox');
  var $humidityBox = $('.humidityBox');
  var weatherIDs = {
    "200-299":  'Group 2',
    "300-399":  'Group 3',
    "500-599":  'Group 5',
    "600-699":  'Group 6',
    "700-799":  'Group 7',
    "800-800":  'Group 8',
    "801-803":  'Group 8a',
    "804-804":  'Group 8b'
  };
  var weatherIDMapping = {
    "Group 2": ['Cloud', 'Thunderstorm'],
    "Group 3": ['Cloud', 'Black_Cloud', 'Drizzle'],
    "Group 5": ['Cloud', 'Black_Cloud', 'Rain'],
    "Group 6": ['Cloud','Snow'],
    "Group 7": ['Cloud'],
    "Group 8": ['Sun'],
    "Group 8a": ['Cloud', 'Sun'],
    "Group 8b": ['Cloud', 'Black_Cloud']
  };

var units = "metric";
var currentTemp;
  
function getWeather(units) {
  
  $icon.empty();
  
  $.getJSON('https://freegeoip.net/json/', function(JSON){
  console.log(JSON.city);
  console.log(JSON.latitude);
  console.log(JSON.longitude);
  var city    = JSON.city; 
  var region  = JSON.country_code;
  var lat     = JSON.latitude;
  var lon     = JSON.longitude;
   
     var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID=e645d231c9b634c77bad060d2463a187&units='+units;
     
  // get weather from OpenWeather Map
  $.ajax({
    dataType: "jsonp",
    url: url,
    method:"GET",
    jsonCallback: 'jsonp',
    cache: false,
    success: function (response) {
      
     
      var weatherID = response.weather[0].id;
      console.log(weatherID);
      var keyPart;
      var weatherGroup;
      $.each(weatherIDs, function(k, v){
        keyPart = k.split("-");
        var keyPartOne = Number(keyPart[0]);
        var keyPartTwo = Number(keyPart[1]);
        if(weatherID >= keyPartOne && weatherID <= keyPartTwo){
          weatherGroup = (weatherIDs[k]);
        }
      });

      console.log(weatherGroup);
      var weatherProperty = weatherIDMapping[weatherGroup];
      for(i=0; i<weatherProperty.length;i++){
        console.log(weatherProperty[i]);
        if(weatherProperty[i]=="Cloud"){
          $icon.append('<div class="cloud"></div>');
        }
        if(weatherProperty[i]=="Sun"){
          $icon.append('<div class="sun"><div class="rays"></div><div class="rays1"></div></div>');
        }
        if(weatherProperty[i]=="Black_Cloud"){
          $icon.append('<div class="black_cloud"></div>');
          }
        if(weatherProperty[i]=="Drizzle"){
          $icon.append('<div class="precipitation"><div id="drizzle1"></div><div id="drizzle2"></div></div>')
        }
        if(weatherProperty[i]=="Rain"){
          $icon.append('<div class="precipitation"><div id="Rain1"></div><div id="Rain2"></div><div id="Rain3"></div></div>')
        }
        if(weatherProperty[i]=="Snow"){
          $icon.append('<div class="precipitation"><div id="snow1"></div><div id="snow2"></div><div id="snow3"></div><div id="snow4"></div><div id="snow5"></div><div id="snow6"></div></div>')
        }
     }

      currentTemp = Math.floor(response.main.temp);   
      var weatherDescription = response.weather[0].description;
      var weatherID = response.weather[0].id;
      var wind = response.wind.speed;
      var humidity = response.main.humidity;
      if(units=="metric"){
        var unit= 'Cº';
      } else {
        var unit = 'Fº';
      }
$icon.append('<div class="temperature"></div>'); 
$tempbox = $('.temperature');
$tempbox.append('<div class=currentTemp>'+currentTemp+'</div>');
$tempbox.append('<div class=units>'+unit+'</div>');
$icon.append('<div class=weatherDesc><p>'+weatherDescription+'</p></div>');
$icon.append('<div class="city">'+city+', '+region+'</div>');
$windBox.append('<div class=windSpeed>'+wind+' metre/s</div>');   
$humidityBox.append('<div class=humidityDesc>'+humidity+'%</div>') ; 
    }
  });
  });
}
   
getWeather(units)
  
 $("input[name='celcius-farenheit']:radio").click(function () {
   console.log(this.value);
   console.log(units);
   console.log(currentTemp);
   if(this.value=="f" && units=="metric"){
     $tempbox.empty();
     units = "imperial"
     var newCurrentTemp = (currentTemp * 9/5) + 32
     $tempbox.append('<div class=currentTemp>'+newCurrentTemp+'</div>');
     $tempbox.append('<div class=units>'+'Fº'+'</div>');
   } else if (this.value=="c" && units=="imperial") {
     $tempbox.empty();
     units = "metric"
     var newCurrentTemp = currentTemp;
     $tempbox.append('<div class=currentTemp>'+newCurrentTemp+'</div>');
     $tempbox.append('<div class=units>'+'Cº'+'</div>');
   
   };
   
 });
   
    
});
  


