import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore";

// 传入回调函数方式
// export default function useScroll( reachBottomCB) {
//     const scrollListenerHandler = () => {
//         const clientHeight = document.documentElement.clientHeight
//         const scrollTop = document.documentElement.scrollTop
//         const scrollHeight = document.documentElement.scrollHeight

//         if (1 + clientHeight + scrollTop >= scrollHeight){
//             if(reachBottomCB) reachBottomCB()

//         }
//         }

//         onMounted(() => {
//             window.addEventListener("scroll",scrollListenerHandler)
//         })

//         onUnmounted(() => {
//             window.removeEventListener("scroll",scrollListenerHandler)
//         })
// }

export default function useScroll(elRef) {
  let el = window;
  // 传入变量参数方式
  const isReachBottom = ref(false);

  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);

  // 用外部 underscore包 的 节流 函数
  const scrollListenerHandler = throttle(() => {
    // console.log("滚动了");
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight;
      scrollTop.value = document.documentElement.scrollTop;
      scrollHeight.value = document.documentElement.scrollHeight;
    } else {
      clientHeight.value = el.clientHeight;
      scrollTop.value = el.scrollTop;
      scrollHeight.value = el.scrollHeight;
    }
    if (1 + clientHeight.value + scrollTop.value >= scrollHeight.value) {
      // console.log("滚动到底部了");
      isReachBottom.value = true;
    }
  }, 100);

  onMounted(() => {
    if (elRef) el = elRef.value;
    el.addEventListener("scroll", scrollListenerHandler);
  });

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler);
  });

  return { isReachBottom, clientHeight, scrollHeight, scrollTop };
}
