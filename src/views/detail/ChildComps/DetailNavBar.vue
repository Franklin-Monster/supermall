<template>
  <div class="detail">
    <nav-bar>
      <div slot="left" class="back" @click="backCilck">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          :key="item.id"
          class="title-item"
          :class="{active:index===currentIndex}"
          @click="itemCilck(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    itemCilck(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    backCilck(){
        this.$router.back()
    }
  }
};
</script>

<style>

.title {
  display: flex;
  font-size: 13px;
  width: 100%;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
</style>