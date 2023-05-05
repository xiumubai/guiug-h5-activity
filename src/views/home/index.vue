<template>
  <div class="dial">
    <!-- 转盘包裹 -->
    <div class="rotate">
      <!-- 转盘图片 -->
      <img
        class="dish"
        src="../../assets/dial.png"
        :style="{transform:rotate_deg,transition:rotate_transition}"
      />
      <!-- 指针图片 -->
      <img class="pointer" src="../../assets/click.png" @click="start" />
    </div>
  </div>
</template>
 
<script setup>
import { ref} from 'vue'
// import { showToast } from 'vant';
import { saveCoupon } from '/@/api';
import router from '/@/router';
const LuckyClick = ref(200)
const isAllowClick = ref(true) //是否能够点击
const rotate_deg = ref(0) //指针旋转的角度
const amount = ref(0) // 选中金额
const rotate_transition = ref("transform 3.5s ease-in-out") //初始化选中的过度属性控制

const start = () => {
  if (LuckyClick.value == 0) {
    alert("机会已经用完了");
    // showToast({
    //   message: '自定义图标',
    //   icon: 'like-o',
    // });
    return;
  }
  rotating();
}
 
const rotating = () => {
  if (!isAllowClick.value) return;
  isAllowClick.value = false;
  rotate_transition.value = "transform 3s ease-in-out";
  LuckyClick.value--;
  var rand_circle = 10; //默认多旋转5圈
  //   var winningIndex = Math.floor(Math.random() * 8); //获奖的下标   0-7   没有概率每个平均
  var winningIndex = set(); //设置了概率的
  var randomDeg = 360 - winningIndex * 45; //当前下标对应的角度    45是总共8个扇形区域，每个区域约45度

  var deg = rand_circle * 360 + randomDeg; //将要旋转的度数  由于是顺时针的转动方向需要用360度来减
  rotate_deg.value = "rotate(" + deg + "deg)";
  setTimeout(function() {
    isAllowClick.value = true;
    rotate_deg.value = "rotate(" + 0 + "deg)"; //定时器关闭的时候重置角度
    rotate_transition.value = "";
    if (winningIndex == 0) {
      alert("恭喜您，获得200元优惠券");
      amount.value = 200
    } else if (winningIndex == 1) {
      amount.value = 500
      alert("恭喜您，获得500元优惠券");
    } else if (winningIndex == 2) {
      amount.value = 800
      alert("恭喜您，获得800元优惠券");
    } else if (winningIndex == 3) {
      amount.value = 1000
      alert("恭喜您，获得1000元优惠券");
    } else if (winningIndex == 4) {
      amount.value = 200
      alert("恭喜您，获得200元优惠券");
    } else if (winningIndex == 5) {
      amount.value = 500
      alert("恭喜您，获得500元优惠券");
    } else if (winningIndex == 6) {
      amount.value = 800
      alert("恭喜您，获得800元优惠券");
    } else if (winningIndex == 7) {
      amount.value = 1000
      alert("恭喜您，获得1000元优惠券");
    }
    save()
  }, 3500);
  
}

const save = async () => {
  console.log('抽奖结束');
  const res = await saveCoupon({
    name: '10周年校庆新学员福利',
    amount: amount.value
  })
  if (res.status === 200) {
    router.push({ path: '/login' });
  }
}

//设置概率
const set = () => {
  let winIndex;
  //方法2
  let __rand__ = Math.random();
  console.log('随机数', __rand__);
  if (__rand__ < 0.3) winIndex = 3;       // 1000元
  else if (__rand__ < 0.5) winIndex = 7;  // 1000元
  else if (__rand__ < 0.7) winIndex = 2;  // 800元
  else if (__rand__ < 0.8) winIndex = 6;  // 800元
  else if (__rand__ < 0.9) winIndex = 1;  // 500元
  else if (__rand__ < 0.95) winIndex = 5; // 500元
  else if (__rand__ < 0.97) winIndex = 0; // 200元
  else if (__rand__ < 1) winIndex = 4;    // 200元

  return winIndex;
}

</script>
 
 
<style  scoped lang="scss">

.dial {
  height: 100%;
  background-image: url('../../assets/bg.jpg');
}
.rotate {
  width: 20.1rem;
  height: 20.1rem;
  background: #ffbe04;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
}
 
.rotate .dish {
  width: 100%;
  height: 100%;
}
 
.pointer {
  width: 5.5rem;
  height: 6.03rem;
  position: absolute;
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 圆点 */
.rotate .circle {
  position: absolute;
  display: block;
  border-radius: 50%;
  height: 0.16rem;
  width: 0.16rem;
  background: black;
}
 
.rotate .circle_0 {
  top: 0.08rem;
  left: 2.92rem;
}
 
.rotate .circle_1 {
  top: 0.28rem;
  left: 4.05rem;
}
 
.rotate .circle_2 {
  top: 0.86rem;
  left: 4.95rem;
}
 
.rotate .circle_3 {
  top: 1.85rem;
  left: 5.65rem;
}
 
.rotate .circle_4 {
  top: 2.85rem;
  right: 0.1rem;
}
 
.rotate .circle_5 {
  bottom: 1.89rem;
  right: 0.29rem;
}
 
.rotate .circle_6 {
  bottom: 0.96rem;
  right: 0.88rem;
}
 
.rotate .circle_7 {
  bottom: 0.34rem;
  right: 1.76rem;
}
 
.rotate .circle_8 {
  bottom: 0.06rem;
  right: 3.06rem;
}
 
.rotate .circle_9 {
  bottom: 0.28rem;
  left: 1.9rem;
}
 
.rotate .circle_10 {
  bottom: 0.96rem;
  left: 0.88rem;
}
 
.rotate .circle_11 {
  bottom: 1.82rem;
  left: 0.28rem;
}
 
.rotate .circle_12 {
  top: 2.9rem;
  left: 0.1rem;
}
 
.rotate .circle_13 {
  top: 1.9rem;
  left: 0.28rem;
}
 
.rotate .circle_14 {
  top: 1rem;
  left: 0.86rem;
}
 
.rotate .circle_15 {
  top: 0.32rem;
  left: 1.76rem;
}
</style>