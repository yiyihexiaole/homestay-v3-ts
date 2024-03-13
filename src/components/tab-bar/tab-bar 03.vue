<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9354">
      <template v-for="(item,index) in tabbarData ">
          <van-tabbar-item :to="item.path" icon="home-o">
          <span>{{ item.text }}</span>
        </van-tabbar-item>
      </template>
    </van-tabbar>

    <!-- <template v-for="(item,index) in tabbarData">
      <div class="tab-bar-item" 
          :class="{active:currentIndex ===index}"
          @click="itemClick(index,item)"
          >
        <img v-if="currentIndex !==index" :src="getAssetURL(item.image)" alt="">
        <img v-else :src="getAssetURL(item.imageActive)" alt="">
        <span class="text">{{ item.text }}</span>
      </div>
    </template> -->
  </div>
</template>

<script setup>
  import tabbarData from '@/assets/data/tabbar.js'
  import { getAssetURL } from '@/utils/load_assets.js'
  import { ref } from 'vue';

  const currentIndex = ref(0)
</script>



<style scoped lang="less">
  .tab-bar {
    // 局部定义一个变量，进针对 tab-bar子元素才生效
    --van-font-size-sm:15px;

    // 找到类，对类中的css属性重写
    // :deep(.class) 找到子组件的类，让子组件的类生效
    // :deep(.van-tabbar-item_icon){
    //   font-size: 50px;
    // }

    img {
      height: 28px;
    }
  }
</style>