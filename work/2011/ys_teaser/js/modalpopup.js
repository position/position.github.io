$(document).ready(function() {

    //이미지 클릭시 페이드 팝업 호출
    $("#main_intro").click(function() {

        var arrLength = $("#main_intro img").attr("src").split("/").length;
        var getBImgName = $("#main_intro img").attr("src").split("/")[arrLength - 1].split(".")[0];

        //페이드 적용 및 css 넓이값 적용
        fadeEffect = $("#posterView01").fadeIn().css({ "width": "700px" });

        //클릭 엘리먼트의 innerhtml 가져오기
        $("#posterView01").html("");
        fadeEffect.prepend(HerosAge.mtmImages[4][getBImgName]).prepend('<img src="http://img.ndoors.com/webdata/yw/teaser/popup/b_pop_closed.jpg" alt="닫기" class="closed">');

        /* 팝업 마진값 */
        var popMargTop = ($('#posterView01').height() + 20) / 2;
        var popMargLeft = ($('#posterView01').width() + 20) / 2;
        //Apply Margin to Popup
        $('#posterView01').css({
            'margin-top': -popMargTop,
            'margin-left': -popMargLeft
        });

        //배경 페이드
        $('body').append('<div id="fade"></div>'); //Add the fade layer to bottom of the body tag.
        $('#fade').css({ 'filter': 'alpha(opacity=80)' }).fadeIn(); //Fade in the fade layer 

    });

    //When you click on a link with class of poplight and the href starts with a # 
    $('a.poplight[href^=#]').click(function() {
        var popID = $(this).attr('rel'); //Get Popup Name
        window.gPopID = popID;
        var popURL = $(this).attr('href'); //Get Popup href to define size

        //Pull Query & Variables from href URL
        var query = popURL.split('?');
        var dim = query[1].split('&');
        var popWidth = dim[0].split('=')[1]; //Gets the first query string value

        // 게시판 글목록 갱신
        fadeEffect = $('#' + popID).fadeIn().css({ 'width': Number(popWidth) });
        if (popID == "yw_writePop") {
            HerosAge.Teaser.getCmmt(HerosAge.page, HerosAge.pageCnt);
            fadeEffect.prepend('<img src="http://img.ndoors.com/webdata/yw/teaser/popup/b_pop_closed.jpg" alt="닫기" class="cancle">');
        } else {
            fadeEffect.prepend('<img src="http://img.ndoors.com/webdata/yw/teaser/popup/b_pop_closed.jpg" alt="닫기" class="closed">');
            //$('#' + popID).fadeIn().css({ 'width': Number(popWidth) });
        }

        if (popID == "popIntroMov") {
            $("#popIntroMov").html(returnFlashContents("http://atlanticavod.gscdn.com/WebData/atlantica2009/swf/NdoorsFLVPlayerGeneral.swf?param_url=http://media.ndoors.com/webmedia/hero/hero_cbt/hero_cbt_vos.flv", "popIntroMov", "800", "500", "transparent", "<param name='menu' value='false' /><param name='allowScriptAccess' value='always' />"));
            $("#popIntroMov").show();
        }

        //Fade in the Popup and add close button




        //Define margin for center alignment (vertical + horizontal) - we add 80 to the height/width to accomodate for the padding + border width defined in the css
        var popMargTop = ($('#' + popID).height() + 20) / 2;
        var popMargLeft = ($('#' + popID).width() + 20) / 2;

        //Apply Margin to Popup
        $('#' + popID).css({
            'margin-top': -popMargTop,
            'margin-left': -popMargLeft
        });

        //Fade in Background
        $('body').append('<div id="fade"></div>'); //Add the fade layer to bottom of the body tag.
        $('#fade').css({ 'filter': 'alpha(opacity=80)' }).fadeIn(); //Fade in the fade layer 

        return false;
    });


    //Close Popups and Fade Layer
    var i = 0;
    $('.closed, .cancle, #fade').live('click', function() { //When clicking on the close or fade layer...
        $('#fade , .popup_block, .popup_intro, #yw_writePop, .popup_notice, .popup_view').fadeOut(function() {
            if (window.gPopID != "popIntroMov") {
                $('#fade, .closed,').remove();
                $(".commentList").html("");
                $(".commentArea").val("");
            } else {
                $("#popIntroMov").html("");
            }
        }); //fade them both out

        return false;
    });
});