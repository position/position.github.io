//작성자 : 최경환(positionfov@gmail.com)
//최종수정 : 2015.1.3

(function($){
	
	//2번 탭메뉴
	$.fn.tabMenu = function(){
		return this.each(function(){
			var $this = $(this),
				$menu = $this.find('.mu > a'),
				$tabContents = $this.find(".tabContents"),
				nCurrentIndex = Math.floor(Math.random() * $menu.length);
			
			var setter = {
				init : function(){
					setter.showContents(nCurrentIndex);
				},

				initEventListener : function(){
					$menu.on({
						'click' : function(e){
							e.preventDefault();
							var nIndex = $menu.index(this);
							setter.showContents(nIndex);
						},
						'focusin' : function(e){
							e.preventDefault();
							var nIndex = $menu.index(this);
							setter.showContents(nIndex);
						}
					});
				},

				showContents : function(nIndex){
					$menu.removeClass('on');
					$menu.eq(nIndex).addClass('on');
					$tabContents.hide();
					$tabContents.eq(nIndex).show();
				}
			};
		
			setter.init();
			setter.initEventListener();
		});
	}

	//3번 배너 슬라이더
	$.fn.sliderBanner = function(){
		return this.each(function(){
			var $this = $(this),
				$panel = $this.find('.viewList'),
				$thum = $this.find('.thumList'),
				$thumLi = $thum.find('a'),
				thumLength = $thumLi.length,
				PANELWIDTH = 304,
				LIWIDTH = 74,
				panelWid = PANELWIDTH * thumLength,
				thumWid = LIWIDTH * thumLength;
				$prevBtn  = $this.find('.prevBtn'),
				$nextBtn  = $this.find('.nextBtn'),
				nCurrentIndex = 0;

			var setter = {
				init : function(){
					$thumLi.eq(nCurrentIndex).addClass('on');
					$panel.width(panelWid);
					$thum.width(thumWid);
					if(nCurrentIndex == 0){
						$prevBtn.hide();
					}
				},

				initEventListener : function(){
					$nextBtn.on({
						'click' : function(){
							setter.nextBanner();
						}
					});
					$prevBtn.on({
						'click' : function(){
							setter.prevBanner();
						}
					});
					$thumLi.on({
						'click' : function(e){
							e.preventDefault();
							var nIndex = $thumLi.index(this);
							if(nIndex == 0){
								$prevBtn.fadeOut(200);
							}else{
								$prevBtn.fadeIn(200);
							}
							if(nIndex > thumLength - 2){
								$nextBtn.fadeOut(200);
							}
							setter.showThumList(nIndex);
						}
					});
				},

				prevBanner : function(){
					var nIndex = nCurrentIndex - 1;
					
					if(nIndex == 0){
						$prevBtn.fadeOut(200);
					}

					if(nIndex >= 0){
						if(nIndex < thumLength - 1){
							$nextBtn.fadeIn(200);
						}
						setter.showThumList(nIndex);
					}
				},

				nextBanner : function(){
					var nIndex = nCurrentIndex + 1;
					if(nIndex > 0){
						$prevBtn.fadeIn(200);
					}
					if(nIndex > thumLength - 2){
						$nextBtn.fadeOut(200);
					}
					setter.showThumList(nIndex);
				},

				showThumList : function(nIndex){
					if (nIndex != nCurrentIndex){
						var xPos = -PANELWIDTH * nIndex,
							nPos = -LIWIDTH * nIndex;							;

						setter.showThumListActive(nIndex);
						$panel.stop().animate({left : xPos}, 400);
						$thum.stop().animate({left : nPos}, 400);
						
						nCurrentIndex = nIndex;	
					}
				},

				showThumListActive :  function(nIndex){
					$thumLi.removeClass('on');
					$thumLi.eq(nIndex).addClass('on');
				}
			};
		
			setter.init();
			setter.initEventListener();
		});
	}

	//4번 배너 마우스 오버
	$.fn.productOverlay = function(){
		return this.each(function(){
			var $this = $(this),
				$bannerLi = $this.find('li');
			
			var setter = {
				initEventListener : function(){
					$bannerLi.on({
						'mouseenter' : function(){
							$(this).find('.viewOverlay').fadeIn(200);
						},
						'mouseleave' : function(){
							$(this).find('.viewOverlay').fadeOut(200);
						}
					});
				}
			};
			setter.initEventListener();
		});
	}

	//5번 회원가입 유효성 체크
	$.fn.validateCheck = function(){
		return this.each(function(){
			$(this).submit(function() {
				var id = $('input[name=uid]'),
					pw = $('input[name=upw]'),
					re_pw = $('input[name=upw_r]'),
					email_a = $('input[name=email01]'),
					email_b = $('input[name=email02]'),
					uname = $('input[name=uname]'),
					c_num = $('input[name=c_num]'),
					l_num = $('input[name=l_num]');

				if(id.val().length == 0){
					id.focus();
					alert("아이디를 입력하세요");
					return false;
				}else if(email_a.val().length == 0){
					email_a.focus();
					alert("이메일 아이디를 입력하세요");
					return false;
				}else if(email_b.val().length == 0){
					email_b.focus();
					alert("이메일 제공 업체를 입력하세요");
					return false;
				}else if(pw.val().length == 0){
					pw.focus();
					alert("비밀번호를 입력하세요");
					return false;
				}else if(re_pw.val().length == 0){
					re_pw.focus();
					alert("비밀번호를 한번 더 입력하세요");
					return false;
				}else if(uname.val().length == 0){
					uname.focus();
					alert("이름을 입력하세요");
					return false;
				}else if(c_num.val().length == 0){
					c_num.focus();
					alert("휴대폰 중간 번호를 입력하세요");
					return false;
				}else if(l_num.val().length == 0){
					l_num.focus();
					alert("휴대폰 마지막 번호를 입력하세요");
					return false;
				}else if(!$(':input:radio[name=user]:checked').val()){
					alert("성별을 선택해주세요.");
					return false;
				}else if(!$('#useAgree').is(':checked')){
					alert("이용약관에 동의를 선택해주세요.");
					return false;
				}else if(!$('#infoAgree').is(':checked')){
					alert("개인정보 취급방침에 동의를 선택해주세요.");
					return false;
				}else{
					alert('가입 완료 되었습니다.');
				}
			});
		});
	}

	//6번 쿠팡 연혁 슬라이더(자유컨텐츠)
	$.fn.historySlider = function(){
		return this.each(function(){
			var nCurrentIndex = 0;
			var setter = {
				init : function(){
					$navi = $(".historyNavi li a");
					$scrollArea = $(".historyWrap");
					$blockItem = $(".yearDiv");
					setter.selectYear(nCurrentIndex);
					setter.scrollMove(nCurrentIndex);
				},

				initEventListener : function(){
					$navi.on({
						click : function(event){
							event.preventDefault();
							var nIndex = $navi.index(this);
							setter.selectYear(nIndex);
							setter.scrollMove(nIndex);
							
						}
					});
				},

				scrollMove : function(nIndex){
					var msgHeight = $blockItem.outerHeight();
					var pos = msgHeight * nIndex;

					$scrollArea.stop().animate({scrollTop : pos}, 500);

					nCurrentIndex = nIndex
				},

				selectYear : function(nIndex){
					$navi.eq(nCurrentIndex).removeClass("on");
					$navi.eq(nIndex).addClass("on");
				}

			}
			setter.init();
			setter.initEventListener();
		});
	}
	
})(jQuery);

