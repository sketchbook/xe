<?php
/**
 * @classmultimedia
 * @author misol(김민수) <misol@korea.ac.kr>
 * @brief유투브 비디오 검색 컴포넌트
 * Copyright (C) Kim,Min-Soo.
 * 사용에 제한을 두지 않습니다.
 * You can use this free.
 **/
class multimedia extends EditorHandler {
	var $editor_sequence = '0';
	var $component_path = '';

	function multimedia($editor_sequence, $component_path) {
		$this->editor_sequence = $editor_sequence;
		$this->component_path = $component_path;
	}

	function soo_search() {
		$soo_display_set=trim($this->soo_display);
		$q_sort = urlencode(trim(Context::get('q_sort')));
		$query = urlencode(trim(Context::get('query')));
		$soo_result_start = urlencode(Context::get('soo_result_start'));

		if(!$soo_display_set) $soo_display_set='20';
		if(!$soo_result_start) $soo_result_start='1';
		$uri = sprintf('http://gdata.youtube.com/feeds/api/videos?q=%s&start-index=%s&max-results=%s&orderby=%s&v=2&alt=rss',$query, $soo_result_start, $soo_display_set, $q_sort);

		$rss = '';
		$rss = FileHandler::getRemoteResource($uri, null, 3, 'GET', 'application/xml');

		$rss = preg_replace("/<\?xml([.^>]*)\?>/i", "", $rss);

		$oXmlParser = new XmlParser();
		$xml_doc = $oXmlParser->parse($rss);

		$error_code = trim($xml_doc->errors->error->code->body);
		$error_message = trim($xml_doc->errors->error->internalreason->body);
		if($error_message) return new Object(-1, '::Youtube API Error::'."\n".$error_code."\n".$error_message);

		$total_result_no = trim($xml_doc->rss->channel->{'opensearch:totalresults'}->body);
		$soo_result_start = trim($xml_doc->rss->channel->{'opensearch:startindex'}->body);
		$soo_search_display = trim($xml_doc->rss->channel->{'opensearch:itemsperpage'}->body);

		if($total_result_no >= $soo_result_start+$soo_search_display) {
		$soo_next_page=$soo_result_start+$soo_display_set;
		} else {
			$soo_next_page="1";
		}
		if($soo_result_start!='1') {
			$soo_before_page=$soo_result_start-$soo_display_set;
		} else {
			$soo_before_page="1";
		}

		$soo_results = $xml_doc->rss->channel->item;
		if(!is_array($soo_results)) $soo_results = array($soo_results);

		$soo_results_count = count($soo_results);
		$soo_result_start_end = trim($soo_result_start.' - '.($soo_result_start+$soo_results_count-1));
		$soo_list = array();
		for($i=0;$i<$soo_results_count;$i++) {
			$item = $soo_results[$i];
			$item_images = $item->{'media:group'}->{'media:thumbnail'};
			if(!is_array($item_images)) $item_images = array($item_images);
			$item_published = explode('T',$item->{'media:group'}->{'yt:uploaded'}->body);
			$item_updated = explode('T',$item->{'atom:updated'}->body);
			$item_second = ($item->{'media:group'}->{'yt:duration'}->attrs->seconds%60);
			$item_minute = (intval($item->{'media:group'}->{'yt:duration'}->attrs->seconds/60))%60;
			$item_hour =intval((intval($item->{'media:group'}->{'yt:duration'}->attrs->seconds/60))/60);
			if(!is_array($item->{'media:group'}->{'media:content'})) $item->{'media:group'}->{'media:content'} = array($item->{'media:group'}->{'media:content'});
	
			$soo_list[] = sprintf("%s,[[soo]],%s,[[soo]],%s,[[soo]],%s,[[soo]],%s,[[soo]],%s,[[soo]],%s,[[soo]],%s,[[soo]],%s,[[soo]],%s,[[soo]],%s,[[soo]],%s",
			trim($item->title->body),
			trim($item->author->body),
			trim($item->{'media:group'}->{'media:content'}[0]->attrs->url),
			trim($item_images[1]->attrs->url),
			trim($item_published[0]),
			trim($item_updated[0]),
			trim($item_hour),
			trim($item_minute),
			trim($item_second),
			trim($item->{'yt:statistics'}->attrs->viewcount),
			trim($item->link->body),
			cut_str(trim($item->title->body),20));
		}

		$this->add("total_result_no", $total_result_no);
		$this->add("total", htmlspecialchars($rss));
		$this->add("soo_result_start", $soo_result_start);
		$this->add("soo_result_start_end", $soo_result_start_end);
		$this->add("result_list_bfpage", $soo_before_page);
		$this->add("result_list_nextpage", $soo_next_page);
		$this->add("result_list", implode("\n", $soo_list));
	}

	function getPopupContent() {
		$tpl_path = $this->component_path.'tpl';
		$tpl_file = 'popup.html';
		if(!$this->soo_design) $this->soo_design = 'habile';
		Context::set("tpl_path", $tpl_path);
		$oTemplate = &TemplateHandler::getInstance();
		return $oTemplate->compile($tpl_path, $tpl_file);
	}
	
	function transHTML($obj) {
		$type = $obj->attrs->type;
		$style = trim($obj->attrs->style).' ';
		preg_match('/width([ ]*):([ ]*)([0-9 a-z]+)(;| )/i', $style, $width_style);
		preg_match('/height([ ]*):([ ]*)([0-9 a-z]+)(;| )/i', $style, $height_style);
		if($width_style[3]) $width_style[3] = intval($width_style[3]);
		if($width_style[3]) $width = trim($width_style[3]);
		else $width = intval($obj->attrs->width);
		
		if($height_style[3]) $height_style[3] = intval($height_style[3]);
		if($height_style[3]) $height = trim($height_style[3]);
		else $height = intval($obj->attrs->height);
		$value = str_replace('/v/','/embed/',htmlspecialchars($obj->attrs->value));
		$percent = '%';

		$srl = rand(111111,999999);
		$src = $obj->attrs->src;
		$multimedia_src = $obj->attrs->multimedia_src;
		$auto_start = $obj->attrs->auto_start;
		if(!$auto_start) $auto_start = 'false';
		if($type == "file") return sprintf('<script type="text/javascript" src="./modules/editor/components/multimedia/tpl/js/jwplayer.js"></script><div id="jwplayer%s">Loading the player ...</div><script type="text/javascript"> jwplayer("jwplayer%s").setup({file: "%s"}); </script>', $srl, $srl,$multimedia_src);
		if($type == "youtube") return sprintf('<iframe width="%d" height="%d" style="max-width:100%s" src="%s" frameborder="0" allowfullscreen></iframe>', $width, $height, $percent, $value);
	}
}
?>