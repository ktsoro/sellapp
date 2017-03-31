<template>
  <div>
  <vheader></vheader>
  <div class="tab" >
    <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/ratings">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/seller">商家</router-link>
    </div>
  </div>
  <div id="app"></div>
  
    <router-view></router-view>

  </div>
</template>
<!--？？？？？在template中-没有影响到代码的识别？？？？？？？？？？？？？-->
<script>
import vheader from './components/header/header'
export default {
  components: {
    vheader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .tab
      display: flex
      width: 100%
      height: 40px
      align-items:center
      .tab-item
        flex:1
        text-align: center
</style>
