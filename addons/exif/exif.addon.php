<?php
if(!defined("__ZBXE__")) exit();

if($called_position!="before_display_content") return;

// applying to only board module 
$oBoardView = &getView('board');
if(Context::getResponseMethod() == "XMLRPC" || Context::getRequestMethod() == 'XMLRPC' || ($oBoardView->act != 'dispBoardContent' )) return;

if(!$addon_info->display) Context::addCssFile('./addons/exif/css/exif.css');
if($addon_info->display=='2') Context::addCssFile('./addons/exif/css/exif2.css');
if($addon_info->display=='3'){
	Context::addCssFile('./addons/exif/css/exif3.css');
} else {
	Context::addJsFile('./addons/exif/js/exif.js', false ,'', null, 'body');
};

require_once("exif.lib.php");

// call getImageExif() with retrieved image path
$pattern_image_tag = "/<img(.*?)(src=\"[^\040]*)(files\/attach\/images\/[^\"]+)+([^>]*?)(>)+/i";
$pattern_documents_area = '/<!--BeforeDocument\([0-9]+,[0-9]+\)-->.+<!--AfterDocument\([0-9]+,[0-9]+\)-->/is';
$output = preg_replace_callback($pattern_documents_area,create_function('$matches',"return preg_replace_callback('$pattern_image_tag', 'getExifData', \$matches[0]);"),
        $output);
?>