jQuery(function($){
// Extra Form
	var ex = $('.bd .exForm');
	ex.find('input[type=text]').addClass('itx');
	ex.find('input[type=button]').addClass('bd_btn');
	// Zip code
	var exAdd = $('.bd .exForm input.address').parents('tr');
	exAdd.addClass('exAddress');
	exAdd.find('a').each(function(){
		$(this).addClass('btn').text($(this).find('span').text())
	});
	exAdd.find('input[name^=addr_search]').parent().addClass('itx_wrp');
	exAdd.find('input[name^=addr_search]').each(function(){
		var id = $(this).attr('name')+'_';
		$(this).addClass('ex_srch_itx').attr('id',id).before('<label for="'+id+'" style="top:5px">'+msg_kr_address+'</label>')
	});
	exAdd.find('input[type=text]:last').each(function(){
		var id = $(this).attr('name')+'_';
		$(this).attr('id',id).wrap('<div class="itx_wrp"></div>').before('<label for="'+id+'" style="top:6px">'+msg_kr_address_etc+'</label>')
	});
	exAdd.find('div[id^=addr_searched]').find('input').addClass('ex_srch_itx');

// Form Label Overlapping
	var overlapLabel = $('.bd .itx_wrp').find('>:text,>:password,>textarea').prev('label');
	overlapLabel.next(':text,:password,textarea')
		.focus(function(){
			$(this).prev(overlapLabel).css('visibility','hidden');
		})
		.blur(function(){
			if($(this).val()==''){
				$(this).prev(overlapLabel).css('visibility','visible');
			} else {
				$(this).prev(overlapLabel).css('visibility','hidden');
			}
		})
		.change(function(){
			if($(this).val()==''){
				$(this).prev(overlapLabel).css('visibility','visible');
			} else {
				$(this).prev(overlapLabel).css('visibility','hidden');
			}
		})
		.blur();

// ColorPicker
	$('.jPicker .Icon').live('mousedown',function(){
		$('#title_color').prev().css('visibility','hidden')
	});
	$('.jPicker.Container .Button input').live('mousedown',function(){
		$('#title_color').prev().click();
	});
	$('.bd_wrt input[type=submit]').click(function(){
		var t = $('#title_color');
		if(!t.length) return;
		t.val(t.val().replace('#',''));
		if(t.val()=='transparent') t.val('');
	});
});