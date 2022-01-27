
/* 
[Script]
cron "20 8 * * *"  script-path=guang_qi_sanling.js,tag=广汽三菱
*/


const $ = new Env('广汽三菱');//声明必须

let taskArray = [4, 5, 6]

let tokenArray = 
[`JSESSIONID=c9a1e290-c9c0-4b82-91dc-745bd9d516b8; SERVERID=127fe9b0e348ead063cb2ed79076ff4e|${Math.floor((new Date()).valueOf() / 1000)}|1643179396; Hm_lpvt_d79e324d263704c4dac81376058ddf10=1643179421; Hm_lvt_d79e324d263704c4dac81376058ddf10=1642862691,1642862782,1643037952,1643179399; acw_tc=7b81f49e16431793966312491e26b31cd61909f8b6327c48d6846b6572`,
`JSESSIONID=9e5155c8-a84f-4da6-bcd6-e34ab6d06553; SERVERID=127fe9b0e348ead063cb2ed79076ff4e|${Math.floor((new Date()).valueOf() / 1000)}|1643259143; Hm_lpvt_d79e324d263704c4dac81376058ddf10=1643259710; Hm_lvt_d79e324d263704c4dac81376058ddf10=1643259117,1643259144; acw_tc=7b81f49e16432590355955157e650d94b1bed9c70821318f262b69a0f8`,]

let authorizationArray = 
['9216ffb9b91dfbf3da831a1407b4584c',
'7d3f9c98e6b9bd59644d1500a995fae9',]

let agentArray = 
['Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 DSApp/2.2.4 StatusBarHeight/47 BottomBarHeight/34',
'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 DSApp/2.2.4 StatusBarHeight/20 BottomBarHeight/0',]

let newArray = [{
    "content": "又是美好的一天呀",
    "dynamicFileList": [{
        "fileType": 2,
        "thirdId": "",
        "extroInfo": "{\"width\":999,\"duration\":0,\"height\":678}",
        "fileRelativePath": "",
        "filePath": "https:\/\/mspace-static.gmmc.com.cn\/upload\/prod\/image\/dynamic\/2022-01-26\/87A9C473-36C8-4F43-B5DD-E18930266520.jpg"
    }],
    "topicList": [],
    "btype": 0,
    "backgroundContent": "又是美好的一天呀"
},
{
	"content": "美好的一天",
	"dynamicFileList": [{
		"fileType": 2,
		"thirdId": "",
		"extroInfo": "{\"width\":806,\"duration\":0,\"height\":576}",
		"fileRelativePath": "",
		"filePath": "https:\/\/mspace-static.gmmc.com.cn\/upload\/prod\/image\/dynamic\/2022-01-27\/13D3F0CE-EC10-4487-886D-851DF1A98408.jpg"
	}],
	"topicList": [],
	"btype": 0,
	"backgroundContent": "美好的一天"
}]

let token = '';
let agent = '';
let authorization = '';
let newBody;
let messageNotify = '';

!(async () => {

    timeZone = new Date().getTimezoneOffset() / 60;
    timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
    bjTime = new Date(timestamp).toLocaleString('zh', {
        hour12: false,
        timeZoneName: 'long'
    });
    console.log(`\n ======脚本执行 ${bjTime}======\n`);

    console.log(`--------------------------`);
    console.log(`-------共提供${tokenArray.length}个账号------`);
    console.log(`--------------------------`);

    for (let index = 0; index < tokenArray.length; index++) {
        token = tokenArray[index];
        agent = agentArray[index];
        authorization = authorizationArray[index];
        newBody = newArray[index];

        console.log(`开始第${index + 1}个账号的任务-----`);

        // for (let index = 0; index < taskArray.length; index++) {
        //     const element = taskArray[index];
        //     await shareWechat(element)
        //     await $.wait(10 * 1000);
        // }
        // await getArticleList()

        // let timeWait = Math.floor(Math.random() * 10) + 20
        // console.log(`随机等待${timeWait}秒-----`)
        // await $.wait(timeWait * 1000);
        // await addNews()
        await accountInfo(index + 1)
    }
    console.log(messageNotify);

})()



// {
// 	"code": "0000",
// 	"msg": "",
// 	"data": {
// 		"userId": 1332040,
// 		"nickname": "MFans_V548VA",
// 		"mobile": "17862926330",
// 		"code": "1332040",
// 		"realName": "",
// 		"thumb": "https://mspace.gmmc.com.cn/myfiles/avatar/default/default_avatar3.png",
// 		"userType": 0,
// 		"titleList": [],
// 		"carName": "",
// 		"carModelName": "",
// 		"sex": 1,
// 		"level": 1,
// 		"signature": "",
// 		"createdate": 1643259106,
// 		"growthLevel": 1,
// 		"growthValue": 10,
// 		"province": "370000",
// 		"provinceName": "山东省",
// 		"city": "3701",
// 		"cityName": "济南市",
// 		"address": "",
// 		"dateBirth": "",
// 		"userCard": 0,
// 		"userState": 0,
// 		"updateTime": null,
// 		"remarkName": "",
// 		"cardName": "",
// 		"card": "",
// 		"centerId": "61f224e2717e3847320931e7",
// 		"integralCumulative": 0,
// 		"releaseCount": 4,
// 		"orderCount": 0,
// 		"messageCount": 0,
// 		"integral": 40,
// 		"activityPic": "",
// 		"dynamicCount": 3,
// 		"qaCount": 0,
// 		"commentCount": 1,
// 		"hasCertCar": false,
// 		"reserveCount": 0,
// 		"mediaCertificationStatus": -1,
// 		"hasAuthCar": false,
// 		"partnerId": "pnu177943906331679005",
// 		"followCount": 0,
// 		"fansCount": 0,
// 		"articleCount": 0
// 	},
// 	"timestamp": 1643260550230,
// 	"success": true
// }
function accountInfo(index) {
    console.log(`\n用户信息-----\n`)
    return new Promise((resolve, reject) => {
        let url = {
            url: `https://mspace.gmmc.com.cn/customer-app/customer/user/info`,
            headers: {
                'User-Agent': agent,
                'origin': 'https://mspace.gmmc.com.cn',
                'accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=utf-8',
                'cookie': token,
                'authorization': authorization,
                'appversion': '2.2.4',
                "operatesystem": "iOS",
                'referer': 'https://mspace.gmmc.com.cn/info/detail?id=854&goindex=1',
            },
            body: JSON.stringify({})
        }
        $.post(url, async (error, resp, data) => {
            try {
                let obj = JSON.parse(data)
                // console.log(obj)
                let account = `[账号]${index}\n`
                let name = `[昵称]${obj.data.nickname}\n`
                let mobile = `[手机]${obj.data.mobile}\n`
                let score = `[积分]${obj.data.integral}\n\n`
                messageNotify = messageNotify + account + name + mobile + score

            } catch (e) {
            } finally {
                resolve();
            }
        })
    })
}



// sign 
// post 
// body {"taskTypeCode":"TASK-INTEGRAL-SIGN-IN"}
// https://mspace.gmmc.com.cn/customer-app/task-mapi/sign-count?noLoad=true

// https://mspace.gmmc.com.cn/life-main-app/common/pageRecommend/goodRecommend?pageNo=1&pageSize=20
function getArticleList() {
    console.log("\n获取文章的列表-----\n")
    return new Promise((resolve, reject) => {
        let url = {
            url: `https://mspace.gmmc.com.cn/life-main-app/common/pageRecommend/goodRecommend?pageNo=1&pageSize=20`,
            headers: {
                'User-Agent': agent,
                'origin': 'https://mspace.gmmc.com.cn',
                'accept': '*/*',
                // 'Content-Type': 'application/json;charset=utf-8',
                'cookie': token,
                'appversion': '2.2.4',
                "operatesystem": "iOS",
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'zh-Hans-CN;q=1, en-CN;q=0.9, ja-CN;q=0.8, zh-Hant-CN;q=0.7, ja-JP;q=0.6',
            },
        }
        $.get(url, async (error, resp, data) => {
            try {
                let obj = JSON.parse(data)
                let ary = obj.data.list
                //   console.log(ary)
                //   for (let index = 0; index < ary.length; index++) {
                //       const element = ary[index];
                //       let articleId = element.objectInfo.articleId
                //       console.log(articleId);
                //   }
                if (ary.length > 9) {
                    let index = Math.floor(Math.random() * 10)
                    const element = ary[index];
                    let articleId = element.objectInfo.articleId
                    await addCommet(articleId)
                }
            } catch (error) {
            } finally {
                resolve()
            }
        })
    })
}


function addCommet(articleId) {
    console.log(`\n添加评论id=${articleId}-----\n`)
    return new Promise((resolve, reject) => {
        let url = {
            url: `https://mspace.gmmc.com.cn/social-cms-app/frontend/comment/add`,
            headers: {
                'User-Agent': agent,
                'origin': 'https://mspace.gmmc.com.cn',
                'accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=utf-8',
                'cookie': token,
                'authorization': authorization,
                'referer': 'https://mspace.gmmc.com.cn/info/detail?id=854&goindex=1',
            },
            body: JSON.stringify({
                "commentContent": "好",
                "commentType": 1,
                "commentTypeBusinessId": articleId
            })
        }
        $.post(url, async (error, resp, data) => {
            try {
                let obj = JSON.parse(data)
                console.log(data)
            } catch (e) {
            } finally {
                resolve();
            }
        })
    })
}

function addNews() {
    console.log("\n发布动态-----\n")
    return new Promise((resolve, reject) => {
        let url = {
            url: `https://mspace.gmmc.com.cn/social-cms-app/frontend/dynamic/add`,
            headers: {
                'User-Agent': agent,
                'origin': 'https://mspace.gmmc.com.cn',
                'accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'cookie': token,
                'authorization': authorization,
                'appversion': '2.2.4',
                "operatesystem": "iOS",
            },
            body: JSON.stringify(newBody)
        }
        $.post(url, async (error, resp, data) => {
            try {
                let obj = JSON.parse(data)
                console.log(obj)
            } catch (e) {
            } finally {
                resolve();
            }
        })
    })
}


function shareWechat(taskId) {
    console.log(`\n分享微信id=${taskId}-----\n`)
    return new Promise((resolve, reject) => {
        let url = {
            url: `https://mspace.gmmc.com.cn/customer-app/integral-task/complete/share?noLoad=true`,
            headers: {
                'User-Agent': agent,
                'origin': 'https://mspace.gmmc.com.cn',
                'accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=utf-8',
                'cookie': token,
                'authorization': authorization,
                'referer': 'https://mspace.gmmc.com.cn/topics/topic?topicName=1000&topicId=331&activityId=0&goindex=1',
            },
            body: JSON.stringify({ "taskType": taskId })
        }

        $.post(url, async (error, resp, data) => {
            try {
                let obj = JSON.parse(data)
                console.log(data)
            } catch (e) {
            } finally {
                resolve();
            }
        })
    })
}


function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v2/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }


