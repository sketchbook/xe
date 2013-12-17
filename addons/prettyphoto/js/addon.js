function ppAddon(){
	var xe_content = jQuery('div.xe_content');
	xe_content.find('img').imagesLoaded(function(){
		jQuery(this).each(function(){
			var t = jQuery(this);
			var w = t.width();
			var h = t.height();
			if(w >= t.parent().width()) t.removeAttr('width').removeAttr('height').css('height','auto');
			if(w>noWidth && h>noHeight && !t.hasClass('no_pp') && !t.parents().hasClass('no_pp')){
				if(!t.parent('a').length) t.wrap('<a href="'+t.attr('src')+'" rel="prettyPhoto[mixed]"></a>');
				if(t.parent('a').length && !ifLink) t.parent('a').attr({rel:'prettyPhoto[mixed]',href:''+t.attr('src')+''})
			}
		});
		xe_content.find("a[rel^='prettyPhoto']").prettyPhoto({
			slideshow:slideshow0,
			autoplay_slideshow:autoplay_slideshow0,
			opacity:opacity0,
			show_title: show_title0,
			theme:theme0,
			social_tools:false
		})
	})
};
function ppAddonIframe(){
	jQuery('div.xe_content a').each(function(){
		var t = jQuery(this);
		if(!t.find('>img').length && !t.parent().hasClass('document_popup_menu')){
			t.wrap('<span class="pp_i '+linkStyle+'"></span>').after('<a class="pp_btn bg_color" href="'+t.attr('href')+'?iframe=true&width='+iframeWidth+'&height='+iframeHeight+'" rel="prettyPhoto['+linkMixed+']" ><b>Viewer</b></a>');
		}
	})
};

jQuery(function($){
	ppAddon();
	if(ifLinkViewer==1) ppAddonIframe();
});

/*!
 * jQuery imagesLoaded plugin v2.0.1
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */
 (function(c,n){var k="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(l){function m(){var b=c(h),a=c(g);d&&(g.length?d.reject(e,b,a):d.resolve(e));c.isFunction(l)&&l.call(f,e,b,a)}function i(b,a){b.src===k||-1!==c.inArray(b,j)||(j.push(b),a?g.push(b):h.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(h),c(g)]),e.length===j.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var f=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=f.find("img").add(f.filter("img")),j=[],h=[],g=[];e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){i(b.target,"error"===b.type)}).each(function(b,a){var e=a.src,d=c.data(a,"imagesLoaded");if(d&&d.src===e)i(a,d.isBroken);else if(a.complete&&a.naturalWidth!==n)i(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=k,a.src=e}):m();return d?d.promise(f):f}})(jQuery);