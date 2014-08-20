// Nanum Font
jQuery(function($){
	$('body').append('<div id="bd_font_install"><div id="install_ng2"><button type="button" class="tg_blur2"></button><button type="button" class="tg_close2">X</button><h3>나눔글꼴 설치 안내</h3><br /><h4>이 PC에는 <b>나눔글꼴</b>이 설치되어 있지 않습니다.</h4><p>이 사이트를 <b>나눔글꼴</b>로 보기 위해서는<br /><b>나눔글꼴</b>을 설치해야 합니다.</p><div><a href="http://hangeul.naver.com/" target="_blank">나눔고딕 사이트로 가기</a></div><button type="button" class="tg_blur2"></button></div></div></div><div class="fontcheckWrp"><p id="fontcheck_ng3" style="font-family:\'나눔고딕\',NanumGothic,monospace,Verdana !important">Sketchbook5, 스케치북5</p><p id="fontcheck_ng4" style="font-family:monospace,Verdana !important">Sketchbook5, 스케치북5</p></div>');
	var bd = $('div.bd');
	function installfontOut(){
		$('#bd_font_install').fadeOut();
		$('div.bd:visible .bd_font .select').focus();
		return false;
	};
	$(document).keydown(function(event){
		if($('#bd_font_install').is(':visible')){
			if(event.keyCode!=27) return true;
			return installfontOut();
		};
	});
	$('#install_ng2 .tg_close2,#install_ng2 .close').click(installfontOut);
	$('#install_ng2 .tg_blur2').focusin(installfontOut);
	bd.find('.bd_font li a').click(function(){
		var p = $(this).parent();
		if(p.hasClass('ng') && $('#fontcheck_ng3').width()==$('#fontcheck_ng4').width()){
			$('#bd_font_install').fadeIn(function(){
				$(this).find('.tg_close2').focus();
			});
		} else {
			var pC = p.attr('class');
			if(p.hasClass('ui_font')){
				$.removeCookie('bd_font');
				location.reload();
			} else {
				$.cookie('bd_font',''+pC+'');
			};
			$('.bd,.bd input,.bd textarea,.bd select,.bd button,.bd table').removeClass('ng window_font tahoma').addClass(pC);
			p.addClass('on').siblings('.on').removeClass('on');
			$('.bd_font .select strong').text($(this).text());
		};
		return false;
	});
});