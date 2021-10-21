/*
更新时间: 2021-02-28 09:03
Github Actions使用方法见[@lxk0301](https://raw.githubusercontent.com/lxk0301/scripts/master/githubAction.md) 使用方法大同小异

点击几篇文章和视频，自动获取阅读请求，在Github Actions中的Secrets新建name为'YOUTH_READ'的一个值，拷贝抓包的请求体到下面Value的文本框中，添加的请求体越多，获得青豆次数越多，本脚本不包含任何推送通知

多个请求体时用'&'号或者换行隔开" ‼️

*/


const $ = new Env("中青看点阅读文章，视频_13-vxGE0410")
//const notify = $.isNode() ? require('./sendNotify') : '';
