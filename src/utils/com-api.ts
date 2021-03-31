import { getUserInfo } from '@/utils/promisify'

let userInfoData: any = null
interface videoAdInterface {
  adUnitId: string
}
export const getRewardedVideoAdApi = function () {
  let method: any = uni.createRewardedVideoAd
  // #ifdef MP-TOUTIAO
  // 今日头条不支持，仅高版本抖音支持
  // @ts-ignore
  const info = tt.getSystemInfoSync();
  if (info.appName.toUpperCase() === 'DOUYIN') {
    // @ts-ignore
    method = tt.createRewardedVideoAd
  } else {
    method = undefined
  }
  // #endif
  // #ifdef MP-BAIDU || MP-ALIPAY
  method = false
  // #endif
  return method
}
export const createRewardedVideoAd = function (params: videoAdInterface) {
  let method = getRewardedVideoAdApi()
  return method(params)
}
export const getUserInfoApi = function () {
  let method: any = getUserInfo
  // #ifdef MP-BAIDU
  method = function () {
    return new Promise(function (resolve, reject) {
      if (userInfoData) {
        resolve(userInfoData)
      } else {
        reject()
      }
    })
  }
  // #endif
  return method
}
export const setBdUserInfoData = function (info: any) {
  userInfoData = info
}

export const getSystemInfoSync = function () {
  let data = uni.getSystemInfoSync()
  // #ifdef MP-ALIPAY
  let { screenWidth, screenHeight, pixelRatio } = data
  if (screenWidth > 500) {
    screenWidth = screenWidth / pixelRatio
    screenHeight = screenHeight / pixelRatio
    data = Object.assign({}, data, {
      screenWidth,
      screenHeight
    })
  }
  // #endif
  return data
}

export const isIosSystem = function () {
  const sysInfo: any = uni.getSystemInfoSync()
  let isIos = sysInfo.system.toLowerCase().indexOf('ios') >= 0
  // #ifdef MP-ALIPAY
  isIos = isIos || sysInfo.platform.toLowerCase().indexOf('ios') >= 0
  // #endif
  return isIos
}