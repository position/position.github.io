$(window).load(function() {
    setTimeout(scrollTo, 0, 0, 1);
});
/*
$(document).ready(function() {
    docResize();
});

$(window).resize(function() {

    docResize();
});

var docResize = function() {
    var nWidth = $(window).width();
    if (nWidth < 800 && nWidth >= 320) {
        if ($(window).height() < $("body").height()) {
            $("section,footer,.wDiv").width($(window).width() - 17);
        }
        else {
            $("section,footer,.wDiv").width($(window).width());
        }
    }
    var nLeft = Math.round((nWidth - $("section").width()) / 2) + 10;
    $(".navi").css("left", nLeft + "px");
}*/

var imageResize = function() {

    if ($(".galleryLayer").css("display") != "none") {
        try {
            $('.photoSlider > ul > li > img').each(function() {

                var img = new Image();
                img.src = $(this).attr("src");

                var imageWidth = img.width;
                var imageHeight = img.height;
                var maxWidth = $(window).width() * 0.9;
                var maxHeight = $(window).height() * 0.95;
                var nWidth = imageWidth;
                var nHeight = imageHeight;

                if (imageHeight > maxHeight) {

                    nHeight = maxHeight;
                    nWidth = Math.round(imageWidth * (nHeight / imageHeight));

                    if (nWidth > maxWidth) {
                        nWidth = maxWidth;
                        nHeight = Math.round(imageHeight * (nWidth / imageWidth));
                    }
                }
                else if (imageWidth > maxWidth) {
                    nWidth = maxWidth;
                    nHeight = Math.round(imageHeight * (nWidth / imageWidth));

                    if (nHeight > maxHeight) {
                        nHeight = maxHeight;
                        nWidth = Math.round(imageWidth * (nHeight / imageHeight));
                    }
                } else {
                    nWidth = maxWidth;
                    nHeight = Math.round(imageHeight * (nWidth / imageWidth));

                    if (nHeight > maxHeight) {

                        nHeight = maxHeight;
                        nWidth = Math.round(imageWidth * (nHeight / imageHeight));

                    }
                }

                $(this).width(nWidth);
                $(this).height(nHeight);

                $(this).css("margin-top", Math.round(($(window).height() - nHeight) / 2));
                $(this).css("margin-bottom", Math.round(($(window).height() - nHeight) / 2));

            });


        } catch (e) { }
    }
}

var loadingDocument = (function() {

    $(document).ready(function() {
        loadDocument();
    });

    function loadDocument() {
        showLoadPanel(true);

        var docLoader = $(window) || $(document) || $("img");
        docLoader.bind("load", function() {
            showLoadPanel(false);
        });
    }

    function showLoadPanel(bShow) {
        var $loadPanel = $(".loading_panel");
        if (bShow) {
            $loadPanel.css("visibility", "visible");
        } else {
            $loadPanel.css("visibility", "hidden");
        }
    }
})();


var photoSlider = (function() {

    var nCurrentIndex;
    var nWidth;
    var photoSlider;
    var photoSliderLi;
    var photoSliderImg;
    var phoViewBtn;
    var imgTitle;
    var imgView;
    var nPhotoLength;
    var speed = 500;
    var swipeCheck = false;
    var scrollTop;

    $(document).ready(function() {
        init();
        initEventListener();
    });

    $(window).resize(function() {

        nWidth = $(window).width();
        photoSliderLi.width(nWidth);
        imageResize();
        for (i = 0; i < photoSliderLi.length; i++) {
            if (nCurrentIndex != i) {
                $(photoSliderLi[i]).css("opacity", "0");
            }
            $(photoSliderLi[i]).css("left", ((nWidth * (i)) - (nWidth * nCurrentIndex)) + "px");
        }
    });

    function swipeStatus(event, phase, direction, distance, fingers) {
        //console.log(phase + '|' + direction);
        if (phase == "move" && (direction == "left" || direction == "right")) {

            var duration = 0;

            if (direction == "left")
                swipeScrollImages((nWidth * nCurrentIndex) + distance, duration);

            else if (direction == "right")
                swipeScrollImages((nWidth * nCurrentIndex) - distance, duration);
        }
        else if (phase == "cancel") {
            swipeCheck = false;
            swipeScrollImages(nWidth * nCurrentIndex, speed);
        }
        else if (phase == "end") {
            swipeCheck = true;
            if (direction == "right") {
                swipePreviousImage();
            } else if (direction == "left") {
                swipeNextImage();
            }
        }

    }

    function swipePreviousImage() {
        nCurrentIndex = nCurrentIndex - 1;
        if (nCurrentIndex < 0) {
            nCurrentIndex = nPhotoLength - 1;
        }
        swipeScrollImages(nWidth * nCurrentIndex, speed);
    }

    function swipeNextImage() {
        nCurrentIndex = nCurrentIndex + 1;
        if (nCurrentIndex > (nPhotoLength - 1)) {
            nCurrentIndex = 0;
        }
        swipeScrollImages(nWidth * nCurrentIndex, speed);
    }

    function swipeScrollImages(distance, duration) {
        for (i = 0; i < photoSliderLi.length; i++) {
            if (nCurrentIndex == i) {
                $(photoSliderLi[i]).css("opacity", "1");
            } else {
                $(photoSliderLi[i]).css("opacity", "0");
            }
            $(photoSliderLi[i]).css("left", ((nWidth * (i)) - distance) + "px");
        }

        photoImgTitle();
        photoOriginalSize();

    }


    function init() {

        nWidth = $(window).width();
        nCurrentIndex = 0;
        photoSlider = $(".photoSlider > ul");
        photoSliderLi = $(".photoSlider > ul > li");
        photoSliderImg = $(".photoSlider > ul > li > img");
        phoViewBtn = $("a.photo_view");
        imgTitle = $(".title_pho");
        imgView = $("a.ori_view");
        nPhotoLength = photoSliderLi.length;
        photoSlider.width(nWidth * nPhotoLength);
        photoSliderLi.width(nWidth);
        photoSliderLi.css({ opacity: 0, left: nWidth });
        //photoSliderLi.eq(0).css({ opacity: 1, left: 0 });

        photoImgTitle(0);
        photoOriginalSize(0);
    }


    function initEventListener() {

        phoViewBtn.bind("click", function() {
            scrollTop = $(window).scrollTop();
            $(".galleryLayer").show();
            imageResize();
            photoSliderLi.css("opacity", "0");
            nCurrentIndex = phoViewBtn.index(this);
            showImage();

            $("#ygTeaserWrap").hide();
            return false;
        });

        $(".next_btn").bind("click", function() {
            nextImage();
            return false;
        });

        $(".prev_btn").bind("click", function() {
            prevImage();
            return false;
        });

        $(".layer_close, .back_step").bind("click", function() {
            $("#ygTeaserWrap").show();
            $(".galleryLayer").hide();
            $(window).scrollTop(scrollTop);
            return false;
        });

        //Init touch swipe
        photoSliderLi.swipe({

            triggerOnTouchEnd: true,
            swipeStatus: swipeStatus,
            allowPageScroll: "vertical"

        });

        photoSlider.bind("tap", function(id) {
        //console.log("mouseup");
            if (!swipeCheck) {

                var obj = $(".head, .foot");
                if (obj.is(":visible")) {
                    obj.hide();
                } else {
                    obj.show();
                }
            }
            else {
                swipeCheck = false;
            }
        });

    }


    function showImage() {
        var $currentItem = photoSliderLi.eq(nCurrentIndex);
        var nPrevIndex = nCurrentIndex - 1;
        if (nPrevIndex < 0) {
            nPrevIndex = nPhotoLength - 1;
        }
        var $PrevItem = photoSliderLi.eq(nPrevIndex);

        $PrevItem.stop();
        $PrevItem.animate({ opacity: 0, left: -nWidth }, 500);

        $currentItem.css({ opacity: 0, left: nWidth });
        $currentItem.stop();
        $currentItem.animate({ opacity: 1, left: 0 }, 500);

        photoImgTitle();
        photoOriginalSize();
    }

    function nextImage() {
        nCurrentIndex = nCurrentIndex + 1;
        if (nCurrentIndex > nPhotoLength - 1) {
            nCurrentIndex = 0;
        }
        showImage();
    }

    function prevImage() {
        var nNextIndex = nCurrentIndex;
        nCurrentIndex = nCurrentIndex - 1;

        if (nCurrentIndex < 0) {
            nCurrentIndex = nPhotoLength - 1;
        }

        var $currentItem = photoSliderLi.eq(nCurrentIndex);
        var $nextItem = photoSliderLi.eq(nNextIndex);

        $currentItem.css({ opacity: 0, left: -nWidth });
        $currentItem.stop();
        $currentItem.animate({ opacity: 1, left: 0 }, 500);

        $nextItem.stop();
        $nextItem.animate({ opacity: 0, left: nWidth }, 500);

        photoImgTitle();
        photoOriginalSize();

    }

    function photoImgTitle() {
        var photoTitle = photoSliderImg.eq(nCurrentIndex).attr("alt");
        imgTitle.text(photoTitle);
    }

    function photoOriginalSize() {
        var photoUrl = photoSliderImg.eq(nCurrentIndex).attr("src");
        imgView.attr("href", photoUrl);
    }
})();


var naviScrolling = (function() {

    var $navLi;

    $(document).ready(function() {
        init();
        idxScrolling();
        $(window).bind("load", function() {
            scrollSection();
        });
        $(window).bind("resize", function() {
            scrollSection();
        });
        $(window).bind("scroll", function() {
            scrollSection();
        });
    });

    function init() {
        $navLi = $(".navi li a");
    }

    function showDotAt(nIndex) {
        $navLi.each(function(index) {
            $navLi.removeClass("on");
            $navLi.eq(nIndex).addClass("on");
        });
    }

    function idxScrolling() {

        $navLi.bind("click", function() {
            var dataId = $(this).attr("data-id");
            $("html, body").stop().animate({
                scrollTop: $("#" + dataId).offset().top
            }, 500);

            return false;

        });
    }

    function scrollSection() {
        var scrollTop = $("html").scrollTop() == 0 ? $("body").scrollTop() : $("html").scrollTop();
        var bottom = false;
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            bottom = true;
        }
        if (scrollTop == $("#idx1").position().top) {
            showDotAt(0);
        } else if (scrollTop >= $("#idx1").position().top && scrollTop < $("#idx2").position().top) {
            showDotAt(0);
        } else if (scrollTop >= $("#idx2").position().top && scrollTop < $("#idx3").position().top) {
            showDotAt(1);
        } else if (scrollTop >= $("#idx3").position().top && scrollTop < $("#idx4").position().top) {
            showDotAt(2);
        } else if (scrollTop >= $("#idx4").position().top && scrollTop < $("#idx5").position().top) {
            showDotAt(3);
        } else {
            showDotAt(4);
        }
        if (bottom) {
            showDotAt(4);
        }
    }
})();
