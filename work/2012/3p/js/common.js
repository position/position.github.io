﻿    function badwordcheck(usersInput) {
        var temp = usersInput;
        temp = temp.toLowerCase();

        var word = new Array();
        word[1] = "18넘";
        word[2] = "18년";
        word[3] = "18놈";
        word[4] = "18뇬";
        word[5] = "가I사IㄲI";
        word[6] = "개넘";
        word[7] = "개년";
        word[8] = "개놈";
        word[9] = "개뇬";
        word[10] = "개뇽";
        word[11] = "개늠";
        word[12] = "개보지";
        word[13] = "개새";
        word[14] = "개새끼";
        word[15] = "개세";
        word[16] = "개쉐";
        word[17] = "개쉐리";
        word[18] = "개쉐이";
        word[19] = "개쉐이";
        word[20] = "개쒜리";
        word[21] = "개자";
        word[22] = "개자싁";
        word[23] = "개자식";
        word[24] = "개자지";
        word[25] = "개호로";
        word[26] = "거I서IㄲI";
        word[27] = "게보지";
        word[28] = "게세끼";
        word[29] = "게자지";
        word[30] = "게호로";
        word[31] = "고딩";
        word[32] = "고딩어";
        word[33] = "골까";
        word[34] = "그새끼";
        word[35] = "까대";
        word[36] = "까댄";
        word[37] = "까댄";
        word[38] = "까댐";
        word[39] = "까뗌";
        word[40] = "깟뎀";
        word[41] = "눈깔";
        word[42] = "눈탱이";
        word[43] = "눈텡이";
        word[44] = "뉘미";
        word[45] = "뉘미랄";
        word[46] = "늬미";
        word[47] = "니기미";
        word[48] = "니미";
        word[49] = "니미랄";
        word[50] = "니미럴";
        word[51] = "니엄창";
        word[52] = "닝기리";
        word[53] = "닝기미";
        word[54] = "당근이지";
        word[55] = "덥쳐";
        word[56] = "덮쳐";
        word[57] = "뒈저";
        word[58] = "뒈져";
        word[59] = "뒤저";
        word[60] = "디져";
        word[61] = "때끼";
        word[62] = "띠바";
        word[63] = "띠바랄";
        word[64] = "띠발";
        word[65] = "띠발넘";
        word[66] = "띠발놈";
        word[67] = "띠방";
        word[68] = "띠밸놈";
        word[69] = "띠벌";
        word[70] = "띠벌넘";
        word[71] = "띠벌놈";
        word[72] = "띠벌늠";
        word[73] = "띠부랄";
        word[74] = "띠부럴";
        word[75] = "띠불";
        word[76] = "띠붕";
        word[77] = "띠이발";
        word[78] = "띠이방";
        word[79] = "띠이벌";
        word[80] = "띠이불";
        word[81] = "띠이붕";
        word[82] = "띠이팔";
        word[83] = "띠이펄";
        word[84] = "띠이풀";
        word[85] = "띠팔";
        word[86] = "띠펄";
        word[87] = "띠풀";
        word[88] = "띱때";
        word[89] = "띱때끼";
        word[90] = "띱새";
        word[91] = "띱새끼";
        word[92] = "말밥";
        word[93] = "미췬넘";
        word[94] = "미췬년";
        word[95] = "미췬놈";
        word[96] = "미췬뇬";
        word[97] = "미췬늠";
        word[98] = "미친";
        word[99] = "미친넘";
        word[100] = "미친년";
        word[101] = "미친놈";
        word[102] = "미친뇬";
        word[103] = "미친늠";
        word[104] = "미친새끼";
        word[105] = "바가조";
        word[106] = "박아줘";
        word[107] = "발넘";
        word[108] = "발년";
        word[109] = "발놈";
        word[110] = "발뇬";
        word[111] = "발늠";
        word[112] = "벌려줘";
        word[113] = "벗겨";
        word[114] = "병신";
        word[115] = "보지1";
        word[116] = "부랄";
        word[117] = "브랄";
        word[118] = "빙시";
        word[119] = "빙신";
        word[120] = "빠가";
        word[121] = "빠구리";
        word[122] = "빠큐";
        word[123] = "빡아";
        word[124] = "빡큐";
        word[125] = "뻐큐";
        word[126] = "뻑큐";
        word[127] = "뽀작";
        word[128] = "뽁큐";
        word[129] = "새꺄";
        word[130] = "새끼";
        word[131] = "색끼";
        word[132] = "색스";
        word[133] = "세끼";
        word[134] = "섹스";
        word[135] = "섹쓰";
        word[136] = "쉐리야";
        word[137] = "쉑스";
        word[138] = "쉑스";
        word[139] = "쉬발";
        word[140] = "쉬방";
        word[141] = "쉬밸";
        word[142] = "쉬벌";
        word[143] = "쉬불";
        word[144] = "쉬붕";
        word[145] = "쉬빨";
        word[146] = "쉬이발";
        word[147] = "쉬이방";
        word[148] = "쉬이벌";
        word[149] = "쉬이불";
        word[150] = "쉬이붕";
        word[151] = "쉬이빨";
        word[152] = "쉬이팔";
        word[153] = "쉬이펄";
        word[154] = "쉬이풀";
        word[155] = "쉬팔";
        word[156] = "쉬펄";
        word[157] = "쉬퐁";
        word[158] = "쉬풀";
        word[159] = "시발";
        word[160] = "시밸";
        word[161] = "시버리지";
        word[162] = "시벌";
        word[163] = "시벌내미";
        word[164] = "시부럴";
        word[165] = "시불";
        word[166] = "시붕";
        word[167] = "시이발";
        word[168] = "시이벌";
        word[169] = "시이불";
        word[170] = "시이붕";
        word[171] = "시이팔";
        word[172] = "시이펄";
        word[173] = "시이풀";
        word[174] = "시팔";
        word[175] = "시펄";
        word[176] = "시퐁";
        word[177] = "시풀";
        word[178] = "십때끼";
        word[179] = "십새";
        word[180] = "십새끼";
        word[181] = "십새리";
        word[182] = "십쉐";
        word[183] = "십쉐리";
        word[184] = "십쉐이";
        word[185] = "십쌔리";
        word[186] = "십쎄끼";
        word[187] = "십쎄리";
        word[188] = "쌍넌";
        word[189] = "쌍넘";
        word[190] = "쌍넘";
        word[191] = "쌍년";
        word[192] = "쌍뇬";
        word[193] = "쌍늠";
        word[194] = "쌔끼";
        word[195] = "쌕쓰";
        word[196] = "썅";
        word[197] = "썅넘";
        word[198] = "썅놈";
        word[199] = "썅뇬";
        word[200] = "쒸발";
        word[201] = "쒸방";
        word[202] = "쒸벌";
        word[203] = "쒸불";
        word[204] = "쒸붕";
        word[205] = "쒸빨";
        word[206] = "쒸이발";
        word[207] = "쒸이방";
        word[208] = "쒸이벌";
        word[209] = "쒸이불";
        word[210] = "쒸이붕";
        word[211] = "쒸이빨";
        word[212] = "쒸이팔";
        word[213] = "쒸이펄";
        word[214] = "쒸이풀";
        word[215] = "쒸팔";
        word[216] = "쒸펄";
        word[217] = "쒸풀";
        word[218] = "쓰바";
        word[219] = "쓰벌";
        word[220] = "쓰불";
        word[221] = "쓰으벌";
        word[222] = "씨바";
        word[223] = "씨바랄";
        word[224] = "씨바알";
        word[225] = "씨발";
        word[226] = "씨발놈";
        word[227] = "씨방";
        word[228] = "씨밸";
        word[229] = "씨벌";
        word[230] = "씨벌놈";
        word[231] = "씨벨";
        word[232] = "씨부란스";
        word[233] = "씨부랄";
        word[234] = "씨불";
        word[235] = "씨불알";
        word[236] = "씨붕";
        word[237] = "씨빨";
        word[238] = "씨이발";
        word[239] = "씨이방";
        word[240] = "씨이벌";
        word[241] = "씨이불";
        word[242] = "씨이붕";
        word[243] = "씨이빨";
        word[244] = "씨이팔";
        word[245] = "씨이펄";
        word[246] = "씨이풀";
        word[247] = "씨팔";
        word[248] = "씨팔놈";
        word[249] = "씨펄";
        word[250] = "씨퐁";
        word[251] = "씨풀";
        word[252] = "씹";
        word[253] = "씹새";
        word[254] = "씹새끼";
        word[255] = "씹새롱";
        word[256] = "씹새리";
        word[257] = "씹세리";
        word[258] = "씹쉐";
        word[259] = "씹쉐";
        word[260] = "씹쉐리";
        word[261] = "씹쎄끼";
        word[262] = "씹창";
        word[263] = "씹탱";
        word[264] = "ㅇ ㅐ자";
        word[265] = "ㅇㅐㅈㅏ";
        word[266] = "ㅇㅐ자";
        word[267] = "아가리";
        word[268] = "아비";
        word[269] = "아작";
        word[270] = "애미";
        word[271] = "애미보지";
        word[272] = "애비";
        word[273] = "애자";
        word[274] = "pointbang.com";
        word[275] = "양아치";
        word[276] = "어미";
        word[277] = "엄창";
        word[278] = "엠병";
        word[279] = "연나";
        word[280] = "열라";
        word[281] = "염병";
        word[282] = "엿가튼";
        word[283] = "엿같은";
        word[284] = "오입";
        word[285] = "이빨까";
        word[286] = "이새끼";
        word[287] = "이시끼";
        word[288] = "자지1";
        word[289] = "잡넘";
        word[290] = "잡년";
        word[291] = "잡놈";
        word[292] = "잡뇬";
        word[293] = "잡뇽";
        word[294] = "잡늠";
        word[295] = "저까";
        word[296] = "저까튼";
        word[297] = "저새끼";
        word[298] = "적까튼";
        word[299] = "전나";
        word[300] = "전나게";
        word[301] = "전나구려";
        word[302] = "절라";
        word[303] = "젓가튼";
        word[304] = "젓같은";
        word[305] = "젓나";
        word[306] = "젓밥";
        word[307] = "젖밥";
        word[308] = "져까튼";
        word[309] = "젼나";
        word[310] = "젼나게";
        word[311] = "젼나구려";
        word[312] = "졀라";
        word[313] = "조까";
        word[314] = "조까튼";
        word[315] = "존나";
        word[316] = "존나게";
        word[317] = "졸라";
        word[318] = "좁밥";
        word[319] = "좃";
        word[320] = "좃나";
        word[321] = "좃도";
        word[322] = "좃밥";
        word[323] = "좃빱";
        word[324] = "좆";
        word[325] = "좆나";
        word[326] = "좆밥";
        word[327] = "좆빱";
        word[328] = "좇";
        word[329] = "좇나";
        word[330] = "좇도";
        word[331] = "좇밥";
        word[332] = "좇빱";
        word[333] = "중딩";
        word[334] = "지랄";
        word[335] = "지롤";
        word[336] = "직딩";
        word[337] = "짜저";
        word[338] = "짜져";
        word[339] = "쪼까튼";
        word[340] = "찌랄";
        word[341] = "창녀";
        word[342] = "초딩";
        word[343] = "팔놈";
        word[344] = "팔뇬";
        word[345] = "하셈";
        word[346] = "허접";
        word[347] = "현 거래";
        word[348] = "현거래";
        word[349] = "현금 거래";
        word[350] = "현금거래";
        word[351] = "호로";
        word[352] = "호로새끼";
        word[353] = "호좁";
        word[354] = "현금";
        word[355] = "현으로";
        word[356] = "현 으로";
        word[357] = "현에";
        word[358] = "ㄱ ㅐ새";
        word[359] = "ㄱ ㅐ색";

        for (var j = 1; j < word.length; j++) {

            if (temp.indexOf(word[j]) != -1) {
                alert("\'" + word[j] + "\'는(은) 적절치 못한 단어입니다. \n바르고 고운말을 씁시다." );
                usersInput = false;
                break;
            }
            else {
                usersInput = true;
            }
        }
        return usersInput;
    }