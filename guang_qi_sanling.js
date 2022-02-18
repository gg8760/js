
/* 
[Script]
cron "20 8 * * *"  script-path=guang_qi_sanling.js,tag=广汽三菱
*/

// host :  https://mspace.gmmc.com.cn

/*
1.18253169060
2.17862926330
3.15069131632
*/
const $ = new Env('广汽三菱');//声明必须
let taskArray = [4, 5, 6]

// token抓这里的 https://mspace.gmmc.com.cn/customer-app/task-mapi/sign-count?noLoad=true
let tokenArray = 
[
`SERVERID=127fe9b0e348ead063cb2ed79076ff4e|${Math.floor((new Date()).valueOf() / 1000)}|1644561782; Hm_lpvt_d79e324d263704c4dac81376058ddf10=1644561788; Hm_lvt_d79e324d263704c4dac81376058ddf10=1644393653,1644450129,1644544669,1644561788; acw_tc=78c052a116445616651597564ea9510291fdbefd94ff9017b9b03e5ac9`,
`SERVERID=127fe9b0e348ead063cb2ed79076ff4e|${Math.floor((new Date()).valueOf() / 1000)}|1644563017; Hm_lpvt_d79e324d263704c4dac81376058ddf10=1644563020; Hm_lvt_d79e324d263704c4dac81376058ddf10=1644202957,1644502567,1644561602,1644563020; acw_tc=791d26a916445615651582532e01462825092a84089e8a26e316b4938f`,
`SERVERID=127fe9b0e348ead063cb2ed79076ff4e|${Math.floor((new Date()).valueOf() / 1000)}|1644563537; Hm_lpvt_d79e324d263704c4dac81376058ddf10=1644563540; Hm_lvt_d79e324d263704c4dac81376058ddf10=1644563347,1644563540; acw_tc=7b81f49d16445632602457824e6aa521ff322526204c59764429319843`,
]

let authorizationArray = 
[
'befc596591c6b4956bbcbb4c18f0da96',
'557661d6d5dbbac4d778af406d216e7a',
'ce9ece7febeef4db536a8d39c07f3cf4',
]

let agentArray = 
[
'Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 DSApp/2.2.4 StatusBarHeight/47 BottomBarHeight/34',
'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 DSApp/2.2.4 StatusBarHeight/20 BottomBarHeight/0',
'guang qi san ling/2.2.4 (iPhone; iOS 14.0.1; Scale/2.00)'
]


let cotentArray = ['淡淡的日子，淡淡的心情，淡淡的阳光，淡淡的风，凡事淡淡的，就好。',
'来生，想做一朵蒲公英，无牵无挂，无欲无求，起风而行，风静而安。',
'天涯咫尺，你若懂得，我便心安；咫尺天涯，你若安好，便是晴天。',
'有些人，一旦遇见，便一眼万年；有些心动，一旦开始，便覆水难收。',
'人海茫茫，岁月尚长，别回头也别将就，保持优雅的自己，自然会有良人来爱你。',
'最美的你不是生如夏花，而是在时间的长河里，波澜不惊。',
'走过千山万水，还是当下最美。',
'经过姹紫嫣红，还是平淡长久。',
'越过繁华喧闹，还是简单最好。',
'最大的悲哀莫过于长大，从此，笑不再纯粹，哭不再彻底。',
'没有人可以左右你的人生，只是很多时候我们需要多一些勇气，去坚定自己的选择。',
'有时，不是你装得天衣无缝，而是，我愿意陪你演得完美无缺。',
'保持一颗年轻的心，做个简单的人，享受阳光和温暖。',
'贵在坚持，难在坚持，成在坚持。',
'不问收获，只问耕耘。',
'我自信我出色，我努力我成功。',
'文章，经国之大业，不朽之盛事。',
'不知道自己无知，乃是双倍的无知。',
'人的愿望没有止境，人的力量用之不朽。',
'没有灯的小路一样可以行走，只要心还在。',
'与其战胜敌人一万次，不如战胜自己一次。',
'觉得自己做得到和做不到，其实只在一念之间。',
'所有的豪言都收起来，所有的呐喊都咽下去。',
'成功的速度一定要超过父母老去的速度。',
'大起大落谁都有，拍拍灰尘，继续走。早安！',
'要相信自己，善待自己，让自己的生活精彩纷呈。不要误认为是要让某个人后悔，而是为了让自己的人生更精彩。早安！',
'努力把日子都填满，别让孤单把你包围，请善待珍惜自己，给自己一个坚强的理由，生活中没有什么过不去的坎。早安！',
'我们要在阳光下灿烂，在风雨中奔跑，对自己说一声：昨天挺好，今天很好，明天会更好。早安！',
'心情反映着一个人的质量，心态反映着一个人的生活追求，生活并不缺少什么，恰恰就是我们对生活缺乏一份友好和坚持。早安！',
'真正了解你的，是当别人都对你的笑容信以为真的时候，看得见你眼里的痛的人。',
'一点点小事就可以治愈自己，一点点小事就足以让自己崩溃，我们总是徘徊在自我治愈和随时崩溃之间。',
'没有谁是因为一时冲动而离开你的，那些难过无助又一次次忍耐的眼泪你都看不见。就像堤坝下逐渐因侵蚀而拓宽的裂缝，你看见的，只是它崩溃的那个瞬间。',
'你的生活，应该有你自己的精彩。早安!',
'有时候，过不去的不是一个坎，而是心中的执迷。',
'天空的雨，从不曾为任何心情，而感动而洒落。',
'蹉跎岁月，从不会为任何伤痛，而停留而眷顾。',
'生命，也从不因人的脆弱人的不舍，而留恋而激活。',
'你想过普通的生活，就会遇到普通的挫折，你想过上最好的生活，就一定会遇上最强的伤害。',
'每天醒来都要比前一天更强大，直视自己的畏惧，擦干自己的泪水，向前走，别怨，别停。',
'趁自己还不老，走自己想走的路。',
'梦想，努力了才叫梦想，放弃了那只是妄想！',
'努力，虽然未必会收获，但不努力，就一定一无所获。',
'我们应该尽可能得花精力，做到有多牛；而不是用很多无用的努力，让自己显得有多牛。',
'感觉累的时候，也许你正处于人生的上坡路。坚持走下去，你就会发现到达了人生的另一个高度。',
'不去逃避，总有一天，你会战胜那些往事，让自己变得更强。',
'失败与挫折并不可怕，可怕的是丧失了自信，丧失了激发我们积极向上的内在动力。',
'人生航船由我们自己掌舵，只要鼓起自信的风帆，就能战胜风浪，抵达美好彼岸。早安！',
'积极的人在每一次忧患中都看到一个机会，而消极的人则在每个机会都看到某种忧患。',
'人生要有激情和梦想；生活要有诗歌和远方。',
'决定今天的是昨天的态度，决定明天的是今天的努力。',
'机会来临时，要勇于把握。',
'命运给予的，要勇于承担。',
'频频回头走不远，耿耿于怀烦恼多。',
'唯有淡泊宁静，才能品味馨香四溢的生活。',
'唯有志存高远，才能活出厚重缤纷的生命。',
'心若向阳，何惧风雨！',
'志在远方，何惧坎坷！',
'有种脾气叫，不放弃。',
'命运最瞧不起 ， 向它屈服的人 。',
'待少年凌云傲视之时，必将一雪前耻。',
'为了未来好一点 ,现在苦一点有什么。',
'若现在就觉得失望无力，未来那么远你该怎么扛。',
'梦想这东西和经典一样，永远不会因为时间而褪色，反而更显珍贵。',
'我们有时从错误中学到的东西，可能比从美德中学到的还要多。',
'莫找借口失败，只找理由成功。不为失败找理由，要为成功找方法。',
'既然一切都会过去，那我们一定要抓住现在的。',
'我试过销声匿迹，最终也无人问及；手机已经很久很久没有响过了。',
'哪里有天才，我是把别人喝咖啡的功夫，都用在工作上的。',
'涓滴之水终可以磨损大石，不是由于它力量强大，而是由于昼夜不舍的滴坠。',
'假如你从来未曾害怕受窘受伤害，好就是你从来没有冒过险。',
'相信朋友的忠诚。相信自己的勇气。相信敌人的愚蠢。',
'任凭风吹雨打，只要一直走下去，不放弃，远方的路终将清晰。',
'有时候，坚持了你最不想干的事情之后，便可得到你最想要的东西。',
'鸟贵有翼，人贵有志。',
'器大者声必闳，志高者意必远。',
'燕雀安知鸿鹄之志哉。',
'三军可夺帅也，匹夫不可夺志也。',
'志，气之帅也。',
'石看纹理山看脉，人看志气树看材。',
'志之所向，金石为开，谁能御之？',
'志坚者，功名之柱也。登山不以艰险而止，则必臻乎峻岭。',
'心志要坚，意趣要乐。',
'一人立志，万夫莫敌。',
'鹰爱高飞，鸦栖一枝。',
'志气和贫困是患难兄弟，世人常见他们伴在一起。',
'死犹未肯输心去，贫亦其能奈我何！',
'困，你是人类艺术的源泉，你将伟大的灵感赐予诗人。',
'贫穷是一切艺术职业的母亲。',
'无钱之人脚杆硬，有钱之人骨头酥。',
'鸭仔无娘也长大，几多白手也成家。',
'贫困能造就男子气概。',
'穷人的孩子早当家。',
'贫困教会贫困者一切。',
'对没志气的人，路程显得远；对没有银钱的人，城镇显得远。',
'有志者，事竟成。',
'人惟患无志，有志无有不成者。',
'志不立，天下无可成之事。',
'志正则众邪不生。',
'不为穷变节，不为贱易志。',
'褴褛衣内可藏志。',
'有志的人战天斗地，无志的人怨天恨地。',
'天才是由于对事业的热爱感而发展起来的，简直可以说天才。',
'人生志气立，所贵功业昌。',
'人若有志，万事可为。',
'并非神仙才能烧陶器，有志的人总可以学得精手艺。',
'有志者能使石头长出青草来。',
'雄鹰必须比鸟飞得高，因为它的猎物就是鸟。',
'无所求则无所获。',
'壮志与毅力是事业的双翼。',
'志不真则心不热，心不热则功不贤。',
'把意念沉潜得下，何理不可得，把志气奋发得起，何事不可做。',
'立志是事业的大门，工作是登门入室的旅程。',
'壮志与毅力是事业的双翼。',
'在年轻人的颈项上，没有什么东西能比事业心这颗灿烂的宝珠。',
'追踪着鹿的猎人是看不见山的。',
'谁不向前看，谁就会面临许多困难。',
'有志始知蓬莱近，无为总觉咫尺远。',
'雄心壮志是茫茫黑夜中的北斗星。',
'志之所趋，无远勿届，穷山复海不能限也；志之所向，无坚不摧。',
'不怕路远，就怕志短。',
'志高山峰矮，路从脚下伸。',
'有志者自有千方百计，无志者只感千难万难。',
'有志登山顶，无志站山脚。',
'从前不会回头，往后不会将就。',
'劝人的话就像清晨的闹钟，只对别人有用，却永远叫不醒自己。',
'离开一个错的人，才能遇上一个对的人。',
'事实证明早恋不影响学习，影响学习的是失恋。',
'敬往事一杯酒，余生你我分开走。',
'有些东西，失去了才发现当初就没必要去好好珍惜。',
'时间不一定能证明很多东西，但- -定会让你看透很多东西。',
'自嘲只是为了在被人嘲讽前，让人识趣的闭嘴。',
'女人最大的错误，就是按照男人的标准来打造自己。',
'谎话说给耳朵听，却让眼睛动容。',
'有时候，没有下一次，没有机会重来，没有暂停继续。',
'没有什么人能一路单纯到底，但是要记住，别忘了最初的自己。',
'牛逼的不是你认识多少人，而是你患难的时候还有多少人认识你。',
'梦想和自由一样，都有代价，但都值得。',
'别把自己看得太高，这个世界离开谁都行。',
'当你认为自己很聪明的时候，不要忘记别人也不傻。',
'我要功成名就，然后孤独终老。',
'我是温柔的，除了苍凉。我是温柔的，除了忧伤。',
'如果有一-天，你发现我不再计较那么多，那不是体谅，是放弃。',
'下辈子我要做你的心脏，我难受了，你也会疼。',
'岁月所亏欠的，一直都是那些记忆力好又偏偏念旧的人啊!',
'人生如梦，我总失眠;人生如戏，我总穿帮;人生如歌，我总跑调;人生如战场，我总走火。',
'你是我见过最温柔的人，却不是陪我到最后的人。',
'我拥抱着爱从梦中醒来，你执着的等待，却不从离开。舍不得分开，在每一次醒来。',
'若别离，为何相逢?匆匆而过，不留痕迹，只留回忆。',
'不是所有人都会像他那样惯着我。',
'你走之后，我变生了-场大病，疼得我痛不欲生。',
'那些离别和失望的伤痛，已经发不出声音来了。',
'其实，你不在我身边，我的生活也没什么变化。只是，少-个人听我诉苦;只是，少一个人任我放肆;最严重的，也不过是少-一个人让我幸福。',
'有时候同样一-件事我们可以去安慰别人， 却说服不了自己。',
]



let newArray = [
{
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
},
{
	"content": "心情愉悦的一天",
	"dynamicFileList": [],
	"topicList": [],
	"btype": 0,
	"backgroundContent": "心情愉悦的一天"
}
]

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

        let contentString = cotentArray[Math.floor((Math.random()*cotentArray.length))]
        newBody = newArray[index];
        newBody.content = contentString
        newBody.backgroundContent = contentString

        console.log(`开始第${index + 1}个账号的任务-----`);

        await signin()
        
        for (let index = 0; index < taskArray.length; index++) {
            const element = taskArray[index];
            await shareWechat(element)
            await $.wait(10 * 1000);
        }
        await getArticleList()

        let timeWait = getRandomInt(20,40)
        console.log(`随机等待${timeWait}秒-----`)
        await $.wait(timeWait * 1000);
        await addNews()
        await accountInfo(index + 1)
    }
    console.log(messageNotify);
    
})()

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
    console.log(`\n获取用户信息-----\n`)
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
                console.log(account);

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

// https://mspace.gmmc.com.cn/customer-app/task-mapi/sign-in?noLoad=true

// {
// 	"taskTypeCode": "TASK-INTEGRAL-SIGN-IN",
// 	"step": 1,
// 	"sign": "ee26126dce2b4fc2be2ce53a13ec345b",
// 	"timestamp": "1643943373910",
// 	"appVersion": "2.2.4",
// 	"operateSystem": "iOS"
// }
function signin() {
    console.log(`\n签到-----\n`)
    return new Promise((resolve, reject) => {
        let url = {
            url: `https://mspace.gmmc.com.cn/customer-app/task-mapi/sign-in?noLoad=true`,
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
                "taskTypeCode": "TASK-INTEGRAL-SIGN-IN",
                "step": 1,
                "sign": "ee26126dce2b4fc2be2ce53a13ec345b",
                "timestamp": Math.floor((new Date()).valueOf()),
                "appVersion": "2.2.4",
                "operateSystem": "iOS"
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
                  console.log(ary)
                  let arraySource = [];
                  for (let index = 0; index < ary.length; index++) {
                      const element = ary[index];
                      if(element.objectInfo.articleId.length > 0) {
                        arraySource.push(element)
                      }
                  }

                //   for (let index = 0; index < ary.length; index++) {
                //       const element = ary[index];
                //       let articleId = element.objectInfo.articleId
                //       console.log(articleId);
                //   }
                
                if (arraySource.length > 9) {
                    let index = Math.floor(Math.random() * 10)
                    const element = arraySource[index];
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


