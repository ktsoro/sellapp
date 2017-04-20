<template>
    <transition name="move">
        <div class="food"
             v-show="showFlag"
             ref="food">
            <div class="food-content">
                <div class="back"
                     @click="hide">
                        <i class="icon-arrow_lift"></i>
                </div>
                <div class="image-header">
                    <img :src="food.image"
                         alt="">
                </div>
                <div class="content">
                    <div class="food-header">
                        <h2 class="title">{{food.name}}</h2>
                        <div class="extra">
                            <div class="count">月售{{food.sellCount}}份</div>
                            <div class="rating">好评率{{food.rating}}%</div>
                        </div>
                        <div class="price">
                            <div class="nowPrice">￥{{food.price}}</div>
                            <div class="oldPrice"
                                 v-show="food.oldPrice">￥{{food.oldPrice}}</div>
                        </div>
                        <div class="addShopcart">
                            <div class="withNone"
                                 v-show="!food.count ||!food.count === 0">
                                <!--2nd条件不生效-->
                                <div class="text"
                                     @click="addFirst">加入购物车</div>
                            </div>
                            <div class="with"
                                 v-show="food.count>0">
                                <cartcontrol @cart="addFood"
                                             :food="food"></cartcontrol>
                            </div>
                        </div>
                    </div>
                    <split v-show="food.info"></split>
                    <div class="info"
                         v-show="food.info">
                        <h3 class="title">商品介绍</h3>
                        <p class="desc">{{food.info}}</p>
                    </div>
                    <split></split>
                    <div class="rating">
                        <h1 class="title">商品评价</h1>
                        <ratingselect :selectType="selectType"
                                      :onlyContent="onlyContent"
                                      :desc="desc"
                                      :ratings="food.ratings"
                                      @select="selectRating"
                                      @toggle="toggleContent"></ratingselect>
                        <div class="rating-wrapper">
                            <ul v-show="food.ratings && food.ratings.length">
                                <li v-for="rating in food.ratings"
                                    class="rating-item border-1px"
                                    v-show="needShow(rating.rateType, rating.text)">
                                    <div class="user">
                                        <span class="name">{{rating.username}}</span>
                                        <img :src="rating.avatar"
                                             alt=""
                                             class="avatar"
                                             width="12"
                                             height="12">
                                    </div>
                                    <div class="time">{{rating.rateTime | formatDate}}</div>
                                    <p class="text">
                                        <span :class="{'icon-thumb_up':rating.rateType === 0,
                                                       'icon-thumb_down':rating.rateType === 1}"
                                              class="icon"></span> {{rating.text}}
                                    </p>
                                </li>
                            </ul>
                            <div class="no-rating"
                                 v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import { formatDate } from '../../common/js/date.js'
import BScroll from 'better-scroll'
import Vue from 'vue'

const ALL = 2;

export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        }
    },
    methods: {
        show() {
            this.showFlag = true;
            this.selectType = ALL;
            this.onlyContent = true;
            this.$nextTick(() => {   // 实现滚动效果，在nextTick保证DOM元素在下一帧被渲染
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true // 内部元素可以被点击
                    });
                } else {
                    this.scroll.refresh(); // 重新做一次计算
                }
            })
        },
        hide() {
            this.showFlag = false;
        },
        addFirst(event) {
            // this.$emit('add', event.target)
            if (!event._constructed) { // 防止pc端出现点击两次的情况
                return
            }
            this.$emit('add', event.target) // 向父组件提供可供调用的监听
            Vue.set(this.food, 'count', 1); // 使用vue给food设置新的属性，count=1
        },
        addFood(target) {
            this.$emit('add', target);
        },
        selectRating(type) {
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            })
        },
        toggleContent() {
            this.onlyContent = !this.onlyContent;
            this.$nextTick(() => {
                this.scroll.refresh();
            })
        },
        needShow(type, text) {
            if (this.onlyContent && !text) {
                return false
            }
            if (this.selectType === ALL) {
                return true
            } else {
                return type === this.selectType
            }
        }
    },
    components: {
        cartcontrol,
        BScroll,
        split,
        ratingselect
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    }
};
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
    .food
        position: fixed
        left: 0
        top: 0
        bottom: 48px
        z-index: 30  //覆盖级别，正数且越大越靠近用户，越上层
        width: 100%
        background: #fff
        transition: all 0.2s
        &.move-enter-active, &.move-leave-active
            transform: translate3d(100%, 0, 0)
        .food-content
            .back
                position: fixed
                top: 10px
                left: 10px
                z-index: 10
                .icon-arrow_lift
                    display: block
                    padding: 9px  // 加大触控面积
                    font-size: 20px
                    color: #fff
                    background: rgb(0, 160, 220)
                    border-radius: 50%
            .image-header
                position: relative
                width: 100%
                height: 0
                padding-bottom: 100% // 通过padding-top来实现高根据宽度来进行设置
                img
                    position: absolute
                    top: 0
                    left: 0
                    width: 100%
                    height: 100%
            .content
                .food-header
                    font-size: 0  // 子元素是inline-block元素,可以通过设font-size来实现无间隙。也可以将span 元素中间的换行删除
                    position: relative
                    padding: 18px
                    .title
                        line-height: 14px
                        margin-bottom: 8px
                        font-size: 14px
                        font-weight: 700
                        color: rgb(7, 17, 27)
                    .extra
                        display: flex
                        margin-bottom: 18px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                        line-height: 20px
                        .rating
                            margin-left: 12px
                    .price
                        display: flex
                        .nowPrice
                            font-size: 14px
                            font-weight: 700
                            color: rgb(240, 20, 20)
                            line-height: 24px
                        .oldPrice
                            font-size: 10px
                            color: rgb(147, 153, 159)
                            line-height: 24px
                            text-decoration: line-through
                            margin-left: 10px 
                    .addShopcart
                        position: absolute
                        right: 10px
                        bottom: 11px
                        height: 36px
                        width: 84px
                        z-index: 10
                        .withNone
                            display: flex
                            margin: 5px 0 0 2px
                            border-radius: 12px
                            background: rgb(0, 160, 220)
                            align-items: center
                            justify-content: center
                            height: 24px
                            width: 74px
                            .text
                                line-height:12px
                                font-size: 10px
                                color: #fff
                        .with
                            position: absolute
                            box-sizing: border-box // 使得内边距和边宽度失效

                .info
                    padding: 18px
                    line-height: 24px
                    .title
                        font-size: 14px
                        font-weight: 400
                        color: rgb(7, 17, 27)
                    .desc
                        padding: 6px 8px 0 8px
                        font-size: 12px
                        font-weight: 200
                        color: rgb(77, 85, 93)
                .rating
                    .title
                        margin: 18px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .rating-wrapper
                        .rating-item
                            padding: 16px 0
                            margin: 0 18px
                            border-1px(rgba(7, 17, 27, 0.1))
                            .user
                                position: fixed
                                right: 18px
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

