<template>
   <div class="cart">
     <nav-bar class="nav-bar">
       <div slot="center">
             购物车({{this.cartLength}})
       </div>
     </nav-bar>


   </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  data(){
    return {

    }
  },
  components:{
    NavBar
  },
  computed:{
    cartLength(){
      return this.$store.getters.cartLength
    }
  }
}
</script>
<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}

</style>