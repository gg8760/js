
const Notice = 90;//设置运行多少次才通知。

const $iosrule = new Env('惠头条账号7-vx格0306');//声明必须
const huitoutiao = "惠头条账号7-vx格0306";

var pathUrl = "";
var urlBody, readArticleBody, readVideoBody, videoBody520, userId, loginId, appVersion ,versionName ,platform ;

var update520ArticleNumber = 10;
var update520ArticleWaitTime = 30000;

var update520VideoNumber = 10;
var update520VideoWaitTime = 30000;

var readArticleNumber = 50;
var readArticleWaitTime = 40000;

var readVideoNumber = 50;
var readVideoWaitTime = 40000;

var breakReadArticle = false;
var breakReadVideo = false;

var continueVideoUpdateTime;
var continueArticleUpdateTime;

var htt_num = 0; var htt_result = "";

const notify = require('./sendNotify') || '';
var notifyMessage = "";
let accountCurrent = "";
let accountMobile = "";

!(async () => {

  timeZone = new Date().getTimezoneOffset() / 60;
  timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
  bjTime = new Date(timestamp).toLocaleString('zh', {
    hour12: false,
    timeZoneName: 'long'
  });
  console.log(`\n ======脚本执行 ${bjTime}======\n`);

  let huiTouTiao = require('./raw_huiTouTiao_hui_tou_tiao_parameter');

  let accountArray = huiTouTiao.huiTou_account_info
  let dicItem = accountArray[6]

  // console.log(`========================================`);
  // console.log(`========================================`);
  // console.log(`===========【总共提供${accountArray.length}个账号】=============`);
  // console.log(`========================================`);
  // console.log(`========================================`);



  // for (let index = 0; index < accountArray.length; index++) {

    breakReadArticle = false
    breakReadVideo = false
    

    

    userId = dicItem["userId"]
    loginId = dicItem["loginId"]
    appVersion = dicItem["appVersion"]
    versionName = dicItem["versionName"]
    platform = dicItem["platform"]
    accountMobile = dicItem["accountMobile"]
    accountCurrent = dicItem["accountInfo"]

    pathUrl = `userId=${userId}&loginId=${loginId}&appVersion=${appVersion}&platform=${platform}&versionName=${versionName}`

    console.log(`\n🍀🍀🍀🍀🍀 开始任务---${accountCurrent} 🍀🍀🍀🍀🍀\n`);

    urlBody = JSON.stringify({
      "appVersion": appVersion,
      "loginId": loginId,
      "versionName": versionName,
      "userId": userId,
      "position": 10,
      "platform": 1
    })

    videoBody520 = JSON.stringify({
      "platform": platform,
      "loginId": loginId,
      "versionName": versionName,
      "userId": userId,
      "appVersion": appVersion,
      "duration": 30
    })

    readArticleBody = JSON.stringify({
      "versionName": versionName,
      "platform": platform,
      "count": 3,
      "userId": userId,
      "multiple": false,
      "channel": "dongfang",
      "duration": 200, // 时间
      "appVersion": appVersion,
      "loginId": loginId,
      "readActionInfo": {
        "maxHistorySize": 0,
        "toolTypes": [0],
        "moveAvgPressure": 0,
        "downCount": 67,
        "monkey": false,
        "moveCount": 674,
        "downAvgPressure": 0
      }
    })

    readVideoBody = JSON.stringify({
      "versionName": versionName,
      "platform": platform,
      "count": 0,
      "userId": userId,
      "multiple": false,
      "channel": "video",
      "duration": 30,
      "appVersion": appVersion,
      "loginId": loginId
    })

    if (new Date().getHours() >= 6 && new Date().getHours() <= 8) {
      await htt_daysign();
    }

    await htt_signday();

    await htt_hoursign();

    await ad_video();

    await htt_homepage();

    await htt_homepage2()

    await htt_taskread5();


    console.log("\n------------🍒 开始阅读文章更新时长 🍒-------------\n")
    for (let i = 0; i < readArticleNumber; i++) {
      if (breakReadArticle == false) {
        console.log(`\n------------开始第${i + 1}次阅读文章-------------\n`)
        await htt_read_dongfang();
        if (i < readVideoNumber - 1) {
          console.log(`\n------------等待${readArticleWaitTime / 1000}秒-------------\n`)
          await $iosrule.wait(readArticleWaitTime);
        }
      } else {
        console.log(`今天阅读文章时长达到最大值，退出for循环`);
        break;
      }
    }
    console.log("\n------------🍒 结束阅读文章更新时长 🍒-------------\n")



    console.log("\n------------🍒 开始看视频更新时长 🍒-------------\n")
    for (let i = 0; i < readVideoNumber; i++) {
      if (breakReadVideo == false) {
        console.log(`\n------------开始第${i + 1}次阅读视频-------------`)
        await htt_read_video();
        if (i < readVideoNumber - 1) {
          console.log(`\n------------等待${readVideoWaitTime / 1000}秒-------------`)
          await $iosrule.wait(readVideoWaitTime);
        }
      } else {
        console.log(`今天看视频时长达到最大值，退出for循环`);
        break;
      }
    }
    console.log("\n------------🍒 结束看视频更新时长 🍒-------------\n")



    console.log("\n------------🍒 开始520视频更新时长 🍒-------------\n")
    await htt_check_520VideoUpdateTime();
    if (continueVideoUpdateTime == true) {
      for (let i = 0; i < update520VideoNumber; i++) {
        console.log(`\n--------开始第${i + 1}次520视频更新时长--------\n`)
        await htt_update_520VideoTime();
        if (i < update520VideoNumber - 1) {
          console.log(`\n------------等待${update520VideoWaitTime / 1000}秒-------------`)
          await $iosrule.wait(update520VideoWaitTime);
        }
      }
    } else {
      console.log(`\n520视频不需要更新时长`)
    }
    console.log("\n------------🍒 结束520视频更新时长 🍒-------------\n")


    console.log("\n------------🍒 开始520文章更新时长 🍒-------------\n")
    await htt_check_520ArticleUpdateTime()
    if (continueArticleUpdateTime == true) {
      for (let i = 0; i < update520ArticleNumber; i++) {
        console.log(`\n--------开始第${i + 1}次520文章更新时长--------\n`)
        await htt_update_520ArticleTime();
        if (i < update520ArticleNumber - 1) {
          console.log(`\n------------等待${update520ArticleWaitTime / 1000}秒-------------`)
          await $iosrule.wait(update520ArticleWaitTime);
        }
      }
    } else {
      console.log(`\n520文章不需要更新时长`)
    }
    console.log("\n------------🍒 结束520文章更新时长 🍒-------------\n")

    if (new Date().getHours() >= 16 /*&& new Date().getHours() <= 23*/) {
      await htt_get520VideoRewardList();
      await htt_get520ArticleRewardList();
    }

    console.log(`\n🍀🍀🍀🍀🍀🍀🍀🍀 结束${accountCurrent}任务 🍀🍀🍀🍀🍀🍀🍀🍀🍀\n`);

  // }

  // htt_read_smvideo();
  // htt_readtotal();


})()




function htt_daysign() {
  console.log("\n------------🍒 每日签到 🍒-------------\n")
  return new Promise((resolve, reject) => {
    const profiturl = {
      url: "https://api.cashtoutiao.com/frontend/sign?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: urlBody,
    };
    $iosrule.post(profiturl, async (error, resp, data) => {
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

// 获取签到天数
function htt_signday() {
  console.log("\n------------🍒 用户签到信息 🍒-------------\n")
  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/sign/record?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: urlBody
    };
    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)
      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })
  })



  // const llUrl2 = {
  //   url: "https://api.cashtoutiao.com/frontend/invite?" + htt_signurlck,
  //   headers: {
  //     "Content-Type": "application/json",
  //     "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
  //   },
  //   body: signjs
  // };




  // $iosrule.post(profiturl, async (error, resp, data) => {
  //   //$.log(data+"\n")
  //   try {
  //     console.log("jieguo_________")

  //     // console.log(data)

  //     console.log(resp)

  //     // let sign_res = JSON.parse(data)

  //   } catch (e) {
  //     // $.logErr(e, data)
  //   } finally {
  //     // resolve();
  //   }
  // })

  // $iosrule.post(llUrl1, function (error, response, data) {

  //   console.log("jieguo_________")

  //   console.log(data)
  //   // var obj = JSON.parse(data)





  //   // if (obj.statusCode == 200) {
  //   //   result2 = "[金币]" + obj.signCredit;
  //   //   htt_signday(result2);
  //   // }
  //   // else if (obj.statusCode == -50) {
  //   //   result2 = "[重复签到]";
  //   //   htt_signday(result2);
  //   // }
  // })
  // $iosrule.post(llUrl2, function (error, response, data) { })
}

// 时段签到
function htt_hoursign() {
  console.log("\n------------🍒 时段签到 🍒-------------\n")
  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/credit/sych/reward/per/hour?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: urlBody
    };
    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)
      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })

  })
}

// 视频广告浏览
// https://api.cashtoutiao.com/frontend/reward/ad/config/ad/amount?userId=153709223&loginId=1b26306408b749e7a02d9025608d9718&appVersion=1043&platform=1&versionName=4.6.0
function ad_video() {
  console.log("\n------------🍒 视频广告浏览 🍒-------------\n")
  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/reward/ad/config/ad/amount?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: urlBody
    };
    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)
      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })

  })

}

// 首页奖励top
function htt_homepage() {
  console.log("\n------------🍒 首页奖励top 🍒-------------\n")
  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/homepage/top/ttsdk_ios/ad/feedback?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: urlBody
    };
    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)
      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })

  })
}

// 首页奖励bottom
function htt_homepage2() {
  // https://api.cashtoutiao.com/frontend/homepage/bottom/gdt_ios/ad/feedback?userId=114661131&loginId=8a99cc70677d4f8ab2a7e57a5b3d36cf&appVersion=1043&platform=1&versionName=4.6.0

  console.log("\n------------🍒 首页奖励bottom 🍒-------------\n")
  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/homepage/bottom/gdt_ios/ad/feedback?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: urlBody
    };
    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)
      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })

  })
}


function htt_taskread5() {
  console.log("\n------------🍒 每日任务阅读 🍒-------------\n")
  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/daily/task/revision/draw?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: urlBody
    };

    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)
      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })

  })

}


// 更新阅读时间
function htt_read_dongfang() {
  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/read/sych/duration?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: readArticleBody
    };
    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)
        if (obj.statusCode == 200) {
          if (obj.state == 0) {
            console.log("\n【阅读文章获得金币】 " + obj.incCredit + "\n【今日阅读时长】 " + formatSeconds(obj.todayDuration))
          }
          if (obj.state == 1 && obj.msg.indexOf("超过阈值") > -1) {
            breakReadArticle = true
          }
        }

      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })

  })
}

// 更新视频阅读时间
function htt_read_video() {

  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/read/sych/duration?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: readVideoBody
    };
    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)
        if (obj.statusCode == 200) {
          if (obj.state == 0) {
            console.log("\n【看视频获得金币】 " + obj.incCredit + "\n【今日视频阅读时长】 " + formatSeconds(obj.todayDuration))
          }
          if (obj.state == 1 && obj.msg.indexOf("超过阈值") > -1) {
            breakReadVideo = true
          }
        }
      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })
  })
}


function htt_update_520VideoTime() {

  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/scholarship/video/sych/duration?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: videoBody520
    };
    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)

      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })
  })
}

function htt_get520VideoRewardList() {
  console.log("\n---------🍒 获取520视频奖励列表，并收取奖励 🍒---------\n")
  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/scholarship/video/task/info?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: urlBody
    };
    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)

        if (obj.statusCode == 200) {
          let taskList = obj.taskList
          for (let index = 0; index < taskList.length; index++) {
            let item = taskList[index];
            if (item.state == 2) {
              await htt_get520VideoReward(item.taskId)
            }
          }
        }

      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })
  })
}


function htt_get520VideoReward(taskId) {
  console.log(`\n------🍒 【taskId = ${taskId}】 收取520视频奖励 🍒-------\n`)

  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/scholarship/video/task/draw?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: JSON.stringify({
        "loginId": loginId,
        "versionName": versionName,
        "taskId": taskId,
        "userId": userId,
        "appVersion": appVersion,
        "platform": platform
      })
    };

    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        if (obj.statusCode == 200) {
          console.log("\n【获得金币】 " + obj.credit)
        } else {
          console.log("\n【获得金币】 " + "失败")
        }
      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })
  })
}


function htt_update_520ArticleTime() {
  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/scholarship/read/sych/duration?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: videoBody520
    };
    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)
      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })
  })
}

function htt_get520ArticleRewardList() {
  console.log("\n---------🍒 获取520文章奖励列表 ，并收取奖励🍒---------\n")
  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/scholarship/read/task/info?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: urlBody
    };
    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(obj)

        if (obj.statusCode == 200) {
          let taskList = obj.taskList
          for (let index = 0; index < taskList.length; index++) {
            let item = taskList[index];
            if (item.state == 2) {
              await htt_get520ArticleReward(item.taskId)
            }
          }
        }

      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })
  })
}

function htt_get520ArticleReward(taskId) {
  console.log(`\n-----🍒 【taskId = ${taskId}】 收取520文章奖励 🍒------\n`)

  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/scholarship/read/task/draw?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: JSON.stringify({
        "loginId": loginId,
        "versionName": versionName,
        "taskId": taskId,
        "userId": userId,
        "appVersion": appVersion,
        "platform": platform
      })
    };

    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        if (obj.statusCode == 200) {
          console.log("\n【获得金币】 " + obj.credit)
        } else {
          console.log("\n【获得金币】 " + "失败")
        }
      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })
  })
}


function htt_check_520VideoUpdateTime() {

  console.log("\n检查520视频是否需要更新时长")

  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/scholarship/video/task/info?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: urlBody
    };
    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)

        if (obj.statusCode == 200) {
          let taskList = obj.taskList
          continueVideoUpdateTime = false
          for (let index = 0; index < taskList.length; index++) {
            let item = taskList[index];
            if (item.state == 0) {
              continueVideoUpdateTime = true
              break;
            }
          }
        }
      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })
  })
}


function htt_check_520ArticleUpdateTime() {
  console.log("\n检查520文章是否需要更新时长")
  return new Promise((resolve, reject) => {
    const url = {
      url: "https://api.cashtoutiao.com/frontend/scholarship/read/task/info?" + pathUrl,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      },
      body: urlBody
    };
    $iosrule.post(url, async (error, resp, data) => {
      try {
        let obj = JSON.parse(data)
        if (obj.statusCode == 200) {
          let taskList = obj.taskList
          continueArticleUpdateTime = false
          for (let index = 0; index < taskList.length; index++) {
            let item = taskList[index];
            if (item.state == 0) {
              continueArticleUpdateTime = true
              break;
            }
          }
        }
      } catch (e) {
        // $.logErr(e, data)
      } finally {
        resolve();
      }
    })
  })
}


// 获取文章奖励列表
// https://api.cashtoutiao.com/frontend/scholarship/read/task/info?userId=114661131&loginId=8a99cc70677d4f8ab2a7e57a5b3d36cf&appVersion=1043&platform=1&versionName=4.6.0



// 更新看视频时间
// https://api.cashtoutiao.com/frontend/scholarship/video/sych/duration?userId=114661131&loginId=8a99cc70677d4f8ab2a7e57a5b3d36cf&appVersion=1043&platform=1&versionName=4.6.0
// body  {
// 	"platform": 1,
// 	"loginId": "8a99cc70677d4f8ab2a7e57a5b3d36cf",
// 	"versionName": "4.6.0",
// 	"userId": 114661131,
// 	"appVersion": 1043,
// 	"duration": 30
// }

// https://api.cashtoutiao.com/frontend/read/clock/participate?userId=114661131&loginId=8a99cc70677d4f8ab2a7e57a5b3d36cf
// 参数打卡
// body 
// {
// 	"userId": 114661131,
// 	"loginId": "8a99cc70677d4f8ab2a7e57a5b3d36cf",
// 	"credit": 1000
// }



// 获取看视频奖励
// https://api.cashtoutiao.com/frontend/scholarship/video/task/draw?userId=114661131&loginId=8a99cc70677d4f8ab2a7e57a5b3d36cf&appVersion=1043&platform=1&versionName=4.6.0
// body
// {
// 	"loginId": "8a99cc70677d4f8ab2a7e57a5b3d36cf",
// 	"versionName": "4.6.0",
// 	"taskId": 3,
// 	"userId": 114661131,
// 	"appVersion": 1043,
// 	"platform": 1
// }





function htt_readtotal() {
  var result1 = "【收益统计】"; var result2 = "";
  var tt = huitoutiao;
  const llUrl1 = { url: "https://api.cashtoutiao.com/frontend/read/detail/today?" + htt_signurlck, headers: { "Content-Type": "application/json", "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148" }, body: htt_signbd, timeout: 60 };

  $iosrule.post(llUrl1, function (error, response, data) {

    var obj = JSON.parse(data)

    if (obj.statusCode == 200) {
      result2 =
        "[总金币]" + obj.userDailyReadRecord.durationCredit + "💰 " + formatSeconds(obj.userDailyReadRecord.totalDuration) + "\n" +
        "[观看视频]" + obj.userDailyReadRecord.videoDurationCredit + "💰" + formatSeconds(obj.userDailyReadRecord.videoDuration) + "\n" +
        "[观看小视频]" + obj.userDailyReadRecord.smallVideoDurationCredit + "💰" + formatSeconds(obj.userDailyReadRecord.smallVideoDuration) + " "
        + "\n" +
        "[分享收益]" + obj.userDailyReadRecord.shareClickCredit + "💰";
      htt_msg(result1 + "\n" + result2 + "\n");
      ;
    }
  })
}




function htt_msg(r) {
  var tt = huitoutiao;
  htt_num++; htt_result += r;
  if (htt_num == 8) {
    var loon = $iosrule.read("iosrule");
    if (typeof (loon) != "undefined") {
      loon = loon.substring(7, loon.length);
      loon++; $iosrule.write("iosrule" + loon, "iosrule");
    } else {
      loon = 1;
      $iosrule.write("iosrule" + loon, "iosrule")
    } if (loon % Notice == 0) {
      papa(tt, "[签到-时段-视频-阅读]" + "当前运行" + loon + "次", htt_result); loon = 0; $iosrule.write("iosrule" + loon, "iosrule"); loon = 0; htt_result = ""; $iosrule.write("iosrule" + loon, "iosrule");

    }
  }
}





function htt_find(bd) {
  if (JSON.parse(bd).hasOwnProperty("token")) {
    bd = JSON.parse(bd); delete bd["token"]; bd = JSON.stringify(bd);
    return bd;
  }
  else
    return bd;
}





function
  formatSeconds(value) {
  let result = parseInt(value)
  let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
  let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
  let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));

  let res = '';
  if (h !== '00') res += `${h}小时`;
  if (m !== '00') res += `${m}分`;
  res += `${s}秒`;
  return res;
}






function papa(x, y, z) {

  $iosrule.notify(x, y, z);
}

function sign(code) {
  code = unescape(code);
  var c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}



function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

