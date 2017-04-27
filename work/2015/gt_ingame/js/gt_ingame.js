
var gtNotice = function(obj){
	var nCurrentIndex = 0,
		nTimer = 0,
		$notList = $('.notListWrap > li > a'),
		$viewArea = $('.'+obj).find('.notViewArea'),
		$topNotList = $('.importNotice > li'),
		$topViewArea = $('.topNotice .notViewArea'),
		$btn = $('.btn');

	function init(){
		$notList.removeClass('active');
		$topNotList.removeClass('active');
		$viewArea.hide();
		$topViewArea.hide();
		$topNotList.css('transform', 'translate(0px, 50px)');
		$topNotList.eq(nCurrentIndex).css('transform', 'translate(0px, 0px)');
		
		startRolling(nCurrentIndex);
	}

	function initEventListener(){
		$topNotList.find('a').on('click', function(e){
			e.preventDefault();
			var nIndex = $topNotList.index(this);
			$topNotList.removeClass('active');	
			$(this).addClass('active');
			$topViewArea.hide();
			$topViewArea.eq(nIndex).show();
			$btn.hide();
			stopRolling();
		});
		$topViewArea.find('.closeSlideBtn').on('click', function(){
			$topNotList.find('a').removeClass('active');
			$topViewArea.hide();
			$btn.show();
			startRolling(nCurrentIndex);
		});

		$notList.not('.faqList > a').on('click', function(e){
			e.preventDefault();
			var nIndex = $notList.index(this);
			$notList.removeClass('active');
			$(this).addClass('active');
			$viewArea.hide();
			$viewArea.eq(nIndex).show();
		});
		$viewArea.find('.closeSlideBtn').on('click', function(){
			$notList.removeClass('active');
			$viewArea.hide();
		});
	}

	function startRolling(nIndex){
		nTimer = setInterval(function(){
			nextScroll();
		}, 3000);
	}

	function stopRolling(){
		if(nTimer != 0){
			clearInterval(nTimer);
		}
		nTimer = 0;
	}

	function nextScroll(){
		var nIndex = nCurrentIndex + 1;
		if(nIndex >= $topNotList.length){
			nIndex = 0;
		}
		noticeRolling(nIndex);
	}

	function noticeRolling(nIndex){
		$topNotList.css('transition', 'transform 0.5s ease-in-out');
		$topNotList.eq(nIndex).css('transform', 'translate(0px, 0px)');
		$topNotList.eq(nCurrentIndex).css('transform', 'translate(0px, 40px)');
		
		nCurrentIndex = nIndex;
	}

	init();
	initEventListener();
}

