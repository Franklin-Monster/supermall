<template>
   <div class="cart">
     <nav-bar class="nav-bar">
       <div slot="center">
             购物车({{cartLength}})
       </div>
     </nav-bar>
     <cart-list></cart-list>
     <cart-bottom-bar></cart-bottom-bar>
   </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import { mapGetters } from 'vuex'

export default {
  data(){
    return {

    }
  },
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    // cartLength(){
    //   return this.$store.getters.cartLength 
    // }
    ...mapGetters(['cartLength','cartList']),
    //第二种写法,给getters里的方法重命名，重命名的时候...mapGetters({})这里面是对象，不重名的时候...mapGetters([])这里面是数组
    // ...mapGetters({
    //   length:'cartLength',
    //   123:'cartList'
    // })
  }
}  
</script>
<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
 
}
.cart{
  height: 100vh;
}

</style>