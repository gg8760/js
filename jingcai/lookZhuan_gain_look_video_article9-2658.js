/* 

[Script]
cron "22 16,18 * * *"  script-path=lookZhuan_gain_look_video_article9-2658.js,tag=晶彩看点看看赚&视频啊&文章
*/

const $ = new Env("晶彩看点看看赚&视频啊&文章")

const notify = require('./sendNotify') || '';

let articlebody,lookbody, timebodyVal = '';
let awaitTime =  (30 + Math.floor(Math.random() * 5)) * 1000;
var breakReadArticle = false;
let breakCountArticle = 0;
let breakCountVideo = 0;

let look = require('./lookZhuan_parameter');

timeZone = new Date().getTimezoneOffset() / 60;
timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
bjTime = new Date(timestamp).toLocaleString('zh', {
    hour12: false,
    timeZoneName: 'long'
});
console.log(`\n === 脚本执行 ${bjTime} ===\n`);

!(async () => {

    timebodyVal = look.LOOK_ATIME1;
    let lookArray = look.LOOK_GAIN_LOOK1["look"].split('\n');
    let gainArray = look.LOOK_GAIN_LOOK1["gain"].split('\n');
    let articleBodysArray = look.LOOK_ARTICLE1.split('\n');
    let videoBodysArray = look.LOOK_VIDEO1.split('\n');


    console.log(`\n看看赚任务总共${lookArray.length}`)
    console.log(`看文章任务总共${articleBodysArray.length}`)
    console.log(`看视频任务总共${videoBodysArray.length}\n`)

    console.log(`===========🤡开始任务🤡===========\n`);


    if (lookArray.length !== 0) {
        for (let k = 0; k < lookArray.length; k++) {
            if (lookArray[k]) {
                lookbody = lookArray[k].trim();
                $.index = k + 1;
                $.log(`-------------------------\n\n开始晶彩看点看看赚第${$.index}次任务`)
            }
            await lookStart_android();
        }
    }

    if (articleBodysArray.length !== 0) {
        console.log(`===============🤡开始阅读文章的任务🤡===============\n`);
        breakReadArticle = false
        for (let i = 0; i < articleBodysArray.length; i++) {
            if (breakReadArticle == false) {
                if (articleBodysArray[i]) {
                    articlebody = articleBodysArray[i].trim();
                    $.index = i + 1;
                    $.log(`-------------------------\n开始晶彩看点第${$.index}次阅读\n`);
                    await bodyInfo();
                    
                }
            } else {
                console.log(`今日阅读文章获取青豆到上限，退出for循环`);
                break;
            }
        }
        console.log(`===============🤡结束阅读文章的任务🤡===============\n\n`);
    }


    if (videoBodysArray.length !== 0) {
        console.log(`===============🤡开始阅读视频的任务🤡===============\n`);
        breakReadVideo = false
        for (let i = 0; i < videoBodysArray.length; i++) {
            if (breakReadVideo == false) {
                if (videoBodysArray[i]) {
                    articlebody = videoBodysArray[i].trim();
                    $.index = i + 1;
                    $.log(`-------------------------\n开始晶彩看点第${$.index}次看视频\n`);
                    await bodyInfoVideo();
                }
            } else {
                console.log(`今日阅读视频获取青豆到上限，退出for循环`);
                break;
            }
        }
        console.log(`===============🤡结束阅读视频的任务🤡===============\n\n`);
    }

    // if (gainArray.length !== 0) {
    //     $.log(`-------------------------\n\n您共提供${gainArray.length}次浏览赚任务`)
    //     for (let i = 0; i < gainArray.length; i++) {
    //         if (gainArray[i]) {
    //             gainbody = gainArray[i].trim();
    //             $.index = i + 1;
    //             $.log(`-------------------------\n\n开始中青看点浏览赚第${$.index}次任务`)
    //         }
    //         await GainStart();
    //     }
    //     console.log(`-------------------------\n\n中青看点共完成${$.index}次浏览赚任务`);
    // }
    
    console.log(`\n===========🤡结束任务🤡===========\n`);


})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())



    function lookStart_android() {
        return new Promise((resolve, reject) => {
            // https://ant.xunsl.com/v5/nameless/adlickstart.json


            $.post(gainHostAndroid('nameless/adlickstart.json', lookbody), async (error, resp, data) => {
                try {
                    let startlk = JSON.parse(data);
                    // console.log(startlk);
                    if (startlk.success == false) {
                        // smbody = $.getdata('youth_look').replace(lookbody + "&", "");
                        // $.setdata(smbody, 'youth_look');
                        // $.log(startlk.message + "已自动删除")
                    } else {
                        comstate = startlk.items.comtele_state;
                        if (comstate == 0) {
                            $.log("任务开始，" + startlk.items.banner_id + startlk.message);
                            for (let j = 0; j < startlk.items.see_num - startlk.items.read_num; j++) {
                                $.log("任务执行第" + parseInt(j + 1) + "次")
                                await $.wait(8000);
                                await lookstatus_android()
                            }
                            await $.wait(10000);
                            await lookEnd_android()
                        } else if (comstate == 1) {
                            $.log("任务:" + startlk.items.banner_id + "已完成，本次跳过");
                        }
                    }
                } catch (error) {
    
                } finally {
                    resolve()
                }
    
            })
        })
    }

    
    function lookstatus_android() {
        return new Promise((resolve, reject) => {
            $.post(gainHostAndroid('nameless/bannerstatus.json', lookbody), (error, resp, data) => {
                try {
                    let endres = JSON.parse(data);
                    if (endres.success == true) {
                        $.log("任务" + endres.items.banner_id + endres.message);
                    } else {
                        $.log(endres.message)
                    }
                } catch (e) {
                    $.logErr(e, data)
                } finally {
                    resolve();
                }
    
            })
        })
    }


    function lookEnd_android() {
        return new Promise((resolve, reject) => {
            $.post(gainHostAndroid('nameless/adlickend.json', lookbody), async (error, resp, data) => {
    
                try {
                    let endres = JSON.parse(data);
                    // console.log("result______", endres)
                    if (endres.success == true) {
                        $.log("任务" + endres.items.banner_id + endres.message + "，" + endres.items.desc)
                    } else {
                        $.log(endres.message)
                    }
                    console.log("等待两秒，开始下一个")
                    await $.wait(2000);
    
                } catch (error) {
    
                } finally {
                    resolve()
                }
    
    
            })
        })
    }

    // https://ant.xunsl.com/v5/article/info.json?p    
    // URL	https://ant.xunsl.com/v5/article/info.json?p=iwQenZDazcfA=losg11Nj01qahtuTthtZ_vLCgS1E_CFAXUeKxkQJjB6-S_PUNUnMIz0qwZhFMR3HAJTUvK5MWxRrKLuXReBCWsdq7YQUMxoFBbtMVy20Sq93L_rrqkhMkAxNUqF0Pjzk57lqpZnMeIi5kx3XhNBGYI6BS63HmeIZrAOAfeVOtCNpwpIblKU3sLbQTayioMiOsU-9KsEqS4igPXteuUjWuIHy7rMqPPAsWtnTwi2z0zvNlw7i30grJ_-pW2vMj8ehOue6xna60cLrJ9ferGDFTKgETwlV6VyOkmEUt1Jnqnp4bhN4byBSqW-aef1S3mIscoWY66Lm70Paxi9VQiH1gBY7C-c3X9pKfZBYCa0E3Glc4tXaQWVWPv3kJIKBTbg3wqXdHPCmDKOaT1HLLNjZ0KzfObdnuxdeQpkQwiZ9ZwKc4sgqewoRw3x4zxIaU1OxDK7i-OuTwR0ohRF5-3S2X9AolhvNPVIsJS9Gu1-ByedMhmEtZ_J756--1leAQ9PbidlXL9WP1_XK_VsQTA4dEi8vRwu4ozdzlLBFd-z51qMAmHqVP_DaiUtQFQondjuwAIQndzYewGtSYt0EM-fih2nzupct25NqD1DHed_x9LhLWnM1vZtV-XqTLRgBcfyOvqly4k0FgBW4ICqumrIdVavd9p4H6QkbMv4qmpelsni_wypgqohRO5yEzpMjS0e9CARhWpYtt9MvbAmAxt6Lf3BZfWZ5HErA9qQgwLlyGBOuD6f_eSkDe0M4lknY0Mshc_VLvrM7_UxLkaJa-HwmYk6phBab5DNZYd9WdlsJNjiom6pE6BJo1VZ-BwcseFnD9jrK4VyMrGP1IGWsO1FdWRIggEaoFSQDgvwb8XUGzLhaUeVnIdW-47tRvXeO7uiUuKZh8AKHnFxWMEtRLnjkko0hHhQYNVCSTG-Pmjwnp6GHs0XS1pKoOdN9keTMAvR_G3fvUdFfwF5cWLA-0ZBs-BgxaXFpI3BrcASL4Og0gfYOzUX1LWVnQzs1dSrLHiKVOKkQUEKjLgfyj6uo0v7ta-PaGxIzp-z2Jwqh08x29N37vMWVH5Ds8uQ2TbrlUIX-AFGBy9qYdkwvOUSwO1SZ6YQmj7VGzMfsDlj2R4w7upbyC7n91h_xbA-jlAxBw11LVS4lY58UrnsWaRqMF5TV2tBj8FGvRUsuDZ
    function bodyInfo() {

        return new Promise((resolve, reject) => {
            $.get(gainHostAndroid('article/info.json?' + articlebody), async (error, resp, data) => {
    
                try {
                    let bodyobj = JSON.parse(data);

                    // console.log("body-info------\n",bodyobj);
                    
                    if (bodyobj.error_code == "200007" && !$.isNode()) {
    
                    } else if (bodyobj.error_code == 0) {
                        // acticid = bodyobj.url.match(/\d+/)[0];
                        // artdesc = bodyobj.description
                        // author = bodyobj.account.name
                        // ctype = bodyobj.ctype == 0 ? "阅读资讯" : "观看视频";
                        // $.log(ctype + ": " + artdesc + "  ----- " + author + "\n")
                        $.log(`\n文章阅读${awaitTime / 1000}秒\n`);
                        await $.wait(awaitTime);
                        await AutoRead();
                        if ($.index % 3 == 0){
                            readTime(timebodyVal)
                        }
                        
                    }
                } catch (e) {
                    $.log('获取文章请求失败' + e)
                } finally {
                    resolve()
                }
            })
        })
    }


    function bodyInfoVideo() {

        return new Promise((resolve, reject) => {
            $.get(gainHostAndroid('article/info.json?' + articlebody), async (error, resp, data) => {
    
                try {
                    let bodyobj = JSON.parse(data);

                    // console.log("body-info------\n",bodyobj);
                    
                    if (bodyobj.error_code == "200007" && !$.isNode()) {
    
                    } else if (bodyobj.error_code == 0) {
                        // acticid = bodyobj.url.match(/\d+/)[0];
                        // artdesc = bodyobj.description
                        // author = bodyobj.account.name
                        // ctype = bodyobj.ctype == 0 ? "阅读资讯" : "观看视频";
                        // $.log(ctype + ": " + artdesc + "  ----- " + author + "\n")
                        $.log(`\n视频阅读${awaitTime / 1000}秒\n`);
                        await $.wait(awaitTime);
                        await AutoReadVideo();
                        if ($.index % 3 == 0){
                            readTime(timebodyVal)
                        }
                        
                    }
                } catch (e) {
                    $.log('获取文章请求失败' + e)
                } finally {
                    resolve()
                }
            })
        })
    }

    function readTime(timebodyVal) {
    
        return new Promise((resolve, reject) => {
            $.post(gainHostAndroid('user/stay.json', timebodyVal), (error, resp, data) => {
    
                try {
                    let timeres = JSON.parse(data)
                    console.log("----------------------time----------------------")
                    // console.log(timeres)
                    if (timeres.error_code == 0) {
                        readtimes = timeres.time / 60
                        $.log(`阅读时长共计` + Math.floor(readtimes) + `分钟`)
                    }
                    console.log("----------------------time----------------------")
    
                } catch (error) {
    
                } finally {
                    resolve()
                }
            })
        })
    }

    // URL	https://ant.xunsl.com/v5/article/complete.json
    function AutoReadVideo() {
        return new Promise((resolve, reject) => {
            $.post(gainHostAndroid('article/complete.json', articlebody), async (error, response, data) => {
    
                try {
                    let readres = JSON.parse(data);
                    //$.log(JSON.stringify(readres,null,2))
                    // console.log(readres)
                    if (readres.items.complete == 1) {
                        $.log(readres.items.max_notice)
                        if (readres.items.max_notice.indexOf("上限") > -1) {
                            breakReadVideo = true
                        }
                        if(readres.items.max_notice.indexOf("看太久了") > -1) {
                            breakCountVideo = breakCountVideo + 1
                            if (breakCountVideo > 10){
                                breakReadVideo = true
                            }
                        }
                        
                    } else {
                        if (readres.error_code == '0' && data.indexOf("read_score") > -1 && readres.items.read_score > 0) {
    
                            console.log(`本次视频获得${readres.items.read_score}个青豆，执行下一次阅读\n`);
                            
                        } else if (readres.error_code == '0' && data.indexOf('"score":0') > -1 && readres.items.score == 0) {
                            $.log(`\n本次视频获得0个青豆，开始下次阅读\n`);
                            
                        } else {
                            console.log(`read result-------------------\n`,readres);    
                        }
                    }

                    await $.wait(2000);

                } catch (error) {
    
                } finally {
                    resolve()
                }
    
            })
        })
    }

    function AutoRead() {
        return new Promise((resolve, reject) => {
            $.post(gainHostAndroid('article/complete.json', articlebody), async (error, response, data) => {
    
                try {
                    let readres = JSON.parse(data);
                    //$.log(JSON.stringify(readres,null,2))
                    // console.log(readres)
                    if (readres.items.complete == 1) {
                        $.log(readres.items.max_notice)
                        if (readres.items.max_notice.indexOf("上限") > -1 ) {
                            breakReadArticle = true
                        }

                        if(readres.items.max_notice.indexOf("看太久了") > -1) {
                            breakCountArticle = breakCountArticle + 1
                            if (breakCountArticle > 10){
                                breakReadArticle = true
                            }
                        }
                    } else {
                        if (readres.error_code == '0' && data.indexOf("read_score") > -1 && readres.items.read_score > 0) {
    
                            console.log(`本次阅读获得${readres.items.read_score}个青豆，执行下一次阅读\n`);
                            
                        } else if (readres.error_code == '0' && data.indexOf('"score":0') > -1 && readres.items.score == 0) {
                            $.log(`\n本次阅读获得0个青豆，开始下次阅读\n`);
                            // await $.wait(1000);
    
                        } else {
                            console.log(`read result-------------------\n`,readres);    
                        }
                    }
                } catch (error) {
    
                } finally {
                    resolve()
                }
    
            })
        })
    }



    // https://ant.xunsl.com/v5/nameless/adlickstart.json
    function gainHostAndroid(api, body) {
        return {
            url: 'https://ant.xunsl.com/v5/' + api,
            headers: {
                'Host': 'ant.xunsl.com',
                'device-platform': 'android',
                'Content-Type': 'application/x-www-form-urlencoded',
                'os-version':	'PPR1.180610.011+release-keys',
                'device-model':	'V1934A',
                'phone-sim':	1,
                'carrier':	'%E4%B8%AD%E5%9B%BD%E8%81%94%E9%80%9A',
                "access":	'WIFI',
                'os-api':	28,
                'app-type':	'jckd',
                'app-version':	'8.3.5',
                'accept-encoding':	'gzip',
                'user-agent':	'okhttp/3.12.2',
                // 'request_time':	'1643973921',
            },
            body: body
        }
    }

    
   



function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
