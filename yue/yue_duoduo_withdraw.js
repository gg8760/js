/*
IOS：看点宝/阅多多/悦看点
三个APP分别捉包，可以共用一个脚本跑任务
比较容易黑，不要跑太频繁，每天11次就可以领完任务奖励
每天金币7毛以上，提现1元和5元需要做任务拿提现券
看点宝下载注册地址：https://yuekandian.yichengw.cn/download?app=5&referrer=764084

可以在环境变量yddSkipWithdraw设置不想提现的金额，逗号隔开，填0就会尝试提现所有金额
export yddSkipWithdraw='1'

青龙：
捉取 https://yuekandian.yichengw.cn/api/v1/member/profile 的包里的Authorization(把前面的Bearer删掉)，device和User-Agent，按顺序用#连起来写到yddCookie里，多账户用@隔开
export yddCookie='账号1的Authorization#device#UA@账号2的Authorization#device#UA'

V2P重写：打开APP即可获取CK，没有的话点一下我的页面或者赚钱页面
[task_local]
#看点宝/阅多多/悦看点
15 9-21 * * * https://raw.githubusercontent.com/leafxcy/JavaScript/main/ydd.js, tag=看点宝/阅多多/悦看点, enabled=true
[rewrite_local]
https://yuekandian.yichengw.cn/api/v1/member/profile url script-request-header https://raw.githubusercontent.com/leafxcy/JavaScript/main/ydd.js
[MITM]
hostname = yuekandian.yichengw.cn

[Script]
cron "5 19 * * *"  script-path=yue_duoduo_withdraw.js

*/

const jsname = '阅多多,悦看点--提现'
const $ = Env(jsname)
const notifyFlag = 1; //0为关闭通知，1为打开通知,默认为1
const logDebug = 0

//const notify = $.isNode() ? require('./sendNotify') : '';
let notifyStr = ''

let rndtime = "" //毫秒
let httpResult //global buffer

let host = 'yuekandian.yichengw.cn'
let hostname = 'https://' + host


let yddCookie = ''
let yddCookieArr = []
let userToken = []
let userDevice = []
let userAgent = []
let userCookie = []

let yddSkipWithdraw = ($.isNode() ? process.env.yddSkipWithdraw : $.getdata('yddSkipWithdraw')) || '0';
let skipWithdraw = []

let userIdx = 0
let taskIdx = 0
let coinList = []
let signFlag = []
let contSignFlag = []
let lotteryTicket = []
let lotteryAdTicket = []
let helpTicket = []
let userTicket = []
let userWaitTime = []
let extraRewardFlag = []
let userInfo = []
let withdrawFlag = []
let adVideoFlag = []
let adVideoTicket = []
let doAliFlag = []
let barrierFlag = []
let doneTaskList = []
let doneTaskTicket = []

let NUM_PER_ROUND = 2

let LOTTERY_TYPE = 1
let AD_TICKET_TYPE = 5
let AD_VIDEO_TYPE = 10
let HELP_TYPE = 13
let COIN_TYPE = 14

///////////////////////////////////////////////////////////////////

!(async () => {

    if (typeof $request !== "undefined") {
        // await GetRewrite()
    }
    else {

        
        let yue = require('./yue_duoduo_parameter');

        console.log("\n开始 阅多多 提现-------\n");
        
        yddCookie = yue.yueduoduo
        if (yddCookie) {
            yddCookie = yddCookie.replace(/Bearer/g, '')
            if (yddCookie.indexOf('@') > -1) {
                console.log('您选择的是用"@"隔开账号\n');
                let yddCookies = yddCookie.split('@')
                for (let i = 0; i < yddCookies.length; i++) {
                    yddCookieArr.push(yddCookies[i].trim())
                }
            } else if (yddCookie.indexOf('\n') > -1) {
                console.log(`您选择的是用"\\n"隔开账号\n`)
                let yddCookies = yddCookie.split('\n')
                for (let i = 0; i < yddCookies.length; i++) {
                    yddCookieArr.push(yddCookies[i].trim())
                }
            } else {
                yddCookieArr.push(yddCookie)
            }
        } else {
            console.log('未找到yddCookie')
            return false
        }
        
        for (let items of yddCookieArr) {
            let userItem = items.split('#')
            userToken.push(userItem[0])
            userDevice.push(userItem[1])
            userAgent.push(userItem[2])
        }

        if (yddSkipWithdraw) {
            if (yddSkipWithdraw.indexOf(',') > -1) {
                skipWithdraw = yddSkipWithdraw.split(',')
            } else {
                skipWithdraw.push(yddSkipWithdraw)
            }
        }
        console.log(`共找到${yddCookieArr.length}个阅多多用户`)
        await initAccountInfo()
        await RunMultiUser()

    
        console.log("\n开始 悦看点 提现-------\n");
        yddCookie = yue.yuekandian
        yddCookieArr = []
        userToken = []
        userDevice = []
        userAgent = []

        if (yddCookie) {
            yddCookie = yddCookie.replace(/Bearer/g, '')
            if (yddCookie.indexOf('@') > -1) {
                console.log('您选择的是用"@"隔开账号\n');
                let yddCookies = yddCookie.split('@')
                for (let i = 0; i < yddCookies.length; i++) {
                    yddCookieArr.push(yddCookies[i].trim())
                }
            } else if (yddCookie.indexOf('\n') > -1) {
                console.log(`您选择的是用"\\n"隔开账号\n`)
                let yddCookies = yddCookie.split('\n')
                for (let i = 0; i < yddCookies.length; i++) {
                    yddCookieArr.push(yddCookies[i].trim())
                }
            } else {
                yddCookieArr.push(yddCookie)
            }
        } else {
            console.log('未找到yddCookie')
            return false
        }
        
        for (let items of yddCookieArr) {
            let userItem = items.split('#')
            userToken.push(userItem[0])
            userDevice.push(userItem[1])
            userAgent.push(userItem[2])
        }

        if (yddSkipWithdraw) {
            if (yddSkipWithdraw.indexOf(',') > -1) {
                skipWithdraw = yddSkipWithdraw.split(',')
            } else {
                skipWithdraw.push(yddSkipWithdraw)
            }
        }
        console.log(`共找到${yddCookieArr.length}个悦看点用户`)
        await initAccountInfo()
        await RunMultiUser()

    }


})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

//通知
async function showmsg() {

    notifyBody = jsname + "运行通知\n\n" + notifyStr

    if (notifyFlag != 1) {
        console.log(notifyBody);
    }

    if (notifyFlag == 1) {
        $.msg(notifyBody);
        //if ($.isNode()){await notify.sendNotify($.name, notifyBody );}
    }
}



async function initAccountInfo() {
    for (userIdx = 0; userIdx < yddCookieArr.length; userIdx++) {
        coinList.push([])
        signFlag.push(0)
        contSignFlag.push(0)
        lotteryTicket.push('')
        lotteryAdTicket.push('')
        helpTicket.push('')
        userTicket.push('')
        userWaitTime.push(0)
        extraRewardFlag.push(0)
        userInfo.push({})
        withdrawFlag.push(0)
        adVideoFlag.push(0)
        adVideoTicket.push('')
        doAliFlag.push(0)
        barrierFlag.push(0)
        doneTaskList.push([])
        doneTaskTicket.push([])
    }
}

async function RunMultiUser() {
    let maxCoinNum = 0
    let maxWaitTime = 0
    let needSign = 0
    let needContSign = 0
    let needLottery = 0
    let needHelpVideo = 0
    let haveTicket = 0
    let needAdVideo = 0
    let needAliFlag = 0
    let needBarrier = 0
    let maxDoneTask = 0


    //============= 账户信息 =============
    console.log('\n查询账户信息...')
    for (userIdx = 0; userIdx < yddCookieArr.length; userIdx++) {
        await QueryUserInfo()
    }

    // ============= 提现 =============
    console.log('\n查询提现信息...')
    for (userIdx = 0; userIdx < yddCookieArr.length; userIdx++) {
        await QueryWithdrawList()
    }
}




//账号信息
async function QueryUserInfo() {
    let caller = printCaller()
    let url = `${hostname}/api/v1/member/profile?debug=0&`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject, caller)
    let result = httpResult;
    if (!result) return

    if (result.code == 0) {
        console.log(`\n==== 用户${userIdx + 1}: ${result.result.nickname} ====`)
        console.log(`今日收益: ${result.result.today_point}`)
        console.log(`提现券  : ${result.result.ticket}`)
        console.log(`手机碎片: ${result.result.fragment}`)
        console.log(`金币余额: ${result.result.point}`)
        console.log(`历史收益: ${result.result.total_point}`)
        userInfo[userIdx] = result.result
    } else {
        console.log(`用户${userIdx + 1}查询账号信息失败：${result.message}`)
    }
}

//提现列表
async function QueryWithdrawList() {
    let caller = printCaller()
    let url = `${hostname}/api/v1/cash/exchange?`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject, caller)
    let result = httpResult;
    if (!result) return

    // console.log(`======${JSON.stringify(result)}`);
    if (result.code == 0) {
        let sortList = result.result.items.sort(function (a, b) { return b["jine"] - a["jine"] });

        // console.log('sortList===', sortList);
        for (let item of sortList) {
            let skipFlag = 0
            if (skipWithdraw.length > 0) {
                for (let skipItem of skipWithdraw) {
                    if (item.jine == skipItem) {
                        skipFlag = 1
                        break
                    }
                }
            }
            if (skipFlag == 1) {
                console.log(`用户${userIdx + 1}跳过提现${item.jine}元`)
                continue
            }
            if (userInfo[userIdx].point >= item.jinbi && userInfo[userIdx].ticket >= item.cond && item.is_ok == 1) {
                console.log(`用户${userIdx + 1}准备提现${item.jine}元`)
                await Withdraw(item.jine)
                if (withdrawFlag[userIdx] == 1) break;
            } else {
                console.log(`用户${userIdx + 1} 不满足 ${item.jine} 元 提现条件`);
            }
        }
    } else {
        console.log(`用户${userIdx + 1}查询提现列表失败：${result.message}`)
    }
    console.log('------------------------------');
}

//提现
async function Withdraw(amount) {
    let caller = printCaller()
    let url = `${hostname}/api/v1/cash/exchange?`
    let body = `amount=${amount}&gate=wechat&`
    let urlObject = populatePostUrl(url, body)
    await httpPost(urlObject, caller)
    let result = httpResult;
    if (!result) return false

    if (result.code == 0) {
        withdrawFlag[userIdx] = 1
        console.log(`用户${userIdx + 1}提现${amount}：${result.result.title}, ${result.result.message}`)
    } else {
        console.log(`用户${userIdx + 1}提现${amount}失败：${result.message}`)
    }
    return false
}



////////////////////////////////////////////////////////////////////
function populatePostUrl(url, reqBody = '') {
    let urlObject = {
        url: url,
        headers: {
            'Host': 'yuekandian.yichengw.cn',
            'version': '8',
            'Authorization': 'Bearer ' + userToken[userIdx],
            'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'platform': '2',
            'Accept': '*/*',
            'User-Agent': userAgent[userIdx],
            'Connection': 'keep-alive',
            'device': userDevice[userIdx],
            'store': '100',
        },
        body: reqBody
    }
    if (userAgent[userIdx].indexOf('CBD') > -1) {
        urlObject.headers['version'] = '2'
        urlObject.headers['app'] = '3'
    } else if (userAgent[userIdx].indexOf('KDB') > -1) {
        urlObject.headers['version'] = '1'
        urlObject.headers['app'] = '5'
    }
    return urlObject;
}

function populateGetUrl(url) {
    let urlObject = {
        url: url,
        headers: {
            'Host': 'yuekandian.yichengw.cn',
            'version': '8',
            'Authorization': 'Bearer ' + userToken[userIdx],
            'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'platform': '2',
            'Accept': '*/*',
            'User-Agent': userAgent[userIdx],
            'Connection': 'keep-alive',
            'device': userDevice[userIdx],
            'store': '100',
        }
    }
    if (userAgent[userIdx].indexOf('CBD') > -1) {
        urlObject.headers['version'] = '2'
        urlObject.headers['app'] = '3'
    } else if (userAgent[userIdx].indexOf('KDB') > -1) {
        urlObject.headers['version'] = '1'
        urlObject.headers['app'] = '5'
    }

    // console.log(urlObject);
    return urlObject;
}

async function httpPost(url, caller) {
    httpResult = null
    return new Promise((resolve) => {
        $.post(url, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(caller + ": post请求失败");
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    if (safeGet(data)) {
                        httpResult = JSON.parse(data);
                        if (logDebug) console.log(httpResult);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

async function httpGet(url, caller) {
    httpResult = null
    return new Promise((resolve) => {
        $.get(url, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(caller + ": get请求失败");
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    if (safeGet(data, caller)) {
                        httpResult = JSON.parse(data);
                        if (logDebug) console.log(httpResult);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function safeGet(data, caller) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        } else {
            console.log(`Function ${caller}: 未知错误`);
            console.log(data)
        }
    } catch (e) {
        console.log(e);
        console.log(`Function ${caller}: 服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}

function printCaller() {
    return (new Error()).stack.split("\n")[2].trim().split(" ")[1]
}

function getMin(a, b) {
    return ((a < b) ? a : b)
}

function getMax(a, b) {
    return ((a < b) ? b : a)
}

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
