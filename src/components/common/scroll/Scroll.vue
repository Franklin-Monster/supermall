<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
 import BScroll from 'better-scroll'
export default {
    data(){
        return {
            scroll:'null'
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
          //创建BSroll对象
        this.scroll=new BScroll(this.$refs.wrapper,{
           click:true,
           probeType:this.probeType,
           pullUpLoad:this.pullUpLoad
        //    scrollX: true,
        })
           //监听滚动的位置
        this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position)
        })
           //监听滚到底部的方法
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
                this.$emit('pullingUp')
            })
        }
   
    },
    methods:{
        scrollTo(x,y,time=300){
            //this.scroll&&  先判断scroll是否存在（DOM树是否创建出来），再执行相关方法，防止报错影响后续操作
            this.scroll&&this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            // finishPullUp()作用：当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
            this.scroll&&this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll&&this.scroll.refresh()
        },
        getScrollY(){
            return this.scroll?this.scroll.y:0
        }
    
    }

}
</script>

<style scoped>

</style>