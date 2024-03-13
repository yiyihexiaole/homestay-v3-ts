<template>
  <div class="city">
    <div class="top">
      <!-- 1、搜索框 -->
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      />

      <!-- 2、tab的切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <div class="content">
      <!-- <city-group :group-data="currentGroup"/> -->
      <template v-for="(value, key, index) in allCities">
        <city-group v-show="tabActive === key" :group-data="value"></city-group>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, toRef } from "vue";
import { useRouter } from "vue-router";
import { getCityAll } from "@/services";
import useCityStore from "@/stores/modules/city";
import { storeToRefs } from "pinia";
import cityGroup from "./cpns/city-group.vue";

const router = useRouter();

// 搜索框功能
const searchValue = ref("");
const cancelClick = () => {
  router.back();
};

// tab切换
const tabActive = ref();

// 这个位置发送请求有缺点  1，网络请求逻辑过多 2，有些数据需要传递给子组件
// 网络请求，城市数据
// const allCity = ref({})
// getCityAll().then(res => {
//     allCity.value = res.data
// })

// 从Store中获取数据
const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
const { allCities } = storeToRefs(cityStore);
// 此时的数据是一个对象， 两个键值对   一个是内陆的城市  一个是境外的城市

// 获取选中标签后的数据,为了拿到其中一组数据
// 1，获取正确的key，所以在tabs的tabActive正确绑定，通过name
// 2，根据key从allCities获取数据，默认直接获取的数据不是响应式的，所以computed
const currentGroup = computed(() => allCities.value[tabActive.value]);
</script>

<style scoped lang="less">
.city {
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;

  overflow: auto;

  // --van-tabs-line-height:30px;

  //   top固定定位方案
  // .top {
  //     position: fixed;
  //     top: 0;
  //     left: 0;
  //     right: 0;
  // }
  // .content {
  //     margin-top: 98px;
  // }
  .top {
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
