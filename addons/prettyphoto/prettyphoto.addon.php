<?php
if(!defined("__ZBXE__")) exit();

if($called_position == 'after_module_proc' && Context::getResponseMethod()=="HTML" && !Mobile::isMobileCheckByAgent()) {
	Context::addCssFile('./addons/prettyphoto/css/prettyPhoto.css');
	Context::addCssFile('./addons/prettyphoto/css/addon.css');
	Context::addJsFile('./addons/prettyphoto/js/jquery.prettyPhoto.js', false ,'', null, 'body');
	Context::addJsFile('./addons/prettyphoto/js/addon.js', false ,'', null, 'body');
	Context::loadLang('./addons/prettyphoto/lang');

	if(!$addon_info->slideshow) $addon_info->slideshow="5000";
	if(!$addon_info->auto_slide) $addon_info->auto_slide="false";
	if(!$addon_info->show_title) $addon_info->show_title="false";
	if(!$addon_info->opacity) $addon_info->opacity=".8";
	if(!$addon_info->theme) $addon_info->theme="pp_default";

	if(!$addon_info->noWidth) $addon_info->noWidth="100";
	if(!$addon_info->noHeight) $addon_info->noHeight="100";

	if(!$addon_info->iframeWidth) $addon_info->iframeWidth="100%";
	if(!$addon_info->iframeHeight) $addon_info->iframeHeight="100%";
	if(!$addon_info->linkStyle) $addon_info->linkStyle="pp_i1";
	if(!$addon_info->linkViewer) $addon_info->linkViewer="1";

	$prettyphoto="
<script type=\"text/javascript\">//<![CDATA[
var slideshow0 = $addon_info->slideshow;
var autoplay_slideshow0 = $addon_info->auto_slide;
var opacity0 = $addon_info->opacity;
var show_title0 = $addon_info->show_title;
var theme0 = '$addon_info->theme';
var noWidth = $addon_info->noWidth;
var noHeight = $addon_info->noHeight;
var iframeWidth = '$addon_info->iframeWidth';
var iframeHeight = '$addon_info->iframeHeight';
var linkStyle = '$addon_info->linkStyle';
var linkMixed = '$addon_info->linkMixed';
var ifLink = '$addon_info->ifLink';
var ifLinkViewer = '$addon_info->linkViewer';
//]]></script>
		";
	Context::addHtmlFooter($prettyphoto);
}
?>