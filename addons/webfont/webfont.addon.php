<?php
if(!defined("__XE__")) exit();

if($called_position=='before_display_content' && Context::get('module')!='admin'){
	if($addon_info->nanumfont!='N') {
		Context::addJsFile('./addons/webfont/js/webfont.js', false ,'', null, 'body');

		if($_COOKIE['nanumfontInstall']!='Y') {
			if(!$addon_info->nanum) {
				if(Mobile::isMobileCheckByAgent()){
					if($_COOKIE['nanumfontM_use']=='Y') Context::addCssFile('./addons/webfont/css/nanumfont.css');
				} else {
					Context::addCssFile('./addons/webfont/css/nanumfont.css');
				}
			}
			if(!$addon_info->ng) $ng="@font-face{font-family:ng;font-style:normal;font-weight:normal;src:url(http://themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.eot)\9}
@font-face{font-family:ng;font-style:normal;font-weight:bold;src:url(http://themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Bold.eot)\9}";
			if($addon_info->nm=='Y') $nm="@font-face{font-family:nm;font-style:normal;font-weight:normal;src:url(http://themes.googleusercontent.com/static/fonts/earlyaccess/nanummyeongjo/v2/NanumMyeongjo-Regular.eot)\9}
@font-face{font-family:nm;font-style:normal;font-weight:bold;src:url(themes.googleusercontent.com/static/fonts/earlyaccess/nanummyeongjo/v2/NanumMyeongjo-Bold.eot)\9}";
			if($addon_info->np=='Y') $np="@font-face{font-family:np;font-style:normal;font-weight:normal;src:url(http://themes.googleusercontent.com/static/fonts/earlyaccess/nanumpenscript/v2/NanumPenScript-Regular.eot)\9}";
			if(!$addon_info->notice) {
				Context::addCssFile('./addons/webfont/css/webfont.css');
				if(Mobile::isMobileCheckByAgent()){
					Context::addJsFile('./addons/webfont/js/webfont_notice_m.js', false ,'', null, 'body');
				} else {
					Context::addJsFile('./addons/webfont/js/webfont_notice.js', false ,'', null, 'body');
					
				};
				if(!$addon_info->expires) $addon_info->expires="1";
			}
		}

		$fontcheck="
<div id=\"fontcheck\" title=\"$addon_info->expires\" style=\"position:absolute;top:-999px;left:-999px;visibility:hidden;font-size:72px\">
	<p id=\"fontcheck_nanum1\" style=\"float:left;font-family:NanumGothic,나눔고딕,monospace,Verdana !important\">abcXYZ, 세종대왕,1234</p>
	<p id=\"fontcheck_nanum2\" style=\"float:left;font-family:monospace,Verdana !important\">abcXYZ, 세종대왕,1234</p>
</div>
		";
		Context::addHtmlFooter($fontcheck);
	}

	if($addon_info->font1_name) {
		$font1="@font-face{font-family:$addon_info->font1_name;font-style:normal;font-weight:normal;src:url('$addon_info->font1_woff') format('woff');src:url($addon_info->font1_eot)\9}";
		if($addon_info->font1_force=='Y') {
			$font1_force="body,input,textarea,select,button,table{font-family:$addon_info->font1_name}";
		}
	}

	if($addon_info->font2_name) {
		$font2="@font-face{font-family:$addon_info->font2_name;font-style:normal;font-weight:normal;src:url('$addon_info->font2_woff') format('woff');src:url($addon_info->font21_eot)\9}";
		if($addon_info->font2_force=='Y') {
			$font2_force="body,input,textarea,select,button,table{font-family:$addon_info->font2_name}";
		}
	}

	if($addon_info->font3_name) {
		$font3="@font-face{font-family:$addon_info->font3_name;font-style:normal;font-weight:normal;src:url('$addon_info->font3_woff') format('woff');src:url($addon_info->font3_eot)\9}";
		if($addon_info->font3_force=='Y') {
			$font3_force="body,input,textarea,select,button,table{font-family:$addon_info->font3_name}";
		}
	}

	if($addon_info->google1) {
		$google1 = str_replace(' ', '+', $addon_info->google1);
		$google2 = str_replace(' ', '+', $addon_info->google2);
		$google3 = str_replace(' ', '+', $addon_info->google3);
		$google_webfonts="
<link href=\"http://fonts.googleapis.com/css?family=$google1|$google2|$google3\" rel=\"stylesheet\" type=\"text/css\">
		";
	}

	if($addon_info->use) {
		if($addon_info->use=='font1') $use_font="$addon_info->font1_name";
		if($addon_info->use=='font2') $use_font="$addon_info->font2_name";
		if($addon_info->use=='font3') $use_font="$addon_info->font3_name";
		if($addon_info->use=='google1') $use_font="$addon_info->google1";
		if($addon_info->use=='google2') $use_font="$addon_info->google2";
		if($addon_info->use=='google3') $use_font="$addon_info->google3";
		$use="body,input,textarea,select,button,table{font-family:$use_font,'나눔고딕',NanumGothic,ng,Tahoma,Geneva,sans-serif}";
	}

	$webfonts="
<style type=\"text/css\">
$use
$ng
$nm
$np
$font1
$font2
$font3
</style>
	";

	Context::addHtmlHeader($webfonts);
	Context::addHtmlHeader($google_webfonts);
}
?>