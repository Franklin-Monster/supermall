<template>
  <div class="goods">
    <goods-item v-for="item in goods" :key="item.index" :goodsitem="item"></goods-item>
 
  </div>
</template>

<script>
import GoodsItem from "components/content/goods/GoodsItem";
export default {
  components: {
    GoodsItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
.goods{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>