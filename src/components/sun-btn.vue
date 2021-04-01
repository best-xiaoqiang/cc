<template lang="">
  <view class="sun-btn-comp flex-center" :class="[aniShow ? 'sun-btn-comp-ani' : '']">
    <view class="sun-btn">点点滴滴</view>
  </view>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class extends Vue {
  @Prop()
  aniShow!: boolean
}
</script>
<style lang="scss" scoped>
.sun-btn-comp{
    font-size: 38rpx;
    height: 80rpx;
    padding: 0 40rpx;
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    border-radius: 50px;
    z-index: 1;
    border: 2px solid white;
    font-weight: bold;
    animation: sun 30s infinite;
    box-shadow: 0 0 4rpx 4rpx rgba($color: #000000, $alpha: 0.3);
    position: relative;
    background: #03a9f4;

}
.sun-btn-comp-ani{
  background: transparent;
  background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
  background-size: 400%;
  /* 设置发光 */
    &::before{
      content: "";
      position: absolute;
      left: -5px;
      right: -5px;
      top: -5px;
      bottom: -5px;
      background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
      background-size: 400%;
      border-radius: 50px;
      filter: blur(20px);
      z-index: -1;

      animation: sun 30s infinite;
    }

}
/* 设置流光 */
@keyframes sun{
    100%{
        background-position: -400% 0;
    }
}

</style>