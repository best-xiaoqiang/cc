import Config from '@/constant/config';
import { store } from '@/store/common';

const platFormStrMap = {
  [Config.platformsMap.WEIXIN]: {
    en: 'wechat',
    ch: '微信'
  },
  [Config.platformsMap.QQ]: {
    en: 'qq',
    ch: 'QQ'
  },
  [Config.platformsMap.TOUTIAO]: {
    en: 'toutiao',
    ch: '头条'
  },
  [Config.platformsMap.BAIDU]: {
    en: 'baidu',
    ch: '百度'
  },
  [Config.platformsMap.ALIPAY]: {
    en: 'alipay',
    ch: '支付宝'
  },
  [Config.platformsMap.KUAISHOU]: {
    en: 'kuaishou',
    ch: '快手'
  }
}


// 以后用到uni.navigateTo({})的地方使用此函数，防止页面栈到10层
export function navigateTo({ url = '', delay = false, ...data }) {
  var limit = 10  //微信限制的页面路径层数
  var pageCount = getCurrentPages().length
  if (pageCount < limit - 2) {  //真机上需要额外留两层才能完成跳转
    // #ifdef MP-ALIPAY
    if (delay && store.isIos) {
      uni.showLoading({ title: '加载中', mask: true })
      setTimeout(() => {
        uni.navigateTo({ url, ...data })
        uni.hideLoading()
      }, 2500);
      return
    }
    // #endif
    uni.navigateTo({ url, ...data })
  } else {
    url = `/pages/index/index?go=${encodeURIComponent(url)}`
    uni.reLaunch({ url, ...data })
  }
}

export function updateTip() {
  uni.showModal({
    title: '提示',
    content: `当前${getPlatFormStr(true)}版本过低，无法使用该功能，请升级到最新${getPlatFormStr(true)}版本后重试。`
  });
}

export function showTip(msg: string) {
  uni.showToast({
    title: msg,
    icon: 'none'
  });
}

export const createUid = function () {
  let uid = '';
  try {
    uid = uni.getStorageSync('weshine::uniqid');
  } catch (e) {
  }
  if (uid) return uid;
  uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  try {
    uni.setStorageSync('weshine::uniqid', uid);
  } catch (error) {
  }
  return uid;
};


// 提示是否更新最新的线上版本
export const shouldUpdateNewVersion = function () {
  const updateManager = uni.getUpdateManager()

  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log(res.hasUpdate)
  })

  updateManager.onUpdateReady(function () {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    })
  })

  updateManager.onUpdateFailed(function () {
    // 新版本下载失败
  })
}

export const getCurrentPath = function () {
  let routes = getCurrentPages();
  console.log('>>>>>>>> routes', routes)
  let curRoute = routes[routes.length - 1].route
  return curRoute || ''
}

export const getPlatFormStr = function (ch = false) {
  let platForm = Config.PLATFORM
  let platFormStr = ch ? platFormStrMap[platForm].ch : platFormStrMap[platForm].en
  return platFormStr
}

export const uniNextTick = function (cb: any) {
  if (typeof cb === 'function') {
    // @ts-ignore
    this.$nextTick(() => {
      // #ifdef MP-BAIDU
      setTimeout(() => {
        // #endif
        cb()
        // #ifdef MP-BAIDU
      }, 10);
      // #endif
      
    })
  }
}

export const uniParse = function(str: any, theDefault?: any){
  let obj: any = theDefault || {}
  if(typeof str === 'string'){
    try {
      obj = JSON.parse(str)
    } catch (error) {
      uni.showToast({ title: 'JSON.parse错误！' })
      console.error(`JSON.parse错误: ${error}`)
    }
  }else if(typeof str === 'object'){
    obj = str
  }
  return obj
}