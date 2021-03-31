const { statusBarHeight, windowWidth } = uni.getSystemInfoSync()
let Config: any = {
  v: '1.0.0',
  title: 'test',
  desc: '',
  tabList: [],
  platformsMap: {
    WEIXIN: 'mp-weixin',
    QQ: 'mp-qq',
    TOUTIAO: 'mp-toutiao',
    BAIDU: 'mp-baidu',
    ALIPAY: 'mp-alipay',
    KUAISHOU: 'mp-kuaishou'
  },
  PLATFORM: process.env.VUE_APP_PLATFORM?.toLowerCase() + '',
  previewMenu: true, // 大图预览模式下是否有操作菜单
  statusBarHeight: statusBarHeight || 40,
  rpxtopxRatio: windowWidth / 750,
}
// #ifdef MP-ALIPAY || MP-TOUTIAO
Config.previewMenu = false
// #endif
const isdefOf = (platform: string) => platform === Config.PLATFORM
Object.assign(Config, {
  IN_WEIXIN: isdefOf(Config.platformsMap.WEIXIN),
  IN_QQ: isdefOf(Config.platformsMap.QQ),
  IN_TOUTIAO: isdefOf(Config.platformsMap.TOUTIAO),
  IN_BAIDU: isdefOf(Config.platformsMap.BAIDU),
  IN_ALIPAY: isdefOf(Config.platformsMap.ALIPAY),
  IN_KUAISHOU: isdefOf(Config.platformsMap.KUAISHOU),
})
if(Config.IN_QQ){
  Config.gifUseScore = true
}
export default Config