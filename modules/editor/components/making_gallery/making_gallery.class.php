<?php
    /**
     * @class  making_gallery
     * @author NHN (developers@xpressengine.com)
     * @brief  업로드된 이미지로 이미지갤러리를 만듬
     **/
    class making_gallery extends EditorHandler { 
        // editor_sequence 는 에디터에서 필수로 달고 다녀야 함....
        var $editor_sequence = 0;
        var $component_path = '';
        /**
         * @brief editor_sequence과 컴포넌트의 경로를 받음
         **/
        function making_gallery($editor_sequence, $component_path) {
            $this->editor_sequence = $editor_sequence;
            $this->component_path = $component_path;
        }
        /**
         * @brief popup window요청시 popup window에 출력할 내용을 추가하면 된다
         **/
        function getPopupContent() {
            // 템플릿을 미리 컴파일해서 컴파일된 소스를 return
            $tpl_path = $this->component_path.'tpl';
            $tpl_file = 'popup.html';
            Context::set("tpl_path", $tpl_path);
            $oTemplate = &TemplateHandler::getInstance();
            return $oTemplate->compile($tpl_path, $tpl_file);
        }
        /**
         * @brief 에디터 컴포넌트가 별도의 고유 코드를 이용한다면 그 코드를 html로 변경하여 주는 method
         *
         * 이미지나 멀티미디어, 설문등 고유 코드가 필요한 에디터 컴포넌트는 고유코드를 내용에 추가하고 나서
         * DocumentModule::transContent() 에서 해당 컴포넌트의 transHtml() method를 호출하여 고유코드를 html로 변경
         **/
        function transHTML($xml_obj) {
            $gallery_info->srl = rand(111111,999999);
			$gallery_info->gall_style = $xml_obj->attrs->gall_style;
            $gallery_info->width = $xml_obj->attrs->width;
            $gallery_info->height = $xml_obj->attrs->height;
            $gallery_info->div_align = $xml_obj->attrs->div_align;
            $gallery_info->div_margin = $xml_obj->attrs->div_margin;
            $gallery_info->div_padding = $xml_obj->attrs->div_padding;
            $gallery_info->div_bg_color = $xml_obj->attrs->div_bg_color;
            $gallery_info->div_border_width = $xml_obj->attrs->div_border_width;
			$gallery_info->div_border_style = $xml_obj->attrs->div_border_style;
			$gallery_info->div_border_color = $xml_obj->attrs->div_border_color;
			$gallery_info->img_align = $xml_obj->attrs->img_align;
			$gallery_info->img_width = $xml_obj->attrs->img_width;
			$gallery_info->img_height = $xml_obj->attrs->img_height;
			$gallery_info->img_margin = $xml_obj->attrs->img_margin;
			$gallery_info->img_padding = $xml_obj->attrs->img_padding;
            $gallery_info->img_bg_color = $xml_obj->attrs->img_bg_color;
            $gallery_info->img_border_width = $xml_obj->attrs->img_border_width;
			$gallery_info->img_border_style = $xml_obj->attrs->img_border_style;
			$gallery_info->img_border_color = $xml_obj->attrs->img_border_color;
			$gallery_info->img_border_radius = $xml_obj->attrs->img_border_radius;
			$gallery_info->img_shadow_hori = $xml_obj->attrs->img_shadow_hori;
			$gallery_info->img_shadow_vertical = $xml_obj->attrs->img_shadow_vertical;
			$gallery_info->img_shadow_width = $xml_obj->attrs->img_shadow_width;
			$gallery_info->img_shadow_color = $xml_obj->attrs->img_shadow_color;
			$gallery_info->img_rotate = $xml_obj->attrs->img_rotate;
			$gallery_info->preset = $xml_obj->attrs->preset;
			$gallery_info->slide_effect = $xml_obj->attrs->slide_effect;
            $images_list = $xml_obj->attrs->images_list;
            $images_list = preg_replace('/\.(gif|jpg|jpeg|png) /i',".\\1\n",$images_list);
            $gallery_info->images_list = explode("\n",trim($images_list));

            // HTML 출력일 경우 템플릿 변환을 거쳐서 갤러리 출력 설정에 맞는 html코드를 생성하도록 함
            preg_match_all('/(width|height)([^[:digit:]]+)([0-9]+)/i',$xml_obj->attrs->style,$matches);

            Context::set('gallery_info', $gallery_info);

            $tpl_path = $this->component_path.'tpl';
            Context::set("tpl_path", $tpl_path);
			
			if($gallery_info->gall_style == "slide") $tpl_file = 'slide.html';
			else $tpl_file = 'list.html';

            $oTemplate = &TemplateHandler::getInstance();
            return $oTemplate->compile($tpl_path, $tpl_file);
        }
    }
?>