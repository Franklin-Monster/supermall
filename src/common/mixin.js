import { debounce } from './utils'
export const itemListenerMixin={

    data(){
      return {
        itemImgListener: null
      }
    },
    mounted(){
         //监听item中图片加载完成
      //对监听的事件进行保存
      this.itemImgListener=()=>{
        const refresh=debounce(this.$refs.scroll.refresh,500)
        refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
   
    }
}