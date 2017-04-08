<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="item in goods" class="item-wrapper" :class="{'current':currentIndex === index}">
                    <div class="text border-1px">
                        <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
                    </div>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li class="food-list food-list-hook" v-for="item in goods">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li class="food-item" v-for="food in item.foods">
                            <div class="icon">
                                <img :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="nowPrice">￥{{food.price}}</span>
                                    <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
    
<script>
    import BScroll from 'better-scroll';
    const ERR_OK = 0;

    export default {
        props: {
            goods: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0
            };
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            this.$http.get('/api/goods').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    this.$nextTick(() => {
                        this._initScroll();
                    });
                }
            });
        },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    console.log(height1);
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            }
        },
        methods: {
            _initScroll() {
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true});// 左侧菜单组件

                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    click: true,
                    probeType: 3
                    });// 右侧商品组件

                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y))
                })
            },
            _calculateHeight() {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
                console.log(height)
            }
        }
    };
</script>
    
<style lang="stylus" rel="stylesheet/stylus">
    @import  '../../common/stylus/mixin.styl'
    .goods
        display: flex
        position: absolute
        top: 174px
        bottom: 46px
        width: 100%
        font-size: 0
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background-color: #f3f5f7
            .item-wrapper
                display: table
                height: 54px
                width: 56px
                padding: 0 12px
                line-height: 14px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff 
                    font-weight: 700
                    .text
                        border-none()
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 4px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image('decrease_3')
                    &.discount
                        bg-image('discount_3')
                    &.guarantee
                        bg-image('guarantee_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3')
                .text
                    display: table-cell
                    width: 56px
                    font-size: 12px
                    vertical-align: middle
                    border-1px(rgba(7, 17, 27, 0.1))
                    //color: rgb(240, 20, 20)
                    font-weight: 200
        .foods-wrapper
            flex: 1
            .food-list
                .title
                    font-size: 12px
                    color: rgb(147, 153, 159)
                    background-color: #f3f5f7
                    line-height: 26px
                    padding-left: 14px
                    height: 26px
                    border-left: 2px solid #d9dde1
                .food-item
                    display: flex
                    padding: 18px
                    border-1px(rgba(7, 17, 27, 0.1))
                    &:last-child
                        border-none()
                    .icon
                        flex: 0 0 57px  // 不缩放，固定以57px的尺寸进行显示
                        img
                            width: 57px
                            height: 57px
                    .content
                        flex: 1
                        margin-left: 10px
                        .name
                            font-size: 14 px
                            line-height: 14px
                            color: rgb(7, 17 ,27)
                            margin-top: 2px 
                        .desc, .extra
                            font-size: 10px
                            color: rgb(147, 153, 159)
                            line-height: 10px
                            margin-top: 8px 
                            .count
                                margin-right: 12px
                        .desc
                            line-height: 12px
                        .price
                            font-weight: 700
                            line-height: 24px
                            .nowPrice
                                vertical-align: top
                                font-size: 14px
                                margin-right: 8px
                                color: rgb(240, 20, 20)
                            .oldPrice
                                font-size: 10px
                                color: rgb(147, 153, 159)
                                text-decoration: line-through

</style>
