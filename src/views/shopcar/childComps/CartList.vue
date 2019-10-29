<template>
  <div class="cart-list">
     <!-- <li v-for="item in cartList" :key="item.id"> {{ item }}</li> -->
     <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item ,index ) in cartList" :key="index" :itemInfo="item" class="cart-list-item"></cart-list-item>
     </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import { mapGetters } from 'vuex'
import CartListItem from './CartListItem'
export default {
    data(){
        return {

        }
    },
    components:{
        Scroll,
        CartListItem
    },
    computed:{
        ...mapGetters(['cartList'])
    },
    activated(){
        this.$refs.scroll.refresh()
    }

}
</script>

<style scoped>
.cart-list{
     height:100vh;
    /* height: calc(100% - 44px- 49px ); */
    /* height: 100%; */
}
.content{
    height: 100%; 
    /* height: calc(100% - 44px- 49px ); */
    overflow: hidden;
     margin-bottom:50px;
    
}

</style>