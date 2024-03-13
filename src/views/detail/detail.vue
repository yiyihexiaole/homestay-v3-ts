<template>
    <div class="detail top-page" ref="detailRef">
        <tab-control 
        v-if="showTabControl"
        :titles="names"
        class="tabs"
        @tab-item-click="tabClick"
        ref="tabControlRef"
        />
        <van-nav-bar
            title="房屋详情"
            left-text="旅途"
            left-arrow
            @click-left="onClickLeft"
        />
        
        <div class="main" v-if="mainPart" v-memo="[mainPart]">
            <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
            <detail-infos name="描述" :ref="getSectionRef" :topInfos="mainPart.topModule"/>
            <detail-facility name="设施" :ref="getSectionRef"  :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
            <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"/>
            <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
            <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
            <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"/>
            <detail-intro :price-intro="mainPart.introductionModule"/>
        </div>
        <div class="footer">
            <img src="@/assets/img/detail/icon_ensure.png" alt="">
            <div class="text">猗猗旅途, 永无止境!</div>
        </div>
    </div>
</template>

<script setup>
    import { ref,computed,watch } from 'vue'
    import { useRoute,useRouter } from "vue-router"
    import { getDetailInfos } from '@/services'

    import DetailSwipe from "./cpns/detail_01-swipe.vue"
    import DetailInfos from './cpns/detail_02-infos.vue'
    import DetailSection from '@/components/detail-section/detail-section.vue'
    import DetailFacility from './cpns/detail_03-facility.vue'
    import DetailLandlord from './cpns/detail_04-landlord.vue'
    import DetailComment from './cpns/detail_05-comment.vue'
    import DetailNotice from './cpns/detail_06-notice.vue'
    import detailMap from './cpns/detail_07-map.vue'
    import detailIntro from './cpns/detail_08-intro.vue'
    import TabControl from '@/components/tab-control/tab-control.vue'
    import useScroll from '@/hooks/useScroll'

    const route = useRoute()
    const router = useRouter()
    const houseId = route.params.id

    // 发送网络请求，获取数据
    const detailInfos = ref({})
    const mainPart = computed(() => detailInfos.value.mainPart)
    getDetailInfos(houseId).then(res => {
        detailInfos.value = res.data
    })


    //监听返回按钮的点击
    const onClickLeft = () => { 
        router.back()
    }

    // tabControl 相关操作
    const detailRef = ref()
    const { scrollTop } = useScroll(detailRef)
    const showTabControl = computed(() => {
        return scrollTop.value >= 300
    })
    
    // const landlordRef = ref()
    // const sectionEls = []
    // const getSectionRef = (value) => {
    //     sectionEls.push(value.$el)
    // }

    const sectionEls = ref({})
    const names = computed(() => {
        return Object.keys(sectionEls.value)
    })
    const getSectionRef = (value) => {
        // 挂载和卸载都会执行
        if(!value) return  //当卸载的时候 value为null 所以下列代码会报错，这里做一个判断
        const name = value.$el.getAttribute("name")
        sectionEls.value[name] = value.$el
        // ['设施':el元素,……]
    }

    // let isClick = false
    // let currentDistance = -1
    // 点击tab后切换内容
    const tabClick = (index) => {
        const key = Object.keys(sectionEls.value)[index]
        const el = sectionEls.value[key]
        let distance = el.offsetTop
        if (index !== 0) {
            distance = distance -44
        }

        // isClick = true
        // currentDistance = distance

        detailRef.value.scrollTo({
            top: distance,
            behavior:"smooth"
        })
    }


    // 页面滚动时，匹配对应的tabControl 的index
    const tabControlRef = ref()
    watch(scrollTop,(newValue) => {
        // 以下是点击tabControl时，在内容滚动时，tabControl会持续变动，所以判断是否点击，再通过
        // 已经到达点击后的位置和预定位置相同，判断点击跳转结束，改变isClick  但是有bug，可能是
        // 元素盒子长度的原因
        
        // if(newValue === currentDistance) {
        //     isClick = false
        // }
        // if(isClick) return
        // 1、获取所有的区域的offsetTops
        const els = Object.values(sectionEls.value)
        const values = els.map(el => el.offsetTop)
        
        // 2、根据newValue去匹配想要索引
        let index = values.length - 1
        for (let i = 0;i < values.length;i++){
            if(values[i] > newValue + 44){
                index = i - 1
                break
            }
        }
        // console.log(index)
        tabControlRef.value?.setCurrentIndex(index)
    })

</script>

<style scoped lang="less">
.tabs {
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
}
.footer {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 120px;

img {
    width: 123px;
}

.text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
}
}
</style>