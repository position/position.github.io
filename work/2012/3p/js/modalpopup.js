$(document).ready(function(){
						   		   
	//When you click on a link with class of poplight and the href starts with a # 
	$('a.poplight[href^=#]').click(function() {
		var popID = $(this).attr('rel'); //Get Popup Name
		var popURL = $(this).attr('href'); //Get Popup href to define size
		window.gPopID = popID;
				
		//Pull Query & Variables from href URL
		var query= popURL.split('?');
		var dim= query[1].split('&');
		var popWidth = dim[0].split('=')[1]; //Gets the first query string value

		//Fade in the Popup and add close button
		$('#' + popID).fadeIn().css({ 'width': Number( popWidth ) }).prepend('<img src="http://img.ndoors.com/webdata/sampoom/teaser/popup/b_pop_closed.png" alt="창 닫기" class="close" />');
		
		//Define margin for center alignment (vertical + horizontal) - we add 80 to the height/width to accomodate for the padding + border width defined in the css
		var popMargTop = ($('#' + popID).height() + 20) / 2;
		var popMargLeft = ($('#' + popID).width() + 20) / 2;

		if (popID == "popMultimedia") {
			$("#movie_clips01").html(returnFlashContents("http://img.ndoors.com/webdata/sampoom/flvplayer/FLVPlayer.swf?param_url=http://img.ndoors.com/webdata/sampoom/teaser/mov/three_kings.flv&list_seq=1&media_type=0", "movie_clips01", "700", "399", "transparent", "<param name='menu' value='false' /><param name='allowScriptAccess' value='always' />"));
		}
	
		//Apply Margin to Popup
		$('#' + popID).css({ 
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
		
		//Fade in Background
		$('body').append('<div id="fade"></div>'); //Add the fade layer to bottom of the body tag.
		$('#fade').css({'filter' : 'alpha(opacity=90)'}).fadeIn(); //Fade in the fade layer 
		$('#' + popID).css("display","block");
		//$('#lofslidecontent').lofJSidernews( {interval:4000,direction:'opacity',duration:1000,easing:'easeInOutSine'} );
		return false;
	});

	$('a.popMov[href^=#]').click(function() {
		var popID = $(this).attr('rel'); //Get Popup Name
		var popURL = $(this).attr('href'); //Get Popup href to define size
		window.gPopID = popID;
				
		//Pull Query & Variables from href URL
		var query= popURL.split('?');
		var dim= query[1].split('&');
		var popWidth = dim[0].split('=')[1]; //Gets the first query string value

		//Fade in the Popup and add close button
		$('#' + popID).fadeIn().css({ 'width': Number( popWidth ) });
		
		//Define margin for center alignment (vertical + horizontal) - we add 80 to the height/width to accomodate for the padding + border width defined in the css

		 if (popID == "popIntroMov") {

		 	$("#popIntroMov").html(returnFlashContents("http://img.ndoors.com/webdata/sampoom/flvplayer/FLVPlayer.swf?param_url=http://img.ndoors.com/webdata/sampoom/teaser/mov/sampoom_1280_720.flv&param_autostart=true&list_seq=1&media_type=0", "popIntroMov", "100%", "750", "transparent", "<param name='menu' value='false' /><param name='allowScriptAccess' value='always' />"));
			$("#popIntroMov").prepend('<img src="http://img.ndoors.com/webdata/sampoom/teaser/b_movie_skip.gif" alt="건너뛰기" class="skip" />')
			$("#popIntroMov").prepend('<div class="movClose"><img src="http://img.ndoors.com/webdata/sampoom/teaser/popup/b_pop_closed.png" alt="창 닫기" /></div>');
			$("#popIntroMov").prepend('<div class="noView"><input type="checkbox" id="view" class="vm" /> <label for="view">오늘하루그만보기</label></div>');
        }


		//Fade in Background
		$('body').append('<div id="fade"></div>'); //Add the fade layer to bottom of the body tag.
		$('#fade').css({'filter' : 'alpha(opacity=90)'}).fadeIn(); //Fade in the fade layer 

		return false;
	});
	
	
	//Close Popups and Fade Layer
	$('.close, .skip, #fade').live('click', function() { //When clicking on the close or fade layer...
	  $('#fade , .popup_block, .popup_intro, .popup_notice').fadeOut(function() {
	    if (window.gPopID == "popMultimedia") {
                $('#fade, .closed,').remove();
		$("#movie_clips01").html("");
            } else if (window.gPopID == "popIntroMov") {		
                $("#popIntroMov").html("");
            } else {
                $('#fade, .closed,').remove();
	    }
			
		}); //fade them both out
		$('#fade , .popup_block, .popup_intro, .popup_notice').css("display","none");
		return false;
	});
				
});