(function($) {
	$.fn.parallaxSlider = function(options) {
		var opts = $.extend({}, $.fn.parallaxSlider.defaults, options);
		return this.each(function() {
			var $yw_container 	= $(this),
			o 				= $.meta ? $.extend({}, opts, $yw_container.data()) : opts;
			
			//the main slider
			var $yw_slider		= $('.yw_slider',$yw_container),
			//the elements in the slider
			$elems			= $yw_slider.children(),
			//total number of elements
			total_elems		= $elems.length,
			//the navigation buttons
			$yw_next		= $('.yw_next',$yw_container),
			$yw_prev		= $('.yw_prev',$yw_container),
			//the bg images
			$yw_bg1		= $('.yw_bg1',$yw_container),
			$yw_bg2		= $('.yw_bg2',$yw_container),
			$yw_bg3		= $('.yw_bg3',$yw_container),
			$yw_bg4		= $('.yw_bg4',$yw_container),
			//current image
			current			= 0,
			//the thumbs container
			$yw_thumbnails = $('.yw_thumbnails',$yw_container),
			//the thumbs
			$thumbs			= $yw_thumbnails.children(),
			//the interval for the autoplay mode
			$navs = $('.navPoint li',$yw_container),

			slideshow,
			//the loading image
			$yw_loading	= $('.yw_loading',$yw_container),
			$yw_slider_wrapper = $('.yw_slider_wrapper',$yw_container);
			
				

			//first preload all the images
			var loaded		= 0,
			$images		= $yw_container.find('img');
				
			$images.each(function(){
				var $img	= $(this);
				$('<img/>').load(function(){
					++loaded;
					if(loaded	== total_elems*2){
						$yw_loading.hide();
						$yw_slider_wrapper.show();
							
						//one images width (assuming all images have the same sizes)
						var one_image_w		= $yw_slider.find('img:first').width();
				
						/*
						need to set width of the slider,
						of each one of its elements, and of the
						navigation buttons
						 */
						setWidths($yw_slider,
						$elems,
						total_elems,
						$yw_bg1,
						$yw_bg2,
						$yw_bg3,
						$yw_bg4,
						one_image_w,
						$yw_next,
						$yw_prev);
				
						/*
							set the width of the thumbs
							and spread them evenly
						 */
						
						var spaces	= 800/(total_elems+1);
						$thumbs.each(function(i){
							var $this 	= $(this);
							/* 
							var left	= spaces*(i+1) - $this.width()/2;
							$this.css('left',left+'px');
								
							if(o.thumbRotation){
								var angle 	= Math.floor(Math.random());
								$this.css({
									'-moz-transform'	: 'rotate('+ angle +'deg)',
									'-webkit-transform'	: 'rotate('+ angle +'deg)',
									'transform'			: 'rotate('+ angle +'deg)'
								});
							} */
							//hovering the thumbs animates them up and down
							$this.bind('click',function(){
								$(this).stop().animate({top:'-5px'},100);
							}).bind('mouseleave',function(){
								$(this).stop().animate({top:'0px'},100);
							});
						});
						//make the first thumb be selected
						highlight($thumbs.eq(0));
						point($navs.eq(0));
							
						//slide when clicking the navigation buttons
						$yw_next.bind('click',function(){
							++current;
							if(current >= total_elems)
								if(o.circular)
									current = 0;
							else{
								--current;
								return false;
							}
							highlight($thumbs.eq(current));
							slide(current,
							$yw_slider,
							$yw_bg4,
							$yw_bg3,
							$yw_bg2,
							$yw_bg1,
							o.speed,
							o.easing,
							o.easingBg);
						});
						$yw_prev.bind('click',function(){
							--current;
							if(current < 0)
								if(o.circular)
									current = total_elems - 1;
							else{
								++current;
								return false;
							}
							highlight($thumbs.eq(current));
							slide(current,
							$yw_slider,
							$yw_bg4,
							$yw_bg3,
							$yw_bg2,
							$yw_bg1,
							o.speed,
							o.easing,
							o.easingBg);
						});

				
						/*
						clicking a thumb will slide to the respective image
						 */
						$thumbs.bind('click',function(){                        
							var $thumb	= $(this);
							highlight($thumb);
							//if autoplay interrupt when user clicks
							if(o.auto)
								clearInterval(slideshow);
							current 	= $thumb.index();
							slide(current,
							$yw_slider,
							$yw_bg4,
							$yw_bg3,
							$yw_bg2,
							$yw_bg1,
							o.speed,
							o.easing,
							o.easingBg);
							point($navs.eq(current));

						});


						/*
						activate the autoplay mode if
						that option was specified
						 */
						if(o.auto != 0){
							o.circular	= true;
							slideshow	= setInterval(function(){
								$yw_next.trigger('click');
							},o.auto);
						}
				
						/*
						when resizing the window,
						we need to recalculate the widths of the
						slider elements, based on the new windows width.
						we need to slide again to the current one,
						since the left of the slider is no longer correct
						 */
						$(window).resize(function(){
							w_w	= $(window).width();
							setWidths($yw_slider,$elems,total_elems,$yw_bg1,$yw_bg2,$yw_bg3,$yw_bg4,one_image_w,$yw_next,$yw_prev);
							slide(current,
							$yw_slider,
							$yw_bg4,
							$yw_bg3,
							$yw_bg2,
							$yw_bg1,
							1,
							o.easing,
							o.easingBg);
						});

					}
				}).error(function(){
					//alert('here')
				}).attr('src',$img.attr('src'));
			});
				
				
		});
	};
	
	//the current windows width
	var w_w				= $(window).width();
	
	var slide			= function(current,
	$yw_slider,
	$yw_bg4,
	$yw_bg3,
	$yw_bg2,
	$yw_bg1,
	speed,
	easing,
	easingBg){
		var slide_to	= parseInt(-w_w * current);
		$yw_slider.stop().animate({
			left	: slide_to + 'px'
		},speed, easing);
		$yw_bg4.stop().animate({
			left	: slide_to/2 + 'px'
		},speed, easingBg);
		$yw_bg3.stop().animate({
			left	: slide_to/4 + 'px'
		},speed, easingBg);
		$yw_bg2.stop().animate({
			left	: slide_to/6 + 'px'
		},speed, easingBg);
		$yw_bg1.stop().animate({
			left	: slide_to/8 + 'px'
		},speed, easingBg);
	}
	
	var highlight		= function($elem){
		$elem.siblings().removeClass('selected');
		$elem.addClass('selected');
	}

	var point		= function($nav){
		$nav.siblings().removeClass('selected');
		$nav.addClass('selected');
	}
	
	var setWidths		= function($yw_slider,
	$elems,
	total_elems,
	$yw_bg1,
	$yw_bg2,
	$yw_bg3,
	$yw_bg4,
	one_image_w,
	$yw_next,
	$yw_prev){
		/*
		the width of the slider is the windows width
		times the total number of elements in the slider
		 */
		var yw_slider_w	= w_w * total_elems;
		$yw_slider.width(yw_slider_w + 'px');
		//each element will have a width = windows width
		$elems.width(w_w + 'px');
		/*
		we also set the width of each bg image div.
		The value is the same calculated for the yw_slider
		 */
		$yw_bg1.width(yw_slider_w + 'px');
		$yw_bg2.width(yw_slider_w + 'px');
		$yw_bg3.width(yw_slider_w + 'px');
		$yw_bg4.width(yw_slider_w + 'px');
		
		/*
		both the right and left of the
		navigation next and previous buttons will be:
		windowWidth/2 - imgWidth/2 + some margin (not to touch the image borders)
		 */
		var position_nav	= w_w/2 - one_image_w/2 + 3;
		$yw_next.css('right', position_nav + 'px');
		$yw_prev.css('left', position_nav + 'px');
	}
	
	$.fn.parallaxSlider.defaults = {
		auto			: 0,	//how many seconds to periodically slide the content.
								//If set to 0 then autoplay is turned off.
		speed			: 1000,//speed of each slide animation
		easing			: 'jswing',//easing effect for the slide animation
		easingBg		: 'jswing',//easing effect for the background animation
		circular		: true,//circular slider
		thumbRotation	: false//the thumbs will be randomly rotated
	};
	//easeInOutExpo,easeInBack
})(jQuery);			



function episodeTabchg(idName,nVar){
	var totimg = document.getElementById(idName).getElementsByTagName('dd');
	for(var i=1;i<=totimg.length;i++){
		document.getElementById(idName+i).style.display="none";
		document.getElementById(idName).getElementsByTagName('img')[i-1].src = "http://img.ndoors.com/webdata/yw/teaser/b_tab0"+i+".gif";
	}

		document.getElementById(idName+nVar).style.display="block";
		document.getElementById(idName).getElementsByTagName('img')[nVar-1].src = "http://img.ndoors.com/webdata/yw/teaser/b_tab0"+nVar+"_on.gif";
}

function departTabchg(idName,nVar){
	var totimg = document.getElementById(idName).getElementsByTagName('dd');
	for(var i=1;i<=totimg.length;i++){
		document.getElementById(idName+i).style.display="none";
		document.getElementById(idName).getElementsByTagName('img')[i-1].src = "http://img.ndoors.com/webdata/yw/teaser/b_intro_tab0"+i+".gif";
	}

		document.getElementById(idName+nVar).style.display="block";
		document.getElementById(idName).getElementsByTagName('img')[nVar-1].src = "http://img.ndoors.com/webdata/yw/teaser/b_intro_tab0"+nVar+"_on.gif";
}