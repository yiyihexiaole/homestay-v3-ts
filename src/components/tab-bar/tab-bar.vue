<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9354" route>
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <template #default>
            <span>{{ item.text }}</span>
          </template>
          <template #icon>
            <img
              v-if="currentIndex !== index"
              :src="getAssetURL(item.image)"
              alt=""
            />
            <img v-else :src="getAssetURL(item.imageActive)" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import tabbarData from "@/assets/data/tabbar.js";
import { getAssetURL } from "@/utils/load_assets.js";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

// 监听路由改变时，找到对应的索引，设置currentIndex
const route = useRoute();
const currentIndex = ref(0);
watch(route, (newRoute) => {
  const index = tabbarData.findIndex((item) => item.path === newRoute.path);
  // if 判断当隐藏时，索引为-1 时的操作
  if (index == -1) return;
  currentIndex.value = index;
});
</script>

<style scoped lang="less">
.tab-bar {
  --van-font-size-sm: 15px;
  img {
    height: 28px;
  }
}
</style>
