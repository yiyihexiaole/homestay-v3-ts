<template>
  <div class="tab-bar">
    <div class="tab-bar-item">
      <img src="@/assets/img/tabbar/tab_home.png" alt="">
      <span class="text">首页</span>
    </div>
    <div class="tab-bar-item">
      <img src="@/assets/img/tabbar/tab_favor.png" alt="">
      <span class="text">收藏</span>
    </div>
    <div class="tab-bar-item">
      <img src="@/assets/img/tabbar/tab_order.png" alt="">
      <span class="text">订单</span>
    </div>
    <div class="tab-bar-item">
      <img src="@/assets/img/tabbar/tab_message.png" alt="">
      <span class="text">消息</span>
    </div>
  </div>
</template>

<script setup>
  const tabbarData = [
    {
      text:"首页",
      image:"@/assets/img/tabbar/tab_home.png",
      imageActive:"@/assets/img/tabbar/tab_home_active.png",
      path:"/home"
    },
    {
      text:"收藏",
      image:"@/assets/img/tabbar/tab_favor.png",
      imageActive:"@/assets/img/tabbar/tab_favor_active.png",
      path:"/favor"
    },
    {
      text:"订单",
      image:"@/assets/img/tabbar/tab_order.png",
      imageActive:"@/assets/img/tabbar/tab_order_active.png",
      path:"/order"
    },
    {
      text:"信息",
      image:"@/assets/img/tabbar/tab_message.png",
      imageActive:"@/assets/img/tabbar/tab_message.png",
      path:"/message"
    }
  ]
</script>



<style scoped lang="less">
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;

    border-top: 1px solid #f3f3f3;

    .tab-bar-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      img {
        width: 32px;
      }
      .text {
        font-size: 12px;
        margin-top: 2px;
      }
    }
  }
</style>