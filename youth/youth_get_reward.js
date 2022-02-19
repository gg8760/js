/*
中青看点浏览赚&看看赚

作者:Sunert

更新时间: 2021-02-26 11:32

多个请求体时用'&'号或者换行隔开，本脚本可自动删除失效请求，请须知 ‼️

*/


const $ = new Env("中青看点100抽奖励，小视频奖励")


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

    // # 中青账号 
    // # 1.峰
    // # 2.2658
    // # 3.格
    // # 4.7916

    let youth = require('./raw_youth_read_article_parameter');

    // console.log(`===========🐱🤡开始小视频和100抽奖，收青豆🤡🐱==========\n\n`);
    // if (youth.YOUTH_VIDEO_REWARD && youth.YOUTH_LOTTERY_REWARD) {
    //     console.log(`===============🤡账号1收青豆开始🤡===============\n\n`);

    //     console.log(`-------------------------\n开始小视频收青豆\n`);
    //     await getVideoScore(youth.YOUTH_VIDEO_REWARD);

    //     console.log(`-------------------------\n开始100抽奖收青豆\n`);
    //     await getLotteryScore(youth.YOUTH_LOTTERY_REWARD);

    //     console.log(`===============🤡账号1收青豆结束🤡===============\n\n`);
    // }

    // if (youth.YOUTH_VIDEO_REWARD2 && youth.YOUTH_LOTTERY_REWARD2) {
    //     console.log(`===============🤡账号2收青豆开始🤡===============\n\n`);

    //     console.log(`-------------------------\n开始小视频收青豆\n`);
    //     await getVideoScore(youth.YOUTH_VIDEO_REWARD2);

    //     console.log(`-------------------------\n开始100抽奖收青豆\n`);
    //     await getLotteryScore(youth.YOUTH_LOTTERY_REWARD2);

    //     console.log(`===============🤡账号2收青豆结束🤡===============\n\n`);
    // }

    // if (youth.YOUTH_VIDEO_REWARD3 && youth.YOUTH_LOTTERY_REWARD3) {
    //     console.log(`===============🤡账号3收青豆开始🤡===============\n\n`);

    //     console.log(`-------------------------\n开始小视频收青豆\n`);
    //     await getVideoScore(youth.YOUTH_VIDEO_REWARD3);

    //     console.log(`-------------------------\n开始100抽奖收青豆\n`);
    //     await getLotteryScore(youth.YOUTH_LOTTERY_REWARD3);

    //     console.log(`===============🤡账号3收青豆结束🤡===============\n\n`);
    // }

    // if (youth.YOUTH_VIDEO_REWARD4 && youth.YOUTH_LOTTERY_REWARD4) {
    //     console.log(`===============🤡账号4收青豆开始🤡===============\n\n`);

    //     console.log(`-------------------------\n开始小视频收青豆\n`);
    //     await getVideoScore(youth.YOUTH_VIDEO_REWARD4);

    //     console.log(`-------------------------\n开始100抽奖收青豆\n`);
    //     await getLotteryScore(youth.YOUTH_LOTTERY_REWARD4);

    //     console.log(`===============🤡账号4收青豆结束🤡===============\n\n`);
    // }



    // if (youth.YOUTH_VIDEO_REWARD5 && youth.YOUTH_LOTTERY_REWARD5) {
    //     console.log(`===============🤡账号5收青豆开始🤡===============\n\n`);

    //     console.log(`-------------------------\n开始小视频收青豆\n`);
    //     await getVideoScore(youth.YOUTH_VIDEO_REWARD5);

    //     console.log(`-------------------------\n开始100抽奖收青豆\n`);
    //     await getLotteryScore(youth.YOUTH_LOTTERY_REWARD5);

    //     console.log(`===============🤡账号5收青豆结束🤡===============\n\n`);
    // }

    // if (youth.YOUTH_VIDEO_REWARD6 && youth.YOUTH_LOTTERY_REWARD6) {
    //     console.log(`===============🤡账号6收青豆开始🤡===============\n\n`);

    //     console.log(`-------------------------\n开始小视频收青豆\n`);
    //     await getVideoScore(youth.YOUTH_VIDEO_REWARD6);

    //     console.log(`-------------------------\n开始100抽奖收青豆\n`);
    //     await getLotteryScore(youth.YOUTH_LOTTERY_REWARD6);

    //     console.log(`===============🤡账号6收青豆结束🤡===============\n\n`);
    // }

    // if (youth.YOUTH_VIDEO_REWARD7 && youth.YOUTH_LOTTERY_REWARD7) {
    //     console.log(`===============🤡账号7收青豆开始🤡===============\n\n`);

    //     console.log(`-------------------------\n开始小视频收青豆\n`);
    //     await getVideoScore(youth.YOUTH_VIDEO_REWARD7);

    //     console.log(`-------------------------\n开始100抽奖收青豆\n`);
    //     await getLotteryScore(youth.YOUTH_LOTTERY_REWARD7);

    //     console.log(`===============🤡账号7收青豆结束🤡===============\n\n`);
    // }

    // if (youth.YOUTH_VIDEO_REWARD8 && youth.YOUTH_LOTTERY_REWARD8) {
    //     console.log(`===============🤡账号8收青豆开始🤡===============\n\n`);

    //     console.log(`-------------------------\n开始小视频收青豆\n`);
    //     await getVideoScore(youth.YOUTH_VIDEO_REWARD8);

    //     console.log(`-------------------------\n开始100抽奖收青豆\n`);
    //     await getLotteryScore(youth.YOUTH_LOTTERY_REWARD8);

    //     console.log(`===============🤡账号8收青豆结束🤡===============\n\n`);
    // }

    // if (youth.YOUTH_VIDEO_REWARD9 && youth.YOUTH_LOTTERY_REWARD9) {
    //     console.log(`===============🤡账号9收青豆开始🤡===============\n\n`);

    //     console.log(`-------------------------\n开始小视频收青豆\n`);
    //     await getVideoScore(youth.YOUTH_VIDEO_REWARD9);

    //     console.log(`-------------------------\n开始100抽奖收青豆\n`);
    //     await getLotteryScore(youth.YOUTH_LOTTERY_REWARD9);

    //     console.log(`===============🤡账号9收青豆结束🤡===============\n\n`);
    // }

    // if (youth.YOUTH_VIDEO_REWARD10 && youth.YOUTH_LOTTERY_REWARD10) {
    //     console.log(`===============🤡账号10收青豆开始🤡===============\n\n`);

    //     console.log(`-------------------------\n开始小视频收青豆\n`);
    //     await getVideoScore(youth.YOUTH_VIDEO_REWARD10);

    //     console.log(`-------------------------\n开始100抽奖收青豆\n`);
    //     await getLotteryScore(youth.YOUTH_LOTTERY_REWARD10);

    //     console.log(`===============🤡账号10收青豆结束🤡===============\n\n`);
    // }

    // if (youth.YOUTH_VIDEO_REWARD11 && youth.YOUTH_LOTTERY_REWARD11) {
    //     console.log(`===============🤡账号11收青豆开始🤡===============\n\n`);

    //     console.log(`-------------------------\n开始小视频收青豆\n`);
    //     await getVideoScore(youth.YOUTH_VIDEO_REWARD11);

    //     console.log(`-------------------------\n开始100抽奖收青豆\n`);
    //     await getLotteryScore(youth.YOUTH_LOTTERY_REWARD11);

    //     console.log(`===============🤡账号11收青豆结束🤡===============\n\n`);
    // }

    // if (youth.YOUTH_VIDEO_REWARD12 && youth.YOUTH_LOTTERY_REWARD12) {
    //     console.log(`===============🤡账号12收青豆开始🤡===============\n\n`);

    //     console.log(`-------------------------\n开始小视频收青豆\n`);
    //     await getVideoScore(youth.YOUTH_VIDEO_REWARD12);

    //     console.log(`-------------------------\n开始100抽奖收青豆\n`);
    //     await getLotteryScore(youth.YOUTH_LOTTERY_REWARD12);

    //     console.log(`===============🤡账号12收青豆结束🤡===============\n\n`);
    // }

    // if (youth.YOUTH_VIDEO_REWARD13 && youth.YOUTH_LOTTERY_REWARD13) {
    //     console.log(`===============🤡账号13收青豆开始🤡===============\n\n`);

    //     console.log(`-------------------------\n开始小视频收青豆\n`);
    //     await getVideoScore(youth.YOUTH_VIDEO_REWARD13);

    //     console.log(`-------------------------\n开始100抽奖收青豆\n`);
    //     await getLotteryScore(youth.YOUTH_LOTTERY_REWARD13);

    //     console.log(`===============🤡账号13收青豆结束🤡===============\n\n`);
    // }

    let chou100Array = youth.youth_get_100chou_Reward
    for (let index = 0; index < chou100Array.length; index++) {
        console.log(`--------第 ${index + 1} 个账号100抽奖执行中--------\n`)
        await getLotteryScore(chou100Array[index]);

    }
    console.log(`===========🐱🤡结束小视频和100抽奖，收青豆🤡🐱===========\n\n`);



    // console.log(`===============🤡收取看看赚上方宝箱奖励开始🤡===============\n\n`);
    // let cookieArray = youth.YOUTH_HEADER.split('\n');
    // for (let index = 0; index < cookieArray.length; index++) {
    //     console.log(`--------第 ${index + 1} 个账号看看赚上方宝箱奖励执行中--------\n`)
    //     let cookie = cookieArray[index].trim();
    //     var time1 = Date.parse(new Date()).toString();
    //     time1 = time1.substr(0, 10);
    //     zq_cookie1 = cookie + '&device_brand=xfdg&device_id=cc7dgdsgfsz83e&device_model=1gx&device_platform=android&device_type=android&inner_version=202107261526&mi=0&openudid=cc7dgdsgfsz83e&os_api=27&os_version=bdftgsdfga&phone_network=WIFI&phone_sim=1' + '&request_time=' + time1 + '&time=' + time1
    //     for (let k = 0; k < 3; k++) {
    //         id = k.toString()
    //         await openbox(id, zq_cookie1)
    //         console.log(`看广告30秒--\n`)
    //         await $.wait(30000);
    //     }
    // }
    // console.log(`===============🤡收取看看赚上方宝箱奖励结束🤡===============\n\n`);



    // console.log(`===============🤡收取500，188，288，368 奖励开始🤡===============\n\n`);
    // let bodyRewardArray = youth.youth_get_Reward
    // for (let index = 0; index < bodyRewardArray.length; index++) {
    //     let reArray = bodyRewardArray[index]
    //     if(reArray.length > 0) {
    //         console.log(`--------第 ${index + 1} 个账号宝箱奖励执行中--------\n`)
    //         for (let i = 0; i < reArray.length; i++) {
    //             let body = reArray[i];
    //             await getLotteryScore(body);
    //             await $.wait(2000);
    //         }
    //     }
    // }
    // console.log(`===============🤡收取500，188，288，368 奖励结束🤡===============\n\n`);



    if ($.isNode()) {
        //await notify.sendNotify($.name，`共完成${$.index}次任务，\n共计获得${gainscore}个青豆`
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


// 看看赚上方宝箱奖
function openbox(id, zq_cookie1, timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: 'https://kandian.wkandian.com/WebApi/Nameless/getBoxReward?id=' + id + '&' + zq_cookie1,
            headers: {
                'Host': 'kandian.wkandian.com',
                //'Referer': 'https://kandian.wkandian.com/h5/20190527watchMoney/?' +zq_cookie1
                'Referer': 'https://kandian.wkandian.com/h5/20190527watchMoney/?keyword_wyq=woyaoq.com&access=WIFI&app-version=8.1.2&app_version=8.1.2&carrier=%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8&channel=c1005&' + zq_cookie1
            },
        }
        $.get(url, async (err, resp, data) => {
            try {
                let result = JSON.parse(data)
                console.log("\n看看赚上方宝箱奖励收取结果---------------\n",result)
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}



// https://kandian.wkandian.com/V5/CommonReward/toGetReward.json
// 小视频收青豆奖励
function getVideoScore(rewardBody) {
    return new Promise((resolve, reject) => {
        $.post(gainHost1('CommonReward/toGetReward.json', rewardBody), (error, resp, data) => {
            let timeres = JSON.parse(data)
            console.log("\n----------------小视频reward result---------------")
            console.log(timeres)
            console.log("----------------小视频reward result---------------\n")
            resolve()
        })
    })

}

// 中青看点100抽奖励
function getLotteryScore(rewardBody) {
    return new Promise((resolve, reject) => {
        $.post(gainHost1('CommonReward/toGetReward.json', rewardBody), (error, resp, data) => {
            let timeres = JSON.parse(data)
            console.log("\n---------------100抽reward result-----------------")
            console.log(timeres)
            console.log("---------------100抽reward result-----------------\n")

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


function getRewardAndroid(rewardBody) {
    return new Promise((resolve, reject) => {
        $.post(gainHostAndroid('CommonReward/toGetReward.json', rewardBody), (error, resp, data) => {
            let timeres = JSON.parse(data)
            console.log("\n---------------android reward result-----------------")
            console.log(timeres)
            console.log("---------------android result-----------------\n")

            resolve()
        })
    })
}

// URL	https://kandian.wkandian.com/v5/CommonReward/toGetReward.json
function gainHostAndroid(api, body) {
    return {
        url: 'https://kandian.wkandian.com/v5/' + api,
        headers: {
            "device-platform": "android",
            'User-Agent': 'okhttp/3.12.2',
            'Host': 'kandian.wkandian.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    }
}


function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
