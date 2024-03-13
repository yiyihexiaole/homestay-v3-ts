<template>
    <div class="swipe">
        <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
            <template v-for="(item,index) in swipeData">
                <van-swipe-item class="item">
                    <img :src="item.url" alt="">
                </van-swipe-item>
            </template>

            <template #indicator="{ active,total }">
                <!-- <div class="indicator"> {{ props.active }}/{{ swipeData.length }}-{{ props.total }}</div> -->
                <div class="indicator">
                    <template v-for="(value,key,index) in swipeGroup" :key="key">
                        <span 
                            class="item" 
                            :class="{ active:swipeData[active]?.enumPictureCategory == key }"
                        >
                            <span class="text">{{ getName(value[0].title) }}</span>
                            <span class="count"
                            v-if="swipeData[active]?.enumPictureCategory == key"
                            >{{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}</span>
                        </span>
                    </template>
                </div>
            </template>
        </van-swipe>
    </div>
</template>

<script setup>
    const props = defineProps({
        swipeData:{
            type:Array,
            default:() => []
        }
    })

    // 对数据进行转换
    const swipeGroup = {}
    // 思路二 一次循环
    for(const item of props.swipeData){
        let valueArray = swipeGroup[item.enumPictureCategory]
        if(!valueArray) {
            valueArray = []
            swipeGroup[item.enumPictureCategory] = valueArray
        }

        valueArray.push(item)
    }
    // // 思路一：两次循环
    // for(const item of props.swipeData){
    //     swipeGroup[item.enumPictureCategory] = []
    // }

    // for(const item of props.swipeData){
    //     const valueArray = swipeGroup[item.enumPictureCategory]
    //     valueArray.push(item)
    // }
    const nameReg = /【(.*?)】/i
    // 正则
    const getName = (name) => {
        // return name.replace("：","").replace("【","").replace("】","")
        const results = nameReg.exec(name)
        return results[1]
    }

    const getCategoryIndex = (item) => {
        // valueArray 是 swipeGroup 中key值为（活跃的对象的enumPictureCategory值） 的对象数组
        const valueArray = swipeGroup[item.enumPictureCategory]
        // data 是指数组中的每个元素。findIndex方法会对数组中的每个元素执行一个回调函数，该函数
        // 接受一个参数，即当前元素的值。如果回调函数返回true，那么findIndex方法就会返回当前元素
        // 的索引。如果没有元素满足条件，那么findIndex方法就会返回-1。 
        
        // item 是传过来的，在housePics中的活跃的对象，和对象数组valueArray中每一个对象比较是否相同
        return valueArray.findIndex(data => data === item) +1
    }
</script>

<style scoped lang="less">
    .swipe{
        .swipe-list {
            .item {
                img {
                    width: 100%;
                }
            }
            .indicator {
                position: absolute;
                right: 5px;
                bottom: 5px;
                display: flex;
                padding: 2px 5px;
                font-size: 12px;
                color: #fff;
                background: rgba(0, 0, 0, 0.1);

                .item {
                    margin: 0 3px;

                    &.active {
                        padding: 0 3px;
                        border-radius: 5px;
                        background-color: #fff;
                        color: #333;
                    }
                }
            }
        }
    }
</style>