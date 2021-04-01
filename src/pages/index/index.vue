<template lang="">
  <view class="index-wrap flex-column grid">
        <Sun></Sun>
    <!-- <view class="box-bling">点点滴滴</view><br> -->
        <Card></Card>
    <Card></Card>
    <!-- 2 -->
    <SunBtn :aniShow="false"></SunBtn>
<!-- 3 -->
    <Paper></Paper>
 
    <!-- 4 -->
    <CheckList :optionList="optionList" @choose="onCheck" />
    <!-- 5 -->
    <view class="index-process-wrap">
      <Process :currentIndex="currentIndex" :len="9" />
    </view>

  </view>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Sun from '@/components/sun.vue'
import CheckList from '@/components/check-list.vue'
import Process from '@/components/process.vue'
import SunBtn from '@/components/sun-btn.vue'
import Paper from '@/components/paper.vue'
import Card from '@/components/card.vue'
@Component({
  components: {
    Sun,
    CheckList,
    Process,
    SunBtn,
    Paper,
    Card
  }
})
export default class extends Vue {
  optionList = [
    {text: '虚像是淡淡的卡迪发生看的生生世世生生世世生生世世生生世世是谁', checked: false},
    {text: 'xuanxiang22', checked: false},
    {text: 'xuanxiang33', checked: true},
    {text: 'xuanxiang44', checked: false},
  ]
  currentIndex = 0

  onLoad(){
    setTimeout(() => {
      this.currentIndex = 4
    }, 3000);
  }

  onCheck(e: any){
    console.log(e.index)
    this.optionList = this.optionList.map((item: any, index: number) => {
      item.checked = index == e.index
      return item
    })
  }
}
</script>
<style lang="scss" scoped>
.index-wrap{
  height: 100%;
  overflow: auto;
}
// 3
.index-process-wrap{
  margin-top: 20rpx;
}
</style>