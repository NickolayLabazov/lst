$(document).ready( function(){
    // РІС‹Р·РѕРІ РЅСѓР¶РЅС‹С… С„СѓРЅРєС†РёР№ СЃРєСЂРёРїС‚Р°
    $("a.citylistshow").click(function() {
        $('.cities_all').fadeToggle();
        $('.cities_all').fadeToggle();
        $('.regions_some').hide();
    });
});

function loadMarks(country_,tth) {
    $(".marks-tabs .pop").removeClass("pop");
    $("."+tth).addClass("pop");
    $.post("/search/", { action: "marks", country: country_ },
        function(data){
            $(".marks-list").html(data);
        });
}


$(function() { //РІС‹РїР°РґР°СЋС‰РёРµ СЃРїРёСЃРєРё language

   /* $("body").click(function(e) {
        if (!$(e.target).hasClass('selected')) {
            $('ul', $('.select', $('.header-top'))).slideUp('fast');
            $('span', $('.select', $('.header-top'))).removeClass('active');
        }
    });*/
    $("body").click(function(e) {
        if (!$(e.target).hasClass('selected')) {
            $('ul', $('.select')).slideUp('fast');
            $('span', $('.select')).removeClass('active');
        }
    });
    $('span', $('.select')).click(function() {
        $('ul', $('.select')).slideUp('fast');
        if (!$(this).hasClass('active') && !$(this).hasClass('inactive')) {
            $(this).addClass('active').siblings('ul').slideDown('fast');
        } else {
            $(this).removeClass('active');
        }
    });
    $('li', $('.select')).click(function() {
        $(this).parent('ul').slideUp('fast');
        $(this).parent('ul').siblings('span').text($(this).text()).removeClass('active');
    });
    $('li', $('.select', $('.header-top'))).click(function() {
		
		$.cookie('lang', $(this).attr("data-lang"), {expires: 7, path: '/'});
		location.reload();
		return false;
		
        $(this).parent('ul').slideUp('fast');
        $(this).parent('ul').siblings('span').css({
            backgroundImage: 'url(img/lang/lang-' + (+$(this).index() + 1) + '.png)'
        }).removeClass('active');
    });
	
	$('.language ul li').each(function(){
		$(this).css({'background-image': 'url(/img/lang/lang-'+$(this).attr('data-lang')+'-min.png)'});
	});
	
	$('.language ul li').hover(function(){
			$(this).css({'background-image': 'url(/img/lang/lang-'+$(this).attr('data-lang')+'-min-hover.png)'});
		},
		function(){
			$(this).css({'background-image': 'url(/img/lang/lang-'+$(this).attr('data-lang')+'-min.png)'});
		}
	);
});

$(function() { //РІС‹РїР°РґР°СЋС‰РёРµ СЃРїРёСЃРєРё
    $("body").click(function(e) {
        if (!$(e.target).hasClass('selected')) {
            $('ul', $('.select', $('.user-content, .header-filter, .ad-placement'))).slideUp('fast');
            $('span', $('.select', $('.user-content, .header-filter, .ad-placement'))).removeClass('active');
        }
    });
    $('span', $('.select', $('.user-content, .header-filter, .ad-placement'))).click(function() {
        $('ul', $('.select', $('.user-content, .header-filter, .ad-placement'))).slideUp('fast');
        if (!$(this).hasClass('active') && !$(this).hasClass('inactive')) {
            $(this).addClass('active').siblings('ul').slideDown('fast');
        } else {
            $(this).removeClass('active');
        }
    });
    $('li', $('.select', $('.user-content, .header-filter, .ad-placement'))).click(function() {
        $(this).parent('ul').slideUp('fast');
        $(this).parent('ul').siblings('span').text($(this).text()).removeClass('active');
    });
});

$(function() {  // login
    $('a, .select', $('.login', $('.header-top'))).hover(function() {
        $(this).animate({
            backgroundColor: "#6b67a9"
        }, 100);
    }, function() {
        $(this).animate({
            backgroundColor: "#adaad1"
        }, 100);
    });
});

$(function() {  // РёРЅРїСѓС‚С‹ С‚РµРєСЃС‚РѕРІС‹Рµ
    $('input:text', $('.write:eq(0)', $('.autorization'))).focus(function() {
        if ($(this).val() === 'Username') {
            $(this).val('');
        }
    }).blur(function() {
        if ($(this).val() === '') {
            $(this).val('Username');
        }
    });
    $('input:text', $('.write:eq(1)', $('.autorization'))).focus(function() {
        if ($(this).val() === 'РџР°СЂРѕР»СЊ') {
            $(this).val('');
        }
    }).blur(function() {
        if ($(this).val() === '') {
            $(this).val('РџР°СЂРѕР»СЊ');
        }
    });
});

$(function() {
    $('.profile>ul>li>a', $('.main.user')).click(function() {
        if (!$(this).hasClass('active')) {
            $(this).parent().siblings('li').children('a').removeClass('active');
            $(this).parent().siblings('li').children('ul').slideUp('fast');
            $(this).addClass('active').siblings('ul').slideDown('fast');
        } else {
            $(this).removeClass('active').siblings('ul').slideUp('fast');
        }
    });
});

$(function() { //СЂР°РґРёРѕРєРЅРѕРїРєРё
    $('.payment>div>div').click(function() {
        $('.payment>div>div').removeClass('active');
        $(this).addClass('active');
    });
});

$(function() { // РёРЅРїСѓС‚С‹
    $('input, textarea', $('span', $('.write'))).focus(function() {
        $(this).parent().parent().addClass('active');
    }).blur(function() {
        $(this).parent().parent().removeClass('active');
    });
});

$(function() { // Р•С‰С‘
    $("body").click(function(e) {
        if (!$(e.target).hasClass('more-select')) {
            $('a', $('.more', $('.personal-ads-item-price'))).siblings('ul').slideUp('fast');
            $('a', $('.more', $('.personal-ads-item-price'))).removeClass('active');
        }
    });
    $('a', $('.more', $('.personal-ads-item-price'))).click(function() {
        $(this).addClass('active').siblings('ul').slideDown('fast');
    });
});

$(function() { // РџРѕРїР°РїС‹
    var popup = $('.popup');

    $('.popup-x', '.popup').click(function() {
        popup.fadeOut('fast');
    });
    document.onkeydown = function(e) {
        if (e.keyCode === 27) { //escape
            popup.fadeOut('fast');
        }
    };
    $("body").click(function(e) {
        if (e.target.className === 'popup-shadow') {
            popup.fadeOut('fast');
        }
    });

/*
    $('.statistic', $('.more-list')).click(function() {
        $('.popup').fadeIn('fast');
    });
*/
});

$(function() { // РїРѕРґСЃРєР°Р·РєР°
    $('.price>img', $('aside')).hover(function() {
        $(this).siblings('.hint').fadeIn('fast');
    }, function() {
        $(this).siblings('.hint').fadeOut('fast');
    });
});
$(function() { // РїРѕРґСЃРєР°Р·РєР° 2
    $('.hint', $('.header-slider')).hover(function() {
        $(this).siblings('.hint-info').fadeIn('fast');
    }, function() {
        $(this).siblings('.hint-info').fadeOut('fast');
    });
});
$(function () { // РїРѕРґСЃРєР°Р·РєР° 3
    $('.hint-img').hover(function () {
        $(this).siblings('.hint').fadeIn('fast');
    }, function () {
        $(this).siblings('.hint').fadeOut('fast');
    });
});

$(function() { // С‚Р°Р±С‹ Р°СЃР°Р№РґР°
    $('p', $('.aside-news-tabs')).click(function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings('p').removeClass('active');
            $('.aside-news>ul').hide();
            $('.aside-news>ul').eq($(this).index()).show();
        }
    });
});

$(function() { // С‚Р°Р±С‹ marks
    $('a', $('.marks-tabs')).click(function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings('a').removeClass('active');
            $('.marks-list>div').hide();
            $('.marks-list>div').eq($(this).index()).show();
        }
    });
});

/*
$(function() { // user-ads-edit  slider
    var
            p,
            slide = $('.slider-item', $('.personal-ads-slider')),
            ln = slide.length - 1;


    $('.slider-item:lt(1)', $('.personal-ads-slider')).hide();
    $('.slider-item:gt(5)', $('.personal-ads-slider')).hide();

    $('#next', $('.personal-ads-slider')).click(function() {
        slide = $('.slider-item', $('.personal-ads-slider'));
        slide.eq(6).show();
        slide.eq(1).animate({
            marginLeft: -88
        }, 200, function() {
            p = slide.eq(0);
            p.detach();
            $('.personal-ads-slider .slider-content>div').append(p);
            p.css({
                marginLeft: 0,
                display: 'none'
            });
            $(this).hide();
        });
    });
    $('#prev', $('.personal-ads-slider')).click(function() {
        slide = $('.slider-item', $('.personal-ads-slider'));
        slide.eq(0).show();
        slide.eq(0).animate({
            marginLeft: 0
        }, 200, function() {
            p = slide.eq(ln);
            p.detach();
            slide.eq(0).before(p);
            p.css({
                marginLeft: -88,
                display: 'none'
            });
            slide.eq(6).hide();
        });
    });
});
*/

$(function() { // header  slider
    var
            p,
            slide = $('.slider-item', $('.header-slider')),
            ln = slide.length - 1;


    $('.slider-item:lt(1)', $('.header-slider')).hide();
    $('.slider-item:gt(5)', $('.header-slider')).hide();

    $('#next', $('.header-slider')).click(function() {
        slide = $('.slider-item', $('.header-slider'));
        slide.eq(6).show();
        slide.eq(1).animate({
            marginLeft: -182
        }, 200, function() {
            p = slide.eq(0);
            p.detach();
            $('.header-slider .slider-content>div').append(p);
            p.css({
                marginLeft: 0,
                display: 'none'
            });
            $(this).hide();
        });
    });
    $('#prev', $('.header-slider')).click(function() {
        slide = $('.slider-item', $('.header-slider'));
        slide.eq(0).show();
        slide.eq(0).animate({
            marginLeft: 0
        }, 200, function() {
            p = slide.eq(ln);
            p.detach();
            slide.eq(0).before(p);
            p.css({
                marginLeft: -182,
                display: 'none'
            });
            slide.eq(6).hide();
        });
    });
});


$(function() { // С‚Р°Р±С‹ trade-cars
    $('a', $('.trade-cars-tabs')).click(function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings('a').removeClass('active');
            $('.trade-cars-content>div').hide();
            $('.trade-cars-content>div').eq($(this).index()).show();
        }
    });
});


$(function() { // РјРµРЅСЋ Р°СЃР°Р№РґР°
    $('.auto-categories>li>a').click(function() {
        if (!$(this).parent().hasClass('active')) {
            $(this).parent().addClass('active').siblings('li').removeClass('active').children('ul').slideUp('fast');
            $(this).siblings('ul').slideDown('fast');
        }
    });
});

$(function() { // index-slider
    $('li', $('.index-menu', $('header'))).click(function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings('li').removeClass('active');
            $('.index', $('section.grey')).animate({
            });
            $('.slider-wrap', $('section.grey')).animate({
                marginLeft: -(1000 * ($(this).index()))
            });
        }
    });
});


$(function() { // РјР°СЂРєРё РёР»Рё РїР°СЂР°РјРµС‚СЂС‹
    $('.search-button', $('.header-filter.search')).click(function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('.header-filter.more').slideUp('fast');
            $(this).children('span').html('РџРѕРёСЃРє РїРѕ РїР°СЂР°РјРµС‚СЂР°Рј');
        } else {
            $(this).removeClass('active');
            $('.header-filter.more').slideDown('fast');
            $(this).children('span').html('РџРѕРёСЃРє РїРѕ РјР°СЂРєРµ');
        }
    });
});

$(function() { // РєР°С‚РµРіРѕСЂРёРё С‚СЂР°РЅСЃРїРѕСЂС‚Р°
    $('a', $('.transport', $('.header-filter.more'))).click(function() {
        $('a', $('.transport', $('.header-filter.more'))).removeClass('selected');
        $(this).addClass('selected');
    });
});




/*
 Color animation 1.6.0
 http://www.bitstorm.org/jquery/color-animation/
 Copyright 2011, 2013 Edwin Martin <edwin@bitstorm.org>
 Released under the MIT and GPL licenses.
 */
'use strict';
(function(d) {
    function h(a, b, e) {
        var c = "rgb" + (d.support.rgba ? "a" : "") + "(" + parseInt(a[0] + e * (b[0] - a[0]), 10) + "," + parseInt(a[1] + e * (b[1] - a[1]), 10) + "," + parseInt(a[2] + e * (b[2] - a[2]), 10);
        d.support.rgba && (c += "," + (a && b ? parseFloat(a[3] + e * (b[3] - a[3])) : 1));
        return c + ")"
    }
    function f(a) {
        var b;
        return(b = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(a)) ? [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16), 1] : (b = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(a)) ? [17 * parseInt(b[1], 16), 17 * parseInt(b[2],
                    16), 17 * parseInt(b[3], 16), 1] : (b = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a)) ? [parseInt(b[1]), parseInt(b[2]), parseInt(b[3]), 1] : (b = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(a)) ? [parseInt(b[1], 10), parseInt(b[2], 10), parseInt(b[3], 10), parseFloat(b[4])] : l[a]
    }
    d.extend(!0, d, {support: {rgba: function() {
                var a = d("script:first"), b = a.css("color"), e = !1;
                if (/^rgba/.test(b))
                    e = !0;
                else
                    try {
                        e = b != a.css("color", "rgba(0, 0, 0, 0.5)").css("color"),
                                a.css("color", b)
                    } catch (c) {
                    }
                return e
            }()}});
    var k = "color backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor outlineColor".split(" ");
    d.each(k, function(a, b) {
        d.Tween.propHooks[b] = {get: function(a) {
                return d(a.elem).css(b)
            }, set: function(a) {
                var c = a.elem.style, g = f(d(a.elem).css(b)), m = f(a.end);
                a.run = function(a) {
                    c[b] = h(g, m, a)
                }
            }}
    });
    d.Tween.propHooks.borderColor = {set: function(a) {
            var b = a.elem.style, e = [], c = k.slice(2, 6);
            d.each(c, function(b, c) {
                e[c] = f(d(a.elem).css(c))
            });
            var g = f(a.end);
            a.run = function(a) {
                d.each(c, function(d, c) {
                    b[c] = h(e[c], g, a)
                })
            }
        }};
    var l = {aqua: [0, 255, 255, 1], azure: [240, 255, 255, 1], beige: [245, 245, 220, 1], black: [0, 0, 0, 1], blue: [0, 0, 255, 1], brown: [165, 42, 42, 1], cyan: [0, 255, 255, 1], darkblue: [0, 0, 139, 1], darkcyan: [0, 139, 139, 1], darkgrey: [169, 169, 169, 1], darkgreen: [0, 100, 0, 1], darkkhaki: [189, 183, 107, 1], darkmagenta: [139, 0, 139, 1], darkolivegreen: [85, 107, 47, 1], darkorange: [255, 140, 0, 1], darkorchid: [153, 50, 204, 1], darkred: [139, 0, 0, 1], darksalmon: [233, 150, 122, 1], darkviolet: [148, 0, 211, 1], fuchsia: [255,
            0, 255, 1], gold: [255, 215, 0, 1], green: [0, 128, 0, 1], indigo: [75, 0, 130, 1], khaki: [240, 230, 140, 1], lightblue: [173, 216, 230, 1], lightcyan: [224, 255, 255, 1], lightgreen: [144, 238, 144, 1], lightgrey: [211, 211, 211, 1], lightpink: [255, 182, 193, 1], lightyellow: [255, 255, 224, 1], lime: [0, 255, 0, 1], magenta: [255, 0, 255, 1], maroon: [128, 0, 0, 1], navy: [0, 0, 128, 1], olive: [128, 128, 0, 1], orange: [255, 165, 0, 1], pink: [255, 192, 203, 1], purple: [128, 0, 128, 1], violet: [128, 0, 128, 1], red: [255, 0, 0, 1], silver: [192, 192, 192, 1], white: [255, 255, 255, 1], yellow: [255, 255,
            0, 1], transparent: [255, 255, 255, 0]}
})(jQuery);

$(function () { // ad add
    var
            n = 0,
            steps = $('.steps', $('.form-reg.add-ad'));

    $('.next', $('.ad-buttons', $('.form-reg.add-ad'))).click(function () {
        if (n < steps.length - 1) {
            n++;
            steps.removeClass('show');
            steps.eq(n).addClass('show');
        }
    });
    $('.prev', $('.ad-buttons', $('.form-reg.add-ad'))).click(function () {
        if (n > 0) {
            n--;
            steps.removeClass('show');
            steps.eq(n).addClass('show');
        }
    });
});

$(function () { // show marks
    $('.show-all-marks', $('.marks-list')).click(function () {
        if (!($('.mileage-marks').hasClass('wide'))) {
            $('.mileage-marks').addClass('wide');
           /* $('.mid-content').animate({
                width: 697,
                marginLeft: 17
            }, 300);
            $('.left-aside').hide(300);*/
            $(this).text('РЎРІРµСЂРЅСѓС‚СЊ СЃРїРёСЃРѕРє');
        } else {
            $('.mileage-marks').removeClass('wide');
           /* $('.mid-content').animate({
                width: 470,
                marginLeft: 27
            }, 300);
            $('.left-aside').show(300);*/
            $(this).text('РџРћРљРђР—РђРўР¬ Р’РЎР• РњРђР РљР');
        }
    });
});
$(function(){
	$("body").click(function (e) {
		var container = $(".regions_some");
		if (container.has(e.target).length === 0 && !$(e.target).hasClass('regionShow')){
			container.hide();
		}
		var container = $(".cities_all");
		if (container.has(e.target).length === 0 && !$(e.target).hasClass('cityShow')){
			container.hide();
		}
	});
	
});

$(function() { //slider foto itemInfo
    var
            p,
            slide = $('.slider-item', $('.about-car')),
            ln = slide.length - 1;


    $('#next', $('.about-car')).click(function() {
        slide = $('.slider-item', $('.about-car'));
        slide.eq(1).animate({
            marginLeft: -182
        }, 200, function() {
            p = slide.eq(0);
            p.detach();
            $('.about-car .slider-content>div').append(p);
            p.css({
                marginLeft: 0
            });
        });
    });
    $('#prev', $('.about-car')).click(function() {
        slide = $('.slider-item', $('.about-car'));
        slide.eq(0).show();
        slide.eq(0).animate({
            marginLeft: 0
        }, 200, function() {
            p = slide.eq(ln);
            p.detach();
            slide.eq(0).before(p);
            p.css({
                marginLeft: -182
            });
        });
    });
});

//////////////////////////


/*
$(function() { //РІС‹РїР°РґР°СЋС‰РёРµ СЃРїРёСЃРєРё
    $("body").click(function(e) {
        if (!$(e.target).hasClass('selected')) {
            $('ul', $('.select')).slideUp('fast');
            $('span', $('.select')).removeClass('active');
        }
    });
    $('span', $('.select')).click(function() {
        $('ul', $('.select')).slideUp('fast');
        if (!$(this).hasClass('active') && !$(this).hasClass('inactive')) {
            $(this).addClass('active').siblings('ul').slideDown('fast');
        } else {
            $(this).removeClass('active');
        }
    });
    $('li', $('.select')).click(function() {
        $(this).parent('ul').slideUp('fast');
        $(this).parent('ul').siblings('span').text($(this).text()).removeClass('active');
    });
});
*/

$(function() {
    $('li', $('.marks-tabs')).click(function() {
        $(this).siblings('li').removeClass('act');
        $(this).addClass('act');
    });
});

$(function() {  //
    $('i', $('span.title', $('.car-selection'))).click(function() {
        $(this).closest('.section').toggleClass('inactive active');
    });

});
$(function() {  //
    $('button', $('.section', $('.car-selection'))).click(function() {
        $(this).toggleClass('active');
    });
});