<template lang="">
  <view class="title-card-comp-wrap title-font font-style-border">都多发生的发生少</view>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
.title-card-comp-wrap{
  padding: 30rpx 50rpx;
  position: relative;
  color: white;
  background: white;
  max-width: 700rpx;
  box-sizing: border-box;
  text-align: center;
  margin: 20rpx auto;
  animation: colorAni 10s linear infinite alternate;

  &::before, &::after{
    content: '';
    position: absolute;
    width: 0%;
    height: 10rpx;
    background: #3474de;
    opacity: 0.3;
    animation: widthAni 10s linear infinite alternate;
  }
  &::before{
    left: 0;
    top: 0;
  }
  &::after{
    right: 0;
    bottom: 0;
  }
}
@keyframes widthAni {
  100%{
    width: 100%;
    opacity: 1;
  }
}
@keyframes colorAni {
  0%{
    background: white;
  }
  5%{
    background: white;
  }
  40%{
    background: #3474de;
  }
  100%{
    background: #3474de;
  }
}
</style>