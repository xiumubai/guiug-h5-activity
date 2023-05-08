<template>
  <div class="dial">
    <img class="logo" src="../../assets/images/logo.png"/>
    <div class="header_content">
      <img class="title" src="../../assets/images/title.png"/>
      <div class="sub_title">抽奖后立即截图保存哦</div>
    </div>
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
    <div class="rule">
      <div class="rule_title">抽奖规则</div>
      <div class="rule_item">
        <p>1、只限于2023年5月份报名就业全程班的学员哦 </p>
        <p>2、每个人只有一次抽奖机会哈 </p>
        <p> 3、须在2023年12月31号前缴费进班哈</p>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { ref, onMounted} from 'vue'
import { showToast } from 'vant';
import { saveCoupon } from '/@/api';
// import router from '/@/router';
const LuckyClick = ref(200)
const isAllowClick = ref(true) // 是否能够点击
const rotate_deg = ref(0) // 指针旋转的角度
const amount = ref(0) // 选中金额
const rotate_transition = ref("transform 3.5s ease-in-out") //初始化选中的过度属性控制
import { useUserStore } from '/@/store/modules/user';

const userStore = useUserStore();
onMounted(() => {
  // 未登陆跳转到登陆页面
  // console.log(userStore.token);
  if (!userStore.token) {
    router.push({ path: '/login' });
  }
})

const start = () => {
  if (LuckyClick.value == 0) {
    showToast({
      message: '抽奖机会已经用完了',
      position: 'top',
    });
    return;
  }
  rotating();
}
 
const rotating = () => {
  if (!isAllowClick.value) return;
  isAllowClick.value = false;
  rotate_transition.value = "transform 3s ease-in-out";
  // rotate-center ;
  LuckyClick.value--;
  var rand_circle = 10; //默认多旋转5圈
  //   var winningIndex = Math.floor(Math.random() * 8); //获奖的下标   0-7   没有概率每个平均
  var winningIndex = set(); //设置了概率的
  var randomDeg = 360 - winningIndex * 45; //当前下标对应的角度    45是总共8个扇形区域，每个区域约45度

  var deg = rand_circle * 360 + randomDeg; //将要旋转的度数  由于是顺时针的转动方向需要用360度来减
  rotate_deg.value = "rotate(" + deg + "deg)";
  setTimeout(function() {
    if (winningIndex == 0) {
      amount.value = 200
    } else if (winningIndex == 1) {
      amount.value = 500
    } else if (winningIndex == 2) {
      amount.value = 800
    } else if (winningIndex == 3) {
      amount.value = 1000
    } else if (winningIndex == 4) {
      amount.value = 200
    } else if (winningIndex == 5) {
      amount.value = 500
    } else if (winningIndex == 6) {
      amount.value = 800
    } else if (winningIndex == 7) {
      amount.value = 1000
    }
    save()
  }, 3500);
  
}

const save = async () => {
  const res = await saveCoupon({
    name: '10周年校庆新学员福利',
    amount: amount.value
  })
  if (res.status === 200) {
    // 抽奖结束,抽奖次数设置为0
    LuckyClick.value = 0
    showToast({
      message: `恭喜您，获得${amount.value}元优惠券`,
      icon: 'like-o',
      position: 'top',
      duration: 4000,
      overlay: true,
      forbidClick: true,
      onClose: () => {
        isAllowClick.value = true;
        rotate_deg.value = "rotate(" + 0 + "deg)";
        rotate_transition.value = "";
      }
    });
    // router.push({ path: '/login' });
  }
}

//设置概率
const set = () => {
  let winIndex;
  //方法2
  let __rand__ = Math.random();
  console.log('随机数', __rand__);
  if (__rand__ < 0.15) winIndex = 3;       // 1000元
  else if (__rand__ < 0.3) winIndex = 7;  // 1000元
  else if (__rand__ < 0.45) winIndex = 2;  // 800元
  else if (__rand__ < 0.6) winIndex = 6;  // 800元
  else if (__rand__ < 0.8) winIndex = 1;  // 500元
  else if (__rand__ < 1) winIndex = 5; // 500元
  else if (__rand__ === 3) winIndex = 0; // 200元
  else if (__rand__ === 2) winIndex = 4;    // 200元

  return winIndex;
}

</script>
 
 
<style  scoped lang="scss">

.dial {
  height: 100%;
  background-image: url('../../assets/images/choujiang_bg.jpg');
  background-size: 100% 100%;

  .logo {
    width: 171px;
    height: 36px;
    position: fixed;
    top: 34px;
    right: 40px;
  }

  .header_content {
    padding-top: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    .title {
      width: 586px;
      height: 83px;
      margin-bottom: 27px;
    }

    .sub_title {
      text-align: center;
      width: 531px;
      height: 53px;
      font-family: Alibaba PuHuiTi;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 51px;
      font-size: 30px;
      background-image: url('../../assets/images/sub_title_bg.png');
      background-size: 100% 100%;
    }

    
  }

  .rule {
    position: absolute;
    
    bottom: 112px;
    width: 100%;
    .rule_title {
      text-align: center;
      height: 29px;
      font-size: 30px;
      font-family: Source Han Sans SC;
      font-weight: bold;
      color: #D3003F;
      line-height: 36px;
      margin-bottom: 37px;
    }

    .rule_item {
      padding-left: 65px;
      font-size: 24px;
      font-family: Source Han Sans SC;
      font-weight: 500;
      color: #D3003F;
      line-height: 36px;
    }
    
  }
}
.rotate {
  width: 692px;
  height: 692px;
  margin: 0 auto;
  // background: #ffbe04;
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
  width: 190px;
  height: 210px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>