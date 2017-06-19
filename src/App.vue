<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
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
    <keep-alive> <!--保留状态-->
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>
<!--？？？？？type="text/ecmascript-6"在template中-没有影响到代码的识别？？？？？？？？？？？？？-->
<script >
import header from './components/header/header';
import { urlParse } from './common/js/util.js'  // 函数加入需要有大括号
const ERR_OK = 0;

export default {
  data() {
    return {
      seller: {
        id: (() => {
          let querryParam = urlParse()
          return querryParam.id
        })()
      }
    }
  },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
          // this.seller = response.data; 这样会导致id不能加入到seller中
           this.seller = Object.assign({}, this.seller, response.data)
      }
    });
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/mixin.styl"
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      /*border-bottom: 1px solid rgba(7,17,27,0.1)*/
      border-1px(rgba(7,17,27,0.1))
      align-items:center
      .tab-item
        flex:1
        text-align: center
        & > a
          display:block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active-link
            color: rgb(230, 20, 20)
</style>
