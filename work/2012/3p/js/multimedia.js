$(document).ready(function(){
	multiTab();
	initFanSite();
	initEventListenerFanSite();
	showFansiteAt(0);

});


/* //////// 멀티미디어 탭 ///////// */

function multiTab() {
	$(".multiContents").hide();
	$("ul.multiTab li:first").addClass("active").show();
	$(".multiContents:first").show();

	$("ul.multiTab li").click(function(){
		$("ul.multiTab li").removeClass("active");
		$(this).addClass("active");
		$(".multiContents").hide();
		var activeTab = $(this).find("a").attr("href");
		$(activeTab).fadeIn();
		$("#movie_clips01").html(returnFlashContents("http://img.ndoors.com/webdata/sampoom/flvplayer/FLVPlayer.swf?param_url=http://img.ndoors.com/webdata/sampoom/teaser/mov/three_kings.flv&list_seq=1&media_type=0", "movie_clips01", "700", "399", "transparent", "<param name='menu' value='false' /><param name='allowScriptAccess' value='always' />"));
		return false;
	});
}

/* //////// 멀티미디어 탭 ///////// */




/* //////// 팬사이트 키트 썸네일 가로 스크롤링 ///////// */

var FANSITE_WIDTH		=862;
var SHOW_DURATION		=500;
var AUTO_PLAY_TIME		=2000;
var $fansiteWrap;
var $fansiteItems;
var nCurrentIndex;
var $fansiteIndexButtons;
var $currentfansiteIndexButton;
var $fansiteManager;

function initFanSite()
{
	this.$fansiteWrap	=$(".wallpaperList");
	this.$fansiteItems	=$(".wallpaperList .listWrap");
	this.$fansiteWrap.width(FANSITE_WIDTH*this.$fansiteItems.size());
	this.nCurrentIndex	=0;
	this.$fansiteIndexButtons	= $(".circleBtn span");
	this.$fansiteManager			=$(".fansiteKit");
}

function initEventListenerFanSite()
{
	this.$fansiteIndexButtons.click(function(){
		var nIndex = $(this).attr("data-id");
		showFansiteAt(nIndex);
	});
}

function showFansiteAt(nIndex)
{
	this.nCurrentIndex		= nIndex;
	// indexButton활성화 처리.
	this.activeIndexButton(this.nCurrentIndex);
	// 배너움직이기.
	var nPosition		= - FANSITE_WIDTH*nCurrentIndex;
	$fansiteWrap.stop();
	$fansiteWrap.animate({
			left:nPosition
		},
		SHOW_DURATION, 
		"easeInOutQuad"
	);
}

/*	 index버튼 활성화 처리. */
function activeIndexButton(nIndex)
{
	if(this.$currentfansiteIndexButton)
		this.$currentfansiteIndexButton.removeClass("on");
	this.$currentfansiteIndexButton	= $fansiteIndexButtons.eq(nIndex);
	this.$currentfansiteIndexButton.addClass("on");
}

/* //////// 팬사이트 키트 썸네일 가로 스크롤링 ///////// */

function img_change(t, v) {
	$("#screenSel").remove();
	$(t).prepend("<span class='sel' id='screenSel'></span>");            
	$("#screenView").html("<img src='http://img.ndoors.com/webdata/sampoom/teaser/popup/v_s_img_"+v+".jpg' />");
}
var img_u = 0;        
function img_scroll(v) {
	if (v == 1) {
		img_u = img_u + 101;
		$(".screen-nav").animate({ scrollTop: img_u }, 500);
	} else {
		if (img_u > 0) {
			img_u = img_u - 101;
			$(".screen-nav").animate({ scrollTop: img_u }, 500);
		}
	}
}

