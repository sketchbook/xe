jQuery(function($){

if($('#fontcheck_nanum1').width()==$('#fontcheck_nanum2').width()){
	if($.cookie('webfont')!='N'){
		var expN = Number($('#fontcheck').attr('title'));
		$('body').prepend('<div id="webfont"><div class="fg"><div class="wrap"><div class="w_bg"></div><a class="w_bg" href="http://hangeul.naver.com/font" target="_blank" title="나눔글꼴 홈페이지로 가기"><span>나눔글꼴 홈페이지로 가기</span></a><div class="cnt"><h2>이 사이트는 <b>나눔글꼴</b>로 제작되었습니다.</h2><p>이 PC에는 아직 <b>나눔글꼴</b>이 설치되어 있지 않습니다.<br />나눔글꼴을 설치하고 <em>아름다운 한글</em>을 경험해보세요.</p></div></div></div></div>');
		// Modal Window
		var htmlBody = $('html,body');
		var modal = $('#webfont');
		var modalBg = modal.find('>.bg');
		var modalFg = modal.find('>.fg');
		var modalCloseHtml = '<button type="button" class="modalClose" title="이 창을 닫으면 '+expN+'일 동안 보이지 않습니다.">X</button>';
		var modalBlurHtml = '<button type="button" class="modalBlur"></button>';
		var docHeight = $(document).height();
		modal.hide().appendTo('body').height(docHeight).prepend('<span class="bg" title="이 곳을 클릭하면 창이 닫힙니다."></span>').append('<!--[if IE 6]><iframe class="ie6"></iframe><![endif]-->');
		modalFg.prepend(modalCloseHtml).prepend(modalBlurHtml);
		var modalClose = $('.modalClose');
		var modalBlur = $('.modalBlur');
		modalClose.eq(0).clone().appendTo(modalFg);
		modalBlur.eq(0).clone().appendTo(modalFg);
	
		if(typeof document.body.style.maxHeight == "undefined"){
			htmlBody.css({'width':'100%','height':'100%'});
		}
		modal.fadeToggle(200).toggleClass('modalActive');
		modal.find('>.fg>.modalClose:first').focus();
		$(this).addClass('active');
	
		function closeModal() {
			if(typeof document.body.style.maxHeight == "undefined"){
				htmlBody.removeAttr('style');
			}
			modal.fadeOut(200).removeClass('modalActive');
			$('.modalAnchor.active').focus().removeClass('active');
			$.cookie('webfont','N',{ expires: expN });
			return false;
		}
		$(document).keydown(function(event){
			if(event.keyCode != 27) return true; // ESC
			if(modal.find('.tgContent:visible').length == 0) return closeModal();
		});
		$('#webfont>.bg, .modalClose,#webfont .cancel').click(closeModal);
		$('.modalBlur').focusin(function(event){
			modalClose.click();
		});
	};
};

});