jQuery(function($){
// Extra Form
	var ex = $('.bd .exForm');
	ex.find('input[type=text]').addClass('itx');
	ex.find('input[type=button]').addClass('bd_btn');

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