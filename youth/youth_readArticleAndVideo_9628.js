/* 

[Script]
cron "5 7-13/2 * * *"  script-path=youth_readArticleAndVideo_9628.js,tag=中青看点阅读文章，视频-9628

*/

const $ = new Env("中青看点阅读文章，视频-9628")
//const notify = $.isNode() ? require('./sendNotify') : '';

let YouthArticleBodys = [];
let YouthVideoBodys = [];

let awaitTime =  (30 + Math.floor(Math.random() * 5)) * 1000;

var breakReadArticle = false;
var breakReadVideo = false;

var timebodyVal;
let breakCountArticle = 0;
let breakCountVideo = 0;

let lookbody = '';
let gainbody = '';
let articlebody = '';
let kankanDeleteArray = [];
let liulanDeleteArray = [];



let youth = require('./raw_youth_read_article_parameter');

if (youth.youthRead5_1 && youth.youthRead5_1.indexOf('&') > -1) {
    YouthArticleBodys = youth.youthRead5_1.split('&');
} else if (youth.youthRead5_1 && youth.youthRead5_1.indexOf('\n') > -1) {
    YouthArticleBodys = youth.youthRead5_1.split('\n');
} else {
    YouthArticleBodys = [youth.youthRead5_1]
}

if (youth.YOUTH_VIDEO5 && youth.YOUTH_VIDEO5.indexOf('&') > -1) {
    YouthVideoBodys = youth.YOUTH_VIDEO5.split('&');
} else if (youth.YOUTH_VIDEO5 && youth.YOUTH_VIDEO5.indexOf('\n') > -1) {
    YouthVideoBodys = youth.YOUTH_VIDEO5.split('\n');
} else {
    YouthVideoBodys = [youth.YOUTH_VIDEO5]
}

timebodyVal = youth.YOUTH_ATIME5

let dicItem = youth.YOUTH_GAIN_LOOK5
let lookArray = dicItem["youthLook"].split('\n');
let gainArray = dicItem["youthGain"].split('\n');
let currentAccount = dicItem["accountInfo"]

let dicItemAndroid = youth.YOUTH_GAIN_LOOK_ANDROID_5
let lookArrayAndroid = dicItemAndroid["youthLook"].split('\n');
let gainArrayAndroid = dicItemAndroid["youthGain"].split('\n');

timeZone = new Date().getTimezoneOffset() / 60;
timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
bjTime = new Date(timestamp).toLocaleString('zh', {
    hour12: false,
    timeZoneName: 'long'
});
console.log(`\n === 脚本执行 ${bjTime} ===\n`);

!(async () => {
    // # 中青账号 
    // # 1.峰
    // # 2.2658
    // # 3.格
    // # 4.7916
    // # 5. 9628

    $.log(`\n~~~~~~~~${currentAccount}共提供${YouthArticleBodys.length}次阅读文章任务~~~~~~~~`)
    $.log(`~~~~~~~~${currentAccount}共提供${gainArray.length}次浏览赚任务~~~~~~~~`)
    $.log(`~~~~~~~~${currentAccount}共提供${lookArray.length}次ios看看赚任务~~~~~~~~`)
    $.log(`~~~~~~~~${currentAccount}共提供${lookArrayAndroid.length}次android看看赚任务~~~~~~~~`)
    $.log(`~~~~~~~~${currentAccount}共提供${YouthVideoBodys.length}次阅读视频任务~~~~~~~~\n`)


    if (lookArray.length !== 0) {
        console.log(`===============🤡开始看看赚的任务🤡===============\n`);
        for (let k = 0; k < lookArray.length; k++) {
            if (lookArray[k]) {
                lookbody = lookArray[k].trim();
                $.index = k + 1;
                $.log(`-------------------------\n\n开始中青看点看看赚第${$.index}次任务`)
            }
            await lookStart();
        }
        console.log(`===============🤡结束看看赚的任务🤡===============\n\n`);
    }

    if (lookArrayAndroid.length !== 0) {
        console.log(`===============🤡开始android看看赚的任务🤡===============\n`);
        for (let k = 0; k < lookArrayAndroid.length; k++) {
            if (lookArrayAndroid[k]) {
                lookbody = lookArrayAndroid[k].trim();
                $.index = k + 1;
                $.log(`-------------------------\n\n开始中青看点看看赚第${$.index}次任务`)
            }
            await lookStart_android();
        }
        console.log(`===============🤡结束android看看赚的任务🤡===============\n\n`);
    }


    if (gainArray.length !== 0) {
        console.log(`===============🤡开始浏览赚的任务🤡===============\n`);
        for (let i = 0; i < gainArray.length; i++) {
            if (gainArray[i]) {
                gainbody = gainArray[i].trim();
                $.index = i + 1;
                $.log(`-------------------------\n\n开始中青看点浏览赚第${$.index}次任务`)
            }
            await GainStart();
        }
        console.log(`===============🤡结束浏览赚的任务🤡===============\n\n`);
    }
    
    
    if (YouthArticleBodys.length !== 0) {
        console.log(`===============🤡开始阅读文章的任务🤡===============\n`);
        breakReadArticle = false
        for (let i = 0; i < YouthArticleBodys.length; i++) {
            if (breakReadArticle == false) {
                if (YouthArticleBodys[i]) {
                    articlebody = YouthArticleBodys[i].trim();
                    $.index = i + 1;
                    $.log(`-------------------------\n开始中青看点第${$.index}次阅读\n`);
                    await bodyInfo();
                }
            } else {
                console.log(`今日阅读文章获取青豆到上限，退出for循环`);
                break;
            }
        }
        console.log(`===============🤡结束阅读文章的任务🤡===============\n\n`);
    }



    if (YouthVideoBodys.length !== 0) {
        console.log(`===============🤡开始阅读视频的任务🤡===============\n`);
        breakReadVideo = false
        for (let i = 0; i < YouthVideoBodys.length; i++) {
            if (breakReadVideo == false) {
                if (YouthVideoBodys[i]) {
                    articlebody = YouthVideoBodys[i].trim();
                    $.index = i + 1;
                    $.log(`-------------------------\n开始中青看点第${$.index}次看视频\n`);
                    await bodyInfoVideo();
                }
            } else {
                console.log(`今日阅读视频获取青豆到上限，退出for循环`);
                break;
            }
        }
        console.log(`===============🤡结束阅读视频的任务🤡===============\n\n`);
    }

    console.log("看看赚要删除的body--------------\n",kankanDeleteArray);
console.log("浏览赚要删除的body--------------\n",liulanDeleteArray);





})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


    function lookStart_android() {
        return new Promise((resolve, reject) => {
            $.post(gainHostAndroid('nameless/adlickstart.json', lookbody), async (error, resp, data) => {
                try {
                    let startlk = JSON.parse(data);
                    if (startlk.success == false) {
                        // smbody = $.getdata('youth_look').replace(lookbody + "&", "");
                        // $.setdata(smbody, 'youth_look');
                        // $.log(startlk.message + "已自动删除")
                        kankanDeleteArray.push(lookbody)

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

    function gainHostAndroid(api, body) {
        return {
            url: 'https://kandian.wkandian.com/v5/' + api,
            headers: {
                'Host': 'kandian.wkandian.com',
                'device-platform': 'android',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        }
    }


    function GainStart() {
        return new Promise((resolve, reject) => {
            $.post(gainHost('task/browse_start.json', gainbody), async (error, resp, data) => {
    
                try {
                    let startres = JSON.parse(data);
                    if (startres.success == false) {
                        // smbody = $.getdata('youth_start').replace(gainbody + "&", "");
                        // $.setdata(smbody, 'youth_start');
                        // $.log(startres.message + "已自动删除")
                        liulanDeleteArray.push(gainbody)

                    } else {
                        comstate = startres.items.comtele_state;
                        if (comstate == 0) {
                            $.log("任务开始，" + startres.items.banner_id + startres.message);
                            await $.wait(10000);
                            await GainEnd()
                        } else if (comstate == 1) {
                            $.log("任务:" + startres.items.banner_id + "已完成，本次跳过");
                        }
                    }
                } catch (error) {
    
                } finally {
                    resolve()
    
                }
    
            })
        })
    }


    function GainEnd() {
        return new Promise((resolve, reject) => {
            $.post(gainHost('task/browse_end.json', gainbody), async (error, resp, data) => {
                try {
                    let endres = JSON.parse(data);
                    if (endres.success == true) {
                        $.log("任务" + endres.items.banner_id + endres.message + "，恭喜获得" + endres.items.score + "个青豆");
                    } else {
                        $.log(endres.message)
                    }
    
                    console.log("\n等待两秒，开始下一个")
                    await $.wait(2000);
                    
                } catch (error) {
                    
                } finally {
                    resolve()
                }
            })
        })
    }

    
    function lookStart() {
        return new Promise((resolve, reject) => {
            $.post(gainHost('Nameless/adlickstart.json', lookbody), async (error, resp, data) => {
                try {
                    let startlk = JSON.parse(data);
                    if (startlk.success == false) {
                        // smbody = $.getdata('youth_look').replace(lookbody + "&", "");
                        // $.setdata(smbody, 'youth_look');
                        // $.log(startlk.message + "已自动删除")
                        kankanDeleteArray.push(lookbody)
                    } else {
                        comstate = startlk.items.comtele_state;
                        if (comstate == 0) {
                            $.log("任务开始，" + startlk.items.banner_id + startlk.message);
                            for (let j = 0; j < startlk.items.see_num - startlk.items.read_num; j++) {
                                $.log("任务执行第" + parseInt(j + 1) + "次")
                                await $.wait(8000);
                                await lookstatus()
                            }
                            await $.wait(10000);
                            await lookEnd()
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

    function lookstatus() {
        return new Promise((resolve, reject) => {
            $.post(gainHost('Nameless/bannerstatus.json', lookbody), (error, resp, data) => {
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

    function lookEnd() {
        return new Promise((resolve, reject) => {
            $.post(gainHost('Nameless/adlickend.json', lookbody), async (error, resp, data) => {
    
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

    function gainHost(api, body) {
        return {
            url: 'https://ios.baertt.com/v5/' + api,
            headers: {
                'User-Agent': 'KDApp/1.7.8 (iPhone; iOS 14.0; Scale/3.00)',
                'Host': 'ios.baertt.com',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        }
    }



    function bodyInfo() {
        return new Promise((resolve, reject) => {
            $.get(batHost('article/info/get.json?' + articlebody), async (error, resp, data) => {
    
                try {
                    let bodyobj = JSON.parse(data);
                    
    
                    if (bodyobj.error_code == "200007" && !$.isNode()) {
    
                    } else if (bodyobj.error_code == 0) {
                        acticid = bodyobj.url.match(/\d+/)[0];
                        artdesc = bodyobj.description
                        author = bodyobj.account.name
                        ctype = bodyobj.ctype == 0 ? "阅读资讯" : "观看视频";
                        $.log(ctype + ": " + artdesc + "  ----- " + author + "\n")
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
    
    
    function AutoRead() {
        return new Promise((resolve, reject) => {
            $.post(batHost('article/complete.json', articlebody), async (error, response, data) => {
    
                try {
                    let readres = JSON.parse(data);
                    //$.log(JSON.stringify(readres,null,2))
                    // console.log(readres)
                    if (readres.items.complete == 1) {
                        $.log(readres.items.max_notice)
                        if (readres.items.max_notice.indexOf("上限") > -1) {
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
    
    
    
    
    function bodyInfoVideo() {
        return new Promise((resolve, reject) => {
            $.get(batHost('article/info/get.json?' + articlebody), async (error, resp, data) => {
    
                try {
                    let bodyobj = JSON.parse(data);
                    
    
                    if (bodyobj.error_code == "200007" && !$.isNode()) {
    
                    } else if (bodyobj.error_code == 0) {
                        acticid = bodyobj.url.match(/\d+/)[0];
                        artdesc = bodyobj.description
                        author = bodyobj.account.name
                        ctype = bodyobj.ctype == 0 ? "阅读资讯" : "观看视频";
                        $.log(ctype + ": " + artdesc + "  ----- " + author + "\n")
                        $.log(`\n文章阅读${awaitTime / 1000}秒\n`);
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
    
    
    function AutoReadVideo() {
        return new Promise((resolve, reject) => {
            $.post(batHost('article/complete.json', articlebody), async (error, response, data) => {
    
                try {
                    let readres = JSON.parse(data);
                    // console.log("--------------\n",readres)
                    //$.log(JSON.stringify(readres,null,2))
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
    
                            console.log(`本次视频获得${readres.items.read_score}个青豆，执行下一次视频\n`);
    
                        } else if (readres.error_code == '0' && data.indexOf('"score":0') > -1 && readres.items.score == 0) {
                            $.log(`\n本次视频获得0个青豆，开始下次看视频\n`);
                            // await $.wait(3000);
                        } else if (readres.success == false) {
                            console.log(`第${$.index}次看视频请求有误，请删除此请求`);
                        }
                    }
                } catch (e) {
    
                } finally {
                    resolve();
                }
            })
        })
    }
    
    
    function readTime(timebodyVal) {
    
        return new Promise((resolve, reject) => {
            $.post(batHost('user/stay.json', timebodyVal), (error, resp, data) => {
    
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


function batHost(api, body) {
    return {
        url: 'https://ios.baertt.com/v5/' + api,
        headers: {
            'User-Agent': 'KDApp/2.0.2 (iPhone; iOS 14.5; Scale/3.00)',
            'Host': 'ios.baertt.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    }
}





function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
