<template lang="">
  <view class="check-list-comp-wrap flex-column">
    <view class="check-item" v-for="(item, index) in optionList" :key="index" @click="itemTap(index)">
      <CheckItem :checked="item.checked" :text="item.text" />
    </view>
  </view>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CheckItem from '@/components/check.vue'
@Component({
  components: {
    CheckItem
  }
})
export default class extends Vue{
  @Prop({
    default: []
  })
  optionList!: object

  itemTap(index: number){
    this.$emit('choose', {index})
  }
}
</script>
<style lang="scss" scoped>
.check-item{
  margin-bottom: 20rpx;
}
</style>