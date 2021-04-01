<template lang="">
  <view class="paper-comp-wrap">
    啦啦啦
  </view>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.paper-comp-wrap {
    min-width: 200px;
    min-height: 50px;
    padding: 30rpx;
    background-color: #fff;
    margin: 100rpx auto;
    position: relative;
    &:before,
    &:after {
        content: '';
        width: 50%;
        height: 70%;
        box-shadow: 0 20rpx 20rpx rgba(0, 0, 0, 0.1);
        position: absolute;
        z-index: -1;
    }
    &:before {
        transform: rotate(-5deg);
        transform-origin: top right;
        left: 10px;
    }
    &:after {
        transform: rotate(5deg);
        transform-origin: top left;
        right: 10px;
    }
}
</style>