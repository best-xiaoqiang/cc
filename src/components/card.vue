<template lang="">
  <view class="card-comp-wrap background-blue">
    <view class="card-wrap-inner background-blue">
      <view class="card-title">{{title}}</view>
      <view class="card-desc">{{desc}}</view>
    </view>
    <view v-if="tip" class="card-tip">{{tip}}</view>
  </view>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class extends Vue{
  @Prop({
    default: '标题'
  })
  title!: string

  @Prop({
    default: '描述'
  })
  desc!: string

  @Prop({
    default: '我是tip'
  })
  tip!: string

}
</script>
<style lang="scss" scoped>
.card-comp-wrap{
  width: 700rpx;
  box-sizing: border-box;
  border-radius: 20rpx;
  border: 1px dashed white;
  margin: 0 auto 20rpx;
  position: relative;
  overflow: hidden;
  padding: 6rpx;
  .card-wrap-inner{
    padding: 30rpx;
    border: 1px solid white;
    border-radius: 15rpx;
    .card-title{
      font-size: 36rpx;
      font-weight: bold;
      color: white;
    }
    .card-desc{
      font-size: 32rpx;
      color: white;
      opacity: 0.7;
    }
  }
  .card-tip{
    position: absolute;
    left: 70%;
    top: -40rpx;
    min-width: 500rpx;
    transform: rotate(25deg);
    transform-origin: left top;
    background: #ff4136;
    padding-left: 90rpx;
    height: 46rpx;
    line-height: 46rpx;
    font-size: 28rpx;
    color: white;
  }
}
</style>