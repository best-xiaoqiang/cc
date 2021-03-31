function promisify<T, U>(fn: Function) {
  return function(obj: AnyObject) {
    return new Promise((resolve: (value: T) => void, reject: (err: U) => void) => {
      if (!obj.success) {
        obj.success = (res: T) => {
          resolve(res);
        };
      }
      if (!obj.fail) {
        obj.fail = (err: U) => {
          reject(err);
        };
      }
      fn(obj);
    });
  };
}

export const request = promisify<UniApp.RequestSuccessCallbackResult, UniApp.GeneralCallbackResult>(uni.request)

export const showModal = promisify(uni.showModal)

export const getNetworkType = promisify<UniApp.GetNetworkTypeSuccess, any>(uni.getNetworkType);

export const getSetting = promisify<any, any>(uni.getSetting)

export const login = promisify<UniApp.LoginRes, any>(uni.login);

export const getUserInfo = promisify<UniApp.GetUserInfoRes, any>(uni.getUserInfo);

export const previewImage = function(imageList: string | object, current: string = '') {
  if (typeof imageList === 'string') {
    imageList = [imageList];
  }
  if (!Array.isArray(imageList)) {
    throw new Error('传入数组或者字符串');
  }
  console.log('share imgeslist', imageList)
  return promisify<any, any>(uni.previewImage)({urls: imageList, current});
}

export const saveImage = promisify<any, any>(uni.saveImageToPhotosAlbum)

export const getImageInfo = function(src: string){
  return promisify<UniApp.GetImageInfoSuccessData, any>(uni.getImageInfo)({src})
}

export const hideLoading = promisify<any, any>(uni.hideLoading)

export const uploadFile = function(obj: AnyObject){
  // #ifdef MP-ALIPAY
  if(!obj.fileType) obj.fileType = 'image'
  // #endif
  return promisify<UniApp.UploadFileSuccessCallbackResult, any>(uni.uploadFile)(obj)
}

export const chooseImage = promisify<UniApp.ChooseImageSuccessCallbackResult, any>(uni.chooseImage)

export const canvasToTempFilePath = promisify<UniApp.CanvasToTempFilePathRes, any>(uni.canvasToTempFilePath)