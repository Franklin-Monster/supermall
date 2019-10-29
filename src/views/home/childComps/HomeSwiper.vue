<template>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.link">
        <a href="item.link">
          <img :src="item.image" alt @load="imageLoad"/>
        </a>
      </swiper-item>
    </swiper>
</template>

<script scoped> 
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
    data(){
      return {
        isLoad:true
      }
    },
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
  components: {
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      if(this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad=false
      }
    }
  }
};
</script>

<style>
</style>