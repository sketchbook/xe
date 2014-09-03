// ajaxFileUpload
function ajaxFileUpload(){
	jQuery("#loading").ajaxStart(function(){
		jQuery(this).show();
	})
	.ajaxComplete(function(){
		jQuery(this).hide();
		IsUploadFiles();
	});

	jQuery.ajaxFileUpload({
		url:'index.php?&act=procFileIframeUpload',
		secureuri:false,
		fileElementId:'Filedata',
		dataType:'html',
		data:{
			mid:current_mid,
			editor_sequence: '1',
			uploadTargetSrl: jQuery('#ff input[name=document_srl]').val(),
			manual_insert: 'true'
			},
		success:function(frameId, data, status){
			var frm = document.getElementById('ff');
			var io = document.getElementById(frameId);			
			if(io.contentWindow){
				var sourceFile = document.getElementById(frameId).contentWindow.uploaded_fileinfo.source_filename;
				var uploadFile = document.getElementById(frameId).contentWindow.uploaded_fileinfo.uploaded_filename;
				var document_srl = document.getElementById(frameId).contentWindow.uploaded_fileinfo.upload_target_srl;				
				var file_srl = document.getElementById(frameId).contentWindow.uploaded_fileinfo.file_srl;
				var sid = document.getElementById(frameId).contentWindow.uploaded_fileinfo.sid;
			} else if(io.contentDocument){
				var sourceFile = document.getElementById(frameId).contentDocument.uploaded_fileinfo.source_filename;
				var uploadFile = document.getElementById(frameId).contentDocument.uploaded_fileinfo.uploaded_filename;
				var document_srl = document.getElementById(frameId).contentDocument.uploaded_fileinfo.upload_target_srl;									
				var file_srl = document.getElementById(frameId).contentDocument.uploaded_fileinfo.file_srl;
				var sid = document.getElementById(frameId).contentDocument.uploaded_fileinfo.sid;
			}
			frm.document_srl.value = document_srl;

			// Source from xeed
			ext = (match = uploadFile.match(/\.([a-z0-9]+)$/i))?match[1]||'':'';
			ext = ext.toLowerCase();
			if(allowedFileTypes!='*.*' && jQuery.inArray('*.'+ext, allowedFileTypes.split(';')) < 0){
				alert('File is not an allowed file type.');
				return false;
			};
			if(jQuery.inArray(ext, 'gif jpg jpeg png'.split(' ')) > -1) type = 'img';
			else if(jQuery.inArray(ext, 'mp3 wma wav ogg aac flac'.split(' ')) > -1) type = 'music';
			else if(jQuery.inArray(ext, 'avi mov mp4 mkv ogv webm'.split(' ')) > -1) type = 'media';
			else type = 'etc';

			if(uploadFile!=""){
				if(type=='img'){
					var insertTag = '<li id="file_'+file_srl+'" class="success"><button type="button" style="background-image:url('+uploadFile+')" data-file="'+uploadFile+'" data-type="'+type+'" onclick="jQuery(this).parent().toggleClass(\'select\')" title="'+sourceFile+'"><b>✔</b></button><a class="delete_file" href="#" onclick="delete_file('+file_srl+');return false;"><b>X</b></a><a class="insert_file" href="#" onclick="insert_file('+file_srl+');return false"><i class="fa fa-arrow-up"></i></a></li>';
				} else {
					var insertTag = '<li id="file_'+file_srl+'" class="success type2 '+type+'"><small>'+sourceFile+'</small><button type="button" data-file="'+uploadFile+'" data-type="'+type+'" data-dnld="?module=file&act=procFileDownload&file_srl='+file_srl+'&sid='+sid+'" onclick="jQuery(this).parent().toggleClass(\'select\')"><b>✔</b></button><a class="delete_file" href="#" onclick="delete_file('+file_srl+');return false"><b>X</b></a><a class="insert_file" href="#" onclick="insert_file('+file_srl+');return false"><i class="fa fa-arrow-up"></i></a></li>';
				};
				jQuery('#loading').before(insertTag);
			} else {
				jQuery('#loading').before('<li class="error">Error</li>');
			}
			if(typeof(data.error)!='undefined'){
				if(data.error!=''){
					alert(data.error);
				} else {
					alert(data.msg);
				};
			};
		},
		error: function (data, status, e){
			alert(e);
		}
	});
}

function delete_file(file_srl,if_msg){
	if(!if_msg) var msg = window.confirm(lang_confirm_delete);
	if(msg || if_msg){
		var settings = file_srl;
		var params = new Array();
		params["editor_sequence"] = 1;
		params["file_srls"]  = file_srl;
		var response_tags = new Array("error","message");
		exec_xml("file","procFileDelete", params, function(){
			jQuery("#file_"+settings).remove();
			IsUploadFiles();
		});
	} else {
		return false;
	};
}

function IsUploadFiles(){
	if(jQuery('#files .success').length){
		jQuery('#mUpload .info').addClass('is_img');
	} else {
		jQuery('#mUpload .info').removeClass('is_img');
		jQuery('#mEditorSelect').removeClass('on');
	}
}

jQuery(function($){
	$('#FiledataWrp').on('change','#Filedata',function(){
		ajaxFileUpload();
	});
});