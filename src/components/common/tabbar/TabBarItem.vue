<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 使用插槽尽量用div把插槽包起来，避免使用v-的指令时产生不必要的麻烦 -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="actionActive">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: String,
    activeColor:{
        type:String,
        default:'red'
    }
  },
  data() {
    return {
    //   isActive: false
    };
  },
  computed:{
      isActive(){
          return this.$route.path.indexOf(this.path)!==-1
      },
      actionActive(){
          //判断当前的item是否为活跃，如果活跃 返回color:this.activeColor，否则返回空
          return this.isActive?{color:this.activeColor} :{}
      }
  },
  methods: {
    itemClick() {
     this.$router.push(this.path)
    }
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* vertical-align 属性设置元素的垂直对齐方式 。 可在此清除img图片底部的默认3px */
  vertical-align: middle;
  margin-bottom: 2px;
}
.active {
  color: red;
}
</style>