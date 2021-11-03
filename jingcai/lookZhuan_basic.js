
const $ = new Env("晶彩看点基础任务")

const notify = require('./sendNotify') || '';

let articlebody, lookbody, timebodyVal, signbody = '';
let awaitTime = (30 + Math.floor(Math.random() * 5)) * 1000;
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

    
    let signbodyArray = look.LOOK_SIGN.split('\n');
    let cookieArray = look.LOOK_HEADER.split('\n');

    for (let index = 0; index < cookieArray.length; index++) {
        console.log(`--------第 ${index + 1} 个账号任务执行中--------\n`)

        let cookie = cookieArray[index].trim();
        signbody = signbodyArray[index].trim();

        await sign()

        var time1 = Date.parse(new Date()).toString();
        time1 = time1.substr(0, 10);
        let zq_cookie1 = cookie + '&device_brand=xfdg&device_id=cc7dgdsgfsz83e&device_model=1gx&device_platform=android&device_type=android&inner_version=202107261526&mi=0&openudid=cc7dgdsgfsz83e&os_api=27&os_version=bdftgsdfga&phone_network=WIFI&phone_sim=1' + '&request_time=' + time1 + '&time=' + time1
        for (let k = 0; k < 3; k++) {
            id = k.toString()
            await openbox(id, zq_cookie1)
            if(k < 3-1) {
                console.log(`看广告30秒--\n`)
                await $.wait(30000);
            }
        }


        let jc_cookie1= cookie + '&request_time=' + time1 + '&time=' + time1
        for(let k = 0 ; k < 100 ; k++){
            console.log(`--------第${index + 1}个账号,第${k + 1}次抽奖--------\n`)
            await Rotary(jc_cookie1,cookie,time1)
            console.log("等待6秒-----")
            await $.wait(6000);
        }



        let bodyRewardArray = look.LOOK_GET_REWARD
        for (let index = 0; index < bodyRewardArray.length; index++) {
            let reArray = bodyRewardArray[index]
            if(reArray.length > 0) {
                console.log(`--------第 ${index + 1} 个账号宝箱奖励执行中--------\n`)
                for (let i = 0; i < reArray.length; i++) {
                    let body = reArray[i];
                    await getRewardAndroid(body)
                    await $.wait(2000);
                }
            }
        }
        


    }





})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())




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


function sign() {
    console.log('\n开始签到------------');
    return new Promise((resolve, reject) => {
        $.post(gainHostAndroid('CommonReward/toGetReward.json', signbody), async (error, resp, data) => {
            try {
                let startlk = JSON.parse(data);
                console.log(startlk);
            } catch (error) {

            } finally {
                resolve()
            }

        })
    })
}

// keyword_wyq=woyaoq.com&access=WIFI&app-version=8.3.5&app_type=jckd&app_version=8.3.5&carrier=CMCC&channel=c1007&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FtWSwp31shLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdibKEsn6Zrt-mapqGcXY&cookie_id=1f70c5a770807c11a0de00262e4c2363&device_brand=vivo&device_id=c9534f567a711c7d&device_model=vivo+Y55A&device_platform=android&device_type=android&inner_version=202110111432&mi=0&openudid=c9534f567a711c7d&os_api=23&os_version=MMB29M+release-keys&phone_network=WIFI&phone_sim=1&request_time=1635234179&resolution=720x1280&sim=1&sm_device_id=20211015125614b9387533991743d5fbc27e7779152117011c5d3c560fcd33&subv=1.2.2&time=1635234179&uid=55460273&uuid=3249325dabc74c6f88b9291ac589417b&version_code=835&version_name=%E6%99%B6%E5%BD%A9%E7%9C%8B%E7%82%B9&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl6-FtWSwp31shLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdibKEsn6Zrt-mapqGcXY&zqkey_id=1f70c5a770807c11a0de00262e4c2363
// keyword_wyq=woyaoq.com&access=WIFI&app-version=8.1.2&app_version=8.1.2&carrier=%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8&channel=c1005&' + jc_cookie1

// 看看赚上方宝箱奖
function openbox(id, jc_cookie1, timeout = 0) {
    
    return new Promise((resolve) => {
        let url = {
            url: 'https://ant.xunsl.com/WebApi/Nameless/getBoxReward?id=' + id + '&' + jc_cookie1,
            headers: {
                'Host': 'ant.xunsl.com',
                //'Referer': 'https://ant.xunsl.com/h5/20190527watchMoney/?' +jc_cookie1
                'Referer': 'https://ant.xunsl.com/h5/20190527watchMoney/?keyword_wyq=woyaoq.com&access=WIFI&app-version=8.1.2&app_version=8.1.2&carrier=%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8&channel=c1005&' + jc_cookie1
            },
        }
        $.get(url, async (err, resp, data) => {
            try {
                let result = JSON.parse(data)
                console.log("\n看看赚上方宝箱奖励收取结果---------------\n", result)
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}


//抽奖
function Rotary(jc_cookie1,cookie_id,time) {
    return new Promise((resolve, reject) => {
        let url = {
            url : 'https://ant.xunsl.com/WebApi/RotaryTable/turnRotary?_='+time,
            headers : {
                'Host': 'ant.xunsl.com',
                'Referer':'https://ant.xunsl.com/html/rotaryTable/index.html?keyword_wyq=woyaoq.com&access=WIFI&app-version=8.1.2&app_version=8.1.2&carrier=%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8&channel=c1005&'+jc_cookie1
            },
            body:cookie_id,
        }
        $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)

//                 console.log(result);

                if(result.status === 1 ){
                    if(result.data.score !== 0){
                        console.log('好家伙！你抽中了'+result.data.score + '金币')

                        //console.log('剩'+remain+'次')
                    }else {
                        console.log('你抽了个寂寞')
                    }

                }else{
                    console.log('\n抽奖失败，别问我，我也不知道为啥')
                }
            } catch (e) {
                $.logErr(e+resp);
            } finally {
                resolve()
            }
            })
    })
}


// https://ant.xunsl.com/v5/nameless/adlickstart.json
function gainHostAndroid(api, body) {

    console.log('https://ant.xunsl.com/v5/' + api)

    return {
        url: 'https://ant.xunsl.com/v5/' + api,
        headers: {
            'Host': 'ant.xunsl.com',
            'device-platform': 'android',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    }
}










function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
