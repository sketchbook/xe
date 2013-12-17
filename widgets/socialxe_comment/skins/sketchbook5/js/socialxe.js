// 서비스 로그인
function providerLogin(url, skin){
	// JS 사용을 알린다.
	url += '&js=1';

	// skin
	if (!skin) skin = 'default';
	url += '&skin=' + skin;

	// 윈도우 오픈
	var android = navigator.userAgent.indexOf('Android') != -1;
	if(android) window.open(url,'socialxeLogin');
	else window.open(url,'socialxeLogin','top=0, left=0, width=800, height=500');
}

// 로그인 후
function completeSocialxeLogin(skin){
	var params = new Array();
	params['skin'] = skin;
	params['_vid'] = current_url.getQuery('vid');
	params['_mid'] = current_url.getQuery('mid');
	params['_document_srl'] = current_url.getQuery('document_srl');
	var response_tags = new Array('error','message','output');
	exec_xml('socialxe', 'procCompileInput', params, replaceInput, response_tags);
}

// 로그아웃
function providerLogout(provider, skin){
	var params = new Array();
	params['js'] = 1;
	params['provider'] = provider;
	params['skin'] = skin;
	params['_vid'] = current_url.getQuery('vid');
	params['_mid'] = current_url.getQuery('mid');
	params['_document_srl'] = current_url.getQuery('document_srl');
	var response_tags = new Array('error','message','output');
	exec_xml('socialxe', 'dispSocialxeLogout', params, replaceInput, response_tags);
}

// 입력부분 갱신
function replaceInput(ret_obj){
	if (!ret_obj['output']) return;

	jQuery('.socialxe_comment .socialxe_comment_input').html(ret_obj['output']);

	// 댓글 입력창 내용을 복원
	restoreContent();

	var params = new Array();
	params['skin'] = socialxe_skin;
	params['document_srl'] = socialxe_document_srl;
	params['list_count'] = socialxe_list_count;
	params['content_link'] = socialxe_content_link;
	params['comment_srl'] = socialxe_comment_srl;
	var response_tags = new Array('error','message','output');
	exec_xml('socialxe', 'procCompileList', params, replaceList, response_tags);
}

// 댓글 작성 후
function completeInsertSocialComment(ret_obj){
	sending = false;

	if (ret_obj['msg']){
		alert(ret_obj['msg']);
	}

	jQuery('.socialxe_comment .socialxe_content_input textarea').val('');
	jQuery.cookie("socialxe_content", "");

	var params = new Array();
	params['skin'] = ret_obj['skin'];
	params['document_srl'] = ret_obj['document_srl'];
	params['list_count'] = ret_obj['list_count'];
	params['content_link'] = ret_obj['content_link'];
	var response_tags = new Array('error','message','output');
	exec_xml('socialxe', 'procCompileList', params, replaceList, response_tags);
}

// 목록 갱신
function replaceList(ret_obj){
	if (!ret_obj['output']) return;

	jQuery('.socialxe_comment .socialxe_comment_list').html(ret_obj['output']);

	// 오토링크
	runAutoLink();

	// 대댓글 펼치기 초기 수행
	autoViewSubComment();
}

// 목록 더보기
function moreComment(skin, document_srl, last_comment_srl, list_count, content_link){
	var params = new Array();
	params['skin'] = skin;
	params['document_srl'] = document_srl;
	params['last_comment_srl'] = last_comment_srl;
	params['list_count'] = list_count;
	params['content_link'] = content_link;
	var response_tags = new Array('error','message','output');
	exec_xml('socialxe', 'procCompileList', params, moreList, response_tags);
}

// 전체 댓글보기
function replaceComment(skin, document_srl, list_count, content_link){
	socialxe_comment_srl = null;

	var params = new Array();
	params['skin'] = skin;
	params['document_srl'] = document_srl;
	params['list_count'] = list_count;
	params['content_link'] = content_link;
	var response_tags = new Array('error','message','output');
	exec_xml('socialxe', 'procCompileList', params, replaceList, response_tags);
}

// 목록 더보기
function moreList(ret_obj){
	if (!ret_obj['output']) return;

	jQuery('.socialxe_comment .socialxe_comment_list .socialxe_more').remove();
	jQuery('.socialxe_comment .socialxe_comment_list').append(ret_obj['output']);

	// 오토링크
	runAutoLink();

	// 대댓글 펼치기 초기 수행
	autoViewSubComment();
}

// 대댓글보기
function viewSubComment(skin, document_srl, comment_srl, content_link, page, force){
	var target = jQuery('#socialxe_comment_' + comment_srl);
	if (target.attr('opened') == 'true' && !force){
		target.attr('opened', 'false');
		target.slideUp('fast');
		return;
	}

	var params = new Array();
	params['skin'] = skin;
	params['document_srl'] = document_srl;
	params['comment_srl'] = comment_srl;
	params['content_link'] = content_link;
	params['page'] = page;
	var response_tags = new Array('output', 'comment_srl', 'total');
	exec_xml('socialxe', 'procCompileSubList', params, _viewSubComment, response_tags);
}

function _viewSubComment(ret_obj){
	var comment_srl = ret_obj['comment_srl'];
	var target = jQuery('#socialxe_comment_' + comment_srl);
	var target_count = jQuery("#socialxe_write_comment_" + comment_srl);

	target_count.html(target_count.html().replace(/[0-9]+/, ret_obj['total']));

	target.html(ret_obj['output']);
	target.attr('opened', 'true');
	target.slideDown('fast');

	// 오토링크
	runAutoLink();

	// textarea auto resize
	runAutoSize();

	// 엔터 입력
	enterSend();
}

// 대댓글 삽입 후
function completeInsertSubComment(ret_obj){
	sending = false;

	if (ret_obj['msg']){
		alert(ret_obj['msg']);
	}

	var target = jQuery('#socialxe_comment_' + ret_obj['comment_srl']);

	var params = new Array();
	params['skin'] = ret_obj['skin'];
	params['document_srl'] = ret_obj['document_srl'];
	params['comment_srl'] = ret_obj['comment_srl'];
	params['content_link'] = ret_obj['content_link'];
	var response_tags = new Array('output', 'comment_srl', 'total');
	exec_xml('socialxe', 'procCompileSubList', params, _viewSubComment, response_tags);
}

// 대표계정 변경
function changeMaster(provider, skin){
	var params = new Array();
	params['provider'] = provider;
	params['skin'] = skin;
	var response_tags = new Array('error','message','output');
	exec_xml('socialxe', 'procSocialxeChangeMaster', params, replaceInput, response_tags);
}

// 대댓글의 댓글 쓰기
function writeSubSubComment(obj, reply_prefix){
	var input = jQuery(obj).parents(".socialxe_sub_comment").find('textarea[name="content"]');

	input.focus();

	if (reply_prefix != '')
		input.val(reply_prefix + ' ' + input.val());
}

// 자동 로그인 키 얻기
function getAutoLoginKey(url, skin){
	jQuery.getJSON(url + '&callback=?', function(json){
		var params = new Array();
		params['auto_login_key'] = json.auto_login_key;
		params['skin'] = skin;
		params['_vid'] = current_url.getQuery('vid');
		params['_mid'] = current_url.getQuery('mid');
		params['_document_srl'] = current_url.getQuery('document_srl');
		var response_tags = new Array('error','message','output');
		exec_xml('socialxe', 'procSocialxeSetAutoLoginKey', params, completeAutoLogin, response_tags);
	});
}
function completeAutoLogin(ret_obj){
	replaceInput(ret_obj);
	socialxe_auto_login_key = 'Y';
}

// 등록 시작하면 등록 비활성
var sending = false;
function socialSend(obj, filter){
	if (sending) return false;

	sending = true;
	return procFilter(obj, filter);
}

// 댓글 삭제
function deleteSocialComment(comment_srl){
	var fo_obj = jQuery("#socialxe_delete_comment_form")[0];
	if(!fo_obj) return;
	fo_obj.comment_srl.value = comment_srl;
	procFilter(fo_obj, delete_social_comment);
}

// 댓글 삭제 후
function completeDeleteSocialComment(ret_obj){
	var comment_srl = ret_obj['comment_srl'];

	jQuery("#social_comment_" + comment_srl).fadeOut("slow", function(){
		jQuery(this).remove();
	});
}

// 오토링크 적용
function runAutoLink(){
	var oAutoLink = xe.getPlugin('autolink');
	if (!oAutoLink) return;
	oAutoLink = oAutoLink[0];
	if (!oAutoLink) return;
	oAutoLink.cast('ONREADY');
}

// textarea 엔터로 등록하기
function enterSend(){
	if (socialxe_enter_send != 'Y') return;

	var objs = jQuery(".socialxe_comment textarea[name='content']");
	objs.each(function(){
		var obj = jQuery(this);
		if (!obj.attr("bind_enter")){
			obj.bind('keypress', function(e){
				if (e.keyCode != 13) return true;

				obj.parents('form').submit();
				return false;
			});
			obj.attr("bind_enter", true);
		}
	});
}

// 대댓글 자동 펼침
function autoViewSubComment(){
	if (socialxe_auto_view_sub != 'Y') return;
	if (socialxe_auto_login_key != 'Y') return;

	// 대댓글 영역의 위치를 확인
	jQuery(".socialxe_comment .socialxe_comment_item").each(function(){
		var obj = jQuery(this);
		var w_obj = jQuery(window);

		// 화면 영역에 있으면 펼친다!
		if (obj.offset().top < w_obj.scrollTop() + w_obj.height() && obj.offset().top + obj.height() > w_obj.scrollTop()){
			if (obj.attr('auto_view')) return;

			var comment_srl = this.id.split("_")[2];
			viewSubComment(socialxe_skin, socialxe_document_srl, comment_srl, socialxe_content_link);
			obj.attr('auto_view', true);
		}
	});
}

// textarea 크기 적용
function runAutoSize(){
	jQuery(document).ready(function(){
		var obj = jQuery(".socialxe_resizable");

		obj.each(function(){
			var this_obj = jQuery(this);
			if (!this_obj.attr("resizable") && !this_obj.attr("dummy")){
				this_obj.autoResize({
					animateDuration : 200,
					limit : 250
				});
				this_obj.attr("resizable", true);
			}
		});
	});
}

// 댓글 입력창의 내용을 복원
function restoreContent(){
	jQuery("#socialxe_main_content").val(jQuery.cookie("socialxe_content"));
}

jQuery(window).ready(function($){
	// exec_xml의 onerror 지정
	exec_xml.onerror = function(module, act, ret, callback_func, response_tags, callback_func_arg, fo_obj){
		sending = false;
		alert(ret['message'] || 'error!');
		return null;
	}

	// validator의 alert 앞에 sending = false를 위한 플러그인을 등록한다.
	// 호환성을 위해 추가한 플러그인 - 에디터에서 컨텐트를 가져와서 설정한다.
	var AlertStub = xe.createPlugin('alert_stub', {
		API_BEFORE_SHOW_ALERT : function() {
			sending = false;
		}
	});
	var oValidator = xe.getApp('Validator')[0];
	if (oValidator){
		oValidator.registerPlugin(new AlertStub);
	}

	if (socialxe_auto_view_sub == 'Y'){
		// 스크롤 이벤트를 등록
		jQuery(window).bind("scroll", function(event) {
			autoViewSubComment();
		});

		// 대댓글 펼치기 초기 수행
		autoViewSubComment();
	}

	// textarea auto resize
	runAutoSize();

	// 댓글 입력창의 내용을 기억
	jQuery("#socialxe_main_content").bind("keydown keyup change", function(){
		jQuery.cookie("socialxe_content", jQuery(this).val());
	});

	// 댓글 입력창 내용을 복원
	//restoreContent();
});
