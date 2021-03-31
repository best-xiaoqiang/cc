import Vue from 'vue';

// 创建一个小型的 store，里面的数据可以实现多组件共享
export const store: StoreInterface = Vue.observable({
  isIos: false,
  hiddenAd: false,
  loggedIn: false, // 是否有登录账号（除微信、qq外的其它平台）
  authAgreed: true, // 是否已授权用户信息
});

interface StoreInterface {
  [propName: string]: any
}

export const mutations = {
  setIsIos(value: boolean) {
    store.isIos = value
  },
  setHiddenAd(value: boolean) {
    store.hiddenAd = value
  },
  setLoggedIn(value: boolean){
    store.loggedIn = value
    console.warn('loggedIn:', store.loggedIn)
  },
  setAuthAgreed(value: boolean){
    store.authAgreed = value
  }
};
