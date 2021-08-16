var time = new Date();
        
time.setMonth(9); 
time.setDate(23); 
time.setHours(0); 
time.setMinutes(0); 
time.setSeconds(0);
var endTime = time.getTime();

setInterval(function(){
    var time_2 = new Date();
    var nowTime = time_2.getTime(); 
    var offsetTime = (endTime - nowTime) / 1000; 
    var sec = parseInt(offsetTime % 60); 
    var min = parseInt((offsetTime / 60) % 60); 
    var hr = parseInt((offsetTime / 60 / 60) % 24); 
    var day = parseInt(offsetTime / 60 / 60 / 24); 
    
    document.querySelector('.days').innerHTML = ''+ day +'';
    document.querySelector('.hours').innerHTML = ''+ hr +'';
    document.querySelector('.minutes').innerHTML = ''+ min +'';
    document.querySelector('.seconds').innerHTML = ''+ sec +'';
},1000);