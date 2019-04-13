$(document).ready(function() {
    var $search = $('.search'),
        $form = $search.find('search-form'),
        $input = $search.find('.input'),
        $btn = $search.find('.search-btn'),
        $layer = $search.find('.search-layer');

    //验证
     console.log($form );
     console.log($input );
     console.log($btn );
    $btn.on('click', function() {

        console.log(1);
        if ($.trim($input.val()) === '') {
            return false;
        }
    });

    $form.on('submit', function() {

        console.log(1);
        if ($.trim($input.val()) === '') {
            return false;
        }
    });

    // 自动完成
    $input.on('input', function() {
        var url = 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1484204931352_18291&callback=jsonp18292&k=1&area=c2c&bucketid=6&q=' + encodeURIComponent($.trim($input.val()));

        $.ajax({
            url: url,
            dataType: 'jsonp'
        }).done(function(data) {
            console.log(data);
            var html = '',
                dataNum = data['result'].length,
                maxNum = 10;
            if (dataNum === 0) {
                $layer.hide().html('');
                return;
            }
            for (var i = 0; i < dataNum; i++) {
                if (i >= maxNum) break;
                html += '<li class="search-layer-item">' + data['result'][i][0] + '</li>';
            }
            $layer.html(html).show();

        }).fail(function() {
            $layer.hide().html('');
        }).always(function() {
            console.log('why always me!');
        });
    });

    $layer.on('click', '.search-layer-item', function() {
        $input.val(removeHtmlTags($(this).html()));
        $input.parents().submit();
        $form.submit();
    })

    $input.on('focus', function() {
        $layer.show();
    }).on('click', function() {
        return false;
    });
    $(document).on('click', function() {
        $layer.hide();
    })

    function removeHtmlTags(str) {
        return str.replace(/<(?:[^>'"]|"[^"]*"|'[^']*')*>/g, '');
    };
    //左侧菜单
    $(".dropdown").bind('mouseover', function (event) {
        $(this).children(".dropdown-layer").show();
    });
    $(".dropdown").bind('mouseout', function (event) {
        $(this).children(".dropdown-layer").hide();
    });
    // 中间轮播图
    var timer = null,
    index = 0,
    pics = byId("pics").getElementsByTagName("img"),
    dots = byId("dots").getElementsByTagName("span"),
    size = pics.length,
    left = byId("left"),
    right = byId("right");

function byId(id){
    return typeof(id)==="string"?document.getElementById(id):id;
}

// 清除定时器,停止自动播放
function stopAutoPlay(){
    if(timer){
       clearInterval(timer);
    }
}

// 图片自动轮播
function startAutoPlay(){
   timer = setInterval(function(){
       index++;
       if(index >= size){
          index = 0;
       }
       changeImg();
   },3000)
}

function changeImg(){
   for(var i=0,len=dots.length;i<len;i++){
       dots[i].className = "";
       pics[i].style.display = "none";
   }
   dots[index].className = "active";
   pics[index].style.display = "block";
}

function slideImg(){
    var slider = byId("slider");
    slider.onmouseover = function(){
        stopAutoPlay();
    }
    slider.onmouseout = function(){
        startAutoPlay();
    }
    slider.onmouseout();

    // 点击导航切换
    for(var i=0,len=dots.length;i<len;i++){
       dots[i].id = i;
       dots[i].onclick = function(){
           index = this.id;
           changeImg();
       }
    }

    // 下一张
    right.onclick = function(){
       index++;
       if(index>=size) index=0;
       changeImg();
    }

    // 上一张
    left.onclick = function(){
       index--;
       if(index<0) index=size-1;
       changeImg();
    }

}

slideImg();
//轮播
    var oWidth = $(".lunbo-container").width();
    var times = null;
    $("#up").bind("click", leftPlay);
    //左
    function leftPlay() {
        $("#item").animate({
            "margin-left": 0 + "px"
        }, 500)
    }
    //右
    $("#down").bind("click", rightPlay);

    function rightPlay() {
        $("#item").animate({
            "margin-left": -oWidth + "px"
        }, 500);
    }

    $("#item").hover(function () {
        clearInterval(times);
        times = null;
    }, function () {
        times = setInterval(timeAuto, 10000);
    });

    function timeAuto() {
        leftPlay();
        setTimeout(rightPlay, 4000);
    }

    times = setInterval(timeAuto, 10000);

//tab选项卡
    $(".fortab").click(function(){
    var number=$(".fortab").index(this);
    $(this).addClass("tab-active");
    $(this).siblings().removeClass("tab-active");
    $(".tab-list:eq("+number+")").show();
    $(".tab-list:eq("+number+")").siblings().hide();
 });
    
});

