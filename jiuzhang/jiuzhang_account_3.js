/* 

[Script]
cron "20 8-20/2 * * *"  script-path=jiuzhang_account_3.js,tag=九章头条3-峰0410

*/

const $ = new Env('九章头条3-峰0410');//声明必须

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

  let itemDic = jiuzhang[2];

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
  

  // for (let index = 0; index < 3; index++) {
  //   // 三次分享
  //   // await shareWechat()
  //   // await shareWechat2()
  // }
  // await watch_ad()



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
    
    
