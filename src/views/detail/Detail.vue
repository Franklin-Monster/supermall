<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick"></detail-nav-bar>

    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" class="goodsinfo"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref=recommend></goods-list>
    </scroll>
    <detail-bottom-bar @addCar="addToCar"></detail-bottom-bar>
    <toast :message="message" :show="show"></toast>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";
import DetailNavBar from "./ChildComps/DetailNavBar";
import DetailSwiper from "./ChildComps/DetailSwiper";
import DetailBaseInfo from "./ChildComps/DetailBaseInfo";
import DetailShopInfo from "./ChildComps/DetailShopInfo";
import DetailGoodsInfo from "./ChildComps/DetailGoodsInfo";
import DetailParamInfo from "./ChildComps/DetailParamInfo";
import DetailCommentInfo from "./ChildComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from './ChildComps/DetailBottomBar'
import Toast from 'components/common/toast/Toast'

import { itemListenerMixin } from 'common/mixin'
import { mapActions } from 'vuex'

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail.js";
import { debounce } from "common/utils";
export default {
  name: "Detail",
  mixins:[itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs:[],
      message:'',
      show:false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast
  },
  created() {
    // 保存传入的id
    this.iid = this.$route.params.iid;
    // 根据iid请求数据
    getDetail(this.iid).then(res => {
      // 获取顶部轮播图数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // console.log(res);
      //获取商品详情数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取店铺信息的数据
      this.shop = new Shop(data.shopInfo);
      //获取商品详情数据
      this.detailInfo = data.detailInfo;
      //获取参数详情数据
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      //获取推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
      });
    });
  },
  mounted() {
  },
  updated(){
    this.themeTopYs=[]
    this.themeTopYs.push(0)
    this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
  },
  destroyed(){
        this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh();
    },
    titleClick(index){
      // console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){
      //获取Y值
      const positionY=-position.y
      let length=this.themeTopYs.length
      for(let i=0;i<length;i++){
        if((i<length-1 && positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]) || (i===length-1&&positionY>this.themeTopYs[i])){
          
        }
      }
    },
    addToCar(){
      //获取购物车需要的展示的信息
      const product={}
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.realPrice
      product.iid=this.iid
      //将商品的信息加入到购物车中
      // this.$store.dispatch('addCart',produ ct).then(res=>{
      //   console.log(res)
      // }) 
      this.addCart(product).then(res=>{
        // this.message=res
        // this.show=true
        // setTimeout(()=>{
        //   this.show=false
        //   this.message=''
        // },1500)
        this.$toast.show(res,1000)
      })
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
}
.detail-nav-bar {
  background-color: #fff;
  position: relative;
  z-index: 9;
}

.goodsinfo {
  position: relative;
  z-index: 0;
}
</style>