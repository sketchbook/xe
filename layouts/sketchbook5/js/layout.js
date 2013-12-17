jQuery(function($){
// IE Login Enter Fix
	if($.browser.msie) $('#site_login').hide().css('top',28);

// Notice
	$('#layout_notice').delay(2000).fadeOut();

// LNB
	$('#lnb').css({height:$(window).height()-200});

// Color
	$('#aside .section h2 b').css({backgroundColor:$('#hd h1 .on').css('color')});

// 폰트
	function installfontOut(){
		$('#install_ng').fadeOut();
		$('#font_btn').focus();
		return false;
	};
	$(document).keydown(function(event){
		if($('#install_ng').is(':visible')) {
			if(event.keyCode != 27) return true; // ESC
			return installfontOut();
		};	
	});
	$('#install_ng .tg_close,#install_ng .close').click(installfontOut);
	$('#install_ng .tg_blur').focusin(installfontOut);
	$('#font a').click(function(){
		var p = $(this).parent();
		if(p.hasClass('ng') && $('#fontcheck_ng1').width()==$('#fontcheck_ng2').width()){
			$('#install_ng').fadeIn().find('.tg_close').focus();
		} else {
			var pC = p.attr('class');
			if(p.hasClass('ui_font')){
				$.cookie('layout_font',null);
			} else {
				$.cookie('layout_font',''+pC+'');
			};
			$('body,input,textarea,select,button,table').removeClass('ui_font ng window_font tahoma').addClass(pC);
			p.addClass('on').nextAll('.on').removeClass('on');
			p.prevAll('.on').removeClass('on');
			$('#font_btn strong').text($(this).text());
		};
		return false;
	});

// sketchbook's Toggle1 (from XE UI)
	var tgC = $('.tg_cnt');
	$('.tg_btn').click(function(){
		var t = $(this);
		var h = t.attr('href');
		if(t.next(h).is(':visible')) {
			t.focus().next().fadeOut(200);
		} else {
			tgC.filter(':visible').hide();
			t.next().fadeIn(200).find('a,input#uid,button:not(.tg_blur)').eq(0).focus();
		};
		return false;
	});
	function tgClose() {
		var closeId = tgC.filter(':visible').attr('id');
		tgC.fadeOut(200).prev('[href="#'+closeId+'"]').focus();
	};
	$(document).keydown(function(event){
		if(event.keyCode != 27) return true; // ESC
		return tgClose()
	});
	$('.tg_blur').focusin(tgClose);
	$('.tg_close,#install_ng .close').click(tgClose);

// GNB
	var gnb = $('#gnb');
	var gLi = gnb.find('li');
	function gnbToggle(){
		var t = $(this);
		var n = t.nextAll('ul');
		if(n.is(':hidden') || n.length==0) {
			t.parent().parent().find('>li>ul').hide();
			n.slideDown(150) 
		}
	};
	function gnbOut(){
		$(this).find('>ul').hide();
	};
	gLi.find('>a').mouseover(gnbToggle).focus(gnbToggle);
	gLi.mouseleave(gnbOut);
	gnb.find('>li:last-child a:last').blur(function(){
		$(this).parents('.ul3,.ul2').hide()
	});

// Form Label Overlapping
	var overlapLabel = $('#site_login .itx_wrp').find('>:text,>:password').prev('label');
	var overlapInput = overlapLabel.next();
	overlapInput
		.focus(function(){
			$(this).prev(overlapLabel).css('visibility','hidden');
		})
		.blur(function(){
			if($(this).val() == ''){
				$(this).prev(overlapLabel).css('visibility','visible');
			} else {
				$(this).prev(overlapLabel).css('visibility','hidden');
			}
		});

// Scroll
	$('a.back_to').click(function(){$('html,body').animate({scrollTop:$($(this).attr("href")).offset().top}, {duration:1000})});

// Tree Navigation
	var tNav = $('#category');
	var tNavPlus = '<button type="button" class="tNavToggle plus">+</button>';
	var tNavMinus = '<button type="button" class="tNavToggle minus">-</button>';
	tNav.find('li>ul').css('display','none');
	tNav.find('ul>li:last-child').addClass('last');
	tNav.find('li>ul:hidden').parent('li').prepend(tNavPlus);
	tNav.find('li>ul:visible').parent('li').prepend(tNavMinus);
	tNav.find('li.active').addClass('open').parents('li').addClass('open');
	tNav.find('li.open').parents('li').addClass('open');
	tNav.find('li.open>.tNavToggle').text('-').removeClass('plus').addClass('minus');
	tNav.find('li.open>ul').slideDown(100);
	tNav.find('.tNavToggle').click(function(){
		t = $(this);
		t.parent('li').toggleClass('open');
		if(t.parent('li').hasClass('open')){
			t.text('-').removeClass('plus').addClass('minus');
			t.parent('li').find('>ul').slideDown(100);
		} else {
			t.text('+').removeClass('minus').addClass('plus');
			t.parent('li').find('>ul').slideUp(100);
		}
		return false;
	});
	tNav.find('a[href=#]').click(function(){
		t = $(this);
		t.parent('li').toggleClass('open');
		if(t.parent('li').hasClass('open')){
			t.prev('button.tNavToggle').text('-').removeClass('plus').addClass('minus');
			t.parent('li').find('>ul').slideDown(100);
		} else {
			t.prev('button.tNavToggle').text('+').removeClass('minus').addClass('plus');
			t.parent('li').find('>ul').slideUp(100);
		}
		return false
	});

// For Mobile
	$('#tg_site_srch').click(function(){
		$('#top_mn').after($('#site_srch'));
		$('#site_srch').toggle().find('.itx').focus();
		return false
	});
	$('#gnb .li1 button').click(function(){
		if(!$(this).next().hasClass('tg_ul2_on')){
			$(this).parents('.li1').find('.ul2').toggle().prev().toggleClass('tg_ul2_on').parents('.li1').siblings().find('.tg_ul2_on').removeClass('tg_ul2_on')
		}
	});
	$('#gnb_next button').click(function(){
		$(this).toggleClass('gnb_next_on');
		$('#gnb .li1').toggleClass('m_li1_tg');
		$('#gnb .tg_ul2_on').removeClass('tg_ul2_on').next().hide()
	});
	if($('#gnb .m_li1_tg .a1.on').length){
		$('#gnb .li1').toggleClass('m_li1_tg');
		$('#gnb_next button').toggleClass('gnb_next_on')
	};
});

/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function(a){a.cookie=function(g,f,k){if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(f))||f===null||f===undefined)){k=a.extend({},k);if(f===null||f===undefined){k.expires=-1}if(typeof k.expires==="number"){var h=k.expires,j=k.expires=new Date();j.setDate(j.getDate()+h)}f=String(f);return(document.cookie=[encodeURIComponent(g),"=",k.raw?f:encodeURIComponent(f),k.expires?"; expires="+k.expires.toUTCString():"",k.path?"; path="+k.path:"",k.domain?"; domain="+k.domain:"",k.secure?"; secure":""].join(""))}k=f||{};var b=k.raw?function(i){return i}:decodeURIComponent;var c=document.cookie.split("; ");for(var e=0,d;d=c[e]&&c[e].split("=");e++){if(b(d[0])===g){return b(d[1]||"")}}return null}})(jQuery);