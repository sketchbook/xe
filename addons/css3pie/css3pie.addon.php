<?php
    if(!defined("__XE__")) exit();
    if($called_position == 'before_display_content' && Context::get('module') != 'admin') {
        $css3pie="
<style type=\"text/css\"> 
.css3pie{behavior:url(addons/css3pie/PIE.htc)}
</style>
		";
        Context::addHtmlHeader($css3pie);
    }
?>