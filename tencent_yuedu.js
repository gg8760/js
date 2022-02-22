
/*ziye

本人github地址     https://github.com/ziye12/JavaScript 
转载请备注个名字，谢谢

日均0.18收益




⚠️cookie获取方法：

进 QQ阅读APP 点我的   获取cookie            秘密为   QQREADAPP_HEADER 多账号换行

点 免费 福利 日常福利-看视频 获取视频cookie  秘密为   QQREADAPP_VIDEOHD 多账号换行

⚠️宝箱奖励为60分钟一次，自己根据情况设置定时，


hostname=commontgw6.reader.qq.com,eventv36.reader.qq.com

[Script]

cron "20 8-22/2 * * *" script-path=tencent_yuedu.js


*/

const jsname = 'QQ阅读APP'
const $ = Env(jsname)
const notify = $.isNode() ? require('./sendNotify') : '';
var tz = '';
var kz = '';
var task = '';


const logs = 0;   //0为关闭日志，1为开启
const notifyInterval = 1
//0为关闭通知，1为所有通知，2为宝箱领取成功通知，

const dd = 1//单次任务延迟,默认1秒


let ad_readTime = 25 //看广告用时

let QQreadhdArr = [];
let QQreadheaderVal = '';
let QQreadvideohdArr = [];
let QQreadvideoheaderVal = '';
let QQreadHD = [];
let breakadVideo = false

/*
1. 162194
2. 870606
3. 787473

*/

let QQreadvideoHD = require('./yang_mao_parameter').QQreadvideoHD;

!(async () => {

    timeZone = new Date().getTimezoneOffset() / 60;
    timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
    bjTime = new Date(timestamp).toLocaleString('zh', {
        hour12: false,
        timeZoneName: 'long'
    });
    console.log(`\n ======脚本执行 ${bjTime}======\n`);

    console.log(`--------------------------`);
    console.log(`-------共提供${QQreadvideoHD.length}个账号------`);
    console.log(`--------------------------`);

    for (let index = 0; index < QQreadvideoHD.length; index++) {
        console.log(`\n开始第${index + 1}个账号任务-----`);
        QQreadvideoheaderVal = QQreadvideoHD[index]

        breakadVideo = false
        console.log('🍉开始20次视频奖励-----');
        for (let index = 0; index < 20; index++) {
            if (breakadVideo == false) {
                let adtime = ad_readTime + Math.floor(Math.random() * 10)
                console.log(`看广告${adtime}秒------`);
                await $.wait(adtime * 1000);
                await QQreadvideo()
            } else {
                console.log(`20次视频奖励 全部完成\n`);
                break;
            }
        }
        await QQreadsign()
        await QQreadboxinfo()

        let adtime = 15 + Math.floor(Math.random() * 10)
        console.log(`等待 ${adtime} s`);
        await $.wait(adtime * 1000);
        await getBoxVideoReward()

        await YD_jsj()

        // 8.20
        // 10.20
        // 12.20
        // 14.20
        // 16.20
        // 18.20
        // 20.20
        // 22.20

        if (new Date().getHours() <= 10) {
            await YD_l5()
        } else if (10 < new Date().getHours() <= 14) {
            await YD_l30()
        } else if (14 < new Date().getHours() <= 18) {
            await YD_l60()
        } else {
            await YD_l120()
        }

        await YD_zzp()
        await $.wait(5 * 1000);
        await YD_flsp()
    }

})()


//看福利视频
function YD_flsp() {
    console.log('\n看福利视频-----');
    return new Promise((resolve, reject) => {
        $.get({
            url: `https://eventv36.reader.qq.com/activity/pkg11955/pickTimeLimitWelfare`,
            headers: JSON.parse(QQreadvideoheaderVal),
        }, async (error, response, data) => {
            //console.log(data) 
            let result = JSON.parse(data)
            console.log(result);
            resolve()
        })
    })
}

//转盘
function YD_zzp() {
    console.log('\n转盘奖励-----');
    return new Promise((resolve, reject) => {
        $.get({
            url: `https://eventv36.reader.qq.com/activity/pkg11955/pickLottery`,
            headers: JSON.parse(QQreadvideoheaderVal),
        }, async (error, response, data) => {
            //console.log(data) 
            let result = JSON.parse(data)
            console.log(result);
            // if (result.code == 0) {
            //     console.log(`\n【${$.name}--转盘】:获得 ${result.data.count} 金币`)
            //     $.wait(1000)
            //     await YD_zzp()
            // } else {
            //    console.log(`\n【${$.name}--转盘】: ${result.msg}`)
            // }
            resolve()
        })
    })
}

//看5分钟小说领金币
function YD_l5() {
    console.log('\n看5分钟小说领金币-----');
    return new Promise((resolve, reject) => {
        $.get({
            url: `https://eventv36.reader.qq.com/activity/pkg11955/readBookWatchVideo?targetTime=5`,
            headers: JSON.parse(QQreadvideoheaderVal),
        }, async (error, response, data) => {
            try {
                let result = JSON.parse(data)
                console.log(result);
            } catch (error) {
                console.log(error);
            } finally {
                resolve()
            }

        })
    })
}

//看30分钟小说领金币
function YD_l30() {
    console.log('\n看30分钟小说领金币-----');
    return new Promise((resolve, reject) => {
        $.get({
            url: `https://eventv36.reader.qq.com/activity/pkg11955/readBookWatchVideo?targetTime=30`,
            headers: JSON.parse(QQreadvideoheaderVal),
        }, async (error, response, data) => {
            try {
                let result = JSON.parse(data)
                console.log(result);
            } catch (error) {

            } finally {
                resolve()
            }
        })
    })
}



//看60分钟小说领金币
function YD_l60() {
    console.log('\n看60分钟小说领金币-----');
    return new Promise((resolve, reject) => {
        $.get({
            url: `https://eventv36.reader.qq.com/activity/pkg11955/readBookWatchVideo?targetTime=60`,
            headers: JSON.parse(QQreadvideoheaderVal),
        }, async (error, response, data) => {
            //console.log(data) 
            let result = JSON.parse(data)
            console.log(result);
            resolve()
        })
    })
}

//看120分钟小说领金币
function YD_l120() {
    console.log('\n看120分钟小说领金币-----');
    return new Promise((resolve, reject) => {
        $.get({
            url: `https://eventv36.reader.qq.com/activity/pkg11955/readBookWatchVideo?targetTime=120`,
            headers: JSON.parse(QQreadvideoheaderVal),
        }, async (error, response, data) => {
            //console.log(data) 
            let result = JSON.parse(data)
            console.log(result);
            resolve()
        })
    })
}



//加书架100金币
function YD_jsj() {
    console.log('\n加书架100金币-----');
    return new Promise((resolve, reject) => {
        $.get({
            url: `https://eventv36.reader.qq.com/activity/pkg11955/addBookShelfWatchVideo`,
            headers: JSON.parse(QQreadvideoheaderVal),
        }, async (error, response, data) => {

            let result = JSON.parse(data)
            console.log(result);

            resolve()
        })
    })
}


//20次视频奖励
function QQreadvideo() {
    return new Promise((resolve, reject) => {
        const toQQreadvideourl = {
            url: 'https://eventv36.reader.qq.com/activity/pkg11955/watchVideo',
            headers: JSON.parse(QQreadvideoheaderVal),
            timeout: 60000
        };
        $.get(toQQreadvideourl, async (error, resp, data) => {
            try {
                let obj = JSON.parse(data)
                console.log(obj);
                if (obj.code == 0) {
                    console.log(`【视频任务第 + ${obj.data.videoCount} 次】:获得${obj.data.watchVideoCoin}金币\n`);
                } else {
                    if (obj.msg.indexOf("已经领") > -1) {
                        breakadVideo = true
                    }
                }
            } catch (error) {

            } finally {
                resolve()
            }
        })
    })
}


//金币签到
function QQreadsign() {
    console.log('\n金币签到-----');
    return new Promise((resolve, reject) => {
        const toQQreadsignurl = {
            url: 'https://eventv36.reader.qq.com/activity/pkg11955/punchCard_v2',
            headers: JSON.parse(QQreadvideoheaderVal),
            timeout: 60000
        };
        $.get(toQQreadsignurl, async (error, response, data) => {
            try {
                let sign = JSON.parse(data)
                console.log(sign);
                if (sign.code == 0) {
                    console.log(`【金币签到】:获得 ${sign.data.coinNum} 金币\n`);
                }
            } catch (error) {

            } finally {
                resolve()
            }
        })
    })
}

//宝箱信息
function QQreadboxinfo() {
    console.log('\n 查看宝箱状态-----');
    return new Promise((resolve, reject) => {
        const toQQreadboxinfourl = {
            url: 'https://eventv3.reader.qq.com/activity/pkg11955/queryOpenBoxInfo',
            headers: JSON.parse(QQreadvideoheaderVal),
            timeout: 60000
        };
        $.get(toQQreadboxinfourl, async (error, response, data) => {
            try {
                let boxinfo = JSON.parse(data)
                console.log(boxinfo);
                var cz = new Date().getTime() - boxinfo.data.openTime
                var CZ = 3600 - (cz / 1000).toFixed(0)
                if (CZ >= 1) {
                    console.log(`【宝箱剩余 ${boxinfo.data.openNum}】: 差 ${CZ} 秒\n`);
                } else if (CZ <= 0) {
                    await getBoxReward()
                }
            } catch (error) {

            } finally {
                resolve()
            }
        })
    })
}

//宝箱奖励
function getBoxReward() {
    console.log('\n宝箱奖励-----');
    return new Promise((resolve, reject) => {
        const toQQreadboxurl = {
            url: 'https://eventv3.reader.qq.com/activity/pkg11955/openBox',
            headers: JSON.parse(QQreadvideoheaderVal),
            timeout: 60000
        };
        $.get(toQQreadboxurl, async (error, response, data) => {
            try {
                if (logs) $.log(`${jsname}, 宝箱奖励: ${data}`)
                box = JSON.parse(data)
                if (box.code == 0) {
                    console.log(`【宝箱剩余${box.data.openNum} 】:获得 ${box.data.coin} 金币\n`);
                }
            } catch (error) {

            } finally {
                resolve()
            }

        })
    })
}


//宝箱广告视频
function getBoxVideoReward() {
    console.log('\n宝箱广告视频-----');
    return new Promise((resolve, reject) => {
        const toQQreadboxinfourl = {
            url: `https://eventv3.reader.qq.com/activity/pkg11955/pickOpenBoxWatchVideo`,
            headers: JSON.parse(QQreadvideoheaderVal),
            timeout: 60000
        };
        $.get(toQQreadboxinfourl, async (error, response, data) => {
            try {
                let boxinfo = JSON.parse(data)
                console.log(boxinfo);
                // if (boxinfo.code == 0) {
                //     console.log(` 获得 ${boxinfo.data.count} 金币\n`);
                // }
            } catch (error) {

            } finally {
                resolve()
            }
        })
    })
}



//用户名
function QQreadinfo() {
    return new Promise((resolve, reject) => {

        const toQQreadinfourl = {

            url: 'https://commontgw6.reader.qq.com/v7_5_2/nativepage/getAcctInfo',
            headers: JSON.parse(QQreadheaderVal),
            timeout: 60000
        };
        $.get(toQQreadinfourl, (error, response, data) => {
            if (logs) $.log(`${jsname}, 用户名: ${data}`)
            info = JSON.parse(data)
            kz +=
                '\n========== 【' + info.nick + '】 ==========\n';
            tz +=
                '\n========== 【' + info.nick + '】 ==========\n';

            resolve()
        })
    })
}




// prettier-ignore
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v2/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

