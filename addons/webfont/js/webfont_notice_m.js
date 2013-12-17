jQuery(function($){
	if($('#fontcheck_nanum1').width()==$('#fontcheck_nanum2').width()){
		if($.cookie('webfont')!='N'){
			var expN = Number($('#fontcheck').attr('title'));
			$('body').prepend('<div id="webfontM"><h2>이 사이트는 <b>나눔글꼴</b>로 제작되었습니다.</h2><p>이 사이트를 <b>나눔글꼴</b>로 보시려면 <u>웹폰트 파일(1MB 이상)</u>을 사용해야합니다.<br /><small>*사용하는 브라우저에 따라 지원하지 않을 수도 있습니다.</small></p><div class="btns"><em>사용하시겠습니까?</em><button type="button" class="yes">네</button><button type="button" class="no">아니오</button></div>');
			$('#webfontM button').click(function(){
				$.cookie('webfont','N',{ expires: expN });
				$('#webfontM').fadeOut();
				if($(this).hasClass('yes')){
					$.cookie('nanumfontM_use','Y');
					$('body').append('<link rel="stylesheet" href="'+request_uri+'/addons/webfont/css/nanumfont.css" />');
				}
			})
		}
	}
})