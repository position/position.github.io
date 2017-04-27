/*----------------------------------------------
* 네임스페이스: yw
* 영웅시대 화면 티저용 객체 
* 화면 요소 제어
*----------------------------------------------*/
var result = "";
var totalCnt = 0;

(function() {
    $.ajaxSetup({ cache: false });
    $.getJSON("/Teaser/apiGetCommentCnt?jsoncallback=", "", function(data) {
        totalCnt = parseInt(data["result"], 10);
    });
})();

function trim(str) {
    return $.trim(str);
}

/* class:HerosAge */
HerosAge = {
    baseUrl: "http://yw.ndoors.com",
    singUpUrl: "https://signup.ndoors.com",
    csUrl: "https://cs.ndoors.com",
    imgUrl: "http://img.ndoors.com",
    SSOChkYN: "",
    userID: "",
    userName: "",
    TeaserEventComplete: "",
    pageCnt: 6,
    page: 1,
    totalPageCnt: 0,
    mtmImages: [
            {
                'v_wall_thumb01': '<img src=http://img.ndoors.com/webdata/yw/teaser/v_wall_img01.jpg title="공식 포스터">',
                'v_wall_thumb02': '<img src=http://img.ndoors.com/webdata/yw/teaser/v_wall_img02.jpg title="검성회무도가">',
                'v_wall_thumb03': '<img src=http://img.ndoors.com/webdata/yw/teaser/v_wall_img03.jpg title="흑룡회무사">',
                'v_wall_thumb04': '<img src=http://img.ndoors.com/webdata/yw/teaser/v_wall_img04.jpg title="지옥문독술사">',
                'v_wall_thumb05': 'hero_char1',
                'v_wall_thumb06': 'hero_char2',
                'v_wall_thumb07': 'hero_char3',
                'v_wall_thumb08': 'hero_char4',
                'v_wall_thumb09': 'hero_char5',
                'v_wall_thumb10': 'hero_char6'
            },
            {
                'v_wall_thumb01': 'http://img.ndoors.com/webdata/yw/teaser/down/poster.zip',
                'v_wall_thumb02': 'http://img.ndoors.com/webdata/yw/teaser/down/character_01.zip',
                'v_wall_thumb03': 'http://img.ndoors.com/webdata/yw/teaser/down/character_02.zip',
                'v_wall_thumb04': 'http://img.ndoors.com/webdata/yw/teaser/down/character_03.zip'
            },
            {
                'v_wall_thumb01': '공식 포스터',
                'v_wall_thumb02': '검성회무도가',
                'v_wall_thumb03': '흑룡회무사',
                'v_wall_thumb04': '지옥문독술사',
                'v_wall_thumb05': '검성회검객',
                'v_wall_thumb06': '검성회무도가',
                'v_wall_thumb07': '흑룡회무사',
                'v_wall_thumb08': '흑룡회총신',
                'v_wall_thumb09': '지옥문독술사',
                'v_wall_thumb10': '지옥문환술사'
            },
            {
                //3000 x 4335ㅣ3.06MB l JPG
                'v_wall_thumb01': '3000 x 4335 | 3.06MB | JPG',
                'v_wall_thumb02': '1000 x 1200 | 192KB | JPG',
                'v_wall_thumb03': '1000 x 1200 | 253KB | JPG',
                'v_wall_thumb04': '1000 x 1200 | 236KB | JPG',
                'v_wall_thumb05': '7.6MB',
                'v_wall_thumb06': '7.6MB',
                'v_wall_thumb07': '7.6MB',
                'v_wall_thumb08': '7.7MB',
                'v_wall_thumb09': '16.6MB',
                'v_wall_thumb10': '16.7MB'
            },
           {
               //멀티미디어 쉐도우 팝업에 바인딩 되는 이미지(key: v_wall_img03.jpg, value: .....jpg)
               'v_wall_img01': '<img src="http://img.ndoors.com/webdata/yw/teaser/down/v_yw_poster.jpg" class="viewImg" />',
               'v_wall_img02': '<img src="http://img.ndoors.com/webdata/yw/teaser/down/v_character_01.jpg" class="viewImg" />',
               'v_wall_img03': '<img src="http://img.ndoors.com/webdata/yw/teaser/down/v_character_02.jpg" class="viewImg" />',
               'v_wall_img04': '<img src="http://img.ndoors.com/webdata/yw/teaser/down/v_character_03.jpg" class="viewImg" />'
           }
    ],
    badwordcheck: function(usersInput) {
        var temp = usersInput;
        temp = temp.toLowerCase();

        var word = [];
        word = ["18", "십8", "10팔", "18넘", "18년", "18놈", "18뇬", "가I사IㄲI", "개넘", "개년", "개놈", "개뇬", "개뇽", "개늠", "개보지", "개새", "개새끼", "개세", "개쉐", "개쉐리", "개쉐이", "개쉐이", "개쒜리", "개자", "개자싁", "개자식", "개자지", "개호로", "거I서IㄲI", "게보지", "게세끼", "게자지", "게호로", "고딩", "고딩어", "골까", "그새끼", "까대", "까댄", "까댄", "까댐", "까뗌", "깟뎀", "눈깔", "눈탱이", "눈텡이", "뉘미", "뉘미랄", "늬미", "니기미", "니미", "니미랄", "니미럴", "니엄창", "닝기리", "닝기미", "당근이지", "덥쳐", "덮쳐", "뒈저", "뒈져", "뒤저", "디져", "때끼", "띠바", "띠바랄", "띠발", "띠발넘", "띠발놈", "띠방", "띠밸놈", "띠벌", "띠벌넘", "띠벌놈", "띠벌늠", "띠부랄", "띠부럴", "띠불", "띠붕", "띠이발", "띠이방", "띠이벌", "띠이불", "띠이붕", "띠이팔", "띠이펄", "띠이풀", "띠팔", "띠펄", "띠풀", "띱때", "띱때끼", "띱새", "띱새끼", "말밥", "미췬넘", "미췬년", "미췬놈", "미췬뇬", "미췬늠", "미친", "미친넘", "미친년", "미친놈", "미친뇬", "미친늠", "미친새끼", "바가조", "박아줘", "발넘", "발년", "발놈", "발뇬", "발늠", "벌려줘", "벗겨", "병신", "보지1", "부랄", "브랄", "빙시", "빙신", "빠가", "빠구리", "빠큐", "빡아", "빡큐", "뻐큐", "뻑큐", "뽀작", "뽁큐", "새꺄", "새끼", "색끼", "색스", "세끼", "섹스", "섹쓰", "쉐리야", "쉑스", "쉑스", "쉬발", "쉬방", "쉬밸", "쉬벌", "쉬불", "쉬붕", "쉬빨", "쉬이발", "쉬이방", "쉬이벌", "쉬이불", "쉬이붕", "쉬이빨", "쉬이팔", "쉬이펄", "쉬이풀", "쉬팔", "쉬펄", "쉬퐁", "쉬풀", "시발", "시밸", "시버리지", "시벌", "시벌내미", "시부럴", "시불", "시붕", "시이발", "시이벌", "시이불", "시이붕", "시이팔", "시이펄", "시이풀", "시팔", "시펄", "시퐁", "시풀", "십때끼", "십새", "십새끼", "십새리", "십쉐", "십쉐리", "십쉐이", "십쌔리", "십쎄끼", "십쎄리", "쌍넌", "쌍넘", "쌍넘", "쌍년", "쌍뇬", "쌍늠", "쌔끼", "쌕쓰", "썅", "썅넘", "썅놈", "썅뇬", "쒸발", "쒸방", "쒸벌", "쒸불", "쒸붕", "쒸빨", "쒸이발", "쒸이방", "쒸이벌", "쒸이불", "쒸이붕", "쒸이빨", "쒸이팔", "쒸이펄", "쒸이풀", "쒸팔", "쒸펄", "쒸풀", "쓰바", "쓰벌", "쓰불", "쓰으벌", "씨바", "씨바랄", "씨바알", "씨발", "씨발놈", "씨방", "씨밸", "씨벌", "씨벌놈", "씨벨", "씨부란스", "씨부랄", "씨불", "씨불알", "씨붕", "씨빨", "씨이발", "씨이방", "씨이벌", "씨이불", "씨이붕", "씨이빨", "씨이팔", "씨이펄", "씨이풀", "씨팔", "씨팔놈", "씨펄", "씨퐁", "씨풀", "씹", "씹새", "씹새끼", "씹새롱", "씹새리", "씹세리", "씹쉐", "씹쉐", "씹쉐리", "씹쎄끼", "씹창", "씹탱", "ㅇ ㅐ자", "ㅇㅐㅈㅏ", "ㅇㅐ자", "아가리", "아비", "아작", "애미", "애미보지", "애비", "애자", "pointbang.com", "양아치", "어미", "엄창", "엠병", "연나", "열라", "염병", "엿가튼", "엿같은", "오입", "이빨까", "이새끼", "이시끼", "자지1", "잡넘", "잡년", "잡놈", "잡뇬", "잡뇽", "잡늠", "저까", "저까튼", "저새끼", "적까튼", "전나", "전나게", "전나구려", "절라", "젓가튼", "젓같은", "젓나", "젓밥", "젖밥", "져까튼", "젼나", "젼나게", "젼나구려", "졀라", "조까", "조까튼", "존나", "존나게", "졸라", "좁밥", "좃", "좃나", "좃도", "좃밥", "좃빱", "좆", "좆나", "좆밥", "좆빱", "좇", "좇나", "좇도", "좇밥", "좇빱", "중딩", "지랄", "지롤", "직딩", "짜저", "짜져", "쪼까튼", "찌랄", "창녀", "초딩 ", "팔놈", "팔뇬", "하셈", "허접", "현 거래", "현거래", "현금 거래", "현금거래", "호로", "호로새끼", "호좁", "현금", "현으로", "현 으로", "현에", "ㄱ ㅐ새", "ㄱ ㅐ색", "pointbang.com"];
        for (var j = 1; j < word.length; j++) {

            if (temp.indexOf(word[j]) != -1) {
                alert("\'" + word[j] + "\'는(은) 적절치 못한 단어입니다. \n바르고 고운말을 씁시다.");
                usersInput = false;
                break;
            }
            else {
                usersInput = true;
            }
        }
        return usersInput;
    },

    init: function() {
        HerosAge.Teaser.gnbMsg();
        HerosAge.Teaser.miniMenu();
        HerosAge.view.commentArea();
        HerosAge.Teaser.getCmmt(HerosAge.page, HerosAge.pageCnt);

        // $(".paginate").pager({ pagenumber: HerosAge.page, pagecount: HerosAge.totalPageCnt, buttonClickCallback: HerosAge.view.PageClick });
        //HerosAge.Teaser.getCmmt(HerosAge.page, HerosAge.pageCnt);
        //HerosAge.Teaser.CBT();
    }
}

/* View */
HerosAge.view = {
    alertLogin: "<div class='popup1'><p class='strLogin'><img src='" + HerosAge.imgUrl + "/webdata/yw/teaser/popup/t_pop_login.png' alt='로그인 후 응모가 가능합니다!' /></p><p class='btn_ok'><a onclick='HerosAge.Teaser.login()' style='cursor:pointer'><img src='" + HerosAge.imgUrl + "/webdata/yw/teaser/popup/b_pop_confirm.gif' alt='확인' /></a></p></div>",
    ssoCheck: "<div class='popup1'><p class='strLogin'><img src='" + HerosAge.imgUrl + "/webdata/yw/teaser/popup/t_pop_cbt01.png' alt='영웅시대 CBT에 참여하시겠습니까? 영웅시대는 19세 이상 플레이 가능합니다.' /></p><p class='btn_ok2'><a href='javascript:HerosAge.Teaser.CBTOk();'><img src='" + HerosAge.imgUrl + "/webdata/yw/teaser/popup/b_pop_confirm.gif' alt='확인' title='확인' /></a>&nbsp;<a onclick=HerosAge.Teaser.closePopup('#yw_popupWrap'); style=cursor:pointer;><img src='" + HerosAge.imgUrl + "/webdata/yw/teaser/popup/b_pop_cancle.gif' alt='취소' title='취소' /></a></p></div>",
    completeCBT: "<div class='popup1'><p class='strLogin'><img src='" + HerosAge.imgUrl + "/webdata/yw/teaser/popup/t_pop_cbt02.png' alt='CBT 신청이 완료 되었습니다.' /></p><p class='alert'><p><strong>11월 14일</strong> 다시 방문하시면 <strong>당첨 여부</strong>를 알려드립니다.</p><p>가입 시 email과 SMS를 확인하세요.</p></p><p class='btn_ok3'><a onclick='HerosAge.Teaser.CBTComplete();' style='cursor:pointer'><img src='" + HerosAge.imgUrl + "/webdata/yw/teaser/popup/b_pop_confirm.gif' alt='확인' /></a>&nbsp;<a onclick=HerosAge.Teaser.closePopup('#yw_popupWrap'); style=cursor:pointer;><img src='" + HerosAge.imgUrl + "/webdata/yw/teaser/popup/b_pop_cancle.gif' alt='취소' /></a></p></div>",
    loginMinimenu: "<li><a href='" + HerosAge.singUpUrl + "/Auth/Login?site=yw'>로그인</a> |</li><li><a href='" + HerosAge.singUpUrl + "/Join/Ndoors?site=yw'>회원가입</a></li>",
    logoutMinimenu: "<li><a href='" + HerosAge.singUpUrl + "/Auth/Logout?site=yw'>로그아웃</a> |</li><li><a href='" + HerosAge.singUpUrl + "/Mypage/Ndoors?site=yw' target='_blank'>회원정보</a></li>",
    gnbMsg: function(userName) {
        /* return "<p class='gnbmsg'>" + HerosAge.userName + "님. CBT 신청 완료되었습니다. 11월 14일 당첨자 발표를 기다려 주세요.</p>"; */
    },
    commentArea: function() {
        if (HerosAge.SSOChkYN == "false") {
            $(".commentArea").val("의견 작성을 위해 로그인을 해주세요.");
        } else {
            $(".commentArea").val("");
        }
        $(".commentArea").keyup(function() {
            $(".limit").text( $(".commentArea").val().length + "/100" );    //text length
            HerosAge.badwordcheck( $(".commentArea").val() );   //욕설
        });
        $(".commentArea").bind('click', function() {
            if (HerosAge.SSOChkYN == "false") {
                var conf = confirm("먼저 로그인 하셔야합니다.\n로그인 페이지로 이동하시겠습니까?"+"\n");
                if (conf) {
                    location.href = "https://signup.ndoors.com/Auth/Login?site=yw";
                }
            }
        });
    },
    PageClick: function(pageclickednumber) {
        HerosAge.Teaser.getCmmt(pageclickednumber, HerosAge.pageCnt);
    }
}


/* Controller */
HerosAge.Teaser = {
    gnbMsg: function() {
        var data = "";
        var sendParams = { "SSO": HerosAge.SSOChkYN, "UserID": HerosAge.userID };
        $.ajaxSetup({ cache: false });
        $.getJSON("/api/GetCBTYN?jsoncallback=", sendParams, function(data) {
            if (data["result"] == "0") {
                $("#gnb").append(HerosAge.view.gnbMsg(HerosAge.userName));
            }
        });
    },
    InsCmmt: function() {   //input comment
        var data = "";
        var sendParams = { "Comment": trim($(".commentArea").val()) };

        if (trim($(".commentArea").val()).length > "100") {
            alert("100자가 넘습니다.");
            $(".commentArea").focus();
            return false;
        } else if (trim($(".commentArea").val()) == "") {
            alert("내용을 입력하세요.")
            $(".commentArea").focus();
            return false;
        } else {
            $.ajaxSetup({ cache: false });
            $.getJSON("/Teaser/apiInsComment?jsoncallback=", sendParams, function(dt) {
                if (dt["result"] != "-1") {
                    alert(dt["result"]);
                } else {
                    HerosAge.Teaser.getCmmt(HerosAge.page, HerosAge.pageCnt);
                    $(".commentArea").val("");
                    $(".limit").text("0/100");
                    $(".commentArea").focus();
                }
            });
        }
    },
    miniMenu: function() {
        var strMiniMenu = "";
        if (HerosAge.SSOChkYN == "true") {
            strMiniMenu += HerosAge.view.logoutMinimenu;
        }
        else {
            strMiniMenu += HerosAge.view.loginMinimenu;
        }
        //strMiniMenu += "<li><a href='" + HerosAge.csUrl + "' target='_blank'>고객센터</a></li>";
        $("#minimenu").html(strMiniMenu);
    },

    getCmmt: function(pn, ps) {
        var data = "";
        var sendParams = { "pageNo": pn, "PageSize": ps };
        $.ajaxSetup({ cache: false });
        $.getJSON("/Teaser/apiReadComment?jsoncallback=", sendParams, function(data) {
            (function() {
                $.ajaxSetup({ cache: false });
                $.getJSON("/Teaser/apiGetCommentCnt?jsoncallback=", "", function(data) {
                    totalCnt = parseInt(data["result"], 10);
                });
            })();
            HerosAge.Teaser.makeCmmtList(data);
            if ((totalCnt % HerosAge.pageCnt) == 0) {
                HerosAge.totalPageCnt = parseInt((totalCnt / HerosAge.pageCnt), 10);
                if (HerosAge.totalPageCnt == -1) {
                    HerosAge.totalPageCnt = 1;
                }

            } else {
                HerosAge.totalPageCnt = parseInt((totalCnt / HerosAge.pageCnt), 10) + 1;
            }
            $(".paginate").pager({ pagenumber: pn, pagecount: HerosAge.totalPageCnt, buttonClickCallback: HerosAge.view.PageClick });
        });
    },
    delCmmt: function(idx, UserID) {
        var delCF = confirm("정말 삭제하시겠습니까?");
        if (delCF) {
            var sendParams = { "idx": idx, "UserID": UserID };
            if (HerosAge.userID != "") {
                $.ajaxSetup({ cache: false });
                $.getJSON("/Teaser/apiDelCommentCnt?jsoncallback=", sendParams, function(data) {
                    if (data["result"] != "-1") {
                        alert("자신의 글이 아닙니다.");
                        return false;
                    } else {
                        HerosAge.Teaser.getCmmt(HerosAge.page, HerosAge.pageCnt);
                    }
                });
            } else {
                alert("로그인후 삭제가 가능합니다.");
                return false;
            }
        } else {
            return false;
        }
    },
    makeCmmtList: function(data) {
        var dataRecord = "";
        for (var i = 0; i < data["Table"].length; i++) {
            dataRecord += "<tr>";
            dataRecord += "<td class='uid'>" + data["Table"][i]["UserID"] + "</td>";
            dataRecord += "<td class='rating'>" + data["Table"][i]["Comment"] + "</td>";
            dataRecord += "<td class='tim'>" + data["Table"][i]["RegDate"] + "</td>";
            dataRecord += "<td class='delete'><a class='del' title='글삭제' style='cursor:pointer' onclick=HerosAge.Teaser.delCmmt('" + data["Table"][i]["idx"] + "','" + data["Table"][i]["UID"] + "')><span class='hidden'>삭제</span></a></td>";
            dataRecord += "</tr>";
        }
        $(".commentList").html(dataRecord);
    },
    changeMulti: function(thumid) {
        var arrNo = parseInt(thumid.replace('v_wall_thumb', ''), 10) - 1;
        $(".itemThum h3").text(HerosAge.mtmImages[2][thumid]);  //thum img title
        for (var i = 0; i < $(".thum dd").length; i++) {
            $($(".thum dd")[i]).removeClass("on");  //delete class all
        }
        $($(".thum dd")[arrNo]).addClass("on");  //class change
        if (arrNo < 4) {    //이미지가 4장임.
            $("#main_intro").html(HerosAge.mtmImages[0][thumid]); //item View
            $(".dnimages").css("display", "");
            $(".dnimages").attr("href", HerosAge.mtmImages[1][thumid]);
            $(".thumInfo").text(HerosAge.mtmImages[3][thumid]);

        } else {
            var swfEle = $("#" + HerosAge.mtmImages[0][thumid]).html();
            $("#main_intro").html(swfEle); //item View            
            $(".dnimages").css("display", "none");
            $(".dnimages").attr("href", "");
            $(".thumInfo").text(HerosAge.mtmImages[3][thumid]);
        }
    },
    chgTab: function(tabno) {
        for (var i = 0; i < $(".itemThum dl").length; i++) {
            if (tabno == i + 1) {
                $($(".itemThum dl")[i]).css("display", "");
                $($(".thumPng a")[i]).addClass("on");
            } else {
                $($(".itemThum dl")[i]).css("display", "none");
                $($(".thumPng a")[i]).removeClass("on");
            }
        }
    }

    /* ---------------------------------- */

    /*
    CBT: function() {
    if (HerosAge.SSOChkYN == "false") {
    $(".cbt").html("<a class='poplight cbtBtn' href='#?w=448' rel='yw_loginPop'><img alt='CBT 테스터 신청' src='http://img.ndoors.com/webdata/yw/teaser/b_cbt.png'></a>");
    }
    if (HerosAge.SSOChkYN == "true") {
    $(".cbt").html("<a class='poplight cbtBtn' href='#?w=448' rel='yw_cbtJoin'><img alt='CBT 테스터 신청' src='http://img.ndoors.com/webdata/yw/teaser/b_cbt.png'></a>");
    }

        //HerosAge.Teaser.pop();
    },
    CBTOk: function() {
    var sendParams = { "SSO": HerosAge.SSOChkYN, "UserID": HerosAge.userID };
    $.getJSON("/api/TeaserSupporter", sendParams, function(data) {
    //HerosAge.Teaser.popup(data["result"]);
    if (data["result"] == "0") {
    alert("CBT 테스터에 신청한 아이디 입니다.");
    } else {
    $(".closed").click();
    $(".cbt").html("<a class='poplight cbtBtn' href='#?w=448' rel='yw_cbtComplete'><img alt='CBT 테스터 신청' src='http://img.ndoors.com/webdata/yw/teaser/b_cbt.png'></a>");
    HerosAge.Teaser.pop();
    $(".cbtBtn").click();
    }

        });
    },
    */

    /* 이전 팝업 형태
    popup: function(result) {
    $("#yw_popupWrap").css("display", "");
    if (HerosAge.SSOChkYN == "false") {
    $("#yw_popupWrap").html(HerosAge.view.alertLogin);
    return false;
    }
    if (HerosAge.SSOChkYN == "true") {
    if (result != undefined) {
    if (result == "1") {
    $("#yw_popupWrap").html(HerosAge.view.completeCBT);
    HerosAge.Teaser.gnbMsg();
    } else if (result == "0") {
    $("#yw_popupWrap").html("");
    HerosAge.Teaser.closePopup("#yw_popupWrap");
    alert("CBT 테스터에 신청한 아이디 입니다.");

                } else {
    alert(result);
    location.href = HerosAge.baseUrl;
    }
    } else {
    HerosAge.TeaserEventComplete = "true";
    $("#yw_popupWrap").html(HerosAge.view.ssoCheck);
    return false;
    }
    }
    },
    login: function() {
    HerosAge.Teaser.closePopup("#yw_popupWrap");
    location.href = "http://signup.ndoors.com/Auth/Login?site=yw";
    },
    ConfirmMyinfo: function() {
    HerosAge.Teaser.closePopup("#yw_popupWrap");
    location.href = "" + HerosAge.singUpUrl + "/Mypage/Ndoors?site=yw";
    },
    CBTComplete: function() {
    HerosAge.Teaser.closePopup("#yw_popupWrap");
    },
    CBTOk: function() {
    var sendParams = { "SSO": HerosAge.SSOChkYN, "UserID": HerosAge.userID };
    $.getJSON("/api/TeaserSupporter", sendParams, function(data) {
    HerosAge.Teaser.popup(data["result"]);
    });
    },
    closePopup: function(eleid) {
    $(eleid).css("display", "none");
    }
    */

    /* 보안
    // secure $.postJSON()
    $.postJSONsecure = function(url, params, callback) {
    $.post(url, params, function(data) {
    var secureData = eval('(' + data.split('while(1);')[1] + ')');
    if (typeof callback == 'function') callback(secureData);
    });
    };
    */
}

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


function notice() {
	var noticeWrap = $("#notice");
	$(window).load(function(){
		$(noticeWrap).animate({top:40}, 500, "easeInOutCubic");
		$("#hide").click(function(){
			$(noticeWrap).animate({top:-9}, 500, "easeInOutCubic");
		});
	});
	
	$(".topNoticeAction").click( function() {
		if ($("#openCloseIdentifier").is(":hidden")) {
			$(noticeWrap).animate({ 
				top: "40px"
				}, 500, "easeInOutCubic");
			$("#topNoticeImage").html('<img src="http://img.ndoors.com/webdata/yw/teaser/b_notice_closed.png" alt="close" />');
			$("#openCloseIdentifier").show();
		} else {
			$(noticeWrap).animate({ 
				top: "-9px"
				}, 500, "easeInOutCubic" );
			$("#topNoticeImage").html('<img src="http://img.ndoors.com/webdata/yw/teaser/b_notice_open.png" alt="open" />');
			$("#openCloseIdentifier").hide();
		}
	});  

	function start(){
		$(noticeWrap).animate({top:-9}, 500, "easeInOutCubic");
	}
}
