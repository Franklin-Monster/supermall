<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
     <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControlFixed" class="tab-fixed" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll" :pullUpLoad="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
   </scroll>
   <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";

import HomeFeatureView from "./childComps/HomeFeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop"

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from 'common/utils'
import {itemListenerMixin} from 'common/mixin'
// import { log } from 'util';

export default {
  name: "Home",
  mixins:[itemListenerMixin],
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,

    };
  },
  created() {
    //请求轮播图数据
      this.getHomeMultidata(),
    //请求多个商品列表数据
      this.getHomeGoods("new"),
      this.getHomeGoods("pop"),
      this.getHomeGoods("sell");


  },
  mounted(){
     
  },
  activated(){
    this.$refs.scroll.scrollTo(0,-this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    //保存当前界面的Y值
    this.saveY=this.$refs.scroll.getScrollY
    //取消全局监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  computed: { 
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    swiperImageLoad(){
    //获取tabControl的offsetTop
    //所有的组件都有一个属性$el，可用于获取组件内的元素
       this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    //事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl.currentIndex=index
      this.$refs.tabControlFixed.currentIndex=index
    },
    backClick(){
       this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      //判断BackTop是否显示
      // (-position.y)>1000?this.isShowBackTop=true:this.isShowBackTop=false  //三元表达式写法
      this.isShowBackTop=(-position.y)>1000                                   //若(-position.y)>1000，直接返回true;若(-position.y)<1000,直接返回false
      //决定tabControl是否吸顶
      //判断当前滚动的高度是否达到了距离窗口的高度
      this.isTabFixed=(-position.y)>this.tabOffsetTop
    }, 
    //网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  /* vh:相对于视口的高度。 100vh即当前窗口的百分之百*/
  position: relative;
}
.home-nav {
  /* 使用在base.css中定义的颜色 */
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用网页原生滚动时，为了不让nav导航栏随网页一起滚动，需要设置fixed，
  而使用better-scroll插件是实现了局部滚动，nav导航栏未在scroll滚动标签内，故不用设置fixed属性 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
/* .tab-control {
  position: sticky;
  position:sticky是一个新的css3属性，它的表现类似position:relative和position:fixed的合体，
  在目标区域在屏幕中可见时，它的行为就像position:relative; 
  而当页面滚动超出目标区域时，它的表现就像position:fixed，它会固定在目标位置。
  top: 44px;
  bottom:44px;
  z-index: 9;
} */
/* .content{
  height: calc( 100% - 93px ); calc是css3新增的计算属性
  overflow: hidden;
  margin-top: 44px;
} */
.content{
  position: absolute;
  overflow: hidden;
  left: 0;
  right: 0;
  top:44px;
  bottom: 49px;
}
.tab-fixed{
  position: relative;
  z-index: 9;
}
</style>