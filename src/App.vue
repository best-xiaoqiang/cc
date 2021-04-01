<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { store, mutations } from '@/store/common'
import { getRewardedVideoAdApi, isIosSystem } from './utils/com-api'
import config from './constant/config'

export default Vue.extend({
  mpType: 'app',
  onLaunch(options: any) {
    mutations.setHiddenAd(!getRewardedVideoAdApi() || config.IN_TOUTIAO)
    mutations.setIsIos(isIosSystem())
  }
})
</script>

<style>
/*每个页面公共css */
@import '@/static/resources/css/base.css';

page {
  font-family: -apple-system-font, 'Helvetica Neue', Helvetica,
    'Microsoft YaHei', sans-serif;
  background-color: #f4f4f4;
  height: 100%;
}
page > view {
  height: 100%;
}
view {
  background-color: transparent;
}
.section {
  position: relative;
}
</style>