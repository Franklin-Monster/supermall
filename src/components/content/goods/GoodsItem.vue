<template>
  <div class="goodsitem" @click="itemCilck">
      <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">{{ goodsitem.price}}</span>
      <span class="collect">{{ goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        goodsitem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
        showImage(){
          return this.goodsitem.image || this.goodsitem.show.img
        }
    },
    methods:{
      imageLoad(){
         this.$bus.$emit('itemImageLoad')
      },
      itemCilck(){
        this.$router.push('/detail/'+this.goodsitem.iid)
      }
    }

}
</script>
<style>
.goodsitem{
    padding-bottom:40px;
    position: relative;
    width:48%;
}
.goodsitem img{
    width: 100%;
    border-radius: 5px;
}
.goods-info{
    text-align: center;
    font-size: 12px;
    position: absolute;
    bottom:5px;
    right:0;
    left:0;
    overflow: hidden;
}
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;    /* 规定当文本溢出包含元素时只显示一行，与 white-space: nowrap配套使用 */
    white-space: nowrap;     /* 规定段落中的文本不进行换行 */
    margin-bottom: 3px;
  }

.goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>