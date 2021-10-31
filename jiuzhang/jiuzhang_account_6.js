
const $ = new Env('九章头条6-格0306');//声明必须

let jiuzhang = require('./raw_main_jiuzhang_account_parameter');
let cookie = "";
let readTime = 30
let ad_readTime = 28 //看广告用时

!(async () => {

  timeZone = new Date().getTimezoneOffset() / 60;
  timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
  bjTime = new Date(timestamp).toLocaleString('zh', {
    hour12: false,
    timeZoneName: 'long'
  });
  console.log(`\n ======脚本执行 ${bjTime}======\n`);

  let itemDic = jiuzhang[5];

  let accountInfo = itemDic["accountInfo"]
  cookie = itemDic["token"]

  console.log(`\n🍀🍀🍀🍀 账号--${accountInfo}开始任务🍀🍀🍀🍀\n`);

  await clockin()

  await daysign()

  await getBenefit() 

  console.log(`\n账号--${accountInfo}任务开始去收一波视频广告奖励`)
  await adVideoInfo()

  //文章
  await articleList(0)

  //视频
  await articleList(2)
  console.log(`\n🍀🍀🍀🍀🍀 账号--${accountInfo}结束任务🍀🍀🍀🍀\n`);
  

//   for (let index = 0; index < 3; index++) {
//     // 三次分享
//     // await shareWechat()
//     // await shareWechat2()
//   }
//   await watch_ad()



})()



// 获取用户信息
// https://api.st615.com/v1/user/info?token=iXTqHlC2zxr_JVRMXqq3CnvAIk3DsraT
// {
// 	"code": 0,
// 	"data": {
// 		"name": "李峰",
// 		"invite_code": "1oRgpBE3",
// 		"id": 101603,
// 		"avatar": "https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTKTtQ7uD8oMJs9ogGSOaw9gyDeJpZwYCj6RpfoIVEgNSzkHV83fmmgzgNkhv5TpibcGZtIEOylOvyA\/132",
// 		"mobile": "18253169060",
// 		"sex": 1,
// 		"integral": 4596,
// 		"money": 0.03,
// 		"work_money": 0,
// 		"sid": "1oRgpBE3",
// 		"birthday": "",
// 		"address": null,
// 		"intro": "",
// 		"fans": 0,
// 		"level": 0,
// 		"views": 0,
// 		"has_label": 0,
// 		"read_seconds": 0,
// 		"has_unread": 1,
// 		"price": 8.97,
// 		"worth": 0.27
// 	},
// 	"msg": "成功"
// }



// https://api.st615.com/v1/article/list?type=2&cid=0&page=1&terminal=Apple&version=1.2.4&token=iXTqHlC2zxr_JVRMXqq3CnvAIk3DsraT
// https://api.st615.com/v1/article/list?cid=0&page=1&limit=20&type=0&terminal=Apple&version=1.2.4&token=iXTqHlC2zxr_JVRMXqq3CnvAIk3DsraT
function articleList(type) {
  let ctype = type == 0 ? "文章" : "视频";
  console.log(`\n------------🍒 开始阅读${ctype}任务 🍒-------------\n`)
  return new Promise((resolve, reject) => {
    $.get(apiHost(`v1/article/list?cid=0&page=1&limit=20&type=${type}&terminal=Apple&version=1.2.4&token=${cookie}`), async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        let array = obj.data.list
        // console.log(array)
        console.log(`\n获取到${ctype}数量为: ${array.length}`)

        for (let index = 0; index < array.length; index++) {
          console.log(`\n开始第${index + 1}篇${ctype}的阅读`)
          let dicItem = array[index];
          await articleDetail(dicItem["id"],type, index + 1)
        }
      } catch (error) {
        
      } finally {
        resolve()
      }
    })
  })
}

function articleDetail(id,type,currenIndex) {
  return new Promise((resolve, reject) => {
    
    // https://api.st615.com/v1/article/detail?id=1738045&uid=&token=${cookie}&os=14.0.1&device=iPhone%207
    $.get(apiHost(`v1/article/detail?id=${id}&uid=&token=${cookie}&os=14.0.1&device=iPhone 7`), async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        let ctype = type == 0 ? "文章" : "视频";
        console.log(`获取${ctype}详情Id=${id}`)
        console.log(`${ctype}title: ${obj.data.title}`)
        console.log(`阅读${ctype}${readTime}秒----`)
        await $.wait(readTime * 1000);
        await readFinish(id,type,currenIndex)
      } catch (error) {
        
      } finally {
        resolve()
      }
    })
  })
}

function readFinish(id,type,currenIndex) {
  let ctype = type == 0 ? "文章" : "视频";
  return new Promise((resolve, reject) => {
    $.post(apiHost(`v1/article/finish`,`id=${id}&token=${cookie}`), async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(`本次阅读${ctype}获得金币: ${obj.data.coin}`)
        if (currenIndex == 10 || currenIndex == 20) {
          console.log(`\n***已经看了${currenIndex}篇${ctype},去刷一波 视频广告奖励***\n`)
          await adVideoInfo()
        }
        console.log(`\n等待2秒，开始下一篇`)
        await $.wait(2 * 1000);
      } catch (e) {
        console.log(e)
      } finally {
        resolve();
      }
    })
  })
}


// https://api.st615.com/v1/user/task?token=iXTqHlC2zxr_JVRMXqq3CnvAIk3DsraT
function adVideoInfo() {
  return new Promise((resolve, reject) => {
    console.log("\n------------🍒 获取视频广告信息🍒-------------\n")
    $.get(apiHost(`v1/user/task?token=${cookie}`), async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj.data.ads_task)
        let array = obj.data.ads_task
        for (let index = 0; index < array.length; index++) {
          let dicItem = array[index];
          console.log(`\n开始观看视频广告id=${dicItem["id"]}`)
          console.log(`观看视频广告${ad_readTime}秒`)
          await $.wait(ad_readTime * 1000);
          await getVideoBenefit(dicItem["id"])
        }
        console.log(`\n收一波 视频广告奖励全部完成\n`)
        
      } catch (error) {
        
      } finally {
        resolve()
      }
    })
  })
}

// 广告视频获取奖励
// https://api.st615.com/v1/task/ads
function getVideoBenefit(id) {
  console.log(`\n------------🍒 id=${id}广告视频获取奖励 🍒-------------\n`)
  return new Promise((resolve, reject) => {
    $.post(apiHost(`v1/task/ads`,`token=${cookie}&id=${id}`), async (error, resp, data) => {
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

function clockin() {
  console.log("\n------------🍒 每日打卡 🍒-------------\n")
  return new Promise((resolve, reject) => {
    $.post(apiHost(`v1/task/clock`,`is_double=0&token=${cookie}`), async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)
        await $.wait(5 * 1000);

      } catch (e) {

      } finally {
        resolve();
      }
    })
  })
}


// https://api.st615.com/v1/sign/sign
function daysign() {
  console.log("\n------------🍒 每日签到 🍒-------------\n")
  return new Promise((resolve, reject) => {
    $.post(apiHost(`v1/sign/sign`,`token=${cookie}`), async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)
        await $.wait(5 * 1000);

      } catch (e) {

      } finally {
        resolve();
      }
    })
  })
}



function apiHost(api, body) {
  return {
      url: 'https://api.st615.com/' + api,
      headers: {
          'User-Agent': 'ChapterNine/1.2.4 (com.ass.jiuzhang; build:1121; iOS 14.0.1) Alamofire/5.4.2',
          'Host': 'api.st615.com',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: body
  }
}


// https://api.st615.com/v1/index/get-benefit?token=iXTqHlC2zxr_JVRMXqq3CnvAIk3DsraT

function getBenefit() {
  return new Promise((resolve, reject) => {
    console.log("\n------------🍒 首页时段获取奖励 🍒-------------\n")
    $.get(apiHost(`v1/index/get-benefit?token=${cookie}`), async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)

        console.log(`\n首页时段获取奖励完成，顺便看视频广告${ad_readTime}秒后收奖励`)
        await getVideoBenefit(77)

      } catch (error) {
        
      } finally {
        resolve()
      }
    })
  })
}

// 分享
// URL	https://api.st615.com/v1/share/info?token=iXTqHlC2zxr_JVRMXqq3CnvAIk3DsraT&type=1
// https://api.st615.com/v1/share/info?token=${cookie}&type=1


function shareWechat() {
  return new Promise((resolve, reject) => {
    console.log("\n------------🍒 分享微信 🍒-------------\n")
    $.get(apiHost(`v1/share/info?token=${cookie}&type=1`), async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)

      } catch (error) {
        
      } finally {
        resolve()
      }
    })
  })
}


// device	iPhone 7
// id	
// os	14.0.1
// source	cash
// token	55nLV5tA48s-Qjr5uvlSw3o9p1W-BW0_

// https://api.st615.com/v1/article/share

function shareWechat2() {
  console.log("\n------------🍒 分享微信 🍒-------------\n")
  return new Promise((resolve, reject) => {
    $.post(apiHost(`v1/article/share`,`device=iPhone&token=${cookie}&source=cash&os=14.0.1&id=`), async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)
        await $.wait(5 * 1000);

      } catch (e) {

      } finally {
        resolve();
      }
    })
  })
}


// URL	https://api.st615.com/v1/cash/ads?token=6AcapWEKj-UPlDFkwMNd9pvIcg7B9t_V&source=cash
// URL	https://api.st615.com/v1/cash/ads?token=${cookie}&source=cash
function watch_ad() {
  return new Promise((resolve, reject) => {
    console.log("\n------------🍒 kan广告视频获取提现条件 🍒-------------\n")
console.log("path", apiHost(`v1/cash/ads?token=${cookie}&source=cash`))

    $.get(apiHost(`v1/cash/ads?token=${cookie}&source=cash`), async (error, resp, data) => {
      
      try {
        let obj = JSON.parse(data)
        console.log(obj)

      } catch (error) {
        
      } finally {
        resolve()
      }
    })
  })
}



function apiHost(api, body) {
  return {
      url: 'https://api.st615.com/' + api,
      headers: {
          'User-Agent': 'ChapterNine/1.2.4 (com.ass.jiuzhang; build:1121; iOS 14.0.1) Alamofire/5.4.2',
          'Host': 'api.st615.com',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: body
  }
}


// 提现
// https://api.st615.com/v1/cash/withdraw-new
// token	55nLV5tA48s-Qjr5uvlSw3o9p1W-BW0_
// type	1
// money	0.3

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }


