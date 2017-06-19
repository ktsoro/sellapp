<template>
    <div>
        <div class="seller" ref="seller">
            <div class="content">
                <div class="title-wrapper">
                    <div class="title">{{seller.name}}</div>
                    <star :size="36" :score="seller.score"></star>
                    <span class="ratings-count">({{seller.ratingCount}})</span>
                    <span class="sells-count">月售{{seller.sellCount}}份</span>
                    <div class="delivery">
                        <div class="min-price css-hook">
                            <span class="name">起送价</span>
                            <div class="num">{{seller.minPrice}}</div>
                            <span class="unit">元</span>
                        </div>
                        <div class="delivery-price css-hook">
                            <span class="name">商家配送</span>
                            <div class="num">{{seller.deliveryPrice}}</div>
                            <span class="unit">元</span>
                        </div>
                        <div class="delivery-time css-hook">
                            <span class="name">平均配送时间</span>
                            <div class="num">{{seller.deliveryTime}}</div>
                            <span class="unit">分钟</span>
                        </div>
                    </div>
                    <div class="favorite" @click="toggleFavorite">
                        <span class="icon-favorite" :class="{'active':favorite}"></span>
                        <span class="text">{{favoriteText}}</span>
                    </div>
                </div>
                <split></split>
                <div class="bulletin-support">
                    <div class="title">公告与活动</div>
                    <p class="bulletin">{{seller.bulletin}}</p>
                    <div class="supports">
                        <ul>
                            <li class="item" v-for="(item, index) in seller.supports">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span> {{item.description}}
                            </li>
                        </ul>
                    </div>
                </div>
                <split></split>
                <div class="seller-pics">
                    <div class="title">商家实景</div>
                    <div class="pic-wrapper" ref="picWrapper">
                        <ul class="pic-list" ref="picList">
                            <li v-for="pic in seller.pics" class="pic-item">
                                <img :src="pic" alt="" width="120" height="90">
                            </li>
                        </ul>
                    </div>
                </div>
                <split></split>
                <div class="seller-infos">
                    <div class="title">商家信息</div>
                    <ul>
                        <li v-for="item in seller.infos" class="info">{{item}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <!--<shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>-->
    </div>
</template>
    
<script type="text/ecmascript-6">
import star from '../star/star'
import split from '../split/split'
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import { saveToLocal, loadFromLocal } from '../../common/js/store.js'
// import { eventBus } from '../../common/js/event-bus.js'

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            favorite: (() => {
                return loadFromLocal(this.seller.id, 'favorite', false)
            })()
        }
    },
    computed: {
        favoriteText() {
            return this.favorite ? '已收藏' : '未收藏'
        }
    },
    components: {
        star,
        split,
        shopcart
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted() { // 取代ready，作为新的钩子函数
        this._initsroll()
        this._initPic()
        /* eventBus.$on('selFood', cartFoods => {
            console.log(cartFoods)
        }) */
    },
    watch: {
        'seller'() {
            this.$nextTick(() => {
                this._initsroll()
                this._initPic()
            })
        }
    },
    methods: {
        _initsroll() {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.seller, {
                    click: true
                })
            } else {
                this.scroll.refresh()
            }
        },
        _initPic() {
            if (this.seller.pics) {
                let picWidth = 120
                let margin = 6
                let width = (picWidth + margin) * this.seller.pics.length - margin
                this.$refs.picList.style.width = width + 'px'
                this.$nextTick(() => {
                    if (!this.picScroll) {
                        this.picScroll = new BScroll(this.$refs.picWrapper, {
                            scrollX: true,
                            eventPassthrough: 'vertical'
                        })
                    } else {
                        this.picScroll.refresh()
                    }
                })
            }
        },
        toggleFavorite(event) {
            if (!event._constructed) {
                return
            }
            this.favorite = !this.favorite
            saveToLocal(this.seller.id, 'favorite', this.favorite)
        }
    }
}
</script>
    
<style lang="stylus" rel="stylesheet/stylus">
@import  '../../common/stylus/mixin.styl'
    .seller
        position: absolute
        top: 174px
        bottom: 0
        left: 0
        width: 100%
        padding-bottom: 46px
        font-size: 0
        overflow: hidden
        .title-wrapper
            margin: 18px
            .title
                font-size: 14px
                color: rgb(7, 17, 27)
                line-height: 14px
                margin-bottom: 8px
            .star
                display: inline-block
                margin: 0 8px 18px 0
            span
                font-size: 10px
                color: rgb(77, 85, 93)
                line-height: 18px
            .delivery
                display: flex
                .css-hook
                    flex: 1
                    margin-top: 18px
                    text-align: center
                    font-size: 0
                    .name
                        display: block
                        margin-bottom: 4px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                        line-height: 24px
                    .num
                        display: inline-block
                        font-size: 24px
                        font-weight: 200
                        color: rgb(7, 17, 27)
                        line-height: 24px
                    .unit
                        font-size: 10px
                        font-weight: 200
                        color: rgb(7, 17, 27)
                        line-height: 24px
                .delivery-price
                    border-left: 1px solid rgba(7, 17, 27, 0.1)
                    border-right: 1px solid rgba(7, 17, 27, 0.1)
            .favorite
                position: absolute
                top: 0
                right: 18px
                text-align: center
                .icon-favorite
                    font-size: 24px
                    line-height: 24px
                    &.active
                        color: rgb(240, 20, 20)
                .text
                    display: block
                    font-size: 14px
        .bulletin-support
            margin: 18px
            .title
                font-size: 14px
                color: rgb(7, 17, 27)
                line-height: 14px
                margin-bottom: 8px
            .bulletin
                margin: 0 12px
                padding-bottom: 16px 
                font-size: 12px
                font-weight: 200
                color: rgb(240, 20, 20)
                line-height: 24px
            .supports
                .item
                    padding: 16px 12px
                    border-top: 1px solid rgba(7, 17, 27, 0.1)
                    font-size: 12px
                    font-weight: 200
                    color: rgb(7, 17, 27)
                    line-height: 16px
                    .icon
                        display: inline-block
                        vertical-align: top
                        width: 16px
                        height: 16px
                        margin-right: 6px
                        background-size: 16px 16px
                        background-repeat: no-repeat  // 背景图像将不会在横轴或者纵轴进行重复
                        &.decrease
                            bg-image('decrease_4')
                        &.discount
                            bg-image('discount_4')
                        &.guarantee
                            bg-image('guarantee_4')
                        &.invoice
                            bg-image('invoice_4')
                        &.special
                            bg-image('special_4')
        .seller-pics
            margin:  18px 0 18px 18px
            .title
                font-size: 14px
                padding-bottom: 12px
            .pic-wrapper
                width: 100%
                overflow: hidden
                white-space: nowrap
                .pic-list
                    font-size: 0
                    .pic-item
                        display: inline-block
                        margin-right: 6px
                        &.last-child
                            margin: 0
        .seller-infos
            margin: 18px
            .title
                font-size: 14px
                padding-bottom: 12px
            .info
                padding: 16px 12px
                border-top: 1px solid rgba(7, 17, 27, 0.1)
                font-size: 12px
                font-weight: 200
                color: rgb(7, 17, 27)
                line-height: 16px
</style>
