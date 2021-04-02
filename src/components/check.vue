<template lang="">
  <view class="check-wrap tool-color font-style-border">
    <view class="check-dot-wrap">
      <view v-if="checked" class="check-dot"></view>
    </view>
    <view class="check-text">{{text}}</view>
  </view>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class extends Vue{
  @Prop()
  checked!: boolean

  @Prop()
  text!: string
}
</script>
<style lang="scss" scoped>
.check-wrap{
  display: flex;
  align-items: center;
  width: 500rpx;
  padding: 30rpx;
  border-radius: 20rpx;
  border: 1px solid white;
  box-shadow: 2px 2px 2px 2px rgba($color: #000000, $alpha: 0.1);
  display: flex;
  .check-dot-wrap{
    flex-shrink: 0;
    width: 30rpx;
    height: 30rpx;
    border-radius: 30rpx;
    padding: 4rpx;
    background-color: white;
    box-shadow:inset 0 0 14rpx 14rpx rgb(71, 93, 117);
    border: 1px solid white;
    .check-dot{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: white;
    }
  }
  .check-text{
    font-size: 32rpx;
    padding-left: 20rpx;
    color: white;
  }
}
</style>