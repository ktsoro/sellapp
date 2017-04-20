<template>
    <div class="ratings" ref="rating">  <!--滚动scroll位置标注要在父元素层-->
        <!--当ratings-content超过窗口高度时，会触发scroll的滚动事件-->
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left" id="shrink">
                    <div class="score">{{seller.score}}</div>
                    <div class="title">综合评分</div>
                    <div class="desc">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score">
                        <div class="text">服务态度</div>
                        <star :size="36"
                              :score="seller.serviceScore"></star>
                    </div>
                    <div class="score">
                        <div class="text">食品评分</div>
                        <star :size="36"
                              :score="seller.foodScore"></star>
                    </div>
                    <div class="score">
                        <div class="text">送达时间</div>
                        <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect :ratings="ratings"
                          :selectType="selectType"
                          :onlyContent="onlyContent"
                          @toggle="toggleContent">
            </ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li v-for="rating in ratings"
                        class="rating-item border-1px"
                        v-show="needShow(rating.Type, rating.text)">
                        <div class="user">
                            <img :src="rating.avatar"
                                 alt=""
                                 class="avatar"
                                 width="28"
                                 height="28">
                            <span class="name">{{rating.username}}</span>
                        </div>
                        <div class="time">{{rating.rateTime | formatDate}}</div>
                        <div class="rating">
                            <star :size="36"
                                  :score="rating.score || 0"></star>
                        </div>
                        <div class="deliveryTime"
                             v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</div>
                        <p class="text">
                            <span :class="{'icon-thumb_up': rating.rateType === 0,
                                                           'icon-thumb-down': rating.rateType ===1}"
                                  class="icon"></span> {{rating.text}}
                        </p>
                    </li>
                </ul>
            </div>
            <div class="no-rating"
                 v-show="!ratings || !ratings.length">暂无评价</div>
        </div>
        <shopcart ref="shopcart"
                  :select-foods="selectFoods"
                  :delivery-price="seller.deliveryPrice"
                  :min-price="seller.minPrice"></shopcart>
    </div>
</template>
    
<script type="text/ecmascript-6">

import star from '../star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import { formatDate } from '../../common/js/date.js'
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'

const ERR_OK = 0
const ALL = 2
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            selectType: 2,
            onlyContent: true,
            ratings: [] // {}代表Object，[]代表Array
        }
    },
    components: {
        star,
        split,
        ratingselect,
        BScroll,
        shopcart
    },
    methods: {
        needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
        toggleContent() {
            this.onlyContent = !this.onlyContent;
            this.$nextTick(() => {
                this.scroll.refresh();
            })
        }
    },
    created() {
        this.$http.get('/api/ratings').then((response) => {
            response = response.body;
            if (response.errno === ERR_OK) {
                this.ratings = response.data;
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.rating, {
                            click: true
                        })
                    } else {
                        this.scroll.refresh();
                    }
                })
            }
        });
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    }
}
</script>
    
<style lang="stylus" rel="stylesheet/stylus">
@import  '../../common/stylus/mixin.styl'
@media (max-width:340px)
    #shrink
        width: 100px
.ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
        display: flex
        padding: 18px 0
        .overview-left
            flex: 0 1 auto // none等同于0 0 auto，auto基于width属性 flex-grow(是否根据剩余主轴空间进行放大),flex-shrink(是否根据空间不够进行缩小),flex-basis(该元素占据的主轴空间)
            width: 137px
            border-right: 1px solid rgba(7, 17, 27, 0.1)
            text-align: center
            .score
                display: inline-block
                font-size: 24px
                color: rgb(255, 153, 0)
                line-height: 28px
            .title
                font-size: 12px
                color: #000
                line-height: 20px
                font-weight: 400
            .desc
                font-size: 10px
                color: rgb(147, 153, 159)
                line-height: 20px
        .overview-right
            flex: 1 // flex-grow，会贪婪性质的占据所有空间
            padding-left: 24px
            .score
                display: flex
                font-size: 12px
                color: #000
                line-height: 18px
                .star,.deliveryTime
                    flex: none
                    margin-left: 12px
                .text
                    flex: none
    .rating-wrapper
        .rating-item
            padding: 16px 0
            margin: 0 18px
            border-1px(rgba(7, 17, 27, 0.1))
            .user
                font-size: 0
                .name
                    display: inline-block
                    vertical-align: top
                    font-size: 10px
                    color: rgb(147, 153, 159)
                    line-height: 12px
                    margin-right: 6px
                .avatar
                    border-radius: 50%
            .time
                margin-bottom: 6px 
                font-size: 10px
                color: rgb(147, 153, 159)
                line-height: 12px
            .text
                font-size: 12px
                color: rgb(7, 17, 27)
                line-height: 16px
                .icon
                    line-height: 24px
                    &.icon-thumb_up
                        font-size: 12px
                        color: rgb(0, 160, 220)
                    &.icon-thumb_down
                        color: rgb(147, 153, 159)
        .no-rating
            padding: 16px 18px
            font-size: 12px
            color: rgb(147, 153, 159)
</style>
