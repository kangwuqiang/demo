window.onload = function () {
    /*顶部搜索*/
    search();
    /*轮播图*/
    banner();
    /*倒计时*/
    downTime();
}
/*顶部搜索*/
var search = function () {
    /*1.默认顶部显示透明显示*/
    /*2.当页面滚动的时候  透明度需要随着卷曲的高度正比的变化*/
    /*3.当页面滚动到超过轮播图  透明度不变*/

    /*获取需要操作的dom元素*/
    var searchBox = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;

    /*监听滚动*/
    window.onscroll = function () {
        /*卷曲的高度*/
        var top = document.body.scrollTop;
        /*改透明度*/
        var opacity = 0;
        if(top > height){
            opacity = 0.85;
        }else {
            opacity = top/height * 0.85;
        }
        searchBox.style.background = 'rgba(216,80,92,'+opacity+')';
    }

}
/*轮播图*/
var banner = function () {
    /*
    * 1.无缝自动轮播 （定时器 过渡）
    * 2.指示器对应改变 （过渡结束）
    * 3.可以跟随手指左右来回滑动 （使用touch）
    * 4.当滑动的距离不够 三分之一   吸附回去  （过渡）
    * 5.当滑动的距离够了 三分之一   切换轮播图  上一张或下一张  （过渡）
    * */

    /*获取需要操作的dom元素*/
    /*轮播图*/
    var banner = document.querySelector('.jd_banner');
    /*宽度*/
    var width = banner.offsetWidth;
    /*图片盒子*/
    var imgBox = banner.querySelector('ul:first-child');
    /*点盒子*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');


    /*公用方法*/
    /*加过渡*/
    var addTransition = function () {
        imgBox.style.transition = 'all 0.2s';
        imgBox.style.webkitTransition = 'all 0.2s';
    }
    /*去过渡*/
    var removeTransition = function () {
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = 'none';
    }
    /*做定位*/
    var setTranslateX = function (translateX) {
        imgBox.style.transform = 'translateX('+translateX+'px)';
        imgBox.style.webkitTransform = 'translateX('+translateX+'px)';
    }

    /*1.无缝自动轮播 （定时器 过渡）*/
    /*程序的核心*/
    var index = 1;
    var timer = setInterval(function () {
        index++;
        /*根据索引去动画*/
        /*加过渡*/
        addTransition();
        /*定位*/
        setTranslateX(-index*width);
    },5000);

    imgBox.addEventListener('transitionend',function () {
        /*当过渡执行完成并且索引是9  瞬间定位带第一张*/
        if(index >= 9){
            index = 1;
            /*去过渡*/
            removeTransition();
            /*定位*/
            setTranslateX(-index*width);
        }
        /*当滑动的时候  保证没有空白*/
        else if(index <= 0){
            index = 8;
            /*去过渡*/
            removeTransition();
            /*定位*/
            setTranslateX(-index*width);
        }

        /*index取值范围 1-8 起始就是序号了  对应点  0-7 */
        setPoint();
    });

    /*2.指示器对应改变 （过渡结束）*/
    var setPoint = function () {
        /*清除当前样式*/
        for (var i = 0; i < points.length; i++) {
            var obj = points[i];
            obj.classList.remove('now');
        }
        /*对应的加上当前样式*/
        /*对应的怎么找*/
        points[index-1].classList.add('now');
    }

    /*3.可以跟随手指左右来回滑动 （使用touch）*/
    /*开始滑动的X轴坐标*/
    var startX = 0;
    /*记录滑动的距离*/
    var distance = 0;
    /*是否滑动过*/
    var isMove = false;

    imgBox.addEventListener('touchstart',function (e) {
        /*清除定时器*/
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imgBox.addEventListener('touchmove',function (e) {
        /*禁止浏览器默认事件*/
        e.preventDefault();

        var moveX = e.touches[0].clientX;
        distance = moveX - startX;
        /*滑动*/
        /*计算*/
        /*要去做定位的位置    当前的盒子定位+移动的距离*/
        var translateX = -index*width+distance;
        /*去过渡*/
        removeTransition();
        /*做定位*/
        setTranslateX(translateX);

        isMove = true;
    });
    imgBox.addEventListener('touchend',function (e) {
        /*松手的时候去判断 是不是三分之一*/
        /*严谨处理 确认一定滑动过*/
        if(Math.abs(distance) > width/3 && isMove){
            /*5.当滑动的距离够了 三分之一   切换轮播图  上一张或下一张  （过渡）*/
            /*上一张*/
            if(distance > 0){
                index --;
            }
            /*下一张*/
            else{
                index ++;
            }
            /*加过渡*/
            addTransition();
            /*做定位*/
            setTranslateX(-index*width);
        }else{
            /*4.当滑动的距离不够 三分之一   吸附回去  （过渡）*/
            /*加过渡*/
            addTransition();
            /*做定位*/
            setTranslateX(-index*width);
        }

        /*滑动结束  变量重置*/
        startX = 0;
        distance = 0;
        isMove = false;

        /*加上定时器*/
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            /*根据索引去动画*/
            /*加过渡*/
            addTransition();
            /*定位*/
            setTranslateX(-index*width);
        },5000);
    });
}
/*倒计时*/
var downTime = function () {
    /*倒计时的时间*/
    var time = 2*60*60;
    /*时间盒子*/
    var spans = document.querySelector('.sk_time').querySelectorAll('span');
    /*每一秒去 更新显示的时间*/
    var timer = setInterval(function () {
        time --;
        /*格式还是秒  转换*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        if(time <= 0){
            clearInterval(timer);
        }

    },1000);
}