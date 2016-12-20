$(function () {
   //  // var height=$(window).outerHeight(true)-44px;
   // var mask=$('.mask')
   // $(window).on('resize',function () {
   //     mask.css(
   //         {height:$(window).outerHeight(true)-44
   //     })
   // })

    //  获取浏览器高度
    // $(window).on('resize',function(){
    //     var w=$(window).outerWidth(true);
    //     var h=$(window).outerHeight(true);
    //     console.log(w,h)
    // })
    // $(window).trigger('resize')
    //
    var bag=$('.nav-list .bag')
    var guan=$('.nav-list .guan')

    var search=$('.nav-list .search')


    // 搜索框
    $('.nav-list .search').on('click',function(){
        var input=$('.search-box-inner input')
        input.val(input.val()).trigger('focus');
    })


    // 轮播
    var slides=$('.gallery-slide-wrapper a')
    var dots=$('.dot-nav .dot')
    var left=$('.left')
    var right=$('.right')
    left.on('click',function () {
        moveLeft()
    })
    right.on('click',function () {
        moveRight()
    })

    var moving=false;

    var moveTo=function (el,dir) {
        moving=true;
        if(dir==='right'){
            slides.filter('.active')
                .removeClass('active')
                .addClass('leave')
                .delay(1000)
                .queue(function () {
                    $(this).removeClass('leave').dequeue();
                    moving=false;
                });
            $(el).addClass('right');
            $(el).get(0).offsetWidth;//改变宽高需要重绘
            $(el).removeClass('right').addClass('active')
        }else if(dir==='left'){
            slides.filter('.active')
                .removeClass('active')
                .addClass('right')
                .delay(1000)
                .queue(function () {
                    moving=false;
                    $(this).removeClass('right').dequeue();
                })
            $(el).addClass('enter')
                .delay(1000)
                .queue(function(){
                $(this).removeClass('enter').dequeue();
            }).addClass('active')
        }

        var nn= el.index();
        console.log(nn);
        // slides.index(el) 传了一个参数返回当前在集合中的索引位置
    dots.removeClass('active').eq(slides.index(el)).addClass('active');
    }
    var moveRight=function () {
        if(moving){return}
        var active=slides.filter('.active')
        var el=active.next().length?active.next():slides.eq(0)
        moveTo(el,'right')
    }
    var moveLeft=function () {
        if(moving){return}
        var active=slides.filter('.active')
        var el=active.prev().length?active.prev():slides.eq(-1);
        moveTo(el,'left')
    }
    dots.on('click',function () {
        if(moving){return};
        var c=slides.index(slides.filter('.active'));
        var n=$(this).index();
        if(c===n){return}
        if(c<n){
            moveTo(slides.eq(n),'right')
        }else {
            moveTo(slides.eq(n),'left')
        }

    })
    var t=setInterval(moveRight,2000)
    // clearInterval(t)

    guan.on('click',function () {
        $('body').removeClass('hidden');
        $('.header').removeClass('searching')
        bag.css({'display':'block'});
        guan.css({'display':'none'})
        t=setInterval(moveRight,2000)
    })
    search.on('click',function () {
        $('body').addClass('hidden');
        bag.css({'display':'none'});
        guan.css({'display':'block'})
        clearInterval(t)
    })
})