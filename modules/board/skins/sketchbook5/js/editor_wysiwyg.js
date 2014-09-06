function frmSubmit(){
	jQuery('#ff input[name=content]').val(jQuery('#editor').html());
	var frm = document.getElementById('ff');
	procFilter(frm, insert);
	jQuery('#frmSubmit').attr('disabled','disabled');
}

function insert_file(file_srl){
	var t = jQuery('#file_'+file_srl);
	var type = t.find('button').attr('data-type');
	if(type=='img'){
		var a = '<p><img src="'+t.find('button').attr('data-file')+'" alt="'+t.find('button').attr('title')+'" /></p>';
	} else if(type=='music'){
		var a = '<p><audio src="'+t.find('button').attr('data-file')+'" controls="controls">Your browser does not support this file type. You can download <a href="'+t.find('button').attr('data-dnld')+'" style="text-decoration:underline">'+t.find('small').text()+'</a> and play it!</audio></p>';
	} else if(type=='media'){
		var a = '<p><video src="'+t.find('button').attr('data-file')+'" controls="controls">Your browser does not support this file type. You can download <a href="'+t.find('button').attr('data-dnld')+'" style="text-decoration:underline">'+t.find('small').text()+'</a> and play it!</video></p>';
	} else {
		var a = '<p><a href="'+t.find('button').attr('data-dnld')+'" style="text-decoration:underline">'+t.find('small').text()+'</a></p>';
	};
	jQuery('#inserthtml').val(a).change();
}

jQuery(function($){
	var o = $('#editor');
	var v = o.parents('form').find('input[name=content]').val();
	if(v) o.html(v);
	o.wysiwyg();
	$('#mEditorSelect').click(function(){
		var t = $(this);
		if(t.hasClass('on')){
			$('#files>.success').removeClass('select');
		} else {
			$('#files>.success').addClass('select');
		};
		t.toggleClass('on');
	});
	$('#mEditorInsert').click(function(){
		$('#files>.select .insert_file').each(function(){
			$(this).click();
		});
	});
	$('#mEditorDelete').click(function(){
		var m = window.confirm(lang_confirm_delete);
		if(!m) return false;
		$('#files>.select').each(function(){
			delete_file($(this).attr('id').split('file_')[1],'N');
		});
	});
});