// Sticky Note
jQuery(function($){
	var p = $('div.wgt_sticky_note');
	var o = p.find('div.wgt_sticky_note_itm');
	p.parent().parent().addClass('wgt_sticky_note_wrp');
    function cloud(){
		o.each(function(){
			var t = $(this)
			var m = Math.floor(Math.random()*40-20);
			t.css({
				top:Math.floor(Math.random()*(p.height()-300)),
				left:Math.floor(Math.random()*(p.width()-250)),
				'msTransform':'rotate('+m+'deg)',
				'-moz-transform':'rotate('+m+'deg)',
				'-webkit-transform':'rotate('+m+'deg)'
			});
		});
    };
	cloud();
	o.fadeIn(200);
	p.find('button.wgt_sticky_note_btn').click(cloud);
	$(window).resize(cloud);

	counts = [ 11 ];
	$('div.wgt_sticky_note_itm').draggable({
		containment:"document",
		start: function(){
			$(this).css('zIndex',counts[ 0 ]++);
		}
	});
});

// Prev-Next
function content_widget_next(obj,list_per_page){
    var page = 1;
    if(obj.is('ul')) {
        var list = jQuery('>li',obj);
    }
    var total_page = parseInt((list.size()-1) / list_per_page,10)+1;
    list.each(function(i){
        if(jQuery(this).css('display') !='none'){
            page = parseInt((i+1)/list_per_page,10)+1;
            return false;
        }
    });
    if(total_page <= page) return;
    list.each(function(i){
        if( (page* list_per_page) <= i && ((page+1) * list_per_page) > i){
            jQuery(this).fadeIn();
        }else{
            jQuery(this).hide();
        }
    });
}
function content_widget_prev(obj,list_per_page){
    var page = 1;
    if(obj.is('ul')){
        var list = jQuery('>li',obj);
    }
    var total_page = parseInt((list.size()-1) / list_per_page,10)+1;
    list.each(function(i){
        if(jQuery(this).css('display') !='none'){
            page = parseInt((i+1)/list_per_page,10)+1;
            return false;
        }
    });
    if(page <= 1) return;
    list.each(function(i){
        if( ((page-2)* list_per_page)<= i && ((page-1) * list_per_page) > i){
            jQuery(this).fadeIn();
        }else{
            jQuery(this).hide();
        }
    });
}