<template lang="">
  <view class="process-comp-wrap">
    <view class="process-wrap inset-shadow">
      <view class="process" :style="{width: processW}"></view>
    </view>
    <view class="process-title">{{processText}}</view>
  </view>

</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class extends Vue {
  @Prop({default: 0})
  currentIndex!: number

  @Prop({default: 8})
  len!: number

  get processW(){
    return (100*(this.currentIndex+1)/this.len).toFixed(2) + '%'
  }

  get processText(){
    return (this.currentIndex + 1) + '/' + this.len
  }
}
</script>
<style lang="scss" scoped>
.process-comp-wrap{
  // .process-wrap{
  //   border: 10px solid red;
  //   background: blue;
  //   width: 700rpx;
  //   height: 20rpx;
  //   .process{
  //     height: 100%;
  //     background: green;
  //     transition: 1s;
  //   }
  // }
  height: 60rpx;
  width: 600rpx;
  border-radius: 60rpx;
  background: #E8EBEC;
  background: rgb(71, 93, 117);
  box-shadow: 5rpx 5rpx 3rpx rgba($color: #000000, $alpha: 0.3);
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  .process-wrap{
    flex: 1;
    height: 20rpx;
    border-radius: 20rpx;
    .process{
      height: 100%;
      background: #fff;
      transition: 1s;
      border-radius: 20rpx;
    }
  }
  .process-title{
    margin-left: 20rpx;
    color: white;
  }
}

</style>