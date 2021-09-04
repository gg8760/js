/*
中青看点浏览赚&看看赚

作者:Sunert

更新时间: 2021-02-26 11:32

多个请求体时用'&'号或者换行隔开，本脚本可自动删除失效请求，请须知 ‼️

*/


const $ = new Env("中青看点浏览小视频")
//const notify = $.isNode() ? require('./sendNotify') : '';
let startArr = [], lookArr = [], videoArr = [];
let startArr2 = [], lookArr2 = [], videoArr2 = [];
let startArr3 = [], lookArr3 = [], videoArr3 = [];
let startArr4 = [], lookArr4 = [], videoArr4 = [];

let StartBody = [], LookBody = [], VideoBody = [];
let StartBody2 = [], LookBody2 = [], VideoBody2 = [];
let StartBody3 = [], LookBody3 = [], VideoBody3 = [];
let StartBody4 = [], LookBody4 = [], VideoBody4 = [];

let gainscore = 0, lookscore = 0;
let startbodys = $.getdata('youth_start');
let lookbodys = $.getdata('youth_look')

let awaitRead = 60000;// 阅读等待时间

// if (isGetCookie = typeof $request !== `undefined`) {
//     GetCookie();
//     $.done()
// }
// if (!$.isNode() && !lookbodys) {
//     $.msg($.name, "您未获取看看赚请求，请先获取");
// } else if (!$.isNode() && !startbodys) {
//     $.msg($.name, "您未获取浏览赚请求，请先获取");
// }
// if (!$.isNode() && !startbodys.indexOf("&") == -1) {
//     startArr.push(startbodys)
// } else if (!$.isNode() && !lookbodys.indexOf("&") == -1) {
//     lookArr.push(lookbodys)
// } else {
    
    // if ($.isNode()) {
        // ------------账号1

        // if (process.env.YOUTH_START && process.env.YOUTH_START.indexOf('&') > -1) {
        //     StartBody = process.env.YOUTH_START.split('&');
        // } else if (process.env.YOUTH_START && process.env.YOUTH_START.indexOf('\n') > -1) {
        //     StartBody = process.env.YOUTH_START.split('\n');
        // }
        // else {
        //     StartBody = [process.env.YOUTH_START]
        // };
        // if (process.env.YOUTH_LOOK && process.env.YOUTH_LOOK.indexOf('&') > -1) {
        //     LookBody = process.env.YOUTH_LOOK.split('&');
        // } else if (process.env.YOUTH_LOOK && process.env.YOUTH_LOOK.indexOf('\n') > -1) {
        //     LookBody = process.env.YOUTH_LOOK.split('\n');
        // } else {
        //     LookBody = [process.env.YOUTH_LOOK]
        // }

        // if (process.env.YOUTH_VIDEO && process.env.YOUTH_VIDEO.indexOf('&') > -1) {
        //     VideoBody = process.env.YOUTH_VIDEO.split('&');
        // } else if (process.env.YOUTH_VIDEO && process.env.YOUTH_VIDEO.indexOf('\n') > -1) {
        //     VideoBody = process.env.YOUTH_VIDEO.split('\n');
        // } else {
        //     VideoBody = [process.env.YOUTH_VIDEO]
        // }

        // // ------------账号2
        // if (process.env.YOUTH_START2 && process.env.YOUTH_START2.indexOf('&') > -1) {
        //     StartBody2 = process.env.YOUTH_START2.split('&');
        // } else if (process.env.YOUTH_START2 && process.env.YOUTH_START2.indexOf('\n') > -1) {
        //     StartBody2 = process.env.YOUTH_START2.split('\n');
        // }
        // else {
        //     StartBody2 = [process.env.YOUTH_START2]
        // };

        // if (process.env.YOUTH_LOOK2 && process.env.YOUTH_LOOK2.indexOf('&') > -1) {
        //     LookBody2 = process.env.YOUTH_LOOK2.split('&');
        // } else if (process.env.YOUTH_LOOK2 && process.env.YOUTH_LOOK2.indexOf('\n') > -1) {
        //     LookBody2 = process.env.YOUTH_LOOK2.split('\n');
        // } else {
        //     LookBody2 = [process.env.YOUTH_LOOK2]
        // }

        // if (process.env.YOUTH_VIDEO2 && process.env.YOUTH_VIDEO2.indexOf('&') > -1) {
        //     VideoBody2 = process.env.YOUTH_VIDEO2.split('&');
        // } else if (process.env.YOUTH_VIDEO2 && process.env.YOUTH_VIDEO2.indexOf('\n') > -1) {
        //     VideoBody2 = process.env.YOUTH_VIDEO2.split('\n');
        // } else {
        //     VideoBody2 = [process.env.YOUTH_VIDEO2]
        // }


        // // ------------账号3
        // if (process.env.YOUTH_START3 && process.env.YOUTH_START3.indexOf('&') > -1) {
        //     StartBody3 = process.env.YOUTH_START3.split('&');
        // } else if (process.env.YOUTH_START3 && process.env.YOUTH_START3.indexOf('\n') > -1) {
        //     StartBody3 = process.env.YOUTH_START3.split('\n');
        // } else {
        //     StartBody3 = [process.env.YOUTH_START3]
        // };

        // if (process.env.YOUTH_LOOK3 && process.env.YOUTH_LOOK3.indexOf('&') > -1) {
        //     LookBody3 = process.env.YOUTH_LOOK3.split('&');
        // } else if (process.env.YOUTH_LOOK3 && process.env.YOUTH_LOOK3.indexOf('\n') > -1) {
        //     LookBody3 = process.env.YOUTH_LOOK3.split('\n');
        // } else {
        //     LookBody3 = [process.env.YOUTH_LOOK3]
        // }

        // if (process.env.YOUTH_VIDEO3 && process.env.YOUTH_VIDEO3.indexOf('&') > -1) {
        //     VideoBody3 = process.env.YOUTH_VIDEO3.split('&');
        // } else if (process.env.YOUTH_VIDEO3 && process.env.YOUTH_VIDEO3.indexOf('\n') > -1) {
        //     VideoBody3 = process.env.YOUTH_VIDEO3.split('\n');
        // } else {
        //     VideoBody3 = [process.env.YOUTH_VIDEO3]
        // }


        // // ------------账号4
        // if (process.env.YOUTH_START4 && process.env.YOUTH_START4.indexOf('&') > -1) {
        //     StartBody4 = process.env.YOUTH_START4.split('&');
        // } else if (process.env.YOUTH_START4 && process.env.YOUTH_START4.indexOf('\n') > -1) {
        //     StartBody4 = process.env.YOUTH_START4.split('\n');
        // } else {
        //     StartBody4 = [process.env.YOUTH_START4]
        // };

        // if (process.env.YOUTH_LOOK4 && process.env.YOUTH_LOOK4.indexOf('&') > -1) {
        //     LookBody4 = process.env.YOUTH_LOOK4.split('&');
        // } else if (process.env.YOUTH_LOOK4 && process.env.YOUTH_LOOK4.indexOf('\n') > -1) {
        //     LookBody4 = process.env.YOUTH_LOOK4.split('\n');
        // } else {
        //     LookBody4 = [process.env.YOUTH_LOOK4]
        // }

        // if (process.env.YOUTH_VIDEO4 && process.env.YOUTH_VIDEO4.indexOf('&') > -1) {
        //     VideoBody4 = process.env.YOUTH_VIDEO4.split('&');
        // } else if (process.env.YOUTH_VIDEO4 && process.env.YOUTH_VIDEO4.indexOf('\n') > -1) {
        //     VideoBody4 = process.env.YOUTH_VIDEO4.split('\n');
        // } else {
        //     VideoBody4 = [process.env.YOUTH_VIDEO4]
        // }
    // }

    // // ------------账号1
    // Object.keys(StartBody).forEach((item) => {
    //     if (StartBody[item]) {
    //         startArr.push(StartBody[item])
    //     }
    // })

    // Object.keys(LookBody).forEach((item) => {
    //     if (LookBody[item]) {
    //         lookArr.push(LookBody[item])
    //     }
    // })

    // Object.keys(VideoBody).forEach((item) => {
    //     if (VideoBody[item]) {
    //         videoArr.push(VideoBody[item])
    //     }
    // })


    // // ------------账号2
    // Object.keys(StartBody2).forEach((item) => {
    //     if (StartBody2[item]) {
    //         startArr2.push(StartBody2[item])
    //     }
    // })

    // Object.keys(LookBody2).forEach((item) => {
    //     if (LookBody2[item]) {
    //         lookArr2.push(LookBody2[item])
    //     }
    // })

    // Object.keys(VideoBody2).forEach((item) => {
    //     if (VideoBody2[item]) {
    //         videoArr2.push(VideoBody2[item])
    //     }
    // })

    // // ------------账号3
    // Object.keys(StartBody3).forEach((item) => {
    //     if (StartBody3[item]) {
    //         startArr3.push(StartBody3[item])
    //     }
    // })

    // Object.keys(LookBody3).forEach((item) => {
    //     if (LookBody3[item]) {
    //         lookArr3.push(LookBody3[item])
    //     }
    // })

    // Object.keys(VideoBody3).forEach((item) => {
    //     if (VideoBody3[item]) {
    //         videoArr3.push(VideoBody3[item])
    //     }
    // })


    // // ------------账号4
    // Object.keys(StartBody4).forEach((item) => {
    //     if (StartBody4[item]) {
    //         startArr4.push(StartBody4[item])
    //     }
    // })

    // Object.keys(LookBody4).forEach((item) => {
    //     if (LookBody4[item]) {
    //         lookArr4.push(LookBody4[item])
    //     }
    // })

    // Object.keys(VideoBody4).forEach((item) => {
    //     if (VideoBody4[item]) {
    //         videoArr4.push(VideoBody4[item])
    //     }
    // })

// }

timeZone = new Date().getTimezoneOffset() / 60;
timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
bjTime = new Date(timestamp).toLocaleString('zh', {
    hour12: false,
    timeZoneName: 'long'
});
console.log(`\n === 脚本执行 ${bjTime} ===\n`);

!(async () => {

    // ***********************************************华丽分割线*******************************************************
    // ***********************************************华丽分割线*******************************************************

    // ***********************************************华丽分割线*******************************************************
    // ***********************************************华丽分割线*******************************************************


    // console.log(`===============🐱🤡开始执行阅读时间🤡🐱===============\n\n`);
    
    // if (process.env.YOUTH_ATIME){

    //     console.log(`===============🤡账号1阅读时间开始🤡===============\n\n`);

    //     let timebodyVal = process.env.YOUTH_ATIME
    //     let count = 20
    //     let random = Math.floor(Math.random()*10); 
    //     console.log(`-------------------------\n账号1阅读时间需要执行${count + random}次任务`);
    //     for (let i = 0; i < count + random; i++) {
    //         await readTime(timebodyVal)
    //         if (i < count + random - 1) {
    //             console.log("等待一分钟");
    //             await $.wait(awaitRead);
    //         }
    //     }
    //     console.log(`===============🤡账号1阅读时间结束🤡===============\n\n`);

    // }

    // if (process.env.YOUTH_ATIME2){
    //     console.log(`===============🤡账号2阅读时间开始🤡===============\n\n`);
    //     let timebodyVal = process.env.YOUTH_ATIME2
    //     let count = 20
    //     let random = Math.floor(Math.random()*10); 
    //     console.log(`-------------------------\n账号2阅读时间需要执行${count + random}次任务`);
    //     for (let i = 0; i < count + random; i++) {
    //         await readTime(timebodyVal)
    //         if (i < count + random - 1) {
    //             console.log("等待一分钟");
    //             await $.wait(awaitRead);
    //         }
    //     }
    //     console.log(`===============🤡账号2阅读时间结束🤡===============\n\n`);
    // }

    // if (process.env.YOUTH_ATIME3){
    //     console.log(`===============🤡账号3阅读时间开始🤡===============\n\n`);
    //     let timebodyVal = process.env.YOUTH_ATIME3
    //     let count = 20
    //     let random = Math.floor(Math.random()*10); 
    //     console.log(`-------------------------\n账号3阅读时间需要执行${count + random}次任务`);
    //     for (let i = 0; i < count + random; i++) {
    //         await readTime(timebodyVal)
    //         if (i < count + random - 1) {
    //             console.log("等待一分钟");
    //             await $.wait(awaitRead);
    //         }
    //     }
    //     console.log(`===============🤡账号3阅读时间结束🤡===============\n\n`);
    // }

    // if (process.env.YOUTH_ATIME4){
    //     console.log(`===============🤡账号4阅读时间开始🤡===============\n\n`);
    //     let timebodyVal = process.env.YOUTH_ATIME4
    //     let count = 20
    //     let random = Math.floor(Math.random()*10); 
    //     console.log(`-------------------------\n账号4阅读时间需要执行${count + random}次任务`);
    //     for (let i = 0; i < count + random; i++) {
    //         await readTime(timebodyVal)
    //         if (i < count + random - 1) {
    //             console.log("等待一分钟");
    //             await $.wait(awaitRead);
    //         }
    //     }
    //     console.log(`===============🤡账号4阅读时间结束🤡===============\n\n`);
    // }

    // console.log(`===============🐱🤡结束执行阅读时间🤡🐱===============\n\n`);

       // ***********************************************华丽分割线*******************************************************
    // ***********************************************华丽分割线*******************************************************


    console.log(`===============🐱🤡开始小视频和200抽奖，收青豆🤡🐱===============\n\n`);
    if (process.env.YOUTH_VIDEO_REWARD && process.env.YOUTH_LOTTERY_REWARD){
        console.log(`===============🤡账号1收青豆开始🤡===============\n\n`);

        console.log(`-------------------------\n开始小视频收青豆`);
        await getVideoScore(process.env.YOUTH_VIDEO_REWARD);

        console.log(`-------------------------\n开始200抽奖收青豆`);
        await getLotteryScore(process.env.YOUTH_LOTTERY_REWARD);

        console.log(`===============🤡账号1收青豆结束🤡===============\n\n`);
    }

    if (process.env.YOUTH_VIDEO_REWARD2 && process.env.YOUTH_LOTTERY_REWARD2){
        console.log(`===============🤡账号2收青豆开始🤡===============\n\n`);

        console.log(`-------------------------\n开始小视频收青豆`);
        await getVideoScore(process.env.YOUTH_VIDEO_REWARD2);

        console.log(`-------------------------\n开始200抽奖收青豆`);
        await getLotteryScore(process.env.YOUTH_LOTTERY_REWARD2);

        console.log(`===============🤡账号2收青豆结束🤡===============\n\n`);
    }

    if (process.env.YOUTH_VIDEO_REWARD3 && process.env.YOUTH_LOTTERY_REWARD3){
        console.log(`===============🤡账号3收青豆开始🤡===============\n\n`);

        console.log(`-------------------------\n开始小视频收青豆`);
        await getVideoScore(process.env.YOUTH_VIDEO_REWARD3);

        console.log(`-------------------------\n开始200抽奖收青豆`);
        await getLotteryScore(process.env.YOUTH_LOTTERY_REWARD3);

        console.log(`===============🤡账号3收青豆结束🤡===============\n\n`);
    }

    if (process.env.YOUTH_VIDEO_REWARD4 && process.env.YOUTH_LOTTERY_REWARD4){
        console.log(`===============🤡账号4收青豆开始🤡===============\n\n`);

        console.log(`-------------------------\n开始小视频收青豆`);
        await getVideoScore(process.env.YOUTH_VIDEO_REWARD4);

        console.log(`-------------------------\n开始200抽奖收青豆`);
        await getLotteryScore(process.env.YOUTH_LOTTERY_REWARD4);

        console.log(`===============🤡账号4收青豆结束🤡===============\n\n`);
    }

    if ($.isNode()) {
        //await notify.sendNotify($.name，`共完成${$.index}次任务，\n共计获得${gainscore}个青豆`
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


// https://kandian.wkandian.com/V5/CommonReward/toGetReward.json

function getVideoScore(rewardBody) {
    return new Promise((resolve, reject) => {
        $.post(gainHost1('CommonReward/toGetReward.json', rewardBody), (error, resp, data) => {
            let timeres = JSON.parse(data)
            console.log("-------------------------小视频reward result-------------------------")
            console.log(timeres)
            console.log("-------------------------小视频reward result-------------------------")
            resolve()
        })
    })

}

function getLotteryScore(rewardBody) {
    return new Promise((resolve, reject) => {
        $.post(gainHost1('CommonReward/toGetReward.json', rewardBody), (error, resp, data) => {
            let timeres = JSON.parse(data)
            console.log("-------------------------200抽reward result-------------------------")
            console.log(timeres)
            console.log("-------------------------200抽reward result-------------------------")
            if (timeres.error_code == 0) {
                readtimes = timeres.time / 60
                $.log(`阅读时长共计` + Math.floor(readtimes) + `分钟`)
            }
            resolve()
        })
    })
}



// https://kandian.wkandian.com/V5/Article/kyComplete.json
function gainHost1(api, body) {
    return {
        url: 'https://kandian.wkandian.com/V5/' + api,
        headers: {
            'User-Agent': 'KDApp/2.3.1 (iPhone; iOS 14.5; Scale/3.00)',
            'Host': 'kandian.wkandian.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    }
}
    


function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
