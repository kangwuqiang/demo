window.onload = function () {
    /*左侧滑动*/
    leftSwipe();
    /*右侧滑动*/
    rightSwipe();
};
var leftSwipe = function () {
    /*原生实现*/
    /*1.滑动起来*/
    //获取元素
    var parentBox=document.querySelector('.jd_cateLeft');
    var childBox=parentBox.querySelector('ul');

    var parentHight=parentBox.offsetHeight;
    var childHight=childBox.offsetHeight;
    /*可定位的区间*/
    var maxposition=0;
    var minposition=parentHight-childHight;

    /*可滑动的区间*/
    var distance=500;
    var maxRun=maxposition+distance;
    var minRun=minposition-distance;

    /*公用方法*/
    /*加过渡*/
    var addTransition = function () {
        childBox.style.transition = 'all 0.2s';
        childBox.style.webkitTransition = 'all 0.2s';
    }
    /*去过渡*/
    var removeTransition = function () {
        childBox.style.transition = 'none';
        childBox.style.webkitTransition = 'none';
    }
    /*做定位*/
    var setTranslateY = function (translateY) {
        childBox.style.transform = 'translateY('+translateY+'px)';
        childBox.style.webkitTransform = 'translateY('+translateY+'px)';
    }
    /*程序核心  当前定位*/
    var startY=0;
    var distanceY=0;
    //上一次滑动结束时的位置
    var currentY=0;
    var isMove=false;
    childBox.addEventListener('touchstart',function(e){
        //滑动起点坐标
        startY= e.touches[0].clientY;
    })
    /*滑动*/
    childBox.addEventListener('touchmove',function(e){
        //滑动时坐标
        var moveY=e.touches[0].clientY;
        //滑动距离
        distanceY=moveY-startY;
        //在预定范围内滑动时，添加样式
        if((distanceY+currentY)<maxRun && (distanceY+currentY)>minRun){
            removeTransition();
            setTranslateY(distanceY+currentY);
        }
        isMove=true;
    })
    //滑动结束时做定位
    childBox.addEventListener('touchend',function(){
        if(isMove) {
            if (distanceY + currentY > maxposition) {
                currentY = maxposition;
                addTransition();
                setTranslateY(currentY);
            } else if (distanceY + currentY < minposition) {
                currentY = minposition;
                addTransition();
                setTranslateY(currentY);
            } else {
                currentY = currentY + distanceY;
            }

            startY = 0;
            distanceY = 0;
            isMove = false;
        }
    })



};
var rightSwipe = function () {
    /*插件实现  你的子容器的大小一定要大于父容器 */
    new IScroll('.jd_cateRight',{
        scrollY:true,
        scrollX:false
    });
}