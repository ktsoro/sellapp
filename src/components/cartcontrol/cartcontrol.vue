<template>
    <div class="cartcontrol">
        <transition name="move rotate">
                <div class="cart-decrease icon-remove_circle_outline" 
                        v-show="food.count>0" 
                        @click="decreaseCart($event)"></div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
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
                console.log('click')
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
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
            opacity: 1
            &.move-enter-active, &.move-leave-active, &.rotate-enter-active, &.rotate-leave-active
                transition: all 0.8s
            &.move-enter, &.move-leave-active
                opacity: 0
                transform: translate3D(24px, 0, 0)
            &.rotate-enter, &.rotate-leave-active
                transform: rotate(180deg)
            &.rotate-enter-active
        .cart-decrease, .cart-add
            display: inline-block
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

