<template>
  <div id="app">
    <!-- keep-alive包裹router-view路由页面销毁 -->
    <keep-alive exclude="Detail"> 
    <router-view></router-view>
    </keep-alive>
   <main-tab-bar class="tabbar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar/MainTabBar.vue'
export default {

  components:{
    MainTabBar
  }

}
</script>

<style>
@import "./assets/css/base.css";
.tabbar{
  z-index:99;
}

</style>
