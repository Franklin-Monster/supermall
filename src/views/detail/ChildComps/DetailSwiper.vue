<template>
      <swiper class="detail-swiper">
          <swiper-item v-for="item in topImages" :key="item" class="swiper-item">
              <img :src="item" alt="">
          </swiper-item>
      </swiper>
</template>

<script>
   import { Swiper,SwiperItem } from 'components/common/swiper'
export default {
    data(){
        return{

        }
    },
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    }

}
</script>

<style scoped>
.detail-swiper{
    height: 300px;
    overflow: hidden;
}
.swiper-item img{
   width: 100%;
}
</style>