// Viewer Prev-Next
function viewerPrevNext(){
	jQuery('.bd_rd_prev .wrp').imagesLoaded(function(){
		var t = jQuery('.bd_rd_prev .wrp');
		t.css('margin-top',-t.height()/2+50);
	});
	jQuery('.bd_rd_next .wrp').imagesLoaded(function(){
		var t = jQuery('.bd_rd_next .wrp');
		t.css('margin-top',-t.height()/2+50);
	});
};

// Viewer List
function viewerList(){
	var v = jQuery('#viewer_lst');
	v.find('#viewer_lst_tg').click(function(){
		if(v.hasClass('open')){
			v.animate({left:-455},{duration:750,specialEasing:{left:'easeInOutBack'},complete:function(){
				jQuery(this).removeClass('open');
			},step:null,queue:false});
			jQuery.removeCookie('viewer_lst_cookie');
		} else {
			v.animate({left:-100},{duration:500,specialEasing:{left:'easeOutBack'}}).addClass('open');
			jQuery.cookie('viewer_lst_cookie','open');
		};
	});
	v.find('#viewer_lst_scroll').height(v.height()-132).imagesLoaded(function(){
		v.find('#viewer_lst_scroll').mCustomScrollbar({
			mouseWheelPixels:240,
			scrollButtons:{
				enable:true
			}
		});
	});
};

jQuery(function($){
	viewerPrevNext();
	viewerList();
});

jQuery(window).resize(function(){
	jQuery('#viewer_lst_scroll').height(jQuery('#viewer_lst').height()-132).mCustomScrollbar('update');
});