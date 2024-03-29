/* 
	jQuery Slideshow by eric hynds 
	
	- just a simple fade in/out script, nothing fancy.
	- five public methods: stop, start, next, prev, isRunning
	- displays captions as an overlay using RGBA or opacity, if a caption exists.
	- if the images are wrapped in an anchor element, both the image and caption will be linked in the slideshow
*/

(function($){
	
	$.fn.slideshow = function( opts, value ){
		if(!this.length){ return this; }
		
		// is this a method call?
		if(typeof opts === "string"){
			// prevent access to "private" methods (prefixed with "_")
			return opts.substring(0,1) === "_" ? this : this.data("slideshow")[opts](value);
		}
		
		return this.each(function(){
			var $this = $(this);
			return !$this.data("slideshow") && $this.data("slideshow", new Slideshow(this, opts));
		});
	};

	// default options
	$.fn.slideshow.options = {
		delay: 6000,
		speed: 1000,
		controls: true,
		onChange: $.noop
	};
	
	// detects rgba support
	var hasRGBA = (function(){
		var el = $("<div></div>").addClass("jq-slideshow-rgba"), prop = el.css("background-color");
		return prop && prop.indexOf("rgba") !== -1;
	})();
	
	function Slideshow( container, options ){
		this.options = $.extend({}, $.fn.slideshow.options, options);
		this.current = 0;
		this.isRunning = false;
		this.container = container;
		var self = this;
		
		// wrap the images in a container, and return the wrapped elements
		this.elements = $(container).addClass("jq-slideshow").children().map(function(){
			var $this = $(this),
				title = this.getAttribute("title"),
				$item = $this.wrap('<div class="jq-slideshow-item"></div>');
			
			// add title?
			if(title || self.options.controls){
				var $title = $item.after('<div class="jq-slideshow-title"><p>' + (title || "&nbsp;") + '</p></div>').next();
				
				// use either rgba or opacity
				$title.addClass( 'jq-slideshow-' + (hasRGBA ? 'rgba' : 'opacity') );
				
				// if the item is an anchor, link up the title as well
				if( $item.is("a") ){
					$title.children().wrapInner('<a href="'+$item[0].href+'"></a>');
				}
			}
			
			return $item.parent().get();
		});
		
		// build in some controls
		if( this.options.controls ){
			var controls = [];
			
			controls.push('<div class="jq-slideshow-controls">');
			controls.push('<a href="#" class="jq-slideshow-prev"></a>');
			controls.push('<a href="#" class="jq-slideshow-stop"></a>');
			controls.push('<a href="#" class="jq-slideshow-start" style="display:none"></a>');
			controls.push('<a href="#" class="jq-slideshow-next"></a>');
			controls.push('</div>');
			
			this.elements.find(".jq-slideshow-title").append(controls.join(''));
		
			$(".jq-slideshow-controls a", container).bind("click", function(){
				var action = this.className.split("-")[2];
			
				// fire off the actual action
				self[ action ]();
			
				// play/pause toggle
				if( action === "stop" || action === "start"){
					$(".jq-slideshow-start", container)[ action === "stop" ? "show" : "hide" ]();
					$(".jq-slideshow-stop", container)[ action === "stop" ? "hide" : "show" ]();
				}
			
				return false;
			});
		}
		
		this.elements.not(":first").hide(); // hide all but the first
		this.start(); // start this thing...
	}
	
	Slideshow.prototype = {
		_fade: function( method ){
			this.elements.eq( this.current )[ "fade"+method ](this.options.speed);
		},
		
		_move: function( number ){
			this._fade("Out");
			this.current += number;
			
			// at the beginning/end?
			if( !this.elements.eq(this.current).length ){
				this.current = (number > 0)
					? 0
					: ((Math.abs(number) === this.elements.length) ? this.elements.length : number);
			}
			
			// fade in the currently queued img
			this._fade("In");
			
			// fire onchange callback
			this.options.onChange.call(this.container, this.current+1);
		},
		
		// public methds
		isRunning: function(){
			return this.isRunning;
		},
		
		next: function( number ){
			this._move( number || 1 );
		},
		
		prev: function( number ){
			this._move( number || -1 );
		},
		
		move: function( number ){
			number--;
			
			// as long as we're not trying to move to the current slide... 
			if( this.current !== number ){
				this.stop();
				this._fade("Out");
				this.current = number;
				this._fade("In");
				this.start();
				
				// fire onchange callback
				this.options.onChange.call(this.container, this.current+1);
			}
		},
		
		start: function(){
			var self = this;
			
			// bail if already running
			if(this.running){
				return;
			}
			
			this.running = true;
			this.id = window.setInterval(function(){ 
				self.next();
			}, this.options.delay);
		},
		
		stop: function(){
			this.running = false;
			window.clearInterval( this.id );
		}
	};
	
})(jQuery);
