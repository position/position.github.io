//작성자 : 엔도어즈 서비스플랫폼팀 최경환 position@ndoors.net
//최종수정 : 2014.12. 9

(function(window, $){

	$(function(){
	
		var setting = {
			winW : $(window).width(),
			winH : $(window).height(),
			ieBrowser : !!navigator.userAgent.match(/Trident\/7\./),
			$main : $('.gtTeagerMain'),
			$acItem : $('.actionCon > div'),
			$intro : $('.introSection'),
			$videoWrap : $('.videoLayer'),
			$videoBx : $('.videoBg'),
			$videoObj : $('.videoArea'),
			$gtIntroMov : $('#gtIntroMov'),
			$notice : $('.noticeArea'),
			currentMatrix : 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -0.0005, 0, 0, 0, 1)',
			nextMatrix : 'matrix3d(1, 0, 0, 0, 0, 0, -1, 0.0005, 0, 1, 0, 0, 0, 800, -800, 1.4)',
			prevMatrix : 'matrix3d(1, 0, 0, 0, 0, 0, 1, -0.0005, 0, -1, 0, 0, 0, -800, -800, 1.4)'
		}
		
		$.fn.playVideo = function(id){
			setting.$gtIntroMov.attr('src', 'http://www.youtube.com/embed/TyyYZwIt0_A?autoplay=1&rel=0&showinfo=0');
			setting.$videoWrap.css('visibility', 'visible');
			if($.browser.msie || setting.ieBrowser){
				setting.$videoWrap.fadeIn(300);
			} else {
				setting.$videoObj.css({
					'transition' : 'all 0.5s ease-in',
					'opacity' : '1',
					'transform' : setting.currentMatrix,
				});
			}
			setting.$videoBx.fadeIn(300);

			$('.closedBtn').on({
				'click' : function(){
					if(setting.$intro.is(':hidden')){
						$.fn.closeVideo();
					}else{
						$.fn.closeVideo();
						teagerScrollPage(0);
					}
				}
			});
		}

		$.fn.resizeVideo = function(){
			setting.$gtIntroMov.each(function() {
				var windowWidth = $(window).width(),
					windowHeight = $(window).height(),
					videoWidth = parseInt(windowWidth / 1.5),
					videoHeight = parseInt(windowHeight / 1.5);
					
				$(this).parent().css({
					'width' : videoWidth,
					'height' : videoHeight
				});
				$(this).css({
					'width' : videoWidth,
					'height' : videoHeight
				});

				setting.$videoObj.css({
					left: (windowWidth - videoWidth) / 2,
					top: (windowHeight - videoHeight) / 2
				});
			});
		}

		$.fn.closeVideo = function(){
			if($.browser.msie || setting.ieBrowser){
				setting.$videoWrap.fadeOut(300);
			} else {
				setting.$videoObj.css({
					'transform' : setting.prevMatrix,
					'opacity' : '0',
					'transition' : 'all 0.5s ease-out'
				});
			}

			if($.browser.msie || setting.ieBrowser){
				setting.$videoWrap.fadeOut(300);
			} else {
				setting.$videoBx.delay(500).fadeOut(300);
				setTimeout(function(){
					setting.$videoWrap.css('visibility', 'hidden');
					setting.$videoObj.css({
						'transform' : setting.nextMatrix
					});
				}, 1300);
			}
			setting.$gtIntroMov.attr('src', '');
		}
		
		var introScrolling = function(){
			var nCurrentIndex = 0,
				autoTimerId = true,
				$section = setting.$intro.find('section'),
				$logo = $('.logo > img'),
				$line = setting.$intro.find('.line'),
				$movieArea = $('.movieArea'),
				SECOND = 1000,
				DURATION = 'easeInOutQuad',
				autoTimerId = true;

			function initModule(){
				setting.$intro.show();
				setting.$main.hide();
				setting.$intro.width(setting.winW);
				$logo.css('opacity', '0');
				$line.css('height' , '0');
				$line.eq(nCurrentIndex).animate({ height : setting.winH }, 2000, DURATION);
				$logo.delay(0).animate({ opacity : 1 }, 1000, DURATION);
				autoIntroPlay();
				setting.$videoWrap.css('visibility', 'hidden');
				setting.$videoBx.hide();
				if($.browser.msie || setting.ieBrowser){
					setting.$videoWrap.fadeOut(300);
				} else {
					setting.$videoObj.css({
						'transform' : setting.nextMatrix,
						'opacity' : '0'
					});
				}
				setting.$acItem.css('opacity' , '0');
				setting.$acItem.eq(0).css('top', '-1000px');
				setting.$acItem.eq(1).css('right', '-1000px');
				setting.$acItem.eq(2).css('left', '-1000px');
				setting.$acItem.eq(3).css('bottom', '-1000px');
				setting.$acItem.eq(4).css('right', '-1000px');
				$section.eq(0).css('top', '0px');
				$section.eq(1).css('top', '1631px');
				$section.eq(2).css('top', '4681px');
				$section.css('position', 'fixed');
				$.fn.resizeVideo();
			}

			function initEventListener(){
				$(window).on({
					'resize' : function(){
						$.fn.resizeVideo();
					}
				});
				$('.skipBtn').on({
					'click' : function(){
						teagerScrollPage(0);
						stopAutoPlay();
						
						return;
					}
				});
				
				setting.$notice.find('.closed').on({
				    'click' : function(event){
				        event.preventDefault();
				        setting.$notice.animate({top : -100}, 500, 'easeInOutQuad', function(){
				            $(this).hide();    
				        });
				    }
			    });
			}

			function autoIntroPlay(){
				if(autoTimerId != 0){
					clearInterval(autoTimerId);
				}
				autoTimerId = setInterval(function(){
					var nIndex = nCurrentIndex + 1;
					if(nIndex > 5){
						autoTimerId = 0;
					}else{
						introSectionScroll(nIndex);
					}
				}, 2000);
			}

			function stopAutoPlay(){
				if(autoTimerId!=0){
					clearInterval(autoTimerId);
				}
				autoTimerId = 0;
			}

			function introSectionScroll(nIndex){
				switch(nIndex){
					case 1 :
						$section.eq(0).animate({ top : -1050 }, 1500, DURATION);
						$section.eq(1).animate({
							top : 0
							}, SECOND, DURATION , function(){$line.eq(1).animate({ height : setting.winH }, 1000, DURATION);
						});
						
						break;

					case 2 :
						$section.eq(1).animate({
							top : -750
							}, SECOND, DURATION ,function(){$line.eq(1).animate({ height : setting.winH * nIndex }, 1000, DURATION);
						});
						$section.eq(2).animate({ top : 0 }, 1000, DURATION);
						
						break;

					case 3 :
						$section.eq(1).animate({
							top : -1650
							}, SECOND, DURATION, function(){$line.eq(1).animate({ height : setting.winH * nIndex }, 1000, DURATION);
						});
						
						break;

					case 4 :
						$section.eq(1).animate({
							top : -3100
							}, SECOND, DURATION , function(){$line.eq(2).animate({ height : setting.winH }, 1000, DURATION);
						});
						$section.eq(2).animate({ top : -300 }, 1000, DURATION);
						
						break;

					case 5 :
						$section.eq(2).animate({ top : -1400 }, 1000, DURATION);
						$movieArea.animate({ opacity : 1 }, 1000, DURATION);
						setting.$acItem.delay(1000);
						setting.$acItem.eq(0).animate({ top : 160, opacity : 1 }, 1500, DURATION);
						setting.$acItem.eq(1).animate({ right : -20, opacity : 1 }, 1000, DURATION);
						setting.$acItem.eq(2).animate({ left : -70, opacity : 1 }, 1000, DURATION);
						setting.$acItem.eq(3).animate({ bottom : 0, opacity : 1 }, 500, DURATION);
						setting.$acItem.eq(4).animate({ right : 0, opacity : 1 }, 1500, DURATION);

						setTimeout(function(){
							$.fn.playVideo('intro-video');
						}, 3000);

						break;
				} 
				nCurrentIndex = nIndex;
			}
			
			this.scrollToAnchor = function(){
			    var value =  window.location.hash.replace('#!page=', '').split('/'),
				    idName = ['home', 'world', 'features', 'general', 'community'],
				    section = value[0],
				    dataId = $('[data-id="'+section+'"]'),
				    nIndex = dataId.index();

			    for(var i = 0;i<idName.length;i++){
				    if(section != "" && idName[i].indexOf(section) != -1){
					    stopAutoPlay();
					    teagerScrollPage(nIndex);

					    return;
				    }
			    }
		    }

			initModule();
			initEventListener();
		};

		var teagerScrollPage = function(index){
			
			this.nCurrentIndex = index;
			var $teagerSec = $('.gtTeagerSection'),
				$header = $('.gtTeagerHeader'),
				$section = $teagerSec.find('section'),
				$homeMenu = $('.fixMenu > li > a'),
				$menu = $('.scrollMenu > li > a'),
				$home = $header.find('.logo a'),
				$generalWrap = $('.generalArea'),
				$artWorks = $('.illust img'),
				$generalName = $generalWrap.find('h2'),
				$generalCon = $generalWrap.find('p'),
				$generalNavi = $('.generalNavi > li > a'),
				$modeBackFir = $('.tacticsMode'),
				$modeBackSec = $('.feudatoryMode'),
				$movViewBtn  = $('.movViewBtn'),
				$movMobile = $('.modeVideo'),
				secLength = $section.length,
				secHeight = setting.winH * secLength,
				slideMoving = false,
				scrollId = null,
				SECOND = 500,
				generalItem = 0;
				DURATION = 'easeInOutCirc';

			function initModule(){
				$teagerSec.height(secHeight);
				
				if(this.nCurrentIndex > 0){
					$header.fadeIn(300);
					setting.$notice.animate({top : -100}, 500, 'easeInOutQuad');
				} else {
					$header.fadeOut(300);
					setting.$notice.animate({top : 0}, 500, 'easeInOutQuad');
				}
				setting.$videoWrap.css('visibility', 'hidden');
				setting.$videoBx.hide();
				setting.$intro.fadeOut(1000);
				setting.$main.fadeIn(1000);
				$section.height(setting.winH);
				$section.eq(this.nCurrentIndex).addClass('active').siblings().removeClass('active');

				$menu.eq(this.nCurrentIndex).addClass('on').siblings().removeClass('on');
				
				setting.$acItem.css('opacity', '0');
				setting.$acItem.eq(5).css('top', '-1000px');
				setting.$acItem.eq(6).css('top', '-1000px');
				setting.$acItem.eq(7).css('right', '-1000px');
				setting.$acItem.eq(8).css('left', '-1100px');
				setting.$acItem.eq(9).css('bottom', '-1000px');
				setting.$acItem.eq(10).css('right', '-1000px');
				setting.$acItem.delay(200);
				setting.$acItem.eq(5).animate({ top : 100, opacity : 1 }, 1500, DURATION);
				setting.$acItem.eq(6).animate({ top : 410, opacity : 1 }, 1000, DURATION);
				setting.$acItem.eq(7).animate({ right : 10, opacity : 1 }, 1000, DURATION);
				setting.$acItem.eq(8).animate({ left : -40, opacity : 1 }, 1000, DURATION);
				setting.$acItem.eq(9).animate({ bottom : 0, opacity : 1 }, 500, DURATION);
				setting.$acItem.eq(10).animate({ right : 30, opacity : 1 }, 1500, DURATION);
				
				$section.css('position', 'fixed');
				$section.eq(this.nCurrentIndex).siblings().css('z-index', '1');
				$section.eq(this.nCurrentIndex).siblings().stop().animate({
					top : setting.winH
				}, SECOND, 'easeOutCirc');
				$section.eq(this.nCurrentIndex).css('z-index', '3');
				$section.eq(this.nCurrentIndex).stop().animate({
					top : 0
				}, SECOND, 'easeOutCirc');
				
				if(this.nCurrentIndex == 2){
					$modeBackFir.css('width', '60%');
					$modeBackFir.find('figure').eq(0).fadeIn(300);
					$modeBackFir.find('figure').eq(1).hide();
					$modeBackFir.find('.modeText').fadeIn(200);
					$movViewBtn.eq(0).hide();
					$modeBackSec.find('p').hide();
					$modeBackSec.find('figure').eq(0).fadeIn(300);
					$modeBackSec.find('.modeText').fadeIn(200);
					$movMobile.fadeIn(500);
					videoModePlay('mode-video01');
				}else{
					modeFirstStyle();
					videoModeStop('mode-video01');
					videoModeStop('mode-video02');
				}

				$artWorks.css({
					'position' : 'absolute',
					'clip' : 'rect('+setting.winH+'px, 995px,'+setting.winH+'px,0px)'
				});
				$artWorks.eq(0).css({
					'position' : 'absolute',
					'clip' : 'rect(0px, 995px,'+setting.winH+'px,0px)'
				});
				$artWorks.eq(1).css('left', '170px');
			}

			function initEventListener(){
				$('.replayBtn').on({
					'click' : function(event){
						event.preventDefault();
						if(setting.$intro.is(':hidden')){
							introScrolling();
						}
					}
				});
				setting.$notice.find('.closed').on({
				    'click' : function(event){
				        event.preventDefault();
				        setting.$notice.animate({top : -100}, 500, 'easeInOutQuad', function(){
				            $(this).hide();    
				        });
				    }
			    });
				$homeMenu.first().on({
					'click' : function(event){
						event.preventDefault();
						$.fn.playVideo('intro-video');
					}
				});
				$menu.first().on({
					'click' : function(event){
						event.preventDefault();
						$.fn.playVideo('intro-video');
					}
				});
				$home.on({
					'click' : function(event){
						event.preventDefault();
						scrollMoving(0);
					}
				});
				$homeMenu.not($menu.first()).on({
					'click' : function(event){
						event.preventDefault();
						var nIndex = $homeMenu.index(this);
						scrollMoving(nIndex);
					}
				});
				$menu.not($menu.first()).on({
					'click' : function(event){
						event.preventDefault();
						var nIndex = $menu.index(this);
						scrollMoving(nIndex);
					}
				});
				$generalNavi.on({
					'click' : function(event){
						event.preventDefault();
						var idx = $generalNavi.index(this);
						generalArtwork($(this), idx);
					},
					
				});
				$movViewBtn.eq(0).on({
					'click' : function(event){
						modeFirstStyle();
					}
				});
				$movViewBtn.eq(1).on({
					'click' : function(event){
						modeSecondStyle();
					}
				});
				$(document).on({
					'mousewheel' : function(event){
						wheelMovingSection(event);
					},
					'keydown' : function(event){
						switch(event.which){
							case 39: moveSectionNext(event);
							case 40: moveSectionNext(event);
								break;
							case 37: moveSectionPrev(event);
							case 38: moveSectionPrev(event);
								break;

							default: 
								return;
						}
					}
				});
				$(window).on({
					'hashchange' : function(event){
						var value =  window.location.hash.replace('#!page=', '').split('/'),
							idName = ['home', 'world', 'features', 'general', 'community'],
							section = value[0],
							dataId = $('[data-id="'+section+'"]'),
							nIndex = dataId.index();

						scrollMoving(nIndex);
					}
				});
			}
            
            function general(nIndex){
			    //general
				if(nIndex == 2 && generalItem > 0){ 
				    --generalItem;
				    generalArtwork($($generalNavi[generalItem]), generalItem);
				    ++nIndex;
				}else if(nIndex == 3){
				    if(nIndex > this.nCurrentIndex ){
				        generalItem = 0;				        
				    }else if(nIndex < this.nCurrentIndex){
				        generalItem = 5;				             
				    }
				    generalArtwork($($generalNavi[generalItem]), generalItem);                        
                }else if(nIndex == 4  && generalItem < ($generalNavi.length-1)) 
                {   
                    ++generalItem;
                    generalArtwork($($generalNavi[generalItem]), generalItem);
                    --nIndex;                    
                }
				//general	
				//console.log(generalItem + ":" + nIndex);
				return nIndex;
			}
			
			function wheelMovingSection(event){
				var wheelDat = event.deltaY;

                if (wheelDat >= 0) {
					var nIndex = this.nCurrentIndex - 1;
					if(!slideMoving && nIndex >= 0){
					    //general
				        nIndex = general(nIndex);
				        //general				    
						scrollMoving(nIndex);
					}
				} else {
					var nIndex = this.nCurrentIndex + 1;					
					if(!slideMoving && nIndex < secLength){	
				        //general
				        nIndex = general(nIndex);
				        //general
						scrollMoving(nIndex);	
					}
				}
			}

			function moveSectionPrev(event){
				var nIndex = this.nCurrentIndex - 1;
				if(!slideMoving && nIndex >= 0){
				    //general
				    nIndex = general(nIndex);
				    //general
					scrollMoving(nIndex);
				}
			}

			function moveSectionNext(event){
				var nIndex = this.nCurrentIndex + 1;
				if(!slideMoving && nIndex < secLength){
				    //general
				    nIndex = general(nIndex);
				    //general
					scrollMoving(nIndex);	
				}
			}

			function scrollMoving(nIndex){
				if(nIndex > 0){
					$header.fadeIn(300);
					setting.$notice.animate({top : -100}, 500, 'easeInOutQuad');
				} else {
					$header.fadeOut(300);
					setting.$notice.animate({top : 0}, 500, 'easeInOutQuad');
				}
				if(nIndex != 2){
					$modeBackFir.find('figure').eq(0).hide();
					$modeBackSec.find('figure').eq(0).fadeOut(300);
					$movMobile.hide();
					videoModeStop('mode-video01');
					videoModeStop('mode-video02');
					$modeBackFir.find('.modeText').fadeOut(200);
					$modeBackSec.find('.modeText').fadeOut(200);
				}

				slideMoving = true;
				$section.eq(nIndex).addClass('active').siblings().removeClass('active');

				var $element = $('.gtTeagerSection > section.active'),
					pos = $element.position().top,
					value =  window.location.hash.replace('#', '').split('/'),
					section = $section.eq(nIndex).attr('data-id'),
					dataId = $('[data-id="'+section+'"]');

				$section.eq(this.nCurrentIndex).css('z-index', '1');
				$section.eq(this.nCurrentIndex).stop().animate({
					top : pos
				}, 700, 'easeInCirc');
				$section.eq(nIndex).css('z-index', '3');
				$section.eq(nIndex).stop().animate({
					top : 0
				}, SECOND, 'easeOutCirc', function(){
					if(nIndex == 2){
						$modeBackFir.find('figure').eq(0).fadeIn(300);
						$modeBackSec.find('figure').eq(0).fadeIn(300);
						$movMobile.fadeIn(500);
						$modeBackFir.find('.modeText').fadeIn(200);
						$modeBackSec.find('.modeText').fadeIn(200);
						videoModePlay('mode-video01');
					}else{
						modeFirstStyle();
						videoModeStop('mode-video01');
						videoModeStop('mode-video02');
					}

				});
				
			    scrollId = setTimeout(function(){
				    slideMoving = false;
			    }, nIndex == 3 ? 300 : 700);
				
				$.uriAnchor.setAnchor({
					page : section
				});
                
                menuLiActive(nIndex);
                this.nCurrentIndex = nIndex;				
			}

			function menuLiActive(nIndex){
				$menu.removeClass('on');
				$menu.eq(nIndex).not($menu.first()).addClass('on');
			}

			function generalArtwork($item, idx){
			    generalItem = idx;
				var charName = $item.children().text(),
					charEx  = $item.attr('title'),
					rectY = Math.floor(setting.winH / 2);
				
				$artWorks.stop().animate({
					fontSize : setting.winH
				},	{
					step : function(now, fx){
						$(this).css('clip', 'rect('+(now)+'px, 995px,'+setting.winH+'px,0px)')
					}
				}, 1000);

				$artWorks.eq(idx).stop().animate({
					fontSize : 0
				},	{
					step : function(now, fx){
						$(this).css('clip', 'rect('+(now)+'px, 995px,'+setting.winH+'px,0px)')
					}
				}, 1000);

				$generalName.html(charName);
				$generalCon.html(charEx);
				$generalNavi.removeClass('on');
				$generalNavi.stop().animate({marginTop : 0}, 300);
				$item.addClass('on');
				$item.stop().animate({marginTop : -30}, 300);
			}
			
			function modeFirstStyle(){
				$modeBackFir.find('figure').eq(0).delay(500).fadeIn(300);
				$modeBackFir.find('figure').eq(1).fadeOut(100);
				$modeBackSec.find('figure').eq(0).fadeIn(300);
				$modeBackSec.find('figure').eq(1).fadeOut(300);
				$modeBackFir.stop().animate({ width : '60%' }, 500, DURATION);
				$modeBackSec.find('p').fadeOut(300);
				$modeBackFir.find('p').fadeIn(300);
				$movViewBtn.eq(1).delay(300).fadeIn(300);
				$movViewBtn.eq(0).hide();
				$movMobile.stop().animate({ marginLeft : -450}, 500);
				videoModeStop('mode-video02')
				videoModePlay('mode-video01');
			}

			function modeSecondStyle(){
				$modeBackFir.stop().animate({ width : '40%' }, 500, DURATION);
				$modeBackFir.find('figure').eq(0).fadeOut(300);
				$modeBackFir.find('figure').eq(1).delay(500).fadeIn(300);
				$modeBackSec.find('figure').eq(0).fadeOut(300);
				$modeBackSec.find('figure').eq(1).fadeIn(300);
				$modeBackFir.find('p').fadeOut(300);
				$modeBackSec.find('p').fadeIn(300);
				$movViewBtn.eq(0).delay(300).fadeIn(300);
				$movViewBtn.eq(1).hide();
				$movMobile.stop().animate({ marginLeft : -260}, 500);
				videoModeStop('mode-video01');
				videoModePlay('mode-video02');
			}
			
			function videoModePlay(id){
				var videoWrapper = $("#" + id);
				videoWrapper.show();
				videojs(id, {
				'controls': false, 'autoplay': false, 'preload': 'auto'
				}).ready(function() {
					var myPlayer = this;
					myPlayer.play();
				});
			}

			function videoModeStop(id){
				var videoWrapper = $("#" + id);
				videoWrapper.hide();
				videojs(id).ready(function(){
					this.pause();
					this.currentTime(0);
				});
			}

			initModule();
			initEventListener();
		};
		
		if ( $.browser.msie && $.browser.version < 9 ){
			introScrolling();
		}else{
			$('body').queryLoader2({
				barColor : '#867f4f',
				backgroundColor : '#0e1015',
				percentage : true,
				barHeight : 2,
				minimumTime : 200,
				fadeOutTime : 0,
				onComplete : function(){
					var start = new introScrolling();
				    start.scrollToAnchor();
				}
			});
		}
		
	});

})(window, jQuery);
