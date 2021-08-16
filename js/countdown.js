$(function() {

    var Countdown = function(options) {
      $.extend(this, {
        endDate: new Date(2019, 4, 26, 15, 02, 20, 0)
      }, options);
  
      this.cache();
      this.bind();
  
      return this;
    };
    $.extend(Countdown.prototype, {
      cache: function() {
        this.date = new Date();
        this.secCounter = parseInt((this.endDate - this.date) / 1000);
      },
      bind: function() {
        this.timer();
      },
      timer: function() {
        var timeInSec = this.secCounter,
          $secondsCircle = $('.seconds').closest('.time-circle').find('.progress'),
          $minutesCircle = $('.minutes').closest('.time-circle').find('.progress'),
          $hoursCircle = $('.hours').closest('.time-circle').find('.progress'),
          $seconds = $('.seconds'),
          $minutes = $('.minutes'),
          $hours = $('.hours');
  
        function pad(number) {
          return (number < 10 ? '0' : '') + number
        }
  
        function setScale(type, degree) {
          type.css({
            '-webkit-transform': 'rotate(' + -degree * 6 + 'deg)',
            '-moz-transform': 'rotate(' + -degree * 6 + 'deg)',
            '-ms-transform': 'rotate(' + -degree * 6 + 'deg)',
            '-o-transform': 'rotate(' + -degree * 6 + 'deg)',
            'transform': 'rotate(' + -degree * 6 + 'deg)'
          });
        };
  
        var setInterv = setInterval(function() {
  
          (timeInSec > 0 ? timeInSec-- : timeInSec = 0);
  
          var getSeconds = timeInSec % 60,
            getMinutes = Math.floor(timeInSec / 60 % 60),
            getHours = Math.floor(timeInSec / 3600 % 24),
            getDays = Math.floor(timeInSec / 86400 % 7),
            getWeeks = Math.floor(timeInSec / 604800);
  
          $seconds.text(pad(getSeconds));
          $minutes.text(pad(getMinutes));
          $hours.text(pad(getHours));
  
          setScale($secondsCircle, getSeconds);
          setScale($minutesCircle, getMinutes);
          setScale($hoursCircle, getHours);
  
          if (timeInSec <= 0) {
            clearInterval(setInterv);
            console.log('End of counting');
          }
  
        }, 1000);
      }
    });
    window.Countdown = Countdown;
  });
  
  $(function() {
    var app = new Countdown({
      //properties
      //endDate: new Date(year, month, day, hour, minute, second, miliseco)
    });
  });