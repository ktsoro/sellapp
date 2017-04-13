<template>
    <transition name="move">
        <div class="food" v-show="showFlag" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" alt="">
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift" ></i>
                    </div>
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
                            <div class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</div>
                        </div>
                        <div class="addShopcart">
                            <div class="withNone" v-show="showCart">
                                <div class="text" @click="addFirst">加入购物车</div>
                            </div>
                            <div class="with" v-show="food.count>0">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </div>
                    </div>
                        <p class="desc">{{food.desciption}}</p>
                    <div class="desc"></div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
import Vue from 'vue'
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
           return {
                showFlag: false,
                showDate: true
           }
        },
        methods: {
            show() {
                this.showFlag = true;
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                })
            },
            hide() {
                this.showFlag = false;
            },
            addFirst(event) {
                this.$emit('add', event.target)
                Vue.set(this.food, 'count', 1);
            }
        },
        components: {
            cartcontrol,
            BScroll
        },
        computed: {
            showCart() {
                console.log(this.food);
                if (!this.food.count) {
                    this.showDate = true;
                } else {
                    this.showDate = false;
                }
                return this.showDate;
            }
        }
    };
</script>


<style lang="stylus" rel="stylesheet/stylus">

    .food
        position: fixed
        left: 0
        top: 0
        bottom: 48px
        z-index: 30
        width: 100%
        background: #fff
        transition: all 0.2s
        &.move-enter-active, &.move-leave-active
            transform: translate3d(100%, 0, 0)
        .food-content
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
                .back
                    position: absolute
                    top: 10px
                    left: 0
                    .icon-arrow_lift
                        display: block
                        padding: 10px
                        font-size: 20px
                        color: #fff
            .content
                font-size: 0
                .food-header
                    position: relative
                    padding: 18px
                    .title
                        font-size: 14px
                        font-weight: 700
                        margin-bottom: 8px
                        color: rgb(7, 17, 27)
                        line-height: 14px
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
                        right: 18px
                        bottom: 6px
                        height: 36px
                        width: 84px
                        .withNone
                            display: flex
                            border-radius: 12px
                            background: rgb(0, 160, 220)
                            align-items: center
                            justify-content: center
                            height: 24px
                            .text
                                line-height:12px
                                font-size: 10px
                                color: #fff
                        .with
                            position: absolute
                            right: 0
                            bottom: 12px
</style>

