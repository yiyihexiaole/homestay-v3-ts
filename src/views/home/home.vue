<template>
  <div class="home" ref="homeRef">
    <home-nav-var />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box />
    <home-categories />
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar />
    </div>
    <home-content />
    <!-- <button @click="moreBtnClick">加载更多</button> -->
  </div>
</template>

<script>
// 匹配keep-alive的includes
export default { name: "home" };
</script>

<script setup>
import { watch, ref, computed, onActivated } from "vue";
import useHomeStore from "@/stores/modules/home";
import HomeNavVar from "./cpns/home-nav-var.vue";
import HomeSearchBox from "./cpns/home-search-box.vue";
import HomeCategories from "./cpns/home-categories.vue";
import homeContent from "./cpns/home-content.vue";
import useScroll from "@/hooks/useScroll";
import searchBar from "@/components/search-bar/search-bar.vue";

// 发送网络请求
const homeStore = useHomeStore();
homeStore.fetchHotSuggestData();
homeStore.fetchCategoriesData();
homeStore.fetchHouseListData();

// 模拟加载更多 监听window窗口的滚动的回调函数方式
// const moreBtnClick = () => {
//     console.log('加载更多');
//     homeStore.fetchHouseListData()
// }

// 监听window窗口的滚动
// 1、当离开页面时，移除监听
// 2、如果别的页面也监听，会编写重复代码
// const scrollListenerHandler = () => {
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop = document.documentElement.scrollTop
//     const scrollHeight = document.documentElement.scrollHeight
//     if (1 + clientHeight + scrollTop >= scrollHeight){
//         homeStore.fetchHouseListData()
//     }
//     }

//     onMounted(() => {
//         window.addEventListener("scroll",scrollListenerHandler)
//     })

//     onUnmounted(() => {
//         window.removeEventListener("scroll",scrollListenerHandler)
//     })

// 传入回调函数方式
// useScroll(() => {
//     homeStore.fetchHouseListData
// })

// 传入参数方案
const homeRef = ref();
const { isReachBottom, scrollTop } = useScroll(homeRef);
// 逻辑
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouseListData().then(() => {
      isReachBottom.value = false;
    });
  }
});

// 搜索框显示控制
// const isShowSearchBar = ref(false)
// watch(scrollTop,(newTop) => {
//     isShowSearchBar.value = newTop > 100
// })
// 定义的可响应式数据依赖另外一个可响应式数据，那么可以使用计算属性 computed
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360;
});

// 跳转到home时，保留原来的位置  路由守卫
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value,
  });
});
</script>

<style scoped lang="less">
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
}
.banner {
  img {
    width: 100%;
  }
}

.search-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
  z-index: 9;
}
</style>
