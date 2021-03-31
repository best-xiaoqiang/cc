import Config from '@/constant/config'
import { store } from '@/store/common';

let _interstitialAd: any = null
let _adLoaded = false
const LOW_VERSION = !uni.createInterstitialAd
function init() {
  if(LOW_VERSION){
    console.warn('版本较低，不能使用createInterstitialAd')
    return
  }
  if(_interstitialAd != null){
    clearAd()
  }
  let adUnitId = getAdUnitId()
  if(!adUnitId) return
  _interstitialAd = uni.createInterstitialAd({ 
    adUnitId
  });
  _interstitialAd.load()        
  _interstitialAd.onLoad(() => {
    _adLoaded = true
  })
  _interstitialAd.onClose(() => { console.log('close event emit') })       
  _interstitialAd.onError((e: string) => {
    console.error(e)
  }) 
}
function getAdUnitId(){
  let {QQ} = Config.platformsMap
  let platForm = Config.PLATFORM
  if(platForm === QQ){
    return '56073b9ae14a40a65ac9f3425c1c5e47'
  }
  return ''
}
function showAd(){
  if(_interstitialAd != null && _adLoaded){
    _interstitialAd.show().catch((e: string) => {
      console.warn('inter ad show error:', e)
    })
  }
}
function clearAd(){
  _interstitialAd.offError()
  _interstitialAd.offLoad()
  _interstitialAd.offClose()
  _interstitialAd.destroy()
  _adLoaded = false
  _interstitialAd = null
}
export default{
  init,
  showAd,
  clearAd
}