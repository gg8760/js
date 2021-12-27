// 赞赏:趣头条邀请码`A1040276307`,农妇山泉 -> 有点咸

// const { da } = require("date-fns/locale")


// https://api.1sapp.com/app/ioscoin/getInfo?dtu=100&xhi=200
// &version=31055000


// https://api.1sapp.com/app/ioscoin/getInfo?dtu=100&xhi=200&version=31055000&os=ios&tk=ACLvT4KFyEhNA4_f2pSz9sLyKEygOR4JSEs0NzUxNDk1MDg5NTIyNQ&distinct_id=&token=d440nt8ay4-USSLY7vPqk9rXgSIsjMa2WVjq3TxrNiWgggp6eO_DHAKmu9RxgxClYUdWN45JVQz56uk0jw&deviceCode=EF4F8285-C848-4D03-8FDF-DA94B3F6C2F2&tuid=70-ChchITQOP39qUs_bC8g&oaid=

/* 

[Script]
cron "37 6-23 * * *"  script-path=qutoutiao_account2.js,tag=趣头条2-峰2

*/

const senku = new Env('趣头条2-峰2')

const cookieName = '趣头条'
const signKey = 'senku_signKey_qtt'
const signXTKKey = 'senku_signXTK_qtt'
const readKey = 'senku_readKey_qtt'
const navCoinKey = 'senku_navCoinKey_qtt'
let breakFor = false;

                 

const signVal = "GUID=a73b5cd8470471613f54c51c9231.42488985&OSVersion=14.0.1&active_method=icon&deviceCode=EF4F8285-C848-4D03-8FDF-DA94B3F6C2F2&dtu=100&lat=36.68905164149093&lon=117.1435963979393&network=WIFI&sign=45d3c361553e4f0c85e33128b7fa1713&sys=2&time=1635489403000&tk=ACLvT4KFyEhNA4_f2pSz9sLyKEygOR4JSEs0NzUxNDk1MDg5NTIyNQ&token=d039eaVaaNjd1r_bOmNOywz4c-nWbuCWMsZXfJm-yx50HOv1Ig4Fj0YLuqFqXAP66y48umu6BForYu2_h5k&tuid=70-ChchITQOP39qUs_bC8g&uuid=EE7415FF-9253-4338-AB80-ECF8563804EA&version=31055000&versionName=3.10.55.000.906.1140"
// const signXTKVal = '&token=17ecAt5UYjfG_JbKu2hzQG-oBujGyBPpcjtGvUgA_3LTk7r6ioMjV9LJoJigvtZ4TWGR4MIZdum0kqRZhw'
const readVal = ''
const navCoinVal = senku.getdata(navCoinKey)
const vsign = "GUID=a73b5cd8470471613f54c51c9231.42488985&OSVersion=14.0.1&active_method=icon&deviceCode=EF4F8285-C848-4D03-8FDF-DA94B3F6C2F2&dtu=100&lat=36.68905164149093&lon=117.1435963979393&network=WIFI&sign=45d3c361553e4f0c85e33128b7fa1713&sys=2&time=1635489403000&tk=ACLvT4KFyEhNA4_f2pSz9sLyKEygOR4JSEs0NzUxNDk1MDg5NTIyNQ&token=d039eaVaaNjd1r_bOmNOywz4c-nWbuCWMsZXfJm-yx50HOv1Ig4Fj0YLuqFqXAP66y48umu6BForYu2_h5k&tuid=70-ChchITQOP39qUs_bC8g&uuid=EE7415FF-9253-4338-AB80-ECF8563804EA&version=31055000&versionName=3.10.55.000.906.1140"
const signurlVal = 'https://api.1sapp.com/sign/sign?' + vsign
const adUrl = 'https://api.1sapp.com/sign/adDone?' + vsign
const getinfoUrlVal = 'https://api.1sapp.com/sign/info?' + vsign
const hourUrlVal = 'https://api.1sapp.com/mission/intPointReward?' + vsign
const coinUrlVal = 'https://api.1sapp.com/app/ioscoin/getInfo?' + vsign
const readReawardVal = 'https://api.1sapp.com/app/ioscoin/readReward?type=content_config&' + vsign
const sleepUrlVal = 'https://mvp-sleeper.qutoutiao.net/v1/sleep/update?status=1&' + vsign
const sleepRewardVal = 'https://mvp-sleeper.qutoutiao.net/v1/reward?which=2&' + vsign
const sleepBagVal = 'https://mvp-sleeper.qutoutiao.net/v1/reward?which=3&' + vsign
const sleepStatusVal = 'https://mvp-sleeper.qutoutiao.net/v1/sleep/status?' + vsign
const luckyUrlVal = 'https://qtt-turntable.qutoutiao.net/press_trigger?' + vsign
const luckyRewardVal = 'https://qtt-turntable.qutoutiao.net/extra_reward?' + vsign
const raindropVal = 'https://work-for-coin.1sapp.com/raindrop/v1/click?sub_id=2&type=2&scene_id=2&' + vsign
const loginVal = 'https://api.1sapp.com/app/user/info/member/v1/get?' + vsign
const sleepNightVal = 'https://cj-activity.1sapp.com/v1/zfb/sleep/coin?from=pm&' + vsign
const sleepMorningVal = 'https://cj-activity.1sapp.com/v1/zfb/sleep/coin?from=am&' + vsign
const sleepinitVal = 'https://api.1sapp.com/dlc/ali/zfbSleepInit?' + vsign
const signinfo = {
  playList: [],
  luckyList: [],
  rainList: []
};


!(async () => {


  timeZone = new Date().getTimezoneOffset() / 60;
  timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
  bjTime = new Date(timestamp).toLocaleString('zh', {
    hour12: false,
    timeZoneName: 'long'
  });
  console.log(`\n ====== 趣头条 脚本执行 ${bjTime} ======\n`);


  await login()

  // for (let index = 0; index < 150; index++) {
  //   if (breakFor == false) {
  //     await fuli()
  //     await senku.wait(1000)
  //   } else {
  //     console.log("福利专区，退出for循环\n")
  //     break;
  //   }
    
  // }
  

  if (navCoinVal != undefined && navCoinVal.match(/\/x\/feed\/getReward\?qdata=[a-zA-Z0-9_-]+/)) {
    await navCoin()
  }
  if (readVal != undefined && readVal.match(/\/content\/readV2\?qdata=[a-zA-Z0-9_-]+/)) {
    await read()
    await getcoininfo()
    await getreadReward()
  }
  if (new Date().getHours() == 20 || new Date().getHours() == 12) {
    await sleepStatus()
    await sleepReward()
    await sleep()
//     if (signinfo.sleepStatus.data.fortune_bag_can_reward) {
      await sleepBag()
//     }
  }
  if (new Date().getHours() >= 20) {
    await sleepinit()
    await sleepNight()
  }
  if (new Date().getHours() >= 5 && new Date().getHours() <= 9) {
    await sleepinit()
    await sleepMorning()
  }
  if (new Date().getHours() == 8 || new Date().getHours() == 14) {
    await sleepReward()
  }
  await rain(0)
  await rain(1)
  await rain(2)

  if (new Date().getDay() == 5) {
    await luckyReward(3)
    await luckyReward(8)
    await luckyReward(15)
    await luckyReward(20)
    await luckyReward(30)
  }

  await signDay()
  await signHour()
  await signLucky()


  await playone()

  await playtwo()

  await playthree()

  await playfour()

  await getinfo()

  // showmsg()


})()



// 每日登录
function login() {
  return new Promise((resolve, reject) => {
    const url = {
      url: loginVal
      // headers: {
      //   'Host': 'api.1sapp.com',
      //   // 'X-Tk': signXTKVal
      // }
    }

    senku.get(url, async (error, response, data) => {
      try {
        // senku.log(`\n🍀🍀🍀${cookieName} login- response:\n`,  JSON.parse(data))
        // let login = JSON.parse(data)
        console.log(`\n🍀🍀🍀${cookieName} login - response \n`, data)

        resolve()
      } catch (e) {
        // senku.msg(cookieName, `登录结果: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} login - 登录失败: ${e}`)
        senku.log(`\n❌ ${cookieName} login - response:\n`, JSON.parse(JSON.stringify(data)))
        resolve()
      }
    })
  })
}

// 
function sleepinit() {
  return new Promise((resolve, reject) => {
    const url = {
      url: sleepinitVal,
      headers: {
        'Host': 'api.1sapp.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // // 'X-Tk': signXTKVal
      }
    }

    senku.get(url, (error, response, data) => {
      try {
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `睡觉初始化结果: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} sleepinit - 睡觉初始化失败: ${e}`)
        senku.log(`\n❌ ${cookieName} sleepinit - response:\n`, JSON.parse(data))
        resolve()
      }
    })
  })
}

// 睡觉
function sleep() {
  return new Promise((resolve, reject) => {
    const url = {
      url: sleepUrlVal,
      headers: {
        'Host': 'mvp-sleeper.qutoutiao.net',
        // // 'X-Tk': signXTKVal
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
      }
    }

    // // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} sleep - response \n`, JSON.parse(data))
        signinfo.sleep = JSON.parse(data)
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `睡觉结果: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} sleep - 睡觉失败: ${e}`)
        senku.log(`\n❌ ${cookieName} sleep - response:\n`, JSON.parse(data))
        resolve()
      }
    })
  })
}

// 福利专区
function fuli() {
  return new Promise((resolve, reject) => {
    const url = {
      url: 'http://api-ga.aiclk.com/motivateapp/mtvcallback/v2?C7A0hag2hUAqPaR2J2He_DVgrDmsrW52ioAKntN1HK43ros2nzkQUt_YPa82JKSsioA9haM75tZqPaR2J2AEUedLkDOaaaMPJkl0rkHQnXMxnkhEna0oke3JJMk9PMVthWMiD9khH2s2hpktPa_NUtNXHK42JfSQRXf8JDr0_KrQJoeedDHeiSAWrDS0_KVsRKH8_DOor9TfH2s2OEkuhoHFHKS0_gTa_kZ9Pa09rpg_dXZoaMdi_ff2ioA7hU_YOUAKhkbeCUTNHK49_KHsioA7hU_YOUAKhkbuhoHFrKV7JWS3JWlQJos2nabXOa3NUtNXHK4yJDXxHzNXhaMqPaR2J2H3rWHQ_DVe_BHxHz_xPak1OMbePagNmQdZnUl2J2H3_Kr9_95yrWVtrDr3H2s2hUZemzf2J2A-UoAZmETqmpMKPtMIhks2JNs2UoHxUoAK5a3x5zMKPgbznpMIUoHFro3mHzNsUoHFUoH3rKR1rDr9iKS1rDXeUoHxUoAs5a_G5aONDzM0hks2JNs25tb0izuuhzk1iIMgPtM1UoHxUoAePtNXUoHFUoATRe31_Qryap3NCS0DCN_hOgkKdzd_mzOF_Sk7kSmertush9TJCNk8DXdGrSgfh9kJkfNyDNMmHIe2ioA9PaO1HK42rKkZhDMK_9T2rzk25tHehDX8hzf3_K57JDSe_DHertf2ioAsmzkKntN1UQdYPtk1HK42_KMXraR9_WV7hD5yhKRyJpk2rWMzrWHs_pftJp58haAN52Ab',
      headers: {
        'Host': 'api-ga.aiclk.com',
        // // 'X-Tk': signXTKVal
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
      }
    }

    // // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        let obj = JSON.parse(data)
        console.log(`\n🍀🍀🍀${cookieName} 福利专区 - response:\n`, obj)
        if (obj.message.indexOf("已达上限") > 0) {
          breakFor = true
        }
        resolve()
      } catch (e) {
        resolve()
      }
    })
  })
}

// 整点福利
// function zhengDian() {
//   return new Promise((resolve, reject) => {
//     const url = {
//       url: 'http://api-ga.aiclk.com/motivateapp/mtvcallback/v2?C7A0hag2hUAqPaR2J2He_DVgrDmsrW52ioAKntN1HK43ros2nzkQUt_YPa82JKSsioA9haM75tZqPaR2J2AEUedLkDOaaaMPJkl0rkHQnXMxnkhEna0oke3JJMk9PMVthWMiD9khH2s2hpktPa_NUtNXHK42JfSQRXf8JDr0_KrQJoeedDHeiSAWrDS0_KVsRKH8_DOor9TfH2s2OEkuhoHFHKS0_gTa_kZ9Pa09rpg_dXZoaMdi_ff2ioA7hU_YOUAKhkbeCUTNHK49_KHsioA7hU_YOUAKhkbuhoHFrKV7JWS3JWlQJos2nabXOa3NUtNXHK4yJDXxHzNXhaMqPaR2J2H3rWHQ_DVe_BHxHz_xPak1OMbePagNmQdZnUl2J2H3_Kr9_95yrWVtrDr3H2s2hUZemzf2J2A-UoAZmETqmpMKPtMIhks2JNs2UoHxUoAK5a3x5zMKPgbznpMIUoHFro3mHzNsUoHFUoH3rKR1rDr9iKS1rDXeUoHxUoAs5a_G5aONDzM0hks2JNs25tb0izuuhzk1iIMgPtM1UoHxUoAePtNXUoHFUoATRe31_Qryap3NCS0DCN_hOgkKdzd_mzOF_Sk7kSmertush9TJCNk8DXdGrSgfh9kJkfNyDNMmHIe2ioA9PaO1HK42rKkZhDMK_9T2rzk25tHehDX8hzf3_K57JDSe_DHertf2ioAsmzkKntN1UQdYPtk1HK42_KMXraR9_WV7hD5yhKRyJpk2rWMzrWHs_pftJp58haAN52Ab',
//       headers: {
//         'Host': 'mvp-sleeper.qutoutiao.net',
//         // // 'X-Tk': signXTKVal
//         'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
//       }
//     }

//     // // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
//     senku.get(url, (error, response, data) => {
//       try {
//         let obj = JSON.parse(data)
//         console.log(`\n🍀🍀🍀${cookieName} 福利专区 - response:\n`, obj)
//         if (obj.message.indexOf("已达上限") > 0) {
//           breakFor = true
//         }
//         resolve()
//       } catch (e) {
        
//         resolve()
//       }
//     })
//   })
// }


// 早睡
function sleepNight() {
  return new Promise((resolve, reject) => {
    const url = {
      url: sleepNightVal,
      headers: {
        'Host': 'cj-activity.1sapp.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // // 'X-Tk': signXTKVal
      }
    }
    // // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} sleepNight - response:\n`, data)
        // signinfo.sleepNight = JSON.parse(data)
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `早睡结果: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} sleepNight - 早睡失败: ${e}`)
        senku.log(`\n❌ ${cookieName} sleepNight - response:\n`, data)
        resolve()
      }
    })
  })
}
// 早起
function sleepMorning() {
  return new Promise((resolve, reject) => {
    const url = {
      url: sleepMorningVal,
      headers: {
        'Host': 'cj-activity.1sapp.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // // 'X-Tk': signXTKVal
      }
    }
    // // // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} sleepMorning - response:\n`, data)
        // signinfo.sleepMorning = JSON.parse(data)
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `早起结果: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} sleepMorning - 早起失败: ${e}`)
        senku.log(`\n❌ ${cookieName} sleepMorning - response:\n`, data)
        resolve()
      }
    })
  })
}
// 睡觉金币
function sleepReward() {
  return new Promise((resolve, reject) => {
    const url = {
      url: sleepRewardVal,
      headers: {
        'Host': 'mvp-sleeper.qutoutiao.net',
        // // 'X-Tk': signXTKVal
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
      }
    }
    // // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} sleepReward - response:\n`, data)
        // signinfo.sleepReward = JSON.parse(data)
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `睡觉结果: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} sleepReward - 睡觉失败: ${e}`)
        senku.log(`\n❌ ${cookieName} sleepReward - response:\n`, data)
        resolve()
      }
    })
  })
}

// 睡觉福袋
function sleepBag() {
  return new Promise((resolve, reject) => {
    const url = {
      url: sleepBagVal,
      headers: {
        'Host': 'mvp-sleeper.qutoutiao.net',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // 'X-Tk': signXTKVal
      }
    }
    // // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} sleepBag - response:\n`, data)
        // signinfo.sleepBag = JSON.parse(data)
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `睡觉福袋: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} sleepBag - 睡觉福袋: ${e}`)
        senku.log(`\n❌ ${cookieName} sleepBag - response:\n`, data)
        resolve()
      }
    })
  })
}

// 睡觉信息
function sleepStatus() {
  return new Promise((resolve, reject) => {
    const url = {
      url: sleepStatusVal,
      headers: {
        'Host': 'mvp-sleeper.qutoutiao.net',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // 'X-Tk': signXTKVal
      }
    }
    // // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} sleepStatus - response:\n`, data)
        // signinfo.sleepStatus = JSON.parse(data)
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `睡觉信息: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} sleepStatus - 睡觉信息: ${e}`)
        senku.log(`\n❌ ${cookieName} sleepStatus - response:\n`, data)
        resolve()
      }
    })
  })
}

// 雨滴金币
function rain(seri_num) {
  return new Promise((resolve, reject) => {
    const raindropUrl = raindropVal + '&serial_number=' + seri_num
    const url = {
      url: raindropUrl,
      headers: {
        'Host': 'work-for-coin.1sapp.com'
        // 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // 'X-Tk': signXTKVal
      }
    }
    // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {

        console.log(`\n🍀🍀🍀${cookieName} 雨滴金币 - response:\n`, data)
        // signinfo.rainList.push(JSON.parse(data))
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `雨滴结果: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} 雨滴金币 - 雨滴失败: ${e}`)
        senku.log(`\n❌ ${cookieName} 雨滴金币 - response:\n`, data)
        resolve()
      }
    })
  })
}

// 每日签到
function signDay() {
  return new Promise((resolve, reject) => {
    const url = {
      url: signurlVal,
      headers: {
        'Host': 'api.1sapp.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // 'X-Tk': signXTKVal
      }
    }
    // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} 每日签到 - response: \n`, data)
        // signinfo.signDay = JSON.parse(data)
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `签到结果: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} 每日签到 - 签到失败: ${e}`)
        senku.log(`\n❌ ${cookieName} 每日签到 - response:\n`, data)
        resolve()
      }
    })
  })
}

// 首页奖励
function navCoin() {
  return new Promise((resolve, reject) => {
    const url = {
      url: navCoinVal,
      headers: {
        'Host': 'api.1sapp.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // // 'X-Tk': signXTKVal
      }
    }
    // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} 首页奖励 - response:\n`, data)
        // signinfo.navCoin = JSON.parse(data)
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `首页奖励: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} 首页奖励 - 首页奖励失败: ${e}`)
        senku.log(`\n❌ ${cookieName} 首页奖励 - response:\n`, data)
        resolve()
      }
    })
  })
}
// 阅读部分
function read() {
  return new Promise((resolve, reject) => {
    const url = {
      url: readVal,
      headers: {
        'Host': 'api.1sapp.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // // 'X-Tk': signXTKVal
      }
    }
    // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} 阅读 - response:\n`, data)
        // signinfo.read = JSON.parse(data)
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `阅读结果: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} 阅读 - 阅读失败: ${e}`)
        senku.log(`\n❌ ${cookieName} 阅读 - response:\n`, JSON.parse(data))
        resolve()
      }
    })
  })
}

// 获取阅读奖励
function getreadReward() {
  return new Promise((resolve, reject) => {
    try {
      if (signinfo.coininfo.data) {
        const read_num = signinfo.coininfo.data.read_num
        if (read_num < 5 && read_num >= 1) {
          resolve(readReward(1))
        } else if (read_num < 15 && read_num >= 5) {
          resolve(readReward(5))
        } else if (read_num < 18 && read_num >= 15) {
          resolve(readReward(15))
        } else if (read_num == 18) {
          resolve(readReward(18))
        } else resolve()
      }
    } catch (e) {
      // senku.msg(cookieName, `获取阅读奖励: 失败`, `说明: ${e}`)
      senku.log(`\n❌ ${cookieName} getreadReward - 获取阅读奖励失败: ${e}`)
      resolve()
    }
  })
}

// 阅读奖励请求
function readReward(reward_id) {
  return new Promise((resolve, reject) => {
    const readRewardUrl = readReawardVal + '&reward_id=' + reward_id
    const url = {
      url: readRewardUrl,
      headers: {
        'Host': 'api.1sapp.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // 'X-Tk': signXTKVal
      }
    }
    // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} 阅读奖励 - response:\n`, data)
        signinfo.readReward = JSON.parse(data)
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `阅读奖励请求: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} 阅读奖励 - 阅读奖励请求失败: ${e}`)
        senku.log(`\n❌ ${cookieName} 阅读奖励 - response:\n`, JSON.parse(data))
        resolve()
      }
    })
  })
}

// 获取阅读信息
function getcoininfo() {
  return new Promise((resolve, reject) => {
    const url = {
      url: coinUrlVal,
      headers: {
        'Host': 'api.1sapp.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // // 'X-Tk': signXTKVal
      }
    }
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} 阅读信息 - response:\n`, data)
        signinfo.coininfo = JSON.parse(data)
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `签到结果: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} 阅读信息 - 签到失败: ${e}`)
        senku.log(`\n❌ ${cookieName} 阅读信息 - response:\n`, JSON.parse(data))
        resolve()
      }
    })
  })
}

// FIXME: 时段请求偶尔丢失或伪请求
function signHour() {
  return new Promise((resolve, reject) => {
    const url = {
      url: hourUrlVal,
      headers: {
        'Host': 'api.1sapp.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // // 'X-Tk': signXTKVal
      }
    }
    // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} 时段签到 - response:\n`, data)
        signinfo.signHour = JSON.parse(data)
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `时段签到结果: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} 时段签到 - 时段签到失败: ${e}`)
        senku.log(`\n❌ ${cookieName} 时段签到 - response:\n`, data)
        resolve()
      }
    })
  })
}

function signLucky() {
  return new Promise((resolve, reject) => {
    const url = {
      url: luckyUrlVal,
      headers: {
        'Host': 'qtt-turntable.qutoutiao.net',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // // 'X-Tk': signXTKVal
      }
    }
    // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} 幸运转盘 - response:\n`, data)
        signinfo.signLucky = JSON.parse(data)
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `幸运转盘: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} 幸运转盘 - 幸运转盘失败: ${e}`)
        senku.log(`\n❌ ${cookieName} 幸运转盘 - response:\n`, data)
        resolve()
      }
    })
  })
}

// 幸运转盘额外奖励
function luckyReward(times) {
  return new Promise((resolve, reject) => {
    const luckyRewardUrl = luckyRewardVal + '&times=' + times
    const url = {
      url: luckyRewardUrl,
      headers: {
        'Host': 'qtt-turntable.qutoutiao.net',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // // 'X-Tk': signXTKVal
      }
    }
    // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} luckyReward - response:\n`, data)
        // signinfo.luckyList.push(JSON.parse(data))
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `转盘额外奖励请求: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} luckyReward - 转盘额外奖励请求失败: ${e}`)
        senku.log(`\n❌ ${cookieName} luckyReward - response:\n`, data)
        resolve()
      }
    })
  })
}

// 获取签到信息
function getinfo() {
  return new Promise((resolve, reject) => {
    const url = {
      url: getinfoUrlVal,
      headers: {
        'Host': 'api.1sapp.com',
        // // 'X-Tk': signXTKVal
      }
    }
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} 签到信息 - response:\n`, data)
        signinfo.info = JSON.parse(data)
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `获取信息: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} 签到信息 - 获取信息失败: ${e}`)
        senku.log(`\n❌ ${cookieName} 签到信息 - response:\n`, data)
        resolve()
      }
    })
  })
}


// 视频广告部分
function playone() {
  return new Promise((resolve, reject) => {
    const urlParameter = 'https://api.1sapp.com/sign/adDone?pos=one&' + signVal
    const url = {
      url: urlParameter,
      headers: {
        'Host': 'api.1sapp.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // // 'X-Tk': signXTKVal
      }
    }
    // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} 视频广告 - response:\n`, data)
        signinfo.playList.push(JSON.parse(data))
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `签到结果: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} 视频广告 - 签到失败: ${e}`)
        senku.log(`\n❌ ${cookieName} 视频广告 - response:\n`, data)
        resolve()
      }
    })
  })
}

function playtwo() {
  return new Promise((resolve, reject) => {
    const urlParameter = 'https://api.1sapp.com/sign/adDone?pos=two&' + signVal
    const url = {
      url: urlParameter,
      headers: {
        'Host': 'api.1sapp.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // // 'X-Tk': signXTKVal
      }
    }
    // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} 视频广告 - response:\n`, data)
        signinfo.playList.push(JSON.parse(data))
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `签到结果: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} 视频广告 - 签到失败: ${e}`)
        senku.log(`\n❌ ${cookieName} 视频广告 - response:\n`, data)
        resolve()
      }
    })
  })
}

function playthree() {
  return new Promise((resolve, reject) => {
    const urlParameter = 'https://api.1sapp.com/sign/adDone?pos=three&' + signVal
    const url = {
      url: urlParameter,
      headers: {
        'Host': 'api.1sapp.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // // 'X-Tk': signXTKVal
      }
    }
    // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'

    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} 视频广告 - response:\n`, data)
        signinfo.playList.push(JSON.parse(data))
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `签到结果: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} 视频广告 - 签到失败: ${e}`)
        senku.log(`\n❌ ${cookieName} 视频广告 - response:\n`, data)
        resolve()
      }
    })
  })
}

function playfour() {
  return new Promise((resolve, reject) => {
    const urlParameter = 'https://api.1sapp.com/sign/adDone?pos=four&' + signVal
    const url = {
      url: urlParameter,
      headers: {
        'Host': 'api.1sapp.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
        // // 'X-Tk': signXTKVal
      }
    }
    // url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148ua qapp qukan_ios qukan_version_31055000 iOS_DH_CPC_OICLK qapp iOS_DH_CPC_OICLK qapp'
    senku.get(url, (error, response, data) => {
      try {
        senku.log(`\n🍀🍀🍀${cookieName} 视频广告 - response:\n`, data)
        signinfo.playList.push(JSON.parse(data))
        resolve()
      } catch (e) {
        // senku.msg(cookieName, `签到结果: 失败`, `说明: ${e}`)
        senku.log(`\n❌ ${cookieName} 视频广告 - 签到失败: ${e}`)
        senku.log(`\n❌ ${cookieName} 视频广告 - response:\n`, data)
        resolve()
      }
    })
  })
}


// 将时间戳格式化
function tTime(timestamp) {
  const date = new Date(timestamp * 1000)
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = (date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  const h = date.getHours() + ':'
  const m = (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes() + 1) : date.getMinutes() + 1) + ''
  return M + D + h + m
}

// 通知信息部分
function showmsg() {
  let subTitle = ``
  let detail = ``
  const name = signinfo.login.data.nickname ? signinfo.login.data.nickname : `未设置昵称或Cookie失效`
  // signDayMsg
  if (signinfo.info && signinfo.info.data.signIn.today == 1) {
    if (signinfo.signDay.code == 0) {
      subTitle += subTitle == `` ? `` : ` `
      const continuation = signinfo.info.data.signIn.continuation
      const amount = signinfo.info.data.signIn.amount
      const currentCoin = amount[continuation]
      const nextCoin = amount[continuation + 1]
      const coins = signinfo.info.data.show_balance_info.coins
      subTitle += `每日:成功`
      detail += `【每日签到】获得${currentCoin}💰,明日可得${nextCoin}💰\n`
    } else subTitle += ``
  } else {
    subTitle += `每日:失败`
    senku.log(`\n❌ ${cookieName} showmsg - 每日签到: ${JSON.stringify(signinfo.signDay)}`)
  }

  // signHourMsg
  subTitle += subTitle == `` ? `` : ` `
  if (signinfo.signHour && signinfo.signHour.code == 0) {
    subTitle += '时段:成功'
    const amount = signinfo.signHour.data.amount
    const next_time = tTime(signinfo.signHour.data.next_time)
    detail += `【时段签到】获得${amount}💰,下次签到:${next_time}\n`
  } else subTitle += `时段:时间未到`

  // readMsg
  if (signinfo.read && signinfo.read.data.status_code == 0) {
    if (signinfo.coininfo.data) {
      const desc = signinfo.coininfo.data.content_config.desc
      if (signinfo.readReward != undefined && signinfo.readReward.code == 0) {
        detail += `【阅读详情】${desc},奖励:成功\n`
      } else if (signinfo.readReward != undefined && signinfo.readReward.code == -113) {
        signinfo.coininfo.data.read_num == 18 ? detail += `` : detail += `【阅读详情】${desc},已获取阶段奖励\n`

      } else detail += `【阅读详情】${desc},手动获取金币\n`
    }
  } else detail += `【阅读详情】失败\n`

  // sleepMsg
  if (signinfo.sleep && signinfo.sleep.data.success) {
    detail += `【睡觉结果】已开始睡觉\n`
  } else if (signinfo.sleepReward && signinfo.sleepReward.data) {
    if (signinfo.sleepReward.data.success) {
      const coins = signinfo.sleepReward.data.coins
      coins == 0 ? detail += `` : detail += `【睡觉金币】获得${coins}💰\n`
    } else {
      detail += `【睡觉金币】金币获取失败\n`
    }
  } else if (signinfo.sleep == undefined) {
    detail += ``
    // sleepBagMsg
  } else if (signinfo.sleepBag && signinfo.sleepBag.code == 0) {
    const coins = signinfo.sleepBag.data.coins
    coins == 0 ? detail += `` : detail += `【睡觉福袋】获得${signinfo.sleepBag.data.coins}💰\n`
  } else {
    detail += `【睡觉结果】失败\n`
  }
  // 早睡
  if (signinfo.sleepNight && signinfo.sleepNight.code == 0) {
    if (signinfo.sleepNight.data && signinfo.sleepNight.data.coin) {
      const coin = signinfo.sleepNight.data.coin
      coin == 0 ? detail += `` : detail += `【早睡结果】获得${coin}💰\n`
    }
  }
  // 早起
  if (signinfo.sleepMorning && signinfo.sleepMorning.code == 0) {
    if (signinfo.sleepMorning.data && signinfo.sleepMorning.data.coin) {
      const coin = signinfo.sleepMorning.data.coin
      coin == 0 ? detail += `` : detail += `【早起结果】获得${coin}💰\n`
    }
  }

  // rainDropMsg
  if (signinfo.rainList) {
    for (const rains of signinfo.rainList) {
      87
      rains.code == 0 ? detail += `【金币雨滴】成功\n` : detail += ``
    }
  } else {
    detail += `【金币雨滴】失败\n`
  }

  // navCoinMsg
  if (signinfo.navCoin && signinfo.navCoin.code == 0) {
    if (signinfo.coininfo.data) {
      const cur_amount = signinfo.navCoin.data.cur_amount
      const total_times = signinfo.navCoin.data.total_times
      const done_times = signinfo.navCoin.data.done_times
      done_times == 15 ? detail += `` : detail += `【首页奖励】${cur_amount} 💰, 完成${done_times} /${total_times}\n`
    }
  } else if (signinfo.navCoin && signinfo.navCoin.code == -308) {
    detail += `【首页奖励】时间未到\n`
  } else if (signinfo.navCoin && signinfo.navCoin.code == -2) {
    detail += `【首页奖励】Cookie失效\n`
  } else detail += `【首页奖励】失败或Cookie不存在\n`

  // signLuckyMsg
  subTitle += subTitle == '' ? '' : ' '
  if (signinfo.signLucky && signinfo.signLucky.code == 1) {
    subTitle += `幸运转盘:成功`
    const amount_coin = signinfo.signLucky.amount_coin
    const count = signinfo.signLucky.count
    const count_limit = signinfo.signLucky.count_limit
    detail += `【幸运转盘】获得${amount_coin},抽奖情况:${count}/${count_limit}次\n`
  } else subTitle += ``

  // luckyExtraMsg
  if (signinfo.luckyList) {
    const times = [3, 8, 15, 20, 30]
    let i = 0
    for (const extra of signinfo.luckyList) {
      if (extra.code == 0) {
        detail += `【转盘额外】次数:${times[i]} 获得${extra.reward_coin}💰\n`
      } else if (extra.code == -2) {
        detail += `【转盘额外】次数:${times[i]} 重复领取\n`
      } else if (extra.code == -1) {
        detail += `【转盘额外】次数:${times[i]} 当前次数未达到\n`
      } else detail += `【转盘额外】未知错误\n`
      i += 1
    }
  } else detail += `【转盘额外】失败`

  // playAdsMsg
  subTitle += subTitle == '' ? '' : ' '
  if (signinfo.playList) {
    if (signinfo.playList[0].code == 0) {
      const icon = signinfo.info.data.signIn.ext_ad.icon
      const coins = signinfo.info.data.show_balance_info.coins
      const continuation = signinfo.info.data.signIn.continuation
      for (const poss of icon) {
        if (poss.next_time > 0) {
          const time = tTime(poss.next_time)
          detail += `【视频广告】下次🕥${time} 可获得${poss.amount}💰\n`
        }
      }
      detail += `【账户详情】共计:${coins}💰,连续签到${continuation}天`
    } else if (signinfo.playList[0].code == -126) subTitle += `广告:权限错误`
  } else subTitle += `广告:失败`

  senku.msg(cookieName + ` 用户:${name}`, subTitle, detail)
  // senku.done()
}


function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }


// function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }


// function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
