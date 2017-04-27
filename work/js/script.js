(function($){

	var workAccordion = function(){

		var $yearSec = $(".yearList"),
			$yearBx = $(".yearList > .yr"),
			$work = $(".working"),
			$mnavBtn = $(".mnav-button"),
			$closeBtn = $(".close-btn"),
			$navWrap = $(".navWrap");

		function init(){
			$work.hide();
		}

		function initEventListener(){
			$(window).on({
				"scroll" : function(){
					scrollingToSection();
				}
			});

			$yearBx.on({
				"click" : function(event){
					event = event || window.event;
					event.preventDefault ? event.preventDefault() : event.returnValue = false;
					$(this).next("div").slideToggle().parent("li").siblings().children("div").hide();
					$("body,html").animate({scrollTop: $(this).offset().top}, 500);
				},

				"mouseenter" : function(){
					var nIndex = $yearBx.index(this);
					$yearSec.eq(nIndex).addClass("on");
				},

				"mouseleave" : function(){
					var nIndex = $yearBx.index(this);
					$yearSec.eq(nIndex).removeClass("on");
				}
			});

			$(".naviMenu li a, a.footTop").on({
				"click" : function(){
					var dataId = $(this).attr("href");
					var pos = $(dataId).offset().top;
					$("html, body").stop().animate({scrollTop:pos}, 300);
					$navWrap.removeClass("open");

					return false;
				}
			});

			$mnavBtn.on({
				"click" : function(){
					$navWrap.addClass("open");
				}
			});
			$closeBtn.on({
				"click" : function(){
					$navWrap.removeClass("open");
				}
			});
		}

		function initLinkUrl(hash){
			$('.naviMenu li a').each(function(index) {  
				if($(this).attr('href').indexOf(hash) > -1) {
					$(this).addClass("active");
				} else {
					$(this).removeClass("active");
				}
			});
		}

		function scrollingToSection(){
			var sTop = $('html').scrollTop() == 0 ? $('body').scrollTop() : $('html').scrollTop(),
				bottom = false;
			if ($(window).scrollTop() + $(window).height() == $(document).height()) {
				bottom = true;
			}
			 //이미지 변경
			if (sTop >= $('#idx1').position().top - 200  && sTop < $('#idx2').position().top - 200 ) {
				initLinkUrl('#idx1');
			} else if (sTop >= $('#idx2').position().top - 200  && sTop < $('#idx3').position().top - 200 ) {
				initLinkUrl('#idx2');
			} else {
				initLinkUrl('#idx3');
			} 
			if (bottom)
				initLinkUrl('#idx3');
		}
		init();
		initEventListener();
	};

	var checkBrowser = function(){
		var canUse = false;
		var browserName = "Unknown";
		var browserVer = "";
		var browserVerMain = "";
		var videoWrap = $("#videoContainer");

		if (/MSIE/.test(navigator.userAgent)) {
			browserName = "Internet Explorer";
			browserVer = /MSIE ([\d\.]+)\;/.exec(navigator.appVersion)[1];
			browserVerMain = /(\d+)\./.exec(browserVer)[1];

			if(browserVerMain == "6") {
				videoWrap.hide();
			}else if(browserVerMain == "7") {
				videoWrap.hide();
			}
			else if(browserVerMain == "8") {
				videoWrap.hide();
			}
		}
	};

	$(function(){
		workAccordion();
		checkBrowser();
	});

})(jQuery);
