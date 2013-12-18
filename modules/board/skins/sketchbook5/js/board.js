// Board
function board(bdObj){
(function($){
// Option
	var bd = $(bdObj);
	var default_style = bd.attr('data-default_style');
	var bdBubble = bd.attr('data-bdBubble');
	var lstViewer = bd.attr('data-lstViewer');
	var bdFilesType = bd.attr('data-bdFilesType');
	var bdImgOpt = bd.attr('data-bdImgOpt');
	var bdImgLink = bd.attr('data-bdImgLink');
	var bdNavSide = bd.attr('data-bdNavSide');

	ie8Check = navigator.userAgent.match(/msie [7]/i) || navigator.userAgent.match(/msie [8]/i);
// Login
	if(bdLogin){
		bd.find('a.bd_login').click(function(){
			if(confirm(bdLogin.split('@')[0])) window.location.href = bdLogin.split('@')[1];
			return false;
		});
	};

// Category Navigation
	bd.find('ul.cTab>li>ul>li.on_').parents('li:first').addClass('on');
	var cnb = bd.find('div.bd_cnb');
	if(cnb.length){
		var cMore = bd.find('li.cnbMore');
	    var cItem = cnb.find('>ul>li');
	    var lastEvent = null;
	    function cnbToggle(){
	        var t = $(this);
	        if(t.next('ul').is(':hidden') || t.next('ul').length==0){
	            cItem.find('>ul').fadeOut(100);
	            t.next('ul').fadeIn(200);
	        };
	    };
	    function cnbOut(){
	        cItem.find('ul').fadeOut(100);
	    };
	    cItem.find('>a').mouseover(cnbToggle).focus(cnbToggle);
	    cItem.mouseleave(cnbOut);
		cItem.find('>ul').each(function(){
			var t = $(this);
			t.append('<i class="edge"></i>');
			if(ie8Check) t.prepend('<i class="ie8_only bl"></i><i class="ie8_only br"></i>');
			if(t.width() > $('html,body').width()-t.offset().left){
				t.addClass('flip');
			};
		});
		cItem.find('>ul>li.on').parents('ul:first').show().prev().addClass('on');
	    function cnbStart(){
			// If Overflow
			cItem.each(function(){
				if($(this).offset().top!=cMore.offset().top){
					$(this).addClass('hidden').nextAll().addClass('hidden');
					cMore.css('visibility','visible');
					return false;
				} else {
					$(this).removeClass('hidden').nextAll().removeClass('hidden');
					cMore.css('visibility','hidden');
				};
			});
			cnb.find('>.bg_f_f9').css('overflow','visible');
		};
		cnbStart();
		$(window).resize(cnbStart);
		function cnbMore(){
			cnb.toggleClass('open').find('.ui-icon').toggleClass('ui-icon-triangle-1-s').toggleClass('ui-icon-triangle-1-n');
			return false;
		};
		if((cnb.find('.hidden a,.hidden li').hasClass('on')) && !cnb.hasClass('open')){
			cnbMore();
		};
		cMore.click(cnbMore);
	};

// Speech Bubble
	if(!bdBubble){
		bd.find('a.bubble').hover(function(){
			var t = $(this);
			if(!t.hasClass('no_bubble') && !t.find('.wrp').length){
				t.append('<span class="wrp"><span class="speech">'+t.attr('title')+'</span><i class="edge"></i></span>').removeAttr('title');
				if($('html,body').width()-t.offset().left < 80){
					t.addClass('left').find('.wrp').css({marginTop:t.parent('.wrp').height()/2})
				} else if(t.offset().top < 80 && !t.parent().parent().hasClass('rd_nav_side')){
					t.addClass('btm').find('.wrp').css({marginLeft:-t.find('.wrp').width()/2})
				} else {
					t.find('.wrp').css({marginLeft:-t.find('.wrp').width()/2})
				};
				if(ie8Check) t.find('.wrp').prepend('<i class="ie8_only bl"></i><i class="ie8_only br"></i>');
			};
			if(ie8Check) return;
			if(t.is('.left,.right,.btm')){
				t.find('.wrp:hidden').fadeIn(150)
			} else {
				t.find('.wrp:hidden').css('bottom','150%').animate({
					bottom:'100%'
				},{duration:150,specialEasing:{left:'easeInOutQuad'},complete:function(){
					},step:null,queue:false
				}).fadeIn(150)
			}
		},function(){
			if(ie8Check) return;
			$(this).find('.wrp').fadeOut(100)
		})
	};

// Nanum Font
	if($('#bd_font_install').length>1){
		$('#bd_font_install').eq(1).remove()
	} else {
		if($('#fontcheck_np1').width()==$('#fontcheck_np2').width()){
			bd.removeClass('use_np');
			$.removeCookie('use_np');
		} else {
			bd.addClass('use_np');
			$.cookie('use_np','use_np');
		};
		function installfontOut(){
			$('#install_ng2').fadeOut();
			bd.find('.bd_font .select').focus();
			return false;
		};
		$(document).keydown(function(event){
			if($('#install_ng2').is(':visible')) {
				if(event.keyCode!=27) return true;
				return installfontOut();
			}
		});
		$('#install_ng2 .tg_close2,#install_ng2 .close').click(installfontOut);
		$('#install_ng2 .tg_blur2').focusin(installfontOut);
	};
	bd.find('.bd_font li a').click(function(){
		var p = $(this).parent();
		if(p.hasClass('ng') && $('#fontcheck_ng3').width()==$('#fontcheck_ng4').width()){
			$('#install_ng2').fadeIn().find('.tg_close2').focus();
		} else {
			var pC = p.attr('class');
			if(p.hasClass('ui_font')){
				$.removeCookie('bd_font');
			} else {
				$.cookie('bd_font',''+pC+'');
			};
			$('.bd,.bd input,.bd textarea,.bd select,.bd button,.bd table').removeClass('ui_font ng window_font tahoma').addClass(pC);
			p.addClass('on').siblings('.on').removeClass('on');
			$('.bd_font .select strong').text($(this).text());
		};
		return false;
	});

// sketchbook's Toggle2 (Original : XE UI)
	var tgC2 = bd.find('.tg_cnt2');
	bd.find('.tg_btn2').click(function(){
		var t = $(this);
		var h = t.attr('data-href');
		if(t.next(h).is(':visible')){
			t.focus().next().fadeOut(200);
		} else {
			tgC2.filter(':visible').hide();
			t.after($(h)).next().fadeIn(200).css('display','block').find('a,input,button:not(.tg_blur2),select,textarea').eq(0).focus();
		};
		return false;
	});
	function tgClose2(){
		tgC2.filter(':visible').fadeOut(200).prev().focus();
	};
	$(document).keydown(function(event){
		if(event.keyCode != 27) return true; // ESC
		return tgClose2();
	});
	tgC2.mouseleave(tgClose2);
	bd.find('.tg_blur2').focusin(tgClose2);
	bd.find('.tg_close2,#install_ng2 .close').click(tgClose2);

// Form Label Overlapping
	bd.find('.itx_wrp label').next()
		.focus(function(){
			$(this).prev().css('visibility','hidden');
		})
		.blur(function(){
			if($(this).val()==''){
				$(this).prev().css('visibility','visible');
			} else {
				$(this).prev().css('visibility','hidden');
			};
		});
	// IE8 Fix;
	if(ie8Check){
		bd.find('.bd_guest .itx_wrp label').click(function(){
			$(this).next().focus();
		});
	};

// Scroll
	bd.find('a.back_to').click(function(){
		$('html,body').animate({scrollTop:$($(this).attr('href')).offset().top},{duration:1000,specialEasing:{scrollTop:'easeInOutExpo'}});
		return false;
	});

// Search
	var srchWindow = bd.find('.bd_faq_srch');
	bd.find('a.show_srch').click(function(){
		if(srchWindow.is(':hidden')){
			srchWindow.fadeIn().find('.itx').focus();
		} else {
			srchWindow.fadeOut();
			$(this).focus();
		};
		return false;
	});
	bd.find('.bd_srch_btm_itx').focus(function(){
		bd.find('.bd_srch_btm .itx_wrp').animate({width:140},{duration:1000,specialEasing:{width:'easeOutBack'}}).parent().addClass('on');
	});

// With Viewer
	var wView = bd.find('a.viewer_with');
	wView.click(function(){
		if(wView.hasClass('on')){
			$.cookie('cookie_viewer_with','N');
			wView.removeClass('on');
			bd.find('.bd_lst a.hx').removeAttr('onClick');
		} else {
			$.cookie('cookie_viewer_with','Y');
			wView.addClass('on');
			bd.find('.bd_lst a.hx').attr('onClick','window.open(jQuery(this).attr(\'data-viewer\'),\'viewer\',\'width=9999,height=9999,scrollbars=yes,resizable=yes,toolbars=no\');return false;');
		};
		return false;
	});
	if($.cookie('cookie_viewer_with')=='Y') bd.find('.bd_lst a.hx').attr('onClick','window.open(jQuery(this).attr(\'data-viewer\'),\'viewer\',\'width=9999,height=9999,scrollbars=yes,resizable=yes,toolbars=no\');return false;');

// List Viewer
	if(lstViewer) bd.find('.bd_lst a.hx').append('<button class="bg_color" title="'+lstViewer+'" onClick="window.open(jQuery(this).parent().attr(\'data-viewer\'),\'viewer\',\'width=9999,height=9999,scrollbars=yes,resizable=yes,toolbars=no\');return false;">Viewer</button>');

// Gallery hover effect
	bd.find('.info_wrp').hover(function(){
		var t = $(this);
		var st = t.find('.info.st,.info.st1');
		var tL = bd.find('ol.bd_tmb_lst');
		if(tL.hasClass('tmb_bg3')){
			st.stop(true,true).animate({opacity:.8},200);
		} else {
			if(ie8Check){
				st.stop(true,true).animate({opacity:.7},200);
			} else {
				st.stop(true,true).animate({opacity:1},200);
			};
		};
		t.find('.info').stop(true,true).animate({top:0,left:0},200);
	},
	function(){
		var t = $(this);
		t.find('.info.st,.info.st1').animate({opacity:0},200);
		t.find('.info.st2').animate({top:'-100%'},200);
		t.find('.info.st3').animate({left:'-100%'},200);
		t.find('.info.st4').animate({top:'-100%',left:'-100%'},200);
	});

// Imagesloaded
	var bdOl = bd.find('ol.bd_lst');
	if(bdOl.length && !bdOl.hasClass('img_loadN')){
		bdOl.find('.tmb').each(function(){
			var t = $(this);
			t.imagesLoaded(function(){
				t.parent().addClass('fin_load').fadeIn(250);
			});
		});
	};

// List Style
if(default_style=='webzine'){
	// Webzine
	var bd_zine = bd.find('ol.bd_zine');
	if(bd_zine.attr('data-masonry')){
		if(bd_zine.attr('data-masonry')!='_N'){
			bd_zine.imagesLoaded(function(){
				bd_zine.masonry({
					itemSelector:'li',
					isFitWidth:true,
					isAnimated:true,
					animationOptions:{duration:500,easing:'easeInOutExpo',queue:false}
				});
			});
		} else {
			bd_zine.imagesLoaded(function(){
				bd_zine.masonry({
					itemSelector:'li',
					isFitWidth:true
				});
			});
		};
	};
} else if(default_style=='gallery'){
	// Gallery
	var bd_tmb_lst = bd.find('ol.bd_tmb_lst');
	if(bd_tmb_lst.attr('data-gall_deg')){
		if(ie8Check) return;
		var gall_deg = bd_tmb_lst.attr('data-gall_deg');
		bd_tmb_lst.find('.tmb_wrp').each(function(){
			var m = Math.floor(Math.random()*gall_deg*2-gall_deg);
			$(this).css({
				'msTransform':'rotate('+m+'deg)',
				'-moz-transform':'rotate('+m+'deg)',
				'-webkit-transform':'rotate('+m+'deg)'
			});
		});
	};
} else if(default_style=='cloud_gall'){
	// Cloud Gallery
	bdCloud(bd);
} else if(default_style=='faq'){
	// FAQ
	bdFaq(bd);
};

// Link Board
	if(bd.attr('data-link_board')){
		bd.find('a.viewer_with').click(function(){
			location.reload();
			return false;
		});
		if(bd.attr('data-link_board')==3) bdLinkBoard(bd);
	};

// Read Page Only
if(bd.find('div.rd').length || default_style=='guest'){
	// Prev-Next
	bdPrevNext(bd);
	function rdPrev(){
		var a = bd.find('.bd_rd_prev .wrp');
		$(this).append(a).attr('href',bd.find('.bd_rd_prev').attr('href'));
		a.css({marginLeft:-a.width()/2});
	};
	bd.find('a.rd_prev').mouseover(rdPrev).focus(rdPrev);
	function rdNext(){
		var a = bd.find('.bd_rd_next .wrp');
		$(this).append(a).attr('href',bd.find('.bd_rd_next').attr('href'));
		a.css({marginLeft:-a.width()/2});
	};
	bd.find('a.rd_next').mouseover(rdNext).focus(rdNext);
	
	bd.find('textarea,input,select').keydown(function(event){
		event.stopPropagation();
	});
	// Hide : et_vars, prev_next
	bd.find('.fdb_hide,.rd_file.hide,.fdb_lst .cmt_files').hide();
	if(bd.find('.rd table.et_vars th').length) bd.find('.rd table.et_vars').show();
	if(!bd.find('.bd_rd_prev').length) bd.find('a.rd_prev').hide();
	if(!bd.find('.bd_rd_next').length) bd.find('a.rd_next').hide();
	// Read Navi
	bd.find('.print_doc').click(function(){
		if($(this).hasClass('this')){
			print();
		} else {
			window.open(this.href,'print','width=860,height=999,scrollbars=yes,resizable=yes').print();
		};
		return false;
	});
	bd.find('.font_plus').click(function(){
		var c = $('.bd .xe_content');
		var font_size = parseInt(c.css('fontSize'))+1;
		c.css('font-size',''+font_size+'px');
		return false;
	});
	bd.find('.font_minus').click(function(){
		var c = $('.bd .xe_content');
		var font_size = parseInt(c.css('fontSize'))-1;
		c.css('font-size',''+font_size+'px');
		return false;
	});
	// File Type
	if(bdFilesType=='Y'){
		if(bd.find('.rd_file li').length==0){
			bd.find('.rd_file,.rd_nav .file').hide();
		} else {
			if(default_style!='blog'){
				bd.find('.rd_file strong b').text(bd.find('.rd_file li').length);
			} else {
				bd.find('.rd_file strong b').text($(this).parents('.rd').find('.rd_file li').length);
			};
		};
	};
	// Content Images
	if(bdImgOpt) bd.find('.xe_content img').draggable();
	if(bdImgLink){
		bd.find('.xe_content img').click(function(){
			window.location.href=$(this).attr('src');
		});
	};
	// Side Navi Scoll
	if(!bdNavSide){
		$(window).scroll(function(){
			var sT = $(this).scrollTop();
			var o = bd.find('div.rd_nav_side .rd_nav');
			if((sT > bd.find('div.rd_body').offset().top) && (sT < bd.find('hr.rd_end').offset().top-$(this).height())){
				o.fadeIn(200);
			} else {
				o.fadeOut(200);
			};
		});
	};
	// To SNS
	bd.find('.to_sns a.twitter').snspost({type:'twitter'});
	bd.find('.to_sns a.me2day').snspost({type:'me2day'});
	bd.find('.to_sns a.facebook').snspost({type:'facebook'});
	// Editor
	if(default_style=='guest') $.getScript(default_url+"/files/cache/js_filter_compiled/35d29adbe4b14641f9eac243af40093b.ko.compiled.js");
	var simpleWrt = bd.find('.simple_wrt textarea');
	simpleWrt.focus(function(){
		$(this).parent().parent().next().slideDown();
	})
	.autoGrow();
	var cmtWrt = bd.find('form.cmt_wrt .simple_wrt textarea');
	if(cmtWrt.length){
		$.getScript(default_url+"/modules/editor/tpl/js/editor_common.min.js", function(data, textStatus, jqxhr){
			if(default_style=='blog' || default_style=='guest'){
				cmtWrt.each(function(){
					editorStartTextarea($(this).attr('id').split('_')[1],'content','comment_srl');
				});
			} else {
				editorStartTextarea(cmtWrt.attr('id').split('_')[1],'content','comment_srl');
				cmtWrt.val($.cookie('socialxe_content'))
				.bind('keydown change',function(){
					$.cookie('socialxe_content',$(this).val());
				})
				.parents('form.cmt_wrt').find('input[type=submit]').click(function(){
					$.removeCookie('socialxe_content');
				});
			};
			editorStartTextarea(2,'content','comment_srl');
		});
	} else {
		editorStartTextarea(2,'content','comment_srl');
	};
	// Comment Count
	if(!bd.find('.rd .nametag').length) bdCmtPn(bd);
};

})(jQuery)
}

// Prev-Next
function bdPrevNext(bd){
	jQuery(document).keydown(function(event){
		var p = bd.find('.bd_rd_prev');
		var n = bd.find('.bd_rd_next');
		// fixed for 'prettyphoto' addon
		if(!jQuery('div.pp_overlay').length){
			if(event.keyCode==37 && p.length){
				window.location.href = p.attr('href');
			} else	if(event.keyCode==39 && n.length){
				window.location.href = n.attr('href');
			} else 	if(event.keyCode==27 && jQuery('#viewer').length){
				self.close();
			} else {
				return true;
			};
		};
	});
}

function reComment(doc_srl,cmt_srl,edit_url){
	var o = jQuery('#re_cmt').eq(0);
	o.find('input[name=error_return_url]').val('/'+doc_srl);
	o.find('input[name=mid]').val(current_mid);
	o.find('input[name=document_srl]').val(doc_srl);
	o.appendTo(jQuery('#comment_'+cmt_srl)).fadeIn().find('input[name=parent_srl]').val(cmt_srl);
	o.find('a.wysiwyg').attr('href',edit_url);
	o.find('textarea').focus();
}

function bdCmtPn(bd){
	var t = jQuery('#'+bd.find('.rd').attr('data-docSrl')+'_comment .bd_pg');
	t.clone().toggleClass('bd_pg cmt_pg').appendTo(t.prev().prev());
}

// To SNS
(function($){
	$.fn.snspost = function(opts) {
		var loc = '';
		var rdSnsPost = $(this).parents('.rd').find('.rd_hd h1').text();
		var rdSnsLink = $(this).parents('.rd').attr('data-snsLink');
		opts = $.extend({}, {type:'twitter', event:'click'}, opts);
		opts.content = encodeURIComponent(rdSnsPost);
		switch(opts.type) {
			case 'facebook':
				loc = 'http://www.facebook.com/share.php?t='+opts.content+'&u='+encodeURIComponent(rdSnsLink);
				break;
			case 'twitter':
			default:
				loc = 'http://twitter.com/home?status='+opts.content+' '+rdSnsLink;
				break;
		}
		this.bind(opts.event, function(){
			window.open(loc);
			return false;
		});
	};
	$.snspost = function(selectors, action) {
		$.each(selectors, function(key,val) {
			$(val).snspost( $.extend({}, action, {type:key}) );
		});
	};
})(jQuery)

// FAQ
function bdFaq(bd){
	var faq = bd.find('ul.bd_faq .article');
	faq.find('.a').hide();
	faq.find('.q').click(function(){
		var myFaq = jQuery(this).parents('.article:first');
		if(myFaq.hasClass('hide')){
			faq.addClass('hide').removeClass('show');
			faq.find('.a').slideUp(100);
			myFaq.removeClass('hide').addClass('show');
			myFaq.find('.a').slideDown(100);
		} else {
			myFaq.removeClass('show').addClass('hide');
			myFaq.find('.a').slideUp(100);
		};
		return false;
	});
}

// Cloud Gallery
function bdCloud(bd){
(function($){
	var cGall = bd.find('.bd_cloud');
	var cgRt = bd.find('button.bd_cg_rt');
	var cgRd = bd.find('button.bd_cg_rd');
	var cgRf = bd.find('button.bd_cg_rf');
	var cloud_deg = Number(cGall.attr('data-deg'));
	var cloud_y = Number(cGall.attr('data-y'));
	var thumbnail_width = Number(cGall.attr('data-tmb'));
	var cloud_z = Number(cGall.attr('data-z'));
	counts = [cloud_z+1];
	cGall.find('a').draggable({
		containment:"document",
		start: function(){
			$(this).css('zIndex',counts[0]++)
		}
	});
    function cloud(){
		cGall.find('a').each(function(){
			var t = $(this);
			var m = Math.floor(Math.random()*cloud_deg*2-cloud_deg);
			t.css({
				top:Math.floor(Math.random()*(cloud_y-thumbnail_width-51)),
				left:Math.floor(Math.random()*(cGall.width()-(thumbnail_width+22))),
				'msTransform':'rotate('+m+'deg)',
				'-moz-transform':'rotate('+m+'deg)',
				'-webkit-transform':'rotate('+m+'deg)'
			});
			t.imagesLoaded(function(){
				t.fadeIn(200);
			});
		});
    };
	function yesRand(){
		cGall.removeClass('no_rd');
		cgRd.removeClass('off');
		$.removeCookie('cg_rd');
		cloud();
	};
	function noRand(){
		cGall.addClass('no_rd').css('height','');
		cgRd.addClass('off');
		$.cookie('cg_rd','N');
		noRotate();
		cGall.imagesLoaded(function(){
			if($(window).width()<534){
				cGall.masonry({
					itemSelector:'a',
					isFitWidth:true
				});
			} else {
				cGall.masonry({
					itemSelector:'a',
					isFitWidth:true,
					isAnimated:true,
					animationOptions:{duration:500,easing:'easeInOutExpo',queue:false}
				});
			};
			$(this).find('a').fadeIn(200);
		})
	};
	function yesRotate(){
		if(cGall.hasClass('no_rd')) return true;
		cGall.removeClass('no_rt');
		cgRt.removeClass('off');
		$.removeCookie('cg_rt');
	};
	function noRotate(){
		cGall.addClass('no_rt');
		cgRt.addClass('off');
		$.cookie('cg_rt','N');
	};
	cgRf.click(function(){
		if(cgRd.hasClass('off')){
			cGall.removeClass('no_rd');
			cgRd.removeClass('off');
			$.removeCookie('cg_rd');
		};
		cloud();
	});
	cgRd.click(function(){
		if(cgRd.hasClass('off')){
			yesRand();
		} else {
			noRand();
		};
	});
	cgRt.click(function(){
		if(cgRt.hasClass('off')){
			yesRotate();
		} else {
			noRotate();
		};
	});
	if($(window).width()<534 || cgRd.hasClass('off')){
		noRand();
	} else {
		cloud();
		if(cgRt.hasClass('off')) noRotate();
	};
})(jQuery)
}

// Link Board
function bdLinkBoard(bd){
	if(bd.find('a.viewer_with').hasClass('on')){
		var hx = bd.find('a.hx,.bd_tb_lst .link_url a');
		hx.each(function(){
			jQuery(this).attr('href',jQuery(this).attr('href')+'?iframe=true&width=100%&height=100%').attr('rel','prettyPhoto[iframes]');
		});
		hx.prettyPhoto({hideflash:true,social_tools:false});
	};
}

// xe_textarea.min.js
function editorStartTextarea(a,b,e){var c=xGetElementById("editor_"+a),d=xGetElementById("htm_"+a).value;c.form.setAttribute("editor_sequence",a);c.style.width="100%";editorRelKeys[a]=[];editorRelKeys[a].primary=c.form[e];editorRelKeys[a].content=c.form[b];editorRelKeys[a].func=editorGetContentTextarea;a=c.form[b].value;d&&(a=a.replace(/<br([^>]*)>/ig,"\n"),"br"!=d&&(a=a.replace(/&lt;/g,"<"),a=a.replace(/&gt;/g,">"),a=a.replace(/&quot;/g,'"'),a=a.replace(/&amp;/g,"&")));c.value=a}
function editorGetContentTextarea(a){var b=xGetElementById("editor_"+a),a=xGetElementById("htm_"+a).value,b=b.value.trim();a&&("br"!=a&&(b=b.replace(/&/g,"&amp;"),b=b.replace(/</g,"&lt;"),b=b.replace(/>/g,"&gt;"),b=b.replace(/\"/g,"&quot;")),b=b.replace(/(\r\n|\n)/g,"<br />"));return b};

/*!
 * Autogrow Textarea Plugin Version v2.0
 * http://www.technoreply.com/autogrow-textarea-plugin-version-2-0
 *
 * Copyright 2011, Jevin O. Sewaruth
 *
 * Date: March 13, 2011
 */
jQuery.fn.autoGrow=function(){return this.each(function(){var c=this.cols;var b=this.rows;var d=function(){e(this)};var e=function(j){var h=0;var f=j.value.split("\n");for(var g=f.length-1;g>=0;--g){h+=Math.floor((f[g].length/c)+1)}if(h>=b){j.rows=h+1}else{j.rows=b}};var a=function(g){var f=0;var j=0;var i=0;var h=g.cols;g.cols=1;j=g.offsetWidth;g.cols=2;i=g.offsetWidth;f=i-j;g.cols=h;return f};this.style.height="auto";this.style.overflow="hidden";this.onkeyup=d;this.onfocus=d;this.onblur=d;e(this)})};