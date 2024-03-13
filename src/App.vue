<template>
  <div class="app">
    <!-- keep-alive includes 匹配组件的name属性 -->
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>

    <!-- 底部导航 -->
    <tab-bar v-show="!route.meta.hideTabBar" />
    <loading />
    <!-- <tab-bar /> -->
  </div>
</template>

<script setup>
import tabBar from "./components/tab-bar/tab-bar.vue";
import loading from "./components/loading/loading.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped></style>
