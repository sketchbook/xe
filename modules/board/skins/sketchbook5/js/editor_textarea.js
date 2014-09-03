function frmSubmit(){
	var a = '';
	var b = jQuery('#nText');
	var c = b.val();
	c = c.replace(/(\r\n|\n)/g, "<br>");
	if(jQuery('#files .select').length){
		jQuery('#files .select').each(function(){
			var type = jQuery(this).find('button').attr('data-type');
			if(type=='img'){
				a = a+'<p><img src="'+jQuery(this).find('button').attr('data-file')+'" alt="'+jQuery(this).find('button').attr('title')+'" /></p>';
				a = a.replace('/modules/board/skins/sketchbook5/','');
				a = a.replace('/modules/board/m.skins/sketchbook5/','');
			} else if(type=='music'){
				a = a+'<div><audio src="'+jQuery(this).find('button').attr('data-file')+'" controls="controls">Your browser does not support this file type. You can download <a href="'+jQuery(this).find('button').attr('data-dnld')+'" style="text-decoration:underline">'+jQuery(this).find('small').text()+'</a> and play it!</audio></div>';
			} else if(type=='media'){
				a = a+'<div><video src="'+jQuery(this).find('button').attr('data-file')+'" controls="controls">Your browser does not support this file type. You can download <a href="'+jQuery(this).find('button').attr('data-dnld')+'" style="text-decoration:underline">'+jQuery(this).find('small').text()+'</a> and play it!</video></div>';
			} else {
				a = a+'<p><a href="'+jQuery(this).find('button').attr('data-dnld')+'" style="text-decoration:underline">'+jQuery(this).find('small').text()+'</a></p>';
			};
		});
		if(jQuery('#m_img_upoad_2:checked').length){
			c = c+a;
		} else {
			c = a+c;
		};
	};
	jQuery('#ff input[name=content]').val(c);
	var frm = document.getElementById('ff');
	procFilter(frm, insert);
	jQuery('#frmSubmit').attr('disabled','disabled');
}

jQuery(function($){
	$('#nText').html($('#ff input[name=content]').val().replace(/<br([^>]*)>/ig,"\n"));
});