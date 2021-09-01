//Helper and common functions
(function(BFG){
    BFG.extend = function(obj){
        var key,
        args = Array.prototype.slice.call(arguments,1);
        args.forEach(function(value,index,array){
            for (key in value){
                if (value.hasOwnProperty(key)){
                    obj[key] = value[key];
                }
            }
        });
        return obj;
    };

    BFG.rnd = function (min,max){ //random on steriods
        if (min instanceof Array){ //returns random array item
            if(min.length === 0){
                return undefined;
            }
            if(min.length === 1){
                return min[0];
            }
            return min[rnd(0,min.length-1)];
        }
        if(typeof min === "object"){ // returns random object member
            min = Object.keys(min);
            return min[rnd(min.length-1)];
        }
        min = min === undefined?100:min;
        if (!max){
            max = min;
            min = 0;
        }
        return	Math.floor(Math.random() * (max-min+1) + min);
    };

    BFG.ArrayIndexOf = function(array,value,fn){ //I did not want to override the Array.prototype.indexOf
        var result = -1;
        array.forEach(function(v,i,a){
            result = fn(value,v)?i:result;
        });
        return result;
    };
    window.BFG = BFG;
})(window.BFG || {});

//Erik Möller - polyfill for requestAnimationFrame
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
        window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

Object.keys =Object.keys || function(o) {
    if (o !== Object(o))
        throw new TypeError('Object.keys called on a non-object');
    var k=[],p;
    for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
    return k;
};

window.assert = window.assert || function (value,message){
    if(!message){
        message = value;
        value = true;
    }
    var ul = document.getElementById('assert');
    if(!ul){
        ul = document.createElement('ul');
        ul.id = 'assert';
        document.body.appendChild(ul);
    }
    var li = document.createElement('li');
    li.className = value ? 'success':'fail';
    li.appendChild(document.createTextNode(message));
    ul.appendChild(li);
};

Array.prototype.forEach = Array.prototype.forEach || function(callback,context){
    for(var i = 0,len = this.length;i < len;i++){
        callback.call(context || null,this[i],i,this);
    }
};

Array.prototype.difference = Array.prototype.difference || function(ar,fn){
    var isInArray,result = [];
    fn = fn || function(a,b){
        return a===b;
    };
    for(var i = 0,len = this.length;i<len;i++){
        isInArray = false;
        for (var x = 0,lenx = ar.length;x<lenx;x++){
            if (fn(this[i],ar[x])){
                isInArray = true;
                break;
            }
        }
        if(!isInArray){
            result.push(this[i]);
        }
    }
    return result;
};

//Leaderboard
(function(BFG){
    var Leaderboard = function(o){
        this.config = BFG.extend({
            max:8,
            interval:8,
            elemId:'leaderboard',
            sort:'sort',
            margin:0,
            transitionClass:'move',
            display:function(data){
                return data.toString();
            },
            dataCallback:function(){return [];}
        },o);
        this.data = [];
        this.uiList = [];
        this.ul = document.createElement("ul");
    };
    Leaderboard.prototype = {
        constructor:Leaderboard,
        start:function(){
            var 	that = this,
                tStart = 0,
                progress = 0,
                interval = that.config.interval * 1000;

            (function run(timestamp){ //This should be moved into it's own .. passing in something like {startTime:0,interval:1000,callback:fn,endOnly:true}
                progress = timestamp - tStart ;
                if (progress > interval || progress === 0){
                    tStart = timestamp;
                    that.getData();
                    that.doTransition();
                }
                requestAnimationFrame( run );
            })(0);
        },
        stop:function(){
            //This no worky
            console.log(this.animationRequestId);
            cancelAnimationFrame(0);
        },
        getData:function(){
            var that = this;
            this.data = this.config.dataCallback();
            this.data.sort(function(a,b){
                return b[that.config.sort] - a[that.config.sort];
            });
            this.data =  this.config.max > this.data.length?this.data: this.data.slice(0, this.config.max);
            //do something about the uiList when it's shorter than max
            if (this.data.length !== this.uiList.length){
                this.buildUI();
            }
            return this;
        },
        buildUI:function(){
            var 	elem = this.elem || document.getElementById(this.config.elemId) || document.body.appendChild(document.createElement("div"));
            elem.innerHTML = this.ul.innerHTML = ""; // Is there a better way?
            elem.appendChild(this.ul);
            for (var i = 0;i < this.config.max;i++){
                this.uiList.push({
                    elem:this.ul.appendChild(document.createElement("li")),
                    id:null,
                    content:'',
                    sort:0
                });
                // this.uiList[i].elem.addEventListener('webkitTransitionEnd',function(){
                // 	this.className = "";
                // }); // I can not get this to fire on all elements as some of them do not move.. therefore do not trigger
                this.uiList[i].elem.style.top = "0px";
                this.uiList[i].elem.innerHTML = "Loading...";
            }
            return this;
        },
        doTransition:function(){
            var 	oldElem = [],
                heights = [],
                replaceElem = [],
                that = this;

            replaceElem = this.data.difference(this.uiList,function(a,b){
                return a.id === b.id;
            });
            this.uiList.forEach(function(v,i,a){
                var	uiIndex,nextAvailable;

                uiIndex = BFG.ArrayIndexOf(that.data,v.id,function(a,b){
                    return a === b.id;
                });

                if (uiIndex >= 0){
                    v.elem.classList.add("move");
                    v.sort = that.data[uiIndex][that.config.sort];
                    that.display(v.elem,that.data[uiIndex]);
                }else{
                    v.elem.classList.add("replace");
                    nextAvailable = replaceElem.shift();
                    v.id = nextAvailable.id;
                    that.display(v.elem,nextAvailable);
                    v.sort =nextAvailable[that.config.sort];
                }
            });
            this.uiList.sort(function(a,b){
                return b.sort - a.sort;
            });
            this.uiList.forEach(function(v,i,a){
                heights .push(i>0?that.uiList[i-1].elem.offsetHeight + heights[i-1] + that.config.margin :0);
                v.elem.style.top = heights[i] + "px";
                setTimeout(function(){ // terrible hack.. my attempted transistionEnd event does not fire on all elements
                    v.elem.className = "";
                },2000);
            });
            this.ul.style.height = (heights[heights.length - 1] + this.uiList[this.uiList.length - 1].elem.offsetHeight  + that.config.margin)+ "px";
            return this;
        },
        display:function(elem,data){
            var display = this.config.display(data);
            elem.innerHTML = ""; // Is this the best way to empty?
            if (typeof display === "object"){
                elem.appendChild(display);
            }else if (typeof display === "string"){
                elem.innerHTML = display;
            }
        }
    };

    BFG.Leaderboard = Leaderboard;
    window.BFG = BFG;
})(window.BFG || {});

var scoreList = new Array(8);
for(var i = 0; i < 8; i++){
    scoreList[i] = new Array(2);
}

var totalList = document.getElementsByClassName('col-md-10 col-md-offset-2 col-sm-10 col-sm-offset-2 total_score');
var oldList = document.getElementsByClassName('col-md-10 col-md-offset-2 col-sm-10 col-sm-offset-2 old_score');
for(var i=0;i<8;i++){
    scoreList[i] = [parseInt(oldList[i].innerText, 10), parseInt(totalList[i].innerText, 10)];
}
var runScore = false;

var test = new BFG.Leaderboard({
    interval:4,
    max:8,
    margin:4,
    display:function(item){
        var content = document.createElement('div'),
        a = content.appendChild(document.createElement('a')),
        span = document.createElement('span');
        a.innerHTML = item.title;
        a.href = "#";
        span.innerHTML = item.count;
        a.appendChild(span);
        return content;
    },
    sort:'count',
    dataCallback:function(){
        
            if(runScore){
                var smallIndex = 10, smallPoint = 1000;
                for(var j = 0; j < 8; j++) {
                    if(scoreList[j][0] < smallPoint && scoreList[j][1] != -1) {
                        smallIndex = j;
                        smallPoint = scoreList[j][0];
                    }
                }
                if(smallIndex !==10){
                    scoreList[smallIndex][0] = scoreList[smallIndex][1];
                    scoreList[smallIndex][1] = -1;
                }
            }
            else{
                runScore = true;
            }

            return [//simulates incoming data
                {id: 1,title: "一見到你‧紫想要‧那個",count: scoreList[0][0]},
                {id: 2,title: "肚子二‧普茲普茲‧布朗尼",count: scoreList[1][0]},
                {id: 3,title: "黑芝麻‧三明治‧嘿咻嘿咻",count: scoreList[2][0]},
                {id: 4,title: "四巴拉稀‧肛鐵人‧歐蘭吉",count: scoreList[3][0]},
                {id: 5,title: "白吃白喝‧爽‧五敵鐵金剛",count: scoreList[4][0]},
                {id: 6,title: "六到開‧瑪莎拉‧蒂芬妮綠",count: scoreList[5][0]},
                {id: 7,title: "藍莓‧七泡水‧史戈史戈",count: scoreList[6][0]},
                // {id:8,title:"扒了你‧領主大人‧灰生氣",count:BFG.rnd(1,800)},
                {id: 8,title: "扒了你‧領主大人‧灰生氣",count: scoreList[7][0]},
            ];

    }
});
setInterval(test.start(),5000);
