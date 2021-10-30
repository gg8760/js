/*
更新时间: 2021-02-28 09:03
Github Actions使用方法见[@lxk0301](https://raw.githubusercontent.com/lxk0301/scripts/master/githubAction.md) 使用方法大同小异

点击几篇文章和视频，自动获取阅读请求，在Github Actions中的Secrets新建name为'YOUTH_READ'的一个值，拷贝抓包的请求体到下面Value的文本框中，添加的请求体越多，获得青豆次数越多，本脚本不包含任何推送通知

多个请求体时用'&'号或者换行隔开" ‼️

*/

const $ = new Env("中青看点资产通知")

var accountBody="";

// var accountInfoArray=[];
const notify = require('./sendNotify') || '';
let accountCurrent = '';
let withdrawAccount = '';
let totalArrivedMoney = 0;
let totalReviewMoney = 0;
let iphone = '';
var notifyMessage = "";
timeZone = new Date().getTimezoneOffset() / 60;
timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
bjTime = new Date(timestamp).toLocaleString('zh', {
    hour12: false,
    timeZoneName: 'long'
});
console.log(`\n === 脚本执行 ${bjTime} ===\n`);

!(async () => {
    

    let youth = require('./raw_youth_read_article_parameter');

    let accountInfoArray = youth.YOUTH_ACOUNT_INFO_URL

    for (let index = 0; index < accountInfoArray.length; index++) {
        let dicItem = accountInfoArray[index];
        
        accountCurrent = dicItem["accountInfo"]
        withdrawAccount = dicItem["withdrawAccount"]
        let accountInfoUrl = dicItem["accountInfoUrl"]
        let withdrawInfoUrl = dicItem["withdrawInfoUrl"]
        iphone = dicItem["mobile"]

        await accountInfo(accountInfoUrl);
        await withdrawInfo(withdrawInfoUrl);

    }

    notifyMessage = notifyMessage + `【已到账总金额💰】${totalArrivedMoney.toFixed(2)} 元\n` + `【审核中总金额💰】${totalReviewMoney}元\n\n`
    console.log("通知推送信息-----------\n\n",notifyMessage)
    await notify.sendNotify(`中青看点资产通知`, notifyMessage);


})()
.catch((e) => $.logErr(e))
.finally(() => $.done())

    function accountInfo(accountUrl) {
        return new Promise((resolve, reject) => {
            $.get(batHost(accountUrl), async (error, resp, data) => {
    
                try {
                    let obj = JSON.parse(data);
                    let accountName = obj.items.nickname
                    let accountMobile = obj.items.mobile
                    let inviteId = obj.items.uid
                    
                    let accountInfo = `【${accountCurrent}】${accountName}  ${accountMobile}\n`
                    let inviteInfo = `【我的邀请码】${inviteId}\n`
                    let iphone1 = `【手机号】${iphone}\n`
                    let todayScore = `【今日青豆收益】${obj.items.today_score}，约${(parseFloat(obj.items.today_score) / 10000)}💰\n`
                    
                    let totalScore = `【我的青豆总数】${obj.items.score}，约${obj.items.money}💰\n`
                    
                    if(parseFloat(obj.items.money) >= 30) {
                        totalScore = `【我的青豆总数】${obj.items.score}，约${obj.items.money}💰（可提现了哦）\n`
                    } 

                    let info = accountInfo + inviteInfo + iphone1 + todayScore + totalScore

                    notifyMessage = notifyMessage + info

                    console.log(bodyobj)
                    
    
                } catch (e) {
                    
                } finally {
                    resolve()
                }
            })
        })
    }

    function withdrawInfo(withdrawUrl) {
        return new Promise((resolve, reject) => {
            $.get(batHost(withdrawUrl), async (error, resp, data) => {
    
                try {
                    let obj = JSON.parse(data);
                    let arrayData = obj.data

                    let withdrawingMoney = 0;// 审核中
                    let withdrawMoney = 0; //已到账
                    let tip = "";
                    for (let index = 0; index < arrayData.length; index++) {
                        let item = arrayData[index]
                        if (item.description.length > 0) {
                            tip = item.description
                        }
                        if (item.status == "1") {
                            withdrawMoney = withdrawMoney + item.money
                        } else {
                            withdrawingMoney = withdrawingMoney + item.money
                        }
                    }

                    totalArrivedMoney = (totalArrivedMoney * 100 + parseFloat(withdrawMoney) * 100) / 100
                    totalReviewMoney = totalReviewMoney + withdrawingMoney
                    
                    let moneyAccountInfo = `【提现账号】${withdrawAccount} \n`
                    
                    let moneyInfo = ""
                    if (tip.length > 0) {
                        moneyInfo = `【已提现金额】${withdrawMoney.toFixed(2)}元\n` + `【提现中金额】${withdrawingMoney.toFixed(2)}元\n` + `【Tip🔔】${tip}\n\n`
                    } else {
                        moneyInfo = `【已提现金额】${withdrawMoney.toFixed(2)}元\n` + `【提现中金额】${withdrawingMoney.toFixed(2)}元\n\n`
                    }
                    
                    notifyMessage = notifyMessage + moneyAccountInfo + moneyInfo
                    
                } catch (e) {
                    
                } finally {
                    resolve()
                }
            })
        })
    }

    // https://kandian.wkandian.com/v3/user/userinfo.json?access=WIFI&app_version=2.3.1&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.3.1&device_brand=iphone&device_id=54892858&device_model=iPhone&device_platform=iphone&device_type=iphone&isnew=1&mobile_type=2&net_type=1&openudid=e37d45e159ebeec7af974d67add3e2a1&os_version=14.8&phone_code=e37d45e159ebeec7af974d67add3e2a1&phone_network=WIFI&platform=3&request_time=1632469596&resolution=780x1688&sign=662688eed8b1e89363c1e7b32f050a81&sm_device_id=202108131011413207a52324e31bd5d90ee2f0d937a6270112cf9f68d03a9a&szlm_ddid=D2lV%2BzmjxowYjaOU44fVepxko05BndKERj457KnGsBs2IXf4&time=1632469597&uid=58369867&uuid=e37d45e159ebeec7af974d67add3e2a1
    function batHost(api) {
        return {
            url: api,
 
        }
    }
    



function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}