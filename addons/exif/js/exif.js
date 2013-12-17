function exifAddon(){
jQuery(function($){
	$('div.xe_content img').hover(function(){
		var t = $(this);
		var tT = t.position().top;
		var tL = t.position().left;
		if(t.next('span.exif_addon').length){
			t.next().css({top:tT,left:tL}).show()
		} else if(t.parent('a').next('span.exif_addon').length){
			t.parent('a').next('span.exif_addon').css({top:tT,left:tL}).show()
		}
	},function(){
		var t = $(this);
		if(t.next('span.exif_addon').length){
			t.next().hide()
		} else if(t.parent('a').next('span.exif_addon').length){
			t.parent('a').next().hide()
		}
	});

	$('.exif_gps').click(function(){
		var url = $(this).find('sub').attr('title');
		window.open('http://maps.google.com/maps?q='+url+'','_blank')
	});
})
};
exifAddon();