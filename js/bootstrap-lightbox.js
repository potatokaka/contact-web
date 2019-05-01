/*!
* bootstrap-lightbox.js v0.6.1 
* Copyright 2013 Jason Butz
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function ($) {
	"use strict";


/* LIGHTBOX CLASS DEFINITION
 * ========================= */

	var Lightbox = function (element, options)
	{
		this.options = options;
		this.$element = $(element)
			.delegate('[data-dismiss="lightbox"]', 'click.dismiss.lightbox', $.proxy(this.hide, this));

		this.options.remote && this.$element.find('.lightbox-body').load(this.options.remote);

	}

	// We depend upon Twitter Bootstrap's Modal library to simplify things here
	Lightbox.prototype = $.extend({},$.fn.modal.Constructor.prototype);

	Lightbox.prototype.constructor = Lightbox;

	// We can't use Modal for this, it depends upon a class
	Lightbox.prototype.enforceFocus = function ()
	{
		var that = this;
		$(document).on('focusin.lightbox', function (e)
		{
			if (that.$element[0] !== e.target && !that.$element.has(e.target).length)
			{
				that.$element.focus();
			}
		});
	};

	// We have to have a copy of this since we are tweaking it a bit
	Lightbox.prototype.show = function()
	{
		
	};

    // This references a class as well
    Lightbox.prototype.escape = function()
	{
		
	}

	Lightbox.prototype.preloadSize = function(callback)
	{
		
	};

/* LIGHTBOX PLUGIN DEFINITION
 * ======================= */

	var old = $.fn.lightbox;

	$.fn.lightbox = function (option)
	{
		return this.each(function ()
		{
			var $this   = $(this);
			var data    = $this.data('lightbox');
			var options = $.extend({}, $.fn.lightbox.defaults, $this.data(), typeof option == 'object' && option);
			if (!data) $this.data('lightbox', (data = new Lightbox(this, options)));

			if (typeof option == 'string')
				data[option]();
			else if (options.show)
				data.show();
		});
	};

	$.fn.lightbox.defaults = {
		backdrop: true,
		keyboard: true,
		show: true
	};

	$.fn.lightbox.Constructor = Lightbox;

/* LIGHTBOX NO CONFLICT
  * ================= */

  $.fn.lightbox.noConflict = function () {
	$.fn.lightbox = old;
	return this;
  }


/* LIGHTBOX DATA-API
 * ================== */

	$(document).on('click.lightbox.data-api', '[data-toggle*="lightbox"]', function (e)
	{
		var $this = $(this);
		var href  = $this.attr('href');
		var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); //strip for ie7
		var option = $target.data('lightbox') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data());
		var type = $(this).data('type');

		if(type == "video"){
			if($(window).width() > 991){
				e.preventDefault();

				if(type == "video"){
					var videoID = youtube_parser(href);
					$target.find(".embed-responsive").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoID + '?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
				}

				$target.removeClass('hide').addClass('in');
				$target.lightbox(option);
			}
		}else{
			e.preventDefault();
			$("body").addClass('hidebar');
			$target.removeClass('hide').addClass('in');
			$target.lightbox(option);
		}
	})

	$(document).on('click', '.close', function(event) {
		event.preventDefault();
		
		var $target = $(this).attr("href");
		if($($target).find("iframe").length > 0){
			$($target).find("iframe").remove();
		}
		$("body").removeClass('hidebar');
		$($target).addClass('hide').removeClass('in');
	});

	function youtube_parser(url){
	    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	    var match = url.match(regExp);
	    return (match&&match[7].length==11)? match[7] : false;
	}
}(window.jQuery);
