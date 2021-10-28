/*
MIDU_TOKEN 为 "https://apiwz.midukanshu.com/user/readTimeBase/readTime"此链接完整请求头;
MIDU_TIME  为 "https://apiwz.midukanshu.com/user/readTimeBase/readTime"此链接请求体，格式为 "dataEncStr=XXX;
MIDU_SIGN 为 "https://apiwz.midukanshu.com/wz/task/" 完整请求体，格式为 "fullVersion=XXX"
以上全部值不许换行，多账号用#分隔;
多账号退出一账号可能某些任务会提示失效
由于运行时间较长，则只在Actions运行
*/
const cookieName = '米读阅读时长'
const $ = new Env(cookieName)
let tokenArr = [], TimeArr = [],SignArr= [];
 const bind = true;
if ($.isNode()) {
  if (process.env.MIDU_TOKEN && process.env.MIDU_TOKEN.indexOf('#') > -1) {
      miduToken = process.env.MIDU_TOKEN.split('#');
  } else {
      miduToken = process.env.MIDU_TOKEN.split()
  };
 if (process.env.MIDU_TIME && process.env.MIDU_TIME.indexOf('#') > -1) {
     ReadBodys = process.env.MIDU_TIME.split('#');
  } else {
      ReadBodys = process.env.MIDU_TIME.split()
  };
  if (process.env.MIDU_SIGN && process.env.MIDU_SIGN.split('#') && process.env.MIDU_SIGN.indexOf('#') > -1) {
     SignBodys = process.env.MIDU_SIGN.split('#');
  } else {
      SignBodys = process.env.MIDU_SIGN.split()
  };
    Object.keys(miduToken).forEach((item) => {
        if (miduToken[item]) {
          tokenArr.push(miduToken[item])
        }
      });
    Object.keys(ReadBodys).forEach((item) => {
        if (ReadBodys[item]) {
          TimeArr.push(ReadBodys[item])
        }
      });
    Object.keys(SignBodys).forEach((item) => {
        if (SignBodys[item]) {
          SignArr.push(SignBodys[item])
        }
      });
  } else {
      tokenArr.push($.getdata('tokenMidu_read'));
      TimeArr.push($.getdata('senku_readTimebody_midu'));
      SignArr.push($.getdata('senku_signbody_midu'))
}

!(async () => {
  

//   for (let i = 0; i < tokenArr.length; i++) {
//     if (tokenArr[i]) {
      headerVal = JSON.stringify({
            "tk" : "T3D2iiEtDGVC3oZd1cvJkamedaTMi-hG",
            "token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJNZHd6IiwiZGV2aWNlIjoiIiwiZ2VuVGltZSI6MTYzNDQ1MzcyMiwibm9uY2UiOiJjNWxzaG1udmhmZWZxZDRxM2JzZyIsInVpZCI6IjE1NDg2NDYxMDcifQ.-qgEirBhiXFrRO0X83CVIHnw-Cd0eAPuLHOoekchcKI',
            "tuid" : "eEaLdameq8nGXYVCDC2K9g",
            "luid" : "L4NkSeYs3glPOIwWG2L8h6jc4NDY4Qjc1LUE5OUUtQUJDOS1DNjVELTg1NDIwQzJEOEFGNg==",
            "device": "32BD15EC-5299-43B9-89F4-82E0108F34B4",
            "mobile-model" : "iPhone 7",
            "dtu": "iOS",
            "app": "mdwz",
            "idfa" : "78468B75-A99E-ABC9-C65D-85420C2D8AF6",
            "version" : "105300",
            "mobile-brand" : "iPhone 7",
            }) 

      bodyVal = 'dataEncStr=MjdCNzNERkRBMEJFMUU0OTI2QTE1QUEwQkM0QkJGMDAuY0dGeVlXMGZiV1IzZW54Q016UTFORGcxTVMxQlJqRXpMVFF5TTBFdE9UQTFSQzFEUWtVeU1EVTFOamxFTmtVZWRtVnljMmx2Ymg4eUhuQnNZWFJtYjNKdEgybHZjeDVsWXg4eC49BlMAxr0Hq7SwOtvn9sjqDDR9qxeoQ0Rv1XQQwzdDHAhiFpsdyn5ysxXMdBQySakQSZI9ycgjk%2BS0IUiYmVviT0F/RWcHnZr%2BU2Tc0vRVE66uR1FFNe7XpxtxzffD9sKVrKhdATMg2pt4Lnr8P%2BC3lr2p0%2BidX95JjtYQ2H7J43vL/NnIJFp2EyxdkphJ4cHSfnPy0e6P4hwS3mdtMks1ur2/3FRGkzfi5h7zolIsHYiUyv1F2o/sA/Z6Y3MbwZjVBWyRbrAOZHYRh74kfT91FHoe7fQjuWQoWgVGeDmhPY7AElOq36iHMAMl4qTaWY4aEWQ3kcspvgZO9Ztc%2BTB70aPNgKsK7igtbB8IM1XzsZ1FJk0wIQkZ/ImguoDQzS0ehujk84QO62HbSH8P8iEwU1IuXeVOF23VFUVTGERf3S/Fbn/XW69atIJfExrWG8VvxyVxkM8fO7aZ%2B5cEqD5Xq3GdsWQHkwwL//NdgdiX1JcuOvW5lURlK8IyeDZzrI1h1s0w3nW8YqLL0BzPvVk5vKai5tAMZjPwfYPVbS0WmwM6QKpNkEphfJVUKMyAS7kfPEyK2e/1bdLohz6xRf1zLM/Z0eA7LzbABt%2BVyzNTY4FKJ0TFSnVjuQnMp68DGLe4CfZEsOlgB8iSYm6m6CmU%2B4blcM1zF4BU0RCXMAcMfEXUKRBkN13ZMentQvtnetdIYysKS6L71GnobNKfqx2Zguonnom37CcBE1ojwkgJRrO8cA%3D%3D';
      drawVal = 'EncStr=eyJmdWxsVmVyc2lvbiI6IjEuNTMuMC4wOTI4LjEwNDAiLCJhcHAiOiJtZHd6IiwiZHR1IjoiaU9TIiwidmVyc2lvbiI6IjEwNTMwMCIsInZlcnNpb25OYW1lIjoiMS41My4wLjA5MjguMTA0MCIsIm5vbmNlIjoiNDAyMiIsInRpbWUiOiIxNjM0NDU4OTM0IiwidGsiOiJBQ0x2VDRLRnlFaE5BNF9mMnBTejlzTHkxSERDLWNJbjJfVnRaSGQ2IiwibHVpZCI6IjcwLUNoY2hJVFFPUDM5cVVzX2JDOGciLCJ0dWlkIjoiNzAtQ2hjaElUUU9QMzlxVXNfYkM4ZyIsInRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhjSEFpT2lKTlpIZDZJaXdpWkdWMmFXTmxJam9pSWl3aVoyVnVWR2x0WlNJNk1UWXpORFExTXpjeU1pd2libTl1WTJVaU9pSmpOV3h6YUcxdWRtaG1aV1p4WkRSeE0ySnpaeUlzSW5WcFpDSTZJakUxTkRnMk5EWXhNRGNpZlEuLXFnRWlyQmhpWEZyUk8wWDgzQ1ZJSG53LUNkMGVBUHVMSE9vZWtjaGNLSSIsImRldmljZSI6IjMyQkQxNUVDLTUyOTktNDNCOS04OUY0LTgyRTAxMDhGMzRCNCIsIm9zLXZlcnNpb24iOiIxNC4wLjEiLCJtb2JpbGUtYnJhbmQiOiJpUGhvbmUiLCJtb2JpbGUtbW9kZWwiOiJpUGhvbmUgNyIsImhlYWRlclF1ZXJ5VGltZSI6IjE2MzQ0NTg5MzQiLCJzaWduIjoiMzUzNjMzNjMzNDY2M2MzMTM1MzIzMTNkMzIzMzYxMzAzYzMxMzMzMTMxMzI2MTY2NjE2NDYxMzA2MzNkM2Q2NiJ9';
    //   $.index = i + 1;
    //   //console.log(tokenArr)
    //   console.log(`-------------------------\n\n开始【米读账号${$.index}】`)
     // tkVal = drawVal.match(/tk=(\w+)/)[1]
      await userInfo();
    for (j=0;j<100;j++){
      await readTime()
     }; 
      await prizeInfo();
     if (prizeinfo && prizeinfo.data && prizeinfo.data.total_num) {
          await prizeTask(),
          await drawPrize()
     };
      await addDraw();
      await taskTime();
      await OthersAd();
      await dice_addnum();
      await dice_roll();
      await dice_double();
     if (bind) {
          await Bind();
      }
      await signDay();
      await signVideo()

    //   await addTime()
//     }
//   }
})()
      .catch((e) => $.logErr(e))
      .finally(() => $.done())
  

      // 视频广告
// function ad_video() {
//     return new Promise((resolve, reject) => {
//       let request = {
//       url: "https://apiwz.midukanshu.com/wz/task/signVideoReward",
//           headers: JSON.parse(headerVal),
//           body: "dataEncStr=NjQwMjMwMjM3MkRBRTY4REM0OUMxODUwQTNERkNFOUEuY0dGeVlXMGZiV1IzZW53M1F6a3hNRVE1TnkwMU1qazJMVFJETVRVdE9UTXpPQzB6TVRjMU56SkZSa1JGTnpZZWRtVnljMmx2Ymg4eUhuQnNZWFJtYjNKdEgybHZjeDVsWXg4eC7N5rSrRPQXnoIQCdFm7QBBm1qNalB/UkEkRMy7xhR%2BD%2B%2BUhBpz7tSl0HH9qeP/mbULByWMwy6RIW6aNN8cAS%2BY6qsMznfQMGmwa%2BtNUZxHzxXPHz%2Byob2GdCxTKJjgmihngyRtinoGHNFsS10jaPE2X9zlH2pUmZKLgDO3RkYussmntvRRPkjjJevj2Hxf00wAd2Z7Fj6txVt%2B1YpnpExp0toWie2gEWBATY6sLnkrOMS0H7k33i8eZKTJFTeiZ1h4OGOTNvBwo6sLWzI8/yCJEkZjZXhbN0OMsafXEAKwxcgNz7uorxDtChEAIbn/UbH8z2soLmZTst2yH7xfRjpySqht814dyrLWNKBmU6AuvRVY2xsHdGTscvokYdmbGMA6g7WDFpgEPlba/5ne6cfBBS2CjffjiIroJHTrl6jby0Y5f71JXP73t5JjyM5Fg4GDfGeWSX18s675gX6tsattQmfSBwuSmog5aArtGsi8yWQ3MEy1bhujnj/ziPJFArI16eOhbylJ%2BUkqjXnbXThxmVLGzqOJUh//DgvukhadTqhP/GktAN42XYDGayvHUepiftuYZKdYaFuIQoGT99npYYdJtrAT7anUW6aHUO2X1sbpq0pg4AnlmH3%2Bv9SNflNYsBYK2afPkRq1PWvWh4fwS2kF7G1O%2BPaEngixW8cNohuIIB51OWVWkAdiAFoD7k7MJbBexlGmwn9g%2BR4Z5HsJ%2BNM9JRPg%2BAyX9o7z5XRG8XQYqXh3jE7znRqKeAw8gKV519HxS2QGL1pbR44R3DL5qiE6scdDYh9R/uvvuHiKqLgyc2%2BXpvfCOY8FPOvGdUqNM9m5ftmUUwFH3XuRGagdDWNK6B%2BgXte/YXEt83Potda8aQ%3D%3D"
//       }
//           $.post(request, async(error, response, data) => {
//               try {
//                   //$.log(`❕ ${cookieName} readTime - response: ${JSON.stringify(data)}\n`)
//                   readtime = JSON.parse(data)
//                   console.log("readtime-------------------")
//                   console.log(readtime)
//                   console.log("readtime-------------------")
  
//                   let subTitle = ''
//                   let detail = ''
//                   if (readtime && readtime.code == 0) {
//                       const coin = readtime.data.coin
//                       const readTotalMinute = readtime.data.readtime
//                       const total_coin = readtime.data.total_coin
//                       coin == 0 ? detail += `` : detail += `【阅读时长】获得${coin}💰`
//                        console.log("总计阅读时长"+readTotalMinute / 60+"分钟，本次获得+"+`${coin}金币，请等待30s后执行下一次阅读\n`)
//                           readTotalMinute ? detail += ` 阅读时长${readTotalMinute / 2}分钟,该账户:${total_coin}💰` : detail += `该账户:${total_coin}💰`
//                           await $.wait(31000);
                    
//                           //$.msg(cookieName, subTitle, detail)
                          
//                   } else if (readTime.code != 0) {
//                       detail += `【阅读时长】错误代码${readtime.code},错误信息${readtime.message}`
//                       $.msg(cookieName, subTitle, detail)
//                   } 
  
//               } catch (e) {
//                   $.msg(cookieName, `阅读时长: 失败`, `说明: ${e}`)
//                   $.log(`❌ ${cookieName} readTime - 签到失败: ${e}`)
//                   $.log(`❌ ${cookieName} readTime - response: ${JSON.stringify(data)}\n`)
//               }
//               resolve()
//            })
//       })
//   }






// 阅读时长
function addTime() {
    return new Promise((resolve, reject) => {
      let request = {
      url: "https://apiwz.midukanshu.com/user/readTimeBase/readTime",
          headers: JSON.parse(headerVal),
          body: 'dataEncStr=NDYzRTczMkY5MDFDMEM1RDREQzJFQzdERTVCRjA3QzAuY0dGeVlXMGZiV1IzZW54RU16azJNRUl5TnkxRVEwTTNMVFE1T1RFdE9USXlSUzFCTnpneE1VUTVNRGMzUkRZZWRtVnljMmx2Ymg4eUhuQnNZWFJtYjNKdEgybHZjeDVsWXg4eC6aD7Mpvc1n3f0TAGvOwIkMzIQMdrngoJVQ34oJ740KR3HY5FUvWrnDjstF33RjcijjSDCLQeCxkmcf6HM1yh3HlrpKOVNKBNOQJlQevgbapwfPXabbgr3pmigcLqiAPN5UauBkvasSC%2B8Gk2GEQQ7R%2B/3oR2%2BfbF01TpqFcpeJnMpQL%2BWjUWKb9mRW5miSH2nWoCOO/WvAp7uerk/bXKJ4ygf70nTJCO6KTXEpnt2eo6lDe6TiUsAhYUbwjKpu958NdzShTcPFzPIpQ0R4lFdldUfdYvhSkvoqsH%2Bs7WlTmWrFtnPi0JSvp4gSUXxftbUI/QV9yr7DL05Nhn%2BHhMlCmkDO260JkdxpKZOK9ZPky%2B59MgXmOpegCgk40Sf0d3LeRqw6PYzjQgSQ28TzGlAop3cGjClbzkfSIl8dimRrZqvYVj%2Bgv0BwEOS/lyDox/LO34/y%2BHsgvmXygqv2juPEEjegVTOboWBc9ACCJlp6nv8ZqDFdGL7FfbNuW9Fqdm6dnLQMN/PRo68unjr4yPntPCvfYNBqcvvsTd6XWTxVK9NADX0p2Q7wWuv/YyqOhajDlEQ4K92LdwxGcFGnNtIBKivBsFALvtEWFwjv9hKniquQi80swBuNdWm/%2BzcZoZ9QAOTf2BmvaR/ew362RfEDr1SoqPFk2KxS8a4Od/BGF65g2kH1PWki3D94jHRci4uybyY%3D',
      }
          $.post(request, async(error, response, data) => {
              try {
                  //$.log(`❕ ${cookieName} readTime - response: ${JSON.stringify(data)}\n`)
                  let readtime = JSON.parse(data)
                  
                  console.log(readtime)

              } catch (e) {
                  
              }
              resolve()
           })
      })
  }

// 阅读时长
function readTime() {
  return new Promise((resolve, reject) => {
    let request = {
    url: "https://apiwz.midukanshu.com/user/readTimeBase/readTime",
        headers: JSON.parse(headerVal),
        body: 'dataEncStr=NkZFQjUyOTBEMjUyMkM4OEQwMDAxNTBGQzUzOTc1OUYuY0dGeVlXMGZiV1IzZW53NE9ESkVSakZHT1MwMU1FRTFMVFE0TTBNdFFVRkVSaTAyTTBZNU56bEVRVGhCTnpJZWRtVnljMmx2Ymg4eUhuQnNZWFJtYjNKdEgybHZjeDVsWXg4eC7pgmSIpxm8IgHB22tAe01NQCaVOe%2B8yq08QIdnF8idlQ/0tA5kEyvGDz4bgelgRX6jxH7lZrR7BpmOckzXIMkqc9tXJrZrxZ6ql0Fn4DnBmhDhP4p4RpRVHGx18NTVoLA%2Bw3DjW5F4NhR%2BclilWAlYJh2359GXSeJ2h2ICdMk2D1m48RehcZJP4hDFP5cUBZmwsyDcPhTU%2BdQAiuq2NQy1jHRqY9t1JUgT/qKnGTsKU%2Bi5ihnh6WquIjv8Z%2BAkdPDpGLj72RzIPXH6k8dmNSzMcTCVMvLeRUb02K57wPj017%2BiTN6UCrPkrejuXuRs/DsoG3wmITIyGHWyLg9pvUHPlYfjAaaH3DYxIYvaNSglKKRPNmUr8SltQWWraPcJ3ja4zfavYmAvtth82fqU09kfEYUkXVTx%2BfQlWtd9ejemAi0cs7relb6MupTKrErg%2BCsnIGvkfgObw2PYxAEGydH17kE1KkdtV3kAiQPf9Yqg8vzYleDFjRmIyn0rpW7TQT4UzwWm6eba6Ayfg7L5uuzPbtpJf1Dkmz4AVqKw2q6HxNaoIDYptxHlgpWHBtXkCMrqpP%2BEiWetcwNpEMZ1h3RCzFBXqixqtLnXbBw7ms39B4Z6lrqONQ%2BNBVhH8RKWh2m0uaDE3fGwuWZ7zIF9isSL2GCIkyiMkyrPkJ1i9%2B9gVJtGebwZjwvS7X/4HI70Weiy9enuZFSE8vKfKv5GZXD5SlhZ6VB2llDigK%2BsvXaRu1/SPA%3D%3D',
    }
        $.post(request, async(error, response, data) => {
            try {
                //$.log(`❕ ${cookieName} readTime - response: ${JSON.stringify(data)}\n`)
                readtime = JSON.parse(data)
                console.log("readtime-------------------")
                console.log(readtime)
                console.log("readtime-------------------")

                let subTitle = ''
                let detail = ''
                if (readtime && readtime.code == 0) {
                    const coin = readtime.data.coin
                    const readTotalMinute = readtime.data.readtime
                    const total_coin = readtime.data.total_coin
                    coin == 0 ? detail += `` : detail += `【阅读时长】获得${coin}💰`
                     console.log("总计阅读时长"+readTotalMinute / 60+"分钟，本次获得+"+`${coin}金币，请等待30s后执行下一次阅读\n`)
                        readTotalMinute ? detail += ` 阅读时长${readTotalMinute / 2}分钟,该账户:${total_coin}💰` : detail += `该账户:${total_coin}💰`
                        await $.wait(31000);
                  
                        //$.msg(cookieName, subTitle, detail)
                        
                } else if (readTime.code != 0) {
                    detail += `【阅读时长】错误代码${readtime.code},错误信息${readtime.message}`
                    $.msg(cookieName, subTitle, detail)
                } 

            } catch (e) {
                $.msg(cookieName, `阅读时长: 失败`, `说明: ${e}`)
                $.log(`❌ ${cookieName} readTime - 签到失败: ${e}`)
                $.log(`❌ ${cookieName} readTime - response: ${JSON.stringify(data)}\n`)
            }
            resolve()
         })
    })
}

function drawPrize() {
    return new Promise((resolve, reject) => {
        const url = {
            url: 'https://apiwz.midukanshu.com/wz/task/drawPrize?' + drawVal,
            headers: JSON.parse(headerVal),
        }
        $.post(url, (error, response, data) => {
            try {
                $.log(`🐍🐢 ${cookieName} drawPrize - response: ${JSON.stringify(data)}\n`)
                  drawprize = JSON.parse(data)
                  if(drawprize.code==0){
                  console.log("转盘抽奖任务："+drawprize.data.title)
                  }
              
            } catch (e) {
                // $.msg(cookieName, `抽奖: 失败`, `说明: ${e}`)
                $.log(`❌ ${cookieName} drawPrize - 抽奖失败: ${e}`)
                $.log(`❌ ${cookieName} drawPrize - response: ${JSON.stringify(data)}\n`)

            }
            resolve()
        })
    })
}
// 用户信息
function userInfo() {
    return new Promise((resolve, reject) => {
        const url = {
            url: 'https://apiwz.midukanshu.com/wz/user/getInfo',
            headers: JSON.parse(headerVal),
            body: bodyVal
        }
        $.post(url, (error, response, data) => {
            try {
                //$.log(`🐍🐢 ${cookieName} userInfo - response: ${JSON.stringify(data)}`)
                userinfo = JSON.parse(data)
                if (userinfo.code==0){
                nick = userinfo.data.nickname
                total_coin = userinfo.data.goldCoin
                corner = userinfo.data.goldCoinMoney
                invite_code = userinfo.data.invite_code
                today_coin = userinfo.data.todayGoldCoin
                console.log("总计金币:"+total_coin+" 现金收益"+corner+'\n您今日所得总金币为'+ today_coin+'  您的邀请码为'+ invite_code+'\n')
                }
                resolve()
            } catch (e) {
                $.msg(cookieName, `获取用户信息: 失败`, `说明: ${e}`)
                $.log(`❌ ${cookieName} userInfo - 获取用户信息失败: ${e}`)
                $.log(`❌ ${cookieName} userInfo - data: ${JSON.stringify(data)}`)
                resolve()
            }
        })
    })
}

function Bind() {
    return new Promise((resolve, reject) => {
        const url = {
            url: 'http://fisson.1sapp.com/nlx/shareLink/tmpBind',
            headers: JSON.parse(headerVal),
            body: 'app_id=7&act_type=1&act_name=grad_pupil&invite_code=A1051999596&telephone=' + userinfo.data.mobile
        }
        url.headers['Host'] = 'fisson.1sapp.com'
        $.post(url, (error, response, data) => {
           resolve()
        })
    })
}


// 额外奖励
function addDraw() {
    return new Promise((resolve, reject) => {
         url = {
            url: 'https://apiwz.midukanshu.com/wz/task/weekReward',
            headers: {},
            body:  drawVal+"&draw_num=28&sign=36646430333630313c3c353c6661326136333266326036353663333232363d3d"
        }
        url.headers['Host'] = 'apiwz.midukanshu.com'
        url.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 qapp miduapp'
        $.post(url, (error, response, data) => {
            try {
               // $.log(`🐍🐢 ${cookieName} addDraw - response: ${JSON.stringify(data)}\n`)
                    add_Draw = JSON.parse(data)
                if(add_Draw.code==0){
                  console.log("转盘额外奖励："+add_Draw.data.msg)
                  }
                resolve()
            } catch (e) {
                // $.msg(cookieName, `额外奖励: 失败`, `说明: ${e}`)
                $.log(`❌ ${cookieName} addDraw - 转盘额外奖励失败: ${e}`)
                $.log(`❌ ${cookieName} addDraw - response: ${JSON.stringify(data)}\n`)
                resolve()
            }
        })
    })
}

function taskTime() {
    return new Promise((resolve, reject) => {
        const url = {
            url: 'https://apiwz.midukanshu.com/wz/task/time' ,
            headers: {},
            body:  drawVal
        }
        url.headers['Host'] = 'apiwz.midukanshu.com'
        url.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 qapp miduapp'
        $.post(url, (error, response, data) => {
            try {
               // $.log(`🐍🐢 ${cookieName} taskTime - response: ${JSON.stringify(data)}\n`)
                    _taskTime = JSON.parse(data)
                if(_taskTime.code==0){
                  console.log("定时任务："+"+"+_taskTime.data.amount)
                  }
                resolve()
            } catch (e) {
                $.log(`❌ ${cookieName} taskTime - 定时任务失败: ${e}`)
                $.log(`❌ ${cookieName} taskTime - response: ${JSON.stringify(data)}\n`)
                resolve()
            }
        })
    })
}


// 观看视频获取抽奖机会
function prizeTask() {
    return new Promise((resolve, reject) => {
        const prizeTaskurlVal = 'https://apiwz.midukanshu.com/wz/task/prizeTask?'+drawVal
        const url = {
            url: prizeTaskurlVal,
            headers: {},
       }
        //url.headers['token'] = tokenVal
        url.headers['Host'] = 'apiwz.midukanshu.com'
        url.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 qapp miduapp'
        $.post(url, (error, response, data) => {
            try {
               // $.log(`🐍🐢 ${cookieName} prizeTask - response: ${JSON.stringify(data)}\n`)
                prizetask = JSON.parse(data)
              if(prizetask.code==0){
                  console.log("抽奖次数： "+prizetask.data.title)
                  }
                resolve()
            } catch (e) {
                // $.msg(cookieName, `观看视频抽奖: 失败`, `说明: ${e}`)
                $.log(`❌ ${cookieName} prizeTask - 观看视频抽奖失败: ${e}`)
                $.log(`❌ ${cookieName} prizeTask - response: ${JSON.stringify(data)}\n`)
                resolve()
            }
        })
    })
}

// 抽奖信息
function prizeInfo() {
    return new Promise((resolve, reject) => {
        const url = {
            url: 'https://apiwz.midukanshu.com/wz/task/prizeList',
            headers: {},
            body: drawVal
        }
        url.headers['Host'] = 'apiwz.midukanshu.com'
        url.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 qapp miduapp'
        $.post(url, (error, response, data) => {
            try {
                 //$.log(`🐍🐢 ${cookieName} prizeInfo - response: ${JSON.stringify(data)}\n`)
                if (data) {
                    prizeinfo = JSON.parse(data)
                    console.log("今日抽奖信息:"+prizeinfo.data.btnText)
                }
                resolve()
            } catch (e) {
                // $.msg(cookieName, `抽奖信息: 失败`, `说明: ${e}`)
                $.log(`❌ ${cookieName} prizeInfo - 抽奖信息失败: ${e}`)
                $.log(`❌ ${cookieName} prizeInfo - response: ${JSON.stringify(data)}\n`)
                resolve()
            }
        })
    })
}

// 掷骰子
function dice_roll() {
    return new Promise((resolve, reject) => {
        const url = {
            url: 'https://apiwz.midukanshu.com/wz/dice/roll',
            headers: {},
            body: drawVal
        }
        url.headers['Host'] = 'apiwz.midukanshu.com'
        url.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
        $.post(url, (error, response, data) => {
            try {
               // $.log(`🐍🐢 ${cookieName} dice_roll - response: ${JSON.stringify(data)}\n`)
                rollList=JSON.parse(data)
                if (rollList.code == 0) {
                  console.log("掷骰子获得"+rollList.data.roll_coin+"金币")
                } else if (rollList.code == '-10203'){
                  console.log("掷骰子任务："+rollList.message)
                }
                resolve()
            } catch (e) {
                $.msg(cookieName, `掷骰子: 失败`, `说明: ${e}`)
                $.log(`❌ ${cookieName} dice_roll - 掷骰子失败: ${e}`)
                $.log(`❌ ${cookieName} dice_roll - response: ${JSON.stringify(data)}\n`)
                resolve()
            }
        })
    })
}

// 骰子双倍奖励
function dice_double() {
    return new Promise((resolve, reject) => {
        const url = {
            url: 'https://apiwz.midukanshu.com/wz/dice/doubleReward',
            headers: {},
            body: drawVal
        }
        url.headers['Host'] = 'apiwz.midukanshu.com'
        url.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 qapp miduapp'
        //url.headers['token'] = tokenVal
        $.post(url, (error, response, data) => {
            try {
                $.log(`🐍🐢 ${cookieName} dice_double - response: ${JSON.stringify(data)}\n`)
                doubleList=JSON.parse(data)
                if (doubleList.code == 0) {
                console.log("骰子双倍奖励:"+doubleList.message)
                } else if (doubleList.code == '-10205'){
                console.log("骰子双倍奖励:"+doubleList.message)
                }
                resolve()
            } catch (e) {
                $.msg(cookieName, `骰子双倍奖励: 失败`, `说明: ${e}`)
                $.log(`❌ ${cookieName} dice_double - 骰子双倍奖励失败: ${e}`)
                $.log(`❌ ${cookieName} dice_double - response: ${JSON.stringify(data)}\n`)
                resolve()
            }
        })
    })
}
//获取骰子次数:
function dice_addnum() {
    return new Promise((resolve, reject) => {
        const dice_addnum_urlVal = 'https://apiwz.midukanshu.com/wz/dice/addChangeNumByRewardVideo?' + drawVal
        const url = {
            url: dice_addnum_urlVal,
            headers: {}
        }
        url.headers['Host'] = 'apiwz.midukanshu.com'
        url.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        url.headers['User-Agent'] = 'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 miduapp qapp'
        $.post(url, (error, response, data) => {
            try {
               // $.log(`🐍🐢 ${cookieName} dice_addnum - response: ${JSON.stringify(data)}`)
              diceaddnum=JSON.parse(data)
              if(diceaddnum.code=='-10208'){
                  console.log("获取骰子次数:"+diceaddnum.message)
                  }
                resolve()
            } catch (e) {
                $.msg(cookieName, `获取骰子次数: 失败`, `说明: ${e}`)
                $.log(`❌ ${cookieName} dice_addnum - 获取骰子次数失败: ${e}`)
                $.log(`❌ ${cookieName} dice_addnum - response: ${JSON.stringify(data)}`)
                resolve()
            }
        })
    })
}

  
// 每日签到
function signDay() {
    return new Promise((resolve, reject) => {
        const url = {
            url: "https://apiwz.midukanshu.com/wz/task/signInV2?"+ drawVal,
            headers: {},
        }
        //url.headers['token'] = tokenVal
        url.headers['Host'] = 'apiwz.midukanshu.com'
        url.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 qapp miduapp'
        $.post(url, (error, response, data) => {
            try {
                //$.log(`🐍🐢 ${cookieName} signDay - response: ${JSON.stringify(data)}\n`)
                _signDay = JSON.parse(data)
                if(_signDay.code==0){
                  console.log("每日签到："+_signDay.data.amount+"金币")
                  }
                resolve()
            } catch (e) {
                $.msg(cookieName, `签到结果: 失败`, `说明: ${e}`)
                $.log(`❌ ${cookieName} signDay - 签到失败: ${e}`)
                $.log(`❌ ${cookieName} signDay - response: ${JSON.stringify(data)}\n`)
                resolve()
            }
        })
    })
}

// 签到视频奖励
function signVideo() {
    return new Promise((resolve, reject) => { 
        const url = {
            url: 'https://apiwz.midukanshu.com/wz/task/signVideoReward',
            headers: {},
            body: drawVal
        }
        $.post(url, (error, response, data) => {
            try {
               // $.log(`🐍🐢 ${cookieName} signVideo - response: ${JSON.stringify(data)}\n`)
                _signVideo = JSON.parse(data)
                if (_signVideo.code == 0) {
                console.log("签到视频奖励得"+_signVideo.data.amount+"金币")
                } else {
                console.log(_signVideo.message)
                }
                resolve()
            } catch (e) {
                $.msg(cookieName, `签到视频: 失败`, `说明: ${e}`)
                $.log(`❌ ${cookieName} signVideo - 签到视频失败: ${e}`)
                $.log(`❌ ${cookieName} signVideo - response: ${JSON.stringify(data)}\n`)
                resolve()
            }
        })
    })
}


function OthersAd() {
    return new Promise((resolve, reject) => {
        const otherVal = 'https://apiwz.midukanshu.com/activity/dividend/videoAdReward'
        const url = {
            url: otherVal,
            headers: {},
            body: drawVal
        }
        $.post(url, (error, response, data) => {
            try {
               // $.log(`🐍🐢 ${cookieName} OthersAd - response: ${JSON.stringify(data)}\n`)
                // _OthersAd = JSON.parse(data)
                // if(_OthersAd.code==0){
                // console.log("额外奖励： "+_OthersAd.data.msg)
                // }
                resolve()
            } catch (e) {
                // $.msg(cookieName, `额外奖励: 失败`, `说明: ${e}`)
                // $.log(`❌ ${cookieName} OthersAd - 额外奖励失败: ${e}`)
                // $.log(`❌ ${cookieName} OthersAd - response: ${JSON.stringify(data)}\n`)
                resolve()
            }
        })
    })
}


function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
