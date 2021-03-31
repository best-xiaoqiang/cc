import { store } from '@/store/common';
import { getPlatFormStr, navigateTo } from '@/utils/util';
import Config from '@/constant/config'
import { createRewardedVideoAd } from '../com-api';

// 视频广告
const LOW_VERSION = !uni.createRewardedVideoAd;
const fn = (data: number) => { };
let modaled = false;
let videoAd: AnyObject | null = null;
let videoAdLoaded = false;
let integral = -1;
let _onIntegralChange: Function = fn;
let _incIntegral = true
let _unFinishText = ''

function init({
  unFinishText = '', // 播放中途退出是否显示继续观看弹窗
  onIntegralChange = (data: number) => { },
  incIntegral = true, // 播放完成更新积分
} = {}) {
  if (store.hiddenAd) return
  if (videoAd != null) {
    clearVideoAd()
  }
  _incIntegral = incIntegral
  _unFinishText = unFinishText
  if (typeof onIntegralChange === 'function') _onIntegralChange = onIntegralChange;
  // onOpenidReady().then(() => {
  //   getIntegral();
  // })
  if (LOW_VERSION) {
    console.warn('版本较低，不能使用createRewardedVideoAd')
    return
  };
  let adUnitId = getAdUnitId() || ''
  console.log('adUnitId', adUnitId)
  videoAd = createRewardedVideoAd({ adUnitId });
  // #ifdef MP-BAIDU
  // @ts-ignore
  // videoAd = swan.createRewardedVideoAd({
  //   adUnitId,
  //   appSid: 'b224a746'
  // })
  // #endif
  if (!videoAd) {
    console.warn('无法获取videoAd', adUnitId)
    return
  }
  videoAd
    .load()
    .then(() => {
      videoAdLoaded = true;
    })
    .catch((err: AnyObject) => {
      console.log('videoAd load error:', err.errMsg);
    });
  videoAd.onClose(_onCloseListener);
  videoAd.onError(_onErrorListener);
}
function _onErrorListener() {
  videoAdLoaded = false;
}
function _onCloseListener(status: AnyObject) {
  if ((status && status.isEnded) || status === undefined) {
    uni.setStorageSync('last_free_timestamp', new Date().getTime());
    if (_incIntegral) {
      // 当onIntegralChange被赋值时默认是更新积分
      // updateIntegral(true).then((integral) => {
      //   uni.showToast({
      //     title: '积分+1',
      //   });
      //   _onIntegralChange(integral);
      // });

      // 播放完成回调
      _onIntegralChange();
    }
  } else if (_unFinishText) {
    // let content = '视频未播放完毕\n无法获得积分哦'
    let content = _unFinishText;
    uni.showModal({
      content,
      confirmText: '继续观看',
      confirmColor: '#22B925',
      success: (res) => {
        if (res.confirm) {
          showVideoAd();
        }
      },
    });
  }
}

interface ModalData {
  content: string;
  confirmText: string;
  success?: (result: UniApp.ShowModalRes) => void;
}

function getAdUnitId() {
  let { QQ, WEIXIN, TOUTIAO, BAIDU } = Config.platformsMap
  let platForm: string = Config.PLATFORM
  switch (platForm) {
    case QQ:
      return ''
    case WEIXIN:
      return 'adunit-9b1e5fecaaeb1567'
    case TOUTIAO:
      return ''
    case BAIDU:
      return ''
    default:
      return ''
  }


}

function _check(cb: Function) {
  let modalData = null;
  if (LOW_VERSION) {
    modalData = { content: `当前版本过低，请更新${getPlatFormStr(true)}以使用该功能。` };
  } else if (!videoAdLoaded) {
    modalData = { content: '暂时没有可以观看的广告...' };
  }
  let {
    content,
    confirmText = '好的',
    success = (result: UniApp.ShowModalRes) => { },
  } = (modalData || {}) as ModalData;
  if (modalData) {
    if (modaled) return;
    modaled = true;
    uni.showModal({
      content,
      confirmText,
      confirmColor: '#22B925',
      success,
      complete: () => {
        modaled = false;
      },
    });
  } else {
    if (typeof cb === 'function') {
      cb();
    }
  }
}

// function getIntegral() {
//   console.log('getintegral', integral)
//   if (integral === -1) {
//     return fetchWeshineData({
//       url: 'score/getadscore?v=1.2.3',
//       method: 'POST',
//       requestData: {
//         openid: store.openid,
//       },
//     })
//       .then((res) => {
//         if (res.meta && +res.meta.status === 200) {
//           let { score } = res.data;
//           integral = score || 0;
//           _onIntegralChange(integral);
//           return integral;
//         }
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   } else {
//     _onIntegralChange(integral);
//     return Promise.resolve(integral);
//   }
// }

function updateIntegral(add: any) {
  if (typeof add !== 'boolean' || store.isVip || store.hiddenAd) {
    return Promise.resolve(integral);
  }
  let url =
    (add ? 'score/ascendingadscore' : 'score/consumeadscore') + '?v=' + Config.v;
  // return fetchWeshineData({
  //   url,
  //   method: 'POST',
  //   requestData: { score: 1, openid: store.openid },
  // }).then((res) => {
  //   if (res.meta && +res.meta.status === 200) {
  //     let { score } = res.data;
  //     integral = score || 0;
  //     _onIntegralChange(integral);
  //     return integral as number;
  //   }
  // });
}

function lackIntegral() {
  if ((integral && integral > 0) || store.isVip || store.hiddenAd || !videoAdLoaded) return false;
  if (modaled) return true;
  modaled = true;
  let modalData: any = {};
  if (LOW_VERSION) {
    modalData = { content: `当前版本过低，请更新${getPlatFormStr(true)}以使用该功能。` };
  } else if (videoAdLoaded && (!integral || integral <= 0)) {
    modalData = {
      content: '积分不足\n观看广告视频可获得1积分',
      confirmText: '去观看',
      success: (res: AnyObject) => {
        if (res.confirm) {
          showVideoAd();
        }
      },
    };
  }
  let { content = '', confirmText = '好的', success = () => { } } = modalData || {};
  uni.showModal({
    content,
    confirmText,
    // confirmColor: '#22B925',
    success,
    complete: () => {
      modaled = false;
    },
  });
  return true;
}

function clearVideoAd() {
  if (videoAd != null) {
    try {
      videoAd.offClose(_onCloseListener);
      videoAd.offError(_onErrorListener);
      videoAd = null;
      videoAdLoaded = false;
      _onIntegralChange = fn;
      _incIntegral = true
    } catch (error) {

    }
  }
}

function showVideoAd() {
  console.log('showVideoAd', !!videoAd)
  if(!store.openid){
    navigateTo({
      url: '/pages/login/login'
    })
    return
  }
  _check(() => {
    videoAd?.show();
  });
}


export default {
  init,
  updateIntegral,
  lackIntegral,
  showVideoAd,
};
