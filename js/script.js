(function($) {
    'use strict';

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
                html += '<li class="search-layer-item text-ellipsis">' + data['result'][i][0] + '</li>';
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

})(jQuery);

