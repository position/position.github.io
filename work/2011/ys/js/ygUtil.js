var device = (function(){
    
    var deviceName = "pc";
    
    var userAgent = navigator.userAgent.toLocaleLowerCase();
    if(userAgent.indexOf("android") != -1){
        deviceName = "android";
    }else if(userAgent.indexOf("iphone") != -1){
        deviceName = "iphone";
    }else if(userAgent.indexOf("ipad") != -1){
        deviceName = "ipad";
    }else if(userAgent.indexOf("ipod") != -1){
        deviceName = "ipod";
    }
    
    return deviceName;
    
})();

var snsShare = function(sns, msg, url) {


    var snsUrl = "";
    var popupWidth = 0;
    var popupHeight = 0;

    if (url == undefined || url == null) {
        url = location.href;
    }
    
    switch (sns) {

        case "facebook":
            snsUrl = (device == "pc" ? "http://www.facebook.com/sharer.php?" : "http://m.facebook.com/sharer.php?") + "t=" + encodeURIComponent(msg) + "&u=" + encodeURIComponent(url);
            popupWidth = 520;
            popupHeight = 400;
            if (device == "pc") {
                window.open(snsUrl, sns, 'width=' + popupWidth + ', height=' + popupHeight + ',resizable=yes,scrollbars=yes');
            }
            else {
                top.location.href = snsUrl;
            }
            break;

        case "twitter":
            snsUrl = (device == "pc" ? "http://twitter.com/share?" : "https://twitter.com/intent/tweet?") + "url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(msg);
            popupWidth = 550;
            popupHeight = 430;
            if (device == "pc") {
                window.open(snsUrl, sns, 'width=' + popupWidth + ', height=' + popupHeight + ',resizable=yes,scrollbars=yes');
            }
            else {
                top.location.href = snsUrl;
            }
            break;

        case "kakao":
            if (device == "pc") {
                alert("카카오톡이 설치된 스마트폰에서만 이용가능합니다.");
            } else {
                kakao.link("talk").send({
                    msg: msg,
                    url: url,
                    appid: document.domain,
                    appver: "2.0",
                    appname: "영웅의군단",
                    type: "link"
                });
            }
            break;
    }
}

var appDown = function() {

    if (device == "pc") {
        alert("안드로이드OS 의 스마트폰에서만 게임 다운로드가 \n가능합니다. 모바일에서 영웅의 군단을 검색하고 \n게임을 다운도르 받으세요!");
    } else if (device == "iphone" || device == "ipad" || device == "ipod") {
        alert("iOS 는 준비중입니다. 지금은 안드로이드OS \n에서만 게임 다운로드가 가능합니다.");
    } else {
        var url = androidAppLink("");
        if (url == "") {
            alert("준비중입니다.");
        } else {
            if (url.indexOf("http") != -1) {
                window.open(url);
            }
            else {
                location.href = url;
            }
        }
    }
}

var androidAppLink = function(id) {

    var url = "";
    if (id != "") {
    
        if (device == "android") {
            url = "market://details?id=" + id;
        }
        else {
            url = "https://play.google.com/store/apps/details?id=" + id;
        }
    }

    return url;
}