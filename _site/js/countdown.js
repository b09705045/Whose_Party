var time = new Date();

time.setMonth(9);
time.setDate(23);
time.setHours(9);
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

    if(day < 10){
        document.querySelector('.days').innerHTML = '0'+ day +'';
    }
    else{
        document.querySelector('.days').innerHTML = ''+ day +'';
    }

    if(hr < 10){
        document.querySelector('.hours').innerHTML = '0'+ hr +'';
    }
    else{
        document.querySelector('.hours').innerHTML = ''+ hr +'';
    }

    if(min < 10){
        document.querySelector('.minutes').innerHTML = '0'+ min +'';
    }
    else{
        document.querySelector('.minutes').innerHTML = ''+ min +'';
    }

    if(sec < 10){
        document.querySelector('.seconds').innerHTML = '0'+ sec +'';
    }
    else{
        document.querySelector('.seconds').innerHTML = ''+ sec +'';
    }

},1000);
