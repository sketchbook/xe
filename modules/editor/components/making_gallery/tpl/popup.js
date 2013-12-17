var selected_node = null;
function getSlideShow() {
	// 부모창이 있는지 체크 
	if(typeof(opener)=="undefined") return;
	// 부모 위지윅 에디터에서 선택된 영역이 있으면 처리
	var node = opener.editorPrevNode;
	var selected_images = "";
	if(node && node.nodeName == "IMG") {
		selected_node = node;

// custom
		var gall_style = selected_node.getAttribute("gall_style");
		var width = selected_node.getAttribute("width");
		var height = selected_node.getAttribute("height");
		var div_align = selected_node.getAttribute("div_align");
		var div_margin = selected_node.getAttribute("div_margin");
		var div_padding = selected_node.getAttribute("div_padding");
		var div_bg_color = selected_node.getAttribute("div_bg_color");
		var div_border_width = selected_node.getAttribute("div_border_width");
		var div_border_style = selected_node.getAttribute("div_border_style");
		var div_border_color = selected_node.getAttribute("div_border_color");

		var img_align = selected_node.getAttribute("img_align");
		var img_width = selected_node.getAttribute("img_width");
		var img_height = selected_node.getAttribute("img_height");
		var img_margin = selected_node.getAttribute("img_margin");
		var img_padding = selected_node.getAttribute("img_padding");
		var img_bg_color = selected_node.getAttribute("img_bg_color");
		var img_border_width = selected_node.getAttribute("img_border_width");
		var img_border_style = selected_node.getAttribute("img_border_style");
		var img_border_color = selected_node.getAttribute("img_border_color");
		var img_border_radius = selected_node.getAttribute("img_border_radius");
		var img_shadow_width = selected_node.getAttribute("img_shadow_hori");
		var img_shadow_width = selected_node.getAttribute("img_shadow_vertical");
		var img_shadow_width = selected_node.getAttribute("img_shadow_width");
		var img_shadow_color = selected_node.getAttribute("img_shadow_color");
		var img_rotate = selected_node.getAttribute("img_rotate");
		var preset = selected_node.getAttribute("preset");
		var slide_effect = selected_node.getAttribute("slide_effect");

		if(!div_align || div_align=="center") xGetElementById("div_align").selectedIndex = 0;
		else if(div_align=="left") xGetElementById("div_align").selectedIndex = 1;
		else if(div_align=="right") xGetElementById("div_align").selectedIndex = 2;

		xGetElementById("div_bg_color_input").value = div_bg_color; 
		manual_select_color("div_bg", xGetElementById("div_bg_color_input"));

		if(!div_border_style || div_border_style=="solid") xGetElementById("div_border_style").selectedIndex = 0;
		else if(div_border_style=="dotted") xGetElementById("div_border_style").selectedIndex = 1;
		else if(div_border_style=="dashed") xGetElementById("div_border_style").selectedIndex = 2;
		xGetElementById("div_border_color_input").value = div_border_color; 
		manual_select_color("div_border", xGetElementById("div_border_color_input"));

		if(!img_align || img_align=="center") xGetElementById("img_align").selectedIndex = 0;
		else if(img_align=="left") xGetElementById("img_align").selectedIndex = 1;
		else if(img_align=="right") xGetElementById("img_align").selectedIndex = 2;

		xGetElementById("img_bg_color_input").value = img_bg_color;
		manual_select_color("img_bg", xGetElementById("img_bg_color_input"));

		if(!img_border_style || img_border_style=="solid") xGetElementById("img_border_style").selectedIndex = 0;
		else if(img_border_style=="dotted") xGetElementById("img_border_style").selectedIndex = 1;
		else if(img_border_style=="dashed") xGetElementById("img_border_style").selectedIndex = 2;
		xGetElementById("img_border_color_input").value = img_border_color; 
		manual_select_color("img_border", xGetElementById("img_border_color_input"));
		
		xGetElementById("img_shadow_width").value = img_shadow_width;
		xGetElementById("img_shadow_color_input").value = img_shadow_color; 
		manual_select_color("img_shadow", xGetElementById("img_shadow_color_input"));

// custom end

		selected_images = selected_node.getAttribute("images_list");
	}

	jQuery(function($){
		var list = $("#xdal",opener.document).find('.sn.img ul').html();
		$('#image_list ul').append(list);
	});

}

function insertSlideShow() {
	if(typeof(opener)=="undefined") return;

// custom
jQuery(function($){
	var list = new Array();
	var list_obj = $("#image_list li > :checked:not([disabled])").parent().find('img');
	for(var i=0;i<list_obj.length;i++){
		list[i] = list_obj.eq(i).attr('src');
	};
	if(!list.length) {
		window.close();
		return;
	};

	var gall_style = xGetElementById("gall_style").value;
	var width = xGetElementById("width").value;
	var height = xGetElementById("height").value;
	var div_align = xGetElementById("div_align").options[xGetElementById("div_align").selectedIndex].value;
	var div_margin = xGetElementById("div_margin").value;
	var div_padding = xGetElementById("div_padding").value;
	var div_bg_color = xGetElementById("div_bg_color_input").value;
	var div_border_width = xGetElementById("div_border_width").value;
	var div_border_style = xGetElementById("div_border_style").options[xGetElementById("div_border_style").selectedIndex].value;
	var div_border_color = xGetElementById("div_border_color_input").value;

	var img_align = xGetElementById("img_align").options[xGetElementById("img_align").selectedIndex].value;
	var img_width = xGetElementById("img_width").value;
	var img_height = xGetElementById("img_height").value;
	var img_margin = xGetElementById("img_margin").value;
	var img_padding = xGetElementById("img_padding").value;
	var img_bg_color = xGetElementById("img_bg_color_input").value;
	var img_border_width = xGetElementById("img_border_width").value;
	var img_border_style = xGetElementById("img_border_style").options[xGetElementById("img_border_style").selectedIndex].value;
	var img_border_color = xGetElementById("img_border_color_input").value;
	var img_border_radius = xGetElementById("img_border_radius").value;
	var img_shadow_hori = xGetElementById("img_shadow_hori").value;
	var img_shadow_vertical = xGetElementById("img_shadow_vertical").value;
	var img_shadow_width = xGetElementById("img_shadow_width").value;
	var img_shadow_color = xGetElementById("img_shadow_color_input").value;
	var img_rotate = xGetElementById("img_rotate").value;
	var preset = $('#preset :checked:not([disabled])').val();
	var slide_effect = xGetElementById("slide_effect").value;
// custom end

    var images_list = "";
    for(var i=0; i<list.length;i++) {
        images_list += list[i].trim()+" ";
    }

	if(selected_node) {

// custom
		selected_node.setAttribute("gall_style", gall_style);
		selected_node.setAttribute("width", width);
		selected_node.setAttribute("height", height);
		selected_node.getAttribute("div_align", div_align);
		selected_node.getAttribute("div_margin", div_margin);
		selected_node.getAttribute("div_padding", div_padding);
		selected_node.getAttribute("div_bg_color", div_bg_color);
		selected_node.getAttribute("div_border_width", div_border_width);
		selected_node.getAttribute("div_border_style", div_border_style);
		selected_node.getAttribute("div_border_color", div_border_color);

		selected_node.getAttribute("img_align", img_align);
		selected_node.getAttribute("img_width", img_width);
		selected_node.getAttribute("img_height", img_height);
		selected_node.getAttribute("img_margin", img_margin);
		selected_node.getAttribute("img_padding", img_padding);
		selected_node.getAttribute("img_bg_color", img_bg_color);
		selected_node.getAttribute("img_border_width", img_border_width);
		selected_node.getAttribute("img_border_style", img_border_style);
		selected_node.getAttribute("img_border_color", img_border_color);
		selected_node.getAttribute("img_border_radius", img_border_radius);
		selected_node.getAttribute("img_shadow_hori", img_shadow_hori);
		selected_node.getAttribute("img_shadow_vertical", img_shadow_vertical);
		selected_node.getAttribute("img_shadow_width", img_shadow_width);
		selected_node.getAttribute("img_shadow_color", img_shadow_color);
		selected_node.getAttribute("img_rotate", img_rotate);
		selected_node.getAttribute("preset", preset);
		selected_node.getAttribute("slide_effect", slide_effect);

		selected_node.setAttribute("images_list", images_list);
	} else {
		var text = "<img src=\"\" editor_component=\"making_gallery\" gall_style=\""+gall_style+"\" width=\""+width+"\" height=\""+height+"\" div_align=\""+div_align+"\" div_margin=\""+div_margin+"\" div_padding=\""+div_padding+"\" div_bg_color=\""+div_bg_color+"\" div_border_width=\""+div_border_width+"\" div_border_style=\""+div_border_style+"\" div_border_color=\""+div_border_color+"\" img_align=\""+img_align+"\" img_width=\""+img_width+"\" img_height=\""+img_height+"\" img_margin=\""+img_margin+"\" img_padding=\""+img_padding+"\" img_bg_color=\""+img_bg_color+"\" img_border_width=\""+img_border_width+"\" img_border_style=\""+img_border_style+"\" img_border_color=\""+img_border_color+"\" img_border_radius=\""+img_border_radius+"\" img_shadow_hori=\""+img_shadow_hori+"\" img_shadow_vertical=\""+img_shadow_vertical+"\" img_shadow_width=\""+img_shadow_width+"\" img_shadow_color=\""+img_shadow_color+"\" img_rotate=\""+img_rotate+"\" preset=\""+preset+"\" slide_effect=\""+slide_effect+"\" images_list=\""+images_list+"\" style=\"height:200px;background:url(modules/editor/components/making_gallery/tpl/making_gallery.gif) no-repeat center;border:1px dotted #666\" />";
// custom end

		opener.editorFocus(opener.editorPrevSrl);
		var iframe_obj = opener.editorGetIFrame(opener.editorPrevSrl)
		opener.editorReplaceHTML(iframe_obj, text);
	}
	opener.editorFocus(opener.editorPrevSrl);
	window.close();


});


}
/* 색상 클릭시 */
function select_color(type, code) {
  xGetElementById(type+"_preview_color").style.backgroundColor = "#"+code;
  xGetElementById(type+"_color_input").value = code;
}
/* 수동 색상 변경시 */
function manual_select_color(type, obj) {
  if(obj.value.length!=6) return;
  code = obj.value;
  xGetElementById(type+"_preview_color").style.backgroundColor = "#"+code;
}
/* 색상표를 출력 */
function printColor(type, blank_img_src) {
  var colorTable = new Array('22','44','66','88','AA','CC','EE');
  var html = "";
  for(var i=0;i<8;i+=1) html += printColorBlock(type, i.toString(16)+i.toString(16)+i.toString(16)+i.toString(16)+i.toString(16)+i.toString(16), blank_img_src);
  for(var i=0; i<colorTable.length; i+=3) {
	for(var j=0; j<colorTable.length; j+=2) {
	  for(var k=0; k<colorTable.length; k++) {
		var code = colorTable[i] + colorTable[j] + colorTable[k];
		html += printColorBlock(type, code, blank_img_src);
	  }
	}
  }
  for(var i=8;i<16;i+=1) html += printColorBlock(type, i.toString(16)+i.toString(16)+i.toString(16)+i.toString(16)+i.toString(16)+i.toString(16), blank_img_src);
  document.write(html);
}
/* 개별 색상 block 출력 함수 */
function printColorBlock(type, code, blank_img_src) {
  if(type=="bg") {
	return "<div style=\"float:left;background-color:#"+code+"\"><img src=\""+blank_img_src+"\" class=\"color_icon\" onmouseover=\"this.className='color_icon_over'\" onmouseout=\"this.className='color_icon'\" onclick=\"select_color('"+type+"','"+code+"')\" alt=\"color\" \/><\/div>";
  } else {
	return "<div style=\"float:left;background-color:#"+code+"\"><img src=\""+blank_img_src+"\" class=\"color_icon\" onmouseover=\"this.className='color_icon_over'\" onmouseout=\"this.className='color_icon'\" onclick=\"select_color('"+type+"','"+code+"')\" alt=\"color\" \/><\/div>";
  }
}
xAddEventListener(window, "load", getSlideShow);

/* for custom*/
jQuery(function($){

$('.fnb input').click(function(){
	$('.fnb input').removeAttr('checked').parent().removeClass('select');
	$('.'+$(this).attr('class')+'').attr('checked','checked').parent().addClass('select');
});

function bodyHeight(){
	$('#body').css('height',$(window).height()-86)
};
$(window).resize(bodyHeight).load(bodyHeight);
if($.browser.msie){
	$(window).load(function(){
		$('.popup').css('minWidth',$(window).width()-20);
	});
};

$(".open_ul").click(function(){
	$(this).parent().parent().next().slideToggle();
});

$("#image_list .all button").click(function(){
	if($(this).hasClass('desel')){
		$(this).parent().parent().find('li > :checkbox:not([disabled])').removeAttr('checked');
	} else {
		$(this).parent().parent().find('li > :checkbox:not([disabled])').attr('checked', 'checked');
	};
	$(this).parent().toggleClass('any');
});

$("#list_btn2").click(function(){
	$('.change.preset').html('<span class=\"radio\"><input type=\"radio\" id=\"preset1\" name=\"preset\" checked=\"checked\"> <label for=\"preset1\" class=\"label\">기본</label></span><span class=\"radio\"><input type=\"radio\" id=\"preset2\" name=\"preset\" value=\"2\"> <label for=\"preset2\" class=\"label\">애플 스타일 화이트</label></span><span class=\"radio\"><input type=\"radio\" id=\"preset3\" name=\"preset\" value=\"3\"> <label for=\"preset3\" class=\"label\">애플 스타일 블랙</label></span>');
	$('.change.gall_style').html('<input type=\"text\" class=\"inputTypeText\" size=\"5\" id=\"gall_style\" value=\"slide\" />');
	$('.change.width').html('<div class=\"dt\"><em>슬라이드 크기</em></div><div class=\"dd\"><strong>넓이</strong><input type=\"text\" class=\"inputTypeText\" size=\"5\" id=\"width\" value=\"720\" />px, <strong>높이</strong><input type=\"text\" class=\"inputTypeText\" size=\"5\" id=\"height\" value=\"480\" />px. <span>☞ <strong>반드시</strong> 적어주세요.</span></div>');
	$('.change.slide_opt').show();
	$('.change.img_align').remove();
	$('.change.img_width').html('<div class=\"dt\"><em>썸네일 넓이 X 높이</em></div><div class=\"dd\"><strong>넓이</strong><input type=\"text\" class=\"inputTypeText\" size=\"3\" id=\"img_width\" value=\"90\" />px, <strong>높이</strong><input type=\"text\" class=\"inputTypeText\" size=\"3\" id=\"img_height\" value=\"60\" />px. <span>☞ <strong>반드시</strong> 적어주세요.</span></div>');
	$('.change.img_margin').html('<div class=\"dt\"><em>썸네일 여백</em></div><div class=\"dd\"><input type=\"text\" class=\"inputTypeText\" size=\"3\" id=\"img_margin\" value=\"12\" />px.<input type=\"text\" class=\"inputTypeText\" size=\"3\" id=\"img_padding\" value=\"\" style=\"display:none\"  /> <span>☞ <strong>반드시</strong> 적어주세요.</span></div>');
});
});