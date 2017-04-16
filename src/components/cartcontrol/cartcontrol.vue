<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease icon-remove_circle_outline" 
                 v-show="food.count>0" 
                 @click.stop.prevent="decreaseCart($event)">
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
    </div>
</template>


<script>
import Vue from 'vue';
 export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart(event) {
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                // console.log(event.target);
                this.$emit('cart', event.target); // 向父组件提供可供调用的监听
            },
            decreaseCart(event) {
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 0)
                } else {
                    this.food.count--;
                }
            }
        }
    }
</script>


<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size: 0
        .cart-decrease
            &.move-enter-active
                opacity: 1
                transition: all 0.4s
                transform: rotate(180deg)
            &.move-leave-active
                opacity: 0
                transition: all 0.4s
                transform: rotate(180deg)
            &.move-enter
                opacity: 0
                transform: translate3d(24px, 0, 0)
            &.move-leave
                opacity: 1
                 
        .cart-decrease, .cart-add
            display: inline-block
            vertical-align: top
            padding: 6px
            line-height: 24px
            font-size: 24px
            color: rgb(0, 160, 220)
        .cart-count
            display: inline-block
            vertical-align: top
            text-align: center 
            padding-top: 6px
            width: 12px
            font-size: 10px
            line-height: 24px
            color: rgb(147, 153, 159)
</style>

