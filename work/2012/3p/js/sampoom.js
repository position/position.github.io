
/* Flash setting */

var fc_isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var fc_isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var fc_isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function MakeFlashString(_swfURL_, _flashID_, _width_, _height_, _wmode_, _flashVars_, _bgColor_) {
    document.write(returnFlashContents(_swfURL_, _flashID_, _width_, _height_, _wmode_, _flashVars_, _bgColor_));
}

function returnFlashContents(_swfURL_, _flashID_, _width_, _height_, _wmode_, _flashVars_, _bgColor_) {
    _wmode_ = (_wmode_ == undefined) ? "transparent" : _wmode_;
    _bgColor_ = (_bgColor_ == undefined) ? "#000000" : _bgColor_;

    if (fc_isIE && fc_isWin && !fc_isOpera) {
        _object_ = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + _width_ + '" height="' + _height_ + '" id="' + _flashID_ + '" align="middle">';
        _object_ += '<param name="allowScriptAccess" value="always" />';
        _object_ += '<param name="quality" value="high" />';
        _object_ += '<param name="movie" value="' + _swfURL_ + '" />';
        _object_ += '<param name="wmode" value="' + _wmode_ + '" />';
        _object_ += '<param name="allowFullScreen" value="true" />';
        _object_ += '<param name="menu" value="false" />';
        _object_ += '<param name="bgcolor" value="' + _bgColor_ + '" />';
        _object_ += '<param name="FlashVars" value="' + _flashVars_ + '">';
        _object_ += '</object>';
    } else {
        _object_ = '<embed src="' + _swfURL_ + '" quality="high" wmode="' + _wmode_ + '" FlashVars="' + _flashVars_ + '" bgcolor="' + _bgColor_ + '" width="' + _width_ + '" height="' + _height_ + '" name="' + _flashID_ + '" align="middle" allowScriptAccess="always" showLiveConnect="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
    }

    return _object_;
}

/* ---------------------------------- */



/* Initialize */

jQuery(
  
  function ($) {

    $.Body = $('body');
    
    $.Window = $(window);
    
    $.Scroll = ($.browser.mozilla || $.browser.msie || $.browser.opera) ? $('html') : $.Body;
    
    $.Mobile = ($.Body.hasClass('webkit-mobile') || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))),
    
    $.Unsupported = $.Body.hasClass('unsupported-browser');
    
    $.Body
    .Keyboard()
    .Omniture();
    
    $('[data-controller]').Instantiate();

    // Draw Lines
    // Bug with IE canvas implementation requires onload
    if ($.browser.msie)
		$(window).bind('load',function(){$('[data-canvasline]').Line();})
	else
		$('[data-canvasline]').Line();
	    $('[data-target=_blank]').TargetBlank();
  } 
  
);




/* ---------------------------------- */

/* Events */

(function($) {

  $.Events = {

     OMNITURE_TRACK: 'omnitureTrack',
     OMNITURE_TRACK_LINK: 'omnitureTrackLink',
     SECTION_ENTER: 'sectionEnter',
     SCROLL_TO: 'scrollTo',
     SCROLL: 'windowScroll',
     SCROLL_ENTER: 'windowScrollEnter',
     SCROLL_LEAVE: 'windwScrollLeave',
     KEY_UP: 'keyUp',
     KEY_DOWN: 'keyDown',
     KEY_LEFT: 'keyLeft',
     KEY_RIGHT: 'keyRight',
     KEY_ESC: 'keyEsc',
     KEY_SPACE: 'keySpace',
     PROOF_POINT: 'proofPointMore',
	 MOUSE_ENTER: 'mouseenter'
  
  } // Events  
  
  $.Views = {
  
  } // Views 
  
})(jQuery);


/* ---------------------------------- */

/* Auto Instantiate */

(function($) {

  $.fn.Instantiate = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 

          var $self = $(this),
              $controller = $self.attr('data-controller');
                  
          if ($self[$controller])
            $self[$controller]();
              
      });
      
  }

})(jQuery);


/* ---------------------------------- */

/* Omniture */

(function($) {

  $.fn.Omniture = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 

        var $self = $(this),
            $track = $('[data-omniture]').OmnitureTrack()
            $exits = $('[data-omniturelink]').OmnitureTrackLink();
              
      });
      
      return this;
  }
  
  $.fn.OmnitureTrack = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 

        var $self = $(this),
            $id = $self.attr('data-omniture');
        
        
        $self
          .Scrollable({})
          .bind($.Events.SCROLL_ENTER,
            function(e) {
              _track($id)
            })
        
        function _track(id) {
          $.Body.triggerHandler($.Events.OMNITURE_TRACK,id);
        }
              
      });
      return this;
  }
  
  $.fn.OmnitureTrackLink = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 

        var $self = $(this),
            $id = $self.attr('href');
        
        
        $self
          .bind('click',
            function(e) {
              _track($id)
            })
            
        
        function _track(id) {
          $.Body.triggerHandler($.Events.OMNITURE_TRACK_LINK,id);
        }
              
      });
      
	  return this;
  }


})(jQuery); 



/* ---------------------------------- */

/* Shell */

(function($) {

  $.fn.SHELL = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 

              
      });
      
      
      return this;
  }

})(jQuery); 

/* ---------------------------------- */


/* Share */

(function($) {

  $.fn.Line = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 
        
        var $self = $(this),
            $canvas = $self.find('canvas'),
            $canvas_id = $canvas.attr('id'),
            $target = $self.attr('data-target'),
            $top = $self.attr('data-top'),
            $coord = $self.attr('data-coord') ? $self.attr('data-coord').split(',') : new Array(0,0,0,0),
            _canvas_element = document.getElementById($canvas_id),
            _canvas_context = _canvas_element.getContext('2d'),
            _height = 0;
        
        $self.css({top: parseInt($top), height: parseInt($coord[3]), marginBottom:0, width: 900,overflow:'hidden'})
        
        $canvas.attr({height: parseInt($coord[3]),width: 900})
        
        $.html5.canvas.draw.dashedline(_canvas_context, parseInt($coord[0]), parseInt($coord[1]), parseInt($coord[2]), parseInt($coord[3]), _canvas_element,6);

      });
      
      
      return this;
  }

})(jQuery); 

/* ---------------------------------- */


/* Notice, Scrolling Meassage */

$(document).ready(function(){
	
	notice();
	scrollMessage();

});

/*
function notice() {
	var noticeWrap = $("#notice");
	$(window).load(function(){
		hideStart();
		$(noticeWrap).animate({top:0}, 500, "easeInOutCubic");
		$("#hide").click(function(){
			$(noticeWrap).animate({top:-50}, 500, "easeInOutCubic");
		});
	});

	function hideStart(){
		setInterval(start, 5000);
	}

	function start(){
		$(noticeWrap).animate({top:-50}, 500, "easeInOutCubic");
	}
}*/

function notice() {
	var noticeWrap = $("#notice");
	$(window).load(function(){
		$(noticeWrap).animate({top:0}, 500, "easeInOutCubic");
		$("#hide").click(function(){
			$(noticeWrap).animate({top:-50}, 500, "easeInOutCubic");
		});
	});
	
	$(".topNoticeAction").click( function() {
		if ($("#openCloseIdentifier").is(":hidden")) {
			$(noticeWrap).animate({ 
				top: "55px"
				}, 500, "easeInOutCubic");
			$("#topNoticeImage").html('<img src="http://img.ndoors.com/webdata/sampoom/teaser/b_notice_closed.png" alt="close" />');
			$("#openCloseIdentifier").show();
		} else {
			$(noticeWrap).animate({ 
				top: "10px"
				}, 500, "easeInOutCubic" );
			$("#topNoticeImage").html('<img src="http://img.ndoors.com/webdata/sampoom/teaser/b_notice_open.png" alt="open" />');
			$("#openCloseIdentifier").hide();
		}
	});  

	function start(){
		$(noticeWrap).animate({top:-9}, 500, "easeInOutCubic");
	}
}


function scrollMessage() {
    var tophide = 200,
        offset = 200,
		maxOffset = 300,
		timer,
		button = $("#site-scroll"),
		buttonHeight = button.height();

    if ($(document).scrollTop() <= tophide) {
        button.css({ opacity: 0 });

    }

    button.show();
    animate();
    $(window).bind("scroll resize", function () {
        clearTimeout(timer);
        timer = setTimeout(animate, 10);
    });

    function animate() {
        var aniTop = $(document).scrollTop() + $(window).height() - buttonHeight - offset,
		alpha = $(document).scrollTop() < tophide ? 1 : 0;
        aniTop = Math.min(parseInt($(document).height()) - maxOffset, aniTop);
        button.stop().animate({ top: aniTop, opacity: alpha }, 500, "easeOutQuart");
    }
}
/* ---------------------------------- */


/* Scrollable */

(function($) {

  
  $.fn.Scrollable = function(settings) {
   
     var config = { threshold: 0, offset_scroll: 6, offset_intertia: .15 };
 
     if (settings) $.extend(config, settings);
    
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id');
            
        config.threshold = 0
        
        if ($.Mobile || $.Unsupported) {  
          $self.css({backgroundAttachment:'scroll'})
        }else{
        
        $.Window
          .bind('scroll',
            function(e){
            
              if ( $.inview($self,{threshold:config.threshold}) ) {
                
                if (!$self.hasClass('_active')){
                
                  $self.addClass('_active');
                  
                  if (config.is_nav)
                    $.Body.triggerHandler($.Events.SECTION_ENTER,$id);
                  
                  $self.triggerHandler($.Events.SCROLL_ENTER);
                  
                }
                  
                _scroll_background();
                  
                $self.triggerHandler($.Events.SCROLL,$.distancefromfold($self,{threshold:config.threshold}) - config.threshold)
                
              }else{
                
                if ($self.hasClass('_active')){
                
                  $self.removeClass('_active');
                  
                  $self.triggerHandler($.Events.SCROLL_LEAVE);
                  
                }
              
              }
              
            
            })
            
            
        }
        
        function _scroll_background() {

          var _x = '50% '
                  
          var bpos = _x + (-($.distancefromfold($self,{threshold:config.threshold}) - config.threshold) * config.offset_intertia) + 'px';
          
          $self.css({'backgroundPosition':bpos})

        }
        
        /*if (config.auto_scroll)
          _scroll_background();*/
            
     });
     
    return this;
     
  } //Story
  
  $.fn.SamIntro = function() {
   
     this.each(function() { 
        var $self = $(this),
            $header = $self.find('header'),
    		$bg = $self.find('.bg'),
            $h1 = $self.find('h1'),
            $h2 = $self.find('h2'),
            $span = $self.find('span'),
            $a_close = $self.find('a#close-video'),
            $id = $self.attr('id'),
            $img = $self.find('img'),
            $a_play = $self.find('a.play-button'),
            $darkslide = $self.find('.darkslide'),
            $container = $self.find('#video-container'),
			$title_action_one = $self.find(".title-sam01"),
			$title_action_two = $self.find(".title-sam02"),
			$title_action_three = $self.find(".title-sam03"),
			$mov_play = $self.find('.movBtn'),
            _video = $self.attr('data-videoid'),
            _popup = ( $.Unsupported || $.Body.hasClass('browser-ie7') ),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true,auto_scroll:true})
          .bind($.Events.SCROLL,on_scroll)
          .bind($.Events.SCROLL_ENTER,on_scroll_enter)
          .bind($.Events.SCROLL_LEAVE,on_scroll_leave)
		  //.bind($.Events.MOUSE_ENTER,on_mouse_enter)
          
        $a_play
          .bind('click',
            function(e){
              if (!_popup)
                _show_video();
              else
                _popup_video();
                
              e.preventDefault();
            })

        $h1
          .css({cursor:'pointer'})
          .bind('click',function(){$a_play.triggerHandler('click')})
            
        $a_close 
          .bind('click',
            function(e){
              _close_video();
              e.preventDefault();
            })
               
        function on_scroll(e,distance) {
          
          var bpos = '35% ' + ($.Window.height()/2.5-distance/3) + 'px';
          $bg.css({'backgroundPosition':bpos})
        
        }
        
        function on_scroll_enter(e) {
			
        }

        function on_scroll_leave(e) {
        
          $self.removeClass('_playing');
          $container.html('');
          $darkslide.stop().css({height:0,opacity:0});
          
        }

		$(window).load(function(){
			
			$title_action_one.animate({right:"200px"},500, "easeInOutElastic");
			$title_action_two.animate({right:"270px"},1000, "easeInOutElastic");
			$title_action_three.animate({right:"230px"},1500, "easeInOutElastic");
			$mov_play.animate({right:"180px"},1800, "easeInOutElastic");

		  });
          
        
        function _popup_video() {
        
          //var _v = window.open('video.jsp' ,'_video','width=810,height=456')
          var _v = window.open('video' ,'_video','width=810,height=456')
            
          _v.focus();
        
          _v.moveTo($(window).width()/2 - 405, $(window).height()/2 - 230)


        }
        function _show_video() {
        
          $self.addClass('_playing');
          
          $darkslide.css({height: '100%'}).animate({opacity:.9},800,'easeInOutExpo',_bind_container)
          
          var _scrolltop = $self.offset().top + ($self.height()-$.Window.height())/2;
          
          if ($a_close.offset().top < _scrolltop)
            _scrolltop = $a_close.offset().top;
          
          $.Scroll.animate({scrollTop:_scrolltop},800,'easeInOutExpo')
        }
		function _bind_container() {
          $container.html('<object id="myExperience" class="BrightcoveExperience"><param name="wmode" value="transparent" /><param name="bgcolor" value="transparent" /><param name="width" value="810" /><param name="height" value="455" /><param name="playerID" value="713898383001" /><param name="playerKey" value="AQ~~,AAAAEN5stVk~,ClMjWCb9_K5hl9hjtUNJgrjL1gVfknrr" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /></object><script type="text/javascript">brightcove.createExperiences();</script>');
          
        }
        
        
        function _close_video() {
        
          $self.removeClass('_playing');
          
          $('#myExperience').remove();
          
          $container.html('');
          
          $darkslide.css({height: '100%'}).animate({opacity:0},1200,'easeInOutQuart',function(){
            $darkslide.css({height: '0'})
          })
          
        }
            
     });
     
    return this;
     
  } //SamIntro

  $.fn.SamStrategy = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $header = $self.find('header'),
            $bg = $self.find('.bg'),
            $h1 = $self.find('h1'),
            $h2 = $self.find('h2'),
			$title_action_one = $self.find('.title-strategy'),
			$title_action_two = $self.find('.sub-title-strategy'),
            $id = $self.attr('id'),
            $img = $self.find('img'),
            _threshold = -200;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})
          .bind($.Events.SCROLL,on_scroll)
          .bind($.Events.SCROLL_ENTER,on_scroll_enter)
          .bind($.Events.SCROLL_LEAVE,on_scroll_leave);
          
        function on_scroll(e,distance) {
        
          var bpos = '50% ' + ($.Window.height()/2.5-distance/3) + 'px';
                  
          $bg.css({'backgroundPosition':bpos})
        }
        
        function on_scroll_enter(e) {
			$title_action_one.animate({top:"100px"},1500, "easeOutCubic");
			$title_action_two.animate({top:"280px"},1000, "easeOutCubic");
        }
        
        function on_scroll_leave(e) {
        
        }
            
     });
     
    return this;
     
  } //SamStrategy 


   $.fn.SamDramatic = function(settings) {
     
    var config = {};

 
    if (settings) $.extend(config, settings);

		this.each(function() { 
      
        var $self = $(this),
			$title_action_one = $self.find('.title-drama'),
			$title_action_two = $self.find('.sub-title-drama'),
            $id = $self.attr('id'),
			$bg = $self.find('.bg'), 
            _threshold = 0;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})
		  .bind($.Events.SCROLL,on_scroll)
    	  .bind($.Events.SCROLL_ENTER,on_scroll_enter)
		 
		function on_scroll(e,distance) {
        
          var bpos = '30% ' + ($.Window.height()/2-distance/3) + 'px';
          $bg.css({'backgroundPosition':bpos})

        }

		function on_scroll_enter(e) {

			$title_action_one.animate({top:"100px"},1500, "easeInOutSine");
			$title_action_two.animate({top:"275px"},1000, "easeInOutSine");

			//$title_action_one.animate({opacity:1}, 2500);
			//$title_action_two.animate({opacity:1}, 3500);

        }
 
      });
      
      return this;
      
  } //SamDramatic


$.fn.SamEmbodying = function() {
   
     this.each(function() { 
      
        var $self = $(this),
			$title_action_one = $self.find('.title-embody01'),
			$title_action_two = $self.find('.title-embody02'),
            $id = $self.attr('id'),
            $bg = $self.find('.bg'), 
            _threshold = 0;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})
          .bind($.Events.SCROLL,on_scroll)
		  .bind($.Events.SCROLL_ENTER,on_scroll_enter)

		 function on_scroll(e,distance) {
         
          var bpos = '50% ' + ($.Window.height()/3-distance/3) + 'px';
          $bg.css({'backgroundPosition':bpos});
            
		}

		function on_scroll_enter(e) {

			$title_action_one.animate({top:"100px"},1500, "easeInOutSine");
			$title_action_two.animate({top:"180px"},1000, "easeInOutSine");

        }

     });
     
    return this;
     
  } //SamEmbodying

  
  $.fn.SamDynamic = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $header = $self.find('header'),
            $bg = $self.find('.bg'),
            $h1 = $self.find('h1'),
            $h2 = $self.find('h2'),
			$title_action_one = $self.find('.title-dynamic'),
			$title_action_two = $self.find('.sub-title-dynamic'),
            $id = $self.attr('id'),
            $img = $self.find('img'),
            _threshold = 0;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})
          .bind($.Events.SCROLL,on_scroll)
          .bind($.Events.SCROLL_ENTER,on_scroll_enter)
          .bind($.Events.SCROLL_LEAVE,on_scroll_leave);
          
        function on_scroll(e,distance) {
        
          var bpos = '50% ' + ($.Window.height()/2.5-distance/3) + 'px';
                  
          $bg.css({'backgroundPosition':bpos})
        }
        
        function on_scroll_enter(e) {
			$title_action_one.animate({top:"100px"},1500, "easeInOutSine");
			$title_action_two.animate({top:"280px"},1000, "easeInOutSine");
        }
        
        function on_scroll_leave(e) {
        
        }
            
     });
     
    return this;
     
  } //SamDynamic


  $.fn.SamSmart = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
			$title_action_one = $self.find('.title-smart'),
			$title_action_two = $self.find('.sub-title-smart'),
			$bg = $self.find('.bg'), 
            _threshold = 0;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})
		  .bind($.Events.SCROLL,on_scroll)
		  .bind($.Events.SCROLL_ENTER,on_scroll_enter)

		function on_scroll_enter(e){
			$title_action_one.animate({top:"100px"},1500, "easeInOutSine");
			$title_action_two.animate({top:"280px"},1000, "easeInOutSine");
		}
		 
		function on_scroll(e,distance) {
        
          var bpos = '70% ' + ($.Window.height()/1.5-distance/3) + 'px';
          $bg.css({'backgroundPosition':bpos})

        }
            
     });
     
    return this;
     
  } //SamSmart
   


  $.fn.SamWorldview = function() {
   
     this.each(function() { 

        var $self = $(this),
			$title_action_one = $self.find('.title-world01'),
			$title_action_two = $self.find('.title-world02'),
            $id = $self.attr('id'),
            $bg = $self.find('.bg'),
            _threshold = 0;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})
          .bind($.Events.SCROLL,on_scroll)
		  .bind($.Events.SCROLL_ENTER,on_scroll_enter)
               
        function on_scroll(e,distance) {
          
           var bpos = '50% ' + ($.Window.height()/2.5-distance/3) + 'px';
                  
           $bg.css({'backgroundPosition':bpos})
  
        }

		function on_scroll_enter(e) {

			$title_action_one.animate({top:"50px"},1500, "easeInOutSine");
			$title_action_two.animate({top:"130px"},1000, "easeInOutSine");

			//$title_action_one.animate({opacity:1}, 2500);
			//$title_action_two.animate({opacity:1}, 3500);

        }
            
     });
     
    return this;
     
  } //SamWorldview


  $.fn.SamCharacter = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            $bg = $self.find('.bg'), 
            _threshold = 0;
        
        $self
          .Scrollable({threshold: _threshold,is_nav:true})
            
     });
     
    return this;
     
  } //SamCharacter
  
  
  $.fn.samBoardReply = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $id = $self.attr('id'),
            _threshold = 0;
            
     });
     
    return this;
     
  } //samBoardReply

    
})(jQuery);



/* ---------------------------------- */

/* MainNav */

(function($) {
  
   $.fn.MainNav = function() {
   
     this.each(function() { 
      
        var $self = $(this),
            $ul = $("<ul class='menu01 navBg'/>").appendTo($self),
            $sections = $('[data-nav]'),
            _sections = new Array(),
            $navs = new Array(),
            _active = 0;

       if (!$.Mobile && !$.Unsupported) { 
        $sections.each(
          function(i){
            _sections.push($(this))
            $('<li/>').appendTo($ul).DotNav({id:$(this).attr('id'),name:$(this).attr('data-nav')});
          })
          
        $self.css({marginTop:-$self.height()/2})

        }
        
        $.Body
          .bind($.Events.SECTION_ENTER,
            function(e,id){
              
              $sections.each(
                function(i){
                  if ($(this).attr('id')==id)
                    _active = i;
              
                })
            
            })
          .bind($.Events.KEY_DOWN,
            function(e){
              _active++;
              if (_active>$sections.length-1)
                _active=$sections.length-1;
              _seek();
          })
          .bind($.Events.KEY_UP,
            function(e){
              _active--;
              if (_active<0)
                _active=0;
              _seek()
              
          })
          
          function _seek() {
            $.Body.triggerHandler($.Events.SCROLL_TO,_sections[_active].attr('id'))
          }
            
     });
     
    return this;

	$.fn.MainNav = function() {
            
     }
     
  } // Main Nav


  var i = 1;    

  $.fn.DotNav = function(settings) {
     
    var config = {};

 
    if (settings) $.extend(config, settings);
   
     this.each(function() { 
		
        var $self = $(this),
            $a = $('<a/>'),
            $h2 = $('<h2/>').appendTo($self),
		    $span = $('<span/>').html(config.name).appendTo($h2),
            $id = config.id;
            $a
              .attr('href',"#/"+config.name.split(' ').join('_'))
              .html($id)
              .appendTo($self)
              .bind('click',
                function(e){
                  
                  $.Body.triggerHandler($.Events.SCROLL_TO,$id)
                  e.preventDefault();
                  
                })
            
            $self
              .attr('data-id',$id);
              
        $a
          .bind('mouseenter',
            function(e) {
                $h2.stop().css({display:'block'}).animate({right:40,opacity:1},450,'easeOutQuart');
            })
          .bind('mouseleave',
            function(e) {
                $h2.stop().animate({right:30,opacity:0},450,'easeOutQuart',function(){$h2.stop().css({display:'none'})})
            });

        $.Body
          .bind($.Events.SECTION_ENTER,
            function(e,id){
            
              if (id==$id)
                $self.addClass('active')
              else
                $self.removeClass('active')
              
            });
        i++;
     });
     
    return this;
     
  } // DotNav
    
})(jQuery);

$(document).ready(function(){
	
	$("#writeNav").bind('mouseenter',
		function(e) {
			$("#writeNav h2").stop().css({display:'block'}).animate({right:40,opacity:1},450,'easeOutQuart');
		})
	  .bind('mouseleave',
		function(e) {
			$("#writeNav h2").stop().animate({right:30,opacity:0},450,'easeOutQuart',function(){$(this).stop().css({display:'none'})})
	});
	$("#multiNav").bind('mouseenter',
		function(e) {
			$("#multiNav h2").stop().css({display:'block'}).animate({right:40,opacity:1},450,'easeOutQuart');
		})
	  .bind('mouseleave',
		function(e) {
			$("#multiNav h2").stop().animate({right:30,opacity:0},450,'easeOutQuart',function(){$(this).stop().css({display:'none'})})
	});

});


/* ---------------------------------- */

/* SiteScroll */

(function($) {
  
   $.fn.SiteScroll = function() {
   
     this.each(function() { 
      
        var $self = $(this);
            
        $.Body
          .bind($.Events.SCROLL_TO,
            function(e,id){
            
              var $element = $('#'+id),
                  $header = $element.find('header'),
                  _align = $element.attr('data-align'),
                  _offset = $element.attr('data-scrolloffset') ? parseInt($element.attr('data-scrolloffset')) : 0,
                  _top = $element.offset().top;
              /*
              if ($header.length>0 && _align!="top") { 
                  
                  _top = $header.offset().top  + $header.height()/2 - $.Window.height()/2;
              
                  if (_top > $header.offset().top)
                    _top = $header.offset().top - 50
                
              }
              
              if (_align=="center" && $element.height()>$.Window.height()) {
              
                _top = $element.offset().top + ($element.height()-$.Window.height())/2
              
              }
              */
              $.Scroll
                .stop()
                .animate(
                  { 'scrollTop': _top },
                  1800,
                  'easeInOutExpo'
                )
            })
     });
     
    return this;
     
  }
    
   
    
})(jQuery);

/* ---------------------------------- */

/* TargetBlank */

(function($) {

  
   $.fn.TargetBlank = function() {
   
     this.each(function() { 
      
        var $self = $(this);
            
        
        $self
        .attr('target','_blank')
        .bind('click',on_click);
        
        function on_click(e){
        
        }
        
            
     });
     
    return this;
     
  }
    
   
    
})(jQuery);
    

/* ---------------------------------- */

/* Keyboard */

(function($) {


   $.fn.Keyboard = function(settings) {
     
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function() { 
      
        var $self = $(this);
      
        $(document)
        .bind('keydown',on_keydown);
        
        function on_keydown(e) {
          
          var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
          
          switch(key) {

             
             case 27: //escape

              $.Body.triggerHandler($.Events.KEY_ESC);
                        
             break;
             
             case 32: //space

              $.Body.triggerHandler($.Events.KEY_SPACE);
                        
             break;
             
             case 38: //top
              
              $.Body.triggerHandler($.Events.KEY_UP);
                        
             break;
           
             case 39: //right

              $.Body.triggerHandler($.Events.KEY_RIGHT);
              e.preventDefault();
              
             break;
             
             case 40: ///bottom
            
              $.Body.triggerHandler($.Events.KEY_DOWN);
                        
             break;
              
             case 37: //left
             
              $.Body.triggerHandler($.Events.KEY_LEFT);
                        
             break;
             
             
          }//switch
          
        }//keydown
  
      }); 
      
      return this;
    
  } 

})(jQuery);

/* ---------------------------------- */

/* Worker */

(function($) {


    $.distancefromfold = function($element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).height() + $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return (fold + settings.threshold) - $element.offset().top ;
    };
    
    $.belowthefold = function($element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).height() + $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $element.offset().top - settings.threshold;
    };
    
    $.rightoffold = function($element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).width() + $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $element.offset().left - settings.threshold;
    };
        
    $.abovethetop = function($element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top;
        }
        return fold >= $element.offset().top + settings.threshold  + $element.height();
    };
    
    $.leftofbegin = function($element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left;
        }
        return fold >= $element.offset().left + settings.threshold + $element.width();
    };
    
    $.inview = function($element, settings) {
        return ($.abovethetop($element,settings)!=true && $.belowthefold($element,settings)!=true)
    };

    $.extend($.expr[':'], {
        "below-the-fold" : "$.belowthefold(a, {threshold : 0, container: window})",
        "above-the-fold" : "!$.belowthefold(a, {threshold : 0, container: window})",
        "right-of-fold"  : "$.rightoffold(a, {threshold : 0, container: window})",
        "left-of-fold"   : "!$.rightoffold(a, {threshold : 0, container: window})"
    });
    
})(jQuery);



/* ---------------------------------- */

/* Character Mouse Over, Out */

var $characterItems;
var $overCharacterItems;
var $menu;
var $selectCharacterItems;
var bSelectActive;

$(document).ready(function(){
	initCharacterItemsData();
	initEventListener();
});


function initEventListener()
{
	// 메뉴아이템에 마우스 이벤트 추가하기.
	$CharacterItemss.bind("mouseenter",function(e){
		if(bSelectActive==false)
		{
			removeSelectCharacterItemsStyle($selectCharacterItems);
			bSelectActive=true;
		}
		
		overCharacterItems($(this));
	});
	
	$CharacterItemss.bind("click",function(e){
		selectCharacterItems($(this));
	});
	
	$menu.bind("mouseleave",function(e){		
		if($overCharacterItems)
		{
			// over스타일을 제거.
			removeOverCharacterItemsStyle($overCharacterItems)
			$overCharacterItems 	= null;
			
			setSelectCharacterItemsStyle($selectCharacterItems);				
		}
		
		 bSelectActive	=false;
	});
	
	
 }

 
 function initCharacterItemsData()
 {
	 $menu	= $(".characteGroup");
	 // 재사용할 메뉴아이템 목록을 변수에 담아놓기.
	$CharacterItemss	= $(".characteGroup li");
	
	$CharacterItemss.each(function(index,data){
		$(this).data("index", index);
		$(this).data("wrap",$(this).find("div"));
	 });
	 
	 bSelectActive	=false;
	 
 }

 
 function overCharacterItems($newCharacterItems)
 {
	var newIndex 	=$newCharacterItems.data("index");
	var overIndex 	=-1;
	if($overCharacterItems)	
		overIndex 	= $overCharacterItems.data("index");
	
	if(newIndex==overIndex)
		return;
	
	 // over상태 제거.
	 if($overCharacterItems)
		removeOverCharacterItemsStyle($overCharacterItems);

	// over상태로.
	setOverCharacterItemsStyle($newCharacterItems);
	$overCharacterItems 	= $newCharacterItems;
	
 }
 
 // overCharacterItemsStyle 상태로 설정.
 function setOverCharacterItemsStyle($CharacterItems)
 {
	
	var $CharacterItemsWrap	=$CharacterItems.data("wrap");
	
	$CharacterItemsWrap.stop();
	$CharacterItemsWrap.animate({
		top: -274
	}, 
	1000,"easeInOutExpo");
 }
 
 
 // overCharacterItemsstyle을 제거.
 function removeOverCharacterItemsStyle($CharacterItems)
 {
	
	var $CharacterItemsWrap	=$CharacterItems.data("wrap");
	
	$CharacterItemsWrap.stop();
	$CharacterItemsWrap.animate({
		top: 0
	}, 
	500,"easeInOutExpo");

 }
 
 // 메뉴 선택처리.
 function selectCharacterItems($CharacterItems)
 {
	 $selectCharacterItems	= $CharacterItems;
 }
 
 // 선택메뉴 처리.
 function setSelectCharacterItemsStyle($CharacterItems)
 {
	 if($CharacterItems)
	 {
		 setOverCharacterItemsStyle($CharacterItems);
	 }
 }
 
 function removeSelectCharacterItemsStyle($CharacterItems)
 {
	  if($CharacterItems)
	 {
		 removeOverCharacterItemsStyle($CharacterItems);
	 }
 }