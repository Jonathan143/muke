/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-06-22 20:36:09
 * @version $Id$
 */
(function(){
	window.requestAnimationFrame = window.requestAnimationFrame || function(fn){
            return setTimeout(fn,1000/60);
        };
    window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
    var Tween = {
            linear: function (t, b, c, d){  //匀速
                return c*t/d + b;
            },
            easeIn: function(t, b, c, d){  //加速曲线
                return c*(t/=d)*t + b;
            },
            easeOut: function(t, b, c, d){  //减速曲线
                return -c *(t/=d)*(t-2) + b;
            },
            easeBoth: function(t, b, c, d){  //加速减速曲线
                if ((t/=d/2) < 1) {
                    return c/2*t*t + b;
                }
                return -c/2 * ((--t)*(t-2) - 1) + b;
            },
            easeInStrong: function(t, b, c, d){  //加加速曲线
                return c*(t/=d)*t*t*t + b;
            },
            easeOutStrong: function(t, b, c, d){  //减减速曲线
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
                if ((t/=d/2) < 1) {
                    return c/2*t*t*t*t + b;
                }
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            },
            elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
                if (t === 0) {
                    return b;
                }
                if ( (t /= d) === 1 ) {
                    return b+c;
                }
                if (!p) {
                    p=d*0.3;
                }
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p/4;
                } else {
                    var s = p/(2*Math.PI) * Math.asin (c/a);
                }
                return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            },
            elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
                if (t === 0) {
                    return b;
                }
                if ( (t /= d) === 1 ) {
                    return b+c;
                }
                if (!p) {
                    p=d*0.3;
                }
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else {
                    var s = p/(2*Math.PI) * Math.asin (c/a);
                }
                return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
            },
            elasticBoth: function(t, b, c, d, a, p){
                if (t === 0) {
                    return b;
                }
                if ( (t /= d/2) === 2 ) {
                    return b+c;
                }
                if (!p) {
                    p = d*(0.3*1.5);
                }
                if ( !a || a < Math.abs(c) ) {
                    a = c;
                    var s = p/4;
                }
                else {
                    var s = p/(2*Math.PI) * Math.asin (c/a);
                }
                if (t < 1) {
                    return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                        Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                }
                return a*Math.pow(2,-10*(t-=1)) *
                    Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
            },
            backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
                if (typeof s === 'undefined') {
                    s = 1.70158;
                }
                return c*(t/=d)*t*((s+1)*t - s) + b;
            },
            backOut: function(t, b, c, d, s){
                if (typeof s === 'undefined') {
                    s = 3.70158;  //回缩的距离
                }
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            },
            backBoth: function(t, b, c, d, s){
                if (typeof s === 'undefined') {
                    s = 1.70158;
                }
                if ((t /= d/2 ) < 1) {
                    return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                }
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            },
            bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
                return c - Tween['bounceOut'](d-t, 0, c, d) + b;
            },
            bounceOut: function(t, b, c, d){
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
                }
                return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
            },
            bounceBoth: function(t, b, c, d){
                if (t < d/2) {
                    return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
                }
                return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
            }
        };
    var noPxAttrArr = ["z-index","opacity","zIndex"];
    function Move(obj , mJson , time , tw, callback){
        //先决定运动曲线
        tw = tw || "easeBoth";
        //获取属性的初始值 与 总位移
        var objStyle = obj.currentStyle || getComputedStyle(obj);
        var sVal = {};
        var S = {};
        for (var attr in mJson) {
            attr = attr.toLocaleLowerCase();
            sVal[attr] = parseFloat(objStyle[attr]);
            if( attr === "opacity" && !(typeof sVal[attr] === "number") ){
                sVal[attr] = 1;
            }
            S[attr] = mJson[attr] - sVal[attr];
        }
        //得到初始时间
        var sTime = new Date();

        (function m(){
            //已经经过的时长
            var s_ = new Date()-sTime;
            if( s_ >= time ){
                s_ = time;
            }else{
                requestAnimationFrame(m);
            }
            for (var attr in mJson) {
                var ss = Tween[tw](s_ , sVal[attr] , S[attr] , time);
                var ifNeedPx = false;
                for(var i=0;i<noPxAttrArr.length;i++){
                    ifNeedPx = attr === noPxAttrArr[i];
                    if(ifNeedPx){
                        break;
                    }
                }
                obj.style[attr] = ss+ (ifNeedPx?"":"px");
                if( attr === "opacity" ){
                    obj.style["filter"] = "alpha(opacity="+ss*100+")";
                }
            }
             if( s_ >= time ){
             	//当动画执行完毕,判断是否有回调函数，
             	//如果有，就执行回调函数，并且改变this指向当前使用函数的obj
             	callback && callback.call(obj);
             }
        })();
    }
    window.Move = Move;
})();
