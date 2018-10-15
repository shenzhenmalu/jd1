window.onload = function(){
    var banner = document.querySelector(".banner");
    var ul = document.querySelector(".banner>ul");
    ul.style.transition = "all 0.5s";   //ul的变化需要弹性效果(渐变)
    var bannerWidth = banner.clientWidth;//获得banner的宽度,其实就是屏幕宽度
    // alert(bannerWitch);
    var posX1 = posX2 = 0;  //初始化触摸点的起始和结束为止的x坐标
    var index = 1;          //默认图片位置(图片号)  从0-7
    var timer1 = null;
    banner.addEventListener("touchstart",function(ev){
        //初始触摸的时候的x坐标
        posX1 = ev.changedTouches[0].clientX;
    });

    banner.addEventListener("touchmove",function(ev){
        //这里用于实现手指触摸过程中(类似拖动)的效果
        posX2 = ev.changedTouches[0].clientX;//过程中的x坐标
        var distance = posX2 - posX1;//移动的距离,往左是负的,往右是正的
        //当前ul停留的位置是: -index*bannerWidth
        //则移动中的新位置就是:
        translateX = -index*bannerWidth + distance;
        ul.style.transform = "translateX("+ translateX +"px)";

    });

    banner.addEventListener("touchend",function(ev){
        //触摸结束的时候的x坐标
        posX2 = ev.changedTouches[0].clientX;
        var distance = posX2 - posX1;   //两点之间的x坐标差
        //通常认为,移动距离超过50px,是一个明确的滑动过程
        if(distance > 50){//属于往右划
            index--;
            //解决两端问题
            // console.log(index);
            if(index <0){
                index = 8;
            }
            // var baifenbi = -12.5 *index; //计算百分比的移动
            // ul.style.transform = "translateX("+ baifenbi +"%)";
            var translateX = -bannerWidth *index;   //这是要移动的像素
            ul.style.transform = "translateX("+ translateX +"px)";
        }else if(distance < -50){//属于往左划
            //此时就需要将ul盒子的translateX值变得更小
            index++;
            //解决两端问题
            if(index >= 10){
                index = 1;
            }
            // var baifenbi = -12.5 *index;    //计算百分比的移动
            // ul.style.transform = "translateX("+ baifenbi +"%)";
            var translateX = -bannerWidth *index;   //这是要移动的像素
            ul.style.transform = "translateX("+ translateX +"px)";
        }else{
            //这里,表示touch触摸的距离不足,就是不移动!
            var translateX = -bannerWidth *index;   //这是要移动的像素
            ul.style.transform = "translateX("+ translateX +"px)";
        }
    });


    //ul变换结束后,触发该事件
    ul.addEventListener("transitionend",function(){
        if(index == 9){ //这是指最后一张图(实际上 是图8后面的图1)
            ul.style.transition = "none";
            index = 1;
            var translateX = -bannerWidth *index;   //这是要移动的像素
            ul.style.transform = "translateX("+ translateX +"px)";
            // ul.style.transition = "all 0.5s";
        }else if(index == 0){//这是指最后一张图(实际上 是图1前面的图8)
            ul.style.transition = "none";
            index =8;
            var translateX = -bannerWidth *index;   //这是要移动的像素
            ul.style.transform = "translateX("+ translateX +"px)";
        }
        // ul.style.transition = "all 0.5s";
    })


    function autoPlay(){
        ul.style.transition = "all 0.5s";
        index++;
        if(index >=10){
            index= 1;
        }
        var translateX = -bannerWidth *index;   //这是要移动的像素
        ul.style.transform = "translateX("+ translateX +"px)";
    }
    //启动一个定时器,来实现"自动切换"
    var timer = window.setInterval(autoPlay,2000);
}


