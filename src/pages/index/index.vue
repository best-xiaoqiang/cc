<template lang="">
  <view class="index-wrap flex-column">
    <view class="box">点点滴滴</view><br>
    <a v-if="false" href="#">sunbutton</a>
<!-- 3 -->
    <Sun></Sun>
  </view>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Sun from '@/components/sun.vue'
@Component({
  components: {
    Sun
  }
})
export default class extends Vue {
  
}
</script>
<style lang="scss">
.index-wrap{
  padding-top: 50rpx;
}
.box {
    font-size: 33px;
    width: 7.5em;
    height: 2.5em;
    background: linear-gradient(to right, gold, darkorange);
    color: white;
    text-align: center;
    line-height: 2.5em;
    font-family: sans-serif;
    letter-spacing: 0.2em;
    text-shadow: 6px 3px 2px rgba(0, 0, 0, 0.2);
    border: 1px solid darkgoldenrod;
    border-radius: 2em;
    box-shadow: 2px 0 0 5px rgba(0, 0, 0, 0.2);
    transform: perspective(500px) rotateY(-15deg);
    transition: 0.5s;
    position: relative;
    overflow: hidden;
}

.box:hover {
    transform: perspective(500px) rotateY(15deg);
    text-shadow: -6px 3px 2px rgba(0, 0, 0, 0.2);
    box-shadow: -2px 0 0 5px rgba(0, 0, 0, 0.2);
}

.box::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent, white, transparent);
    left: -100%;
    transition: 0.5s;
}

.box:hover::before {
    left: 100%;
}

// 2
a{  /*去掉下划线*/
    text-decoration: none;  
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    /* 设置字体大小 */
    font-size: 24px;
    background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
    background-size: 400%;
    width: 400px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #fff;
    /* 字母变大写 */
    text-transform: uppercase;
    /* 设置成胶囊状 */
    border-radius: 50px;
    z-index: 1;

    animation: sun 8s infinite;

}
/* 设置发光 */
a::before{
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

    animation: sun 8s infinite;

}
// a:hover::before{
//     animation: sun 8s infinite;
// }
// a:hover{
//     animation: sun 8s infinite;
// }
/* 设置流光 */
@keyframes sun{
    100%{
        background-position: -400% 0;
    }
}

// 3

</style>