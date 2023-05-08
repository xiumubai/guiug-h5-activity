<template>
  <div class="login">
    <img class="logo" src="../../assets/images/logo.png"/>
    <div class="header_content">
      <div class="title">欢迎幸运抽奖</div>
      <div class="sub_title">尚硅谷十周年校庆活动进行时</div>
    </div>
    <div class="form_content">
      <div class="lable">手机号</div>
      <div class="form-item">
        <div class="prefix">+86</div>
        <input type="number" v-model="formData.phone" placeholder="请输入手机号" />
      </div>
      <div class="form-item betwen">
        <input type="number" v-model="formData.code" placeholder="请输入验证码" />
        <div class="code_btn" 
          @click="sendCode"
          :disabled="disabled">
          {{codeMsg}}
        </div>
      </div>
    </div>
    <div class="login_btn" @click="onSubmit">登录</div>
  </div>
</template>

<script lang="ts" setup name="LoginPage">
  import { reactive, ref } from 'vue';
  
  import { getValidateCode } from '/@/api';
  import { showToast } from 'vant';
  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();
  const formData = reactive({
    phone: '',
    code: '',
  });

  const userTel = reactive([
    {
      required: true,
      message: "请输入手机号",
      trigger: "onBlur"
    },
    {
      validator: (value) => {
        return /^1[23456789]\d{9}$/.test(value);
      },
      message: "请输入正确格式的手机号"
    }
  ]);
  const codeMsg =  ref("获取短信验证码")
  const codeNum = ref(60)
  const disabled = ref(false)
  const codeRes = ref()

  // 获取短信验证码
  const sendCode = async () => {
    // 验证手机号格式是否正确
    const rulePhone: any = userTel[1]
    if (!rulePhone.validator(formData.phone)) {
      showToast('请输入正确格式的手机号');
      return;
    };

    if (disabled.value) {
      return
    }
    // 获取验证码
    const res: any = await getValidateCode(formData.phone)
    // 保存code值
    codeRes.value = res.body
    // 禁用按钮
    disabled.value = true;
    // 倒计时
    let timer = setInterval(() => {
      --codeNum.value;
      codeMsg.value = `重新发送(${codeNum.value})`;
    }, 1000);
    // 判断什么时候停止定时器
    setInterval(() => {
      clearInterval(timer);
      codeNum.value = 60;
      disabled.value = false;
      codeMsg.value = "获取短信验证码";
    }, 60000);
  }
  const onSubmit = () => {
    const { phone, code } = formData
    if (phone && code) {
      userStore.login(formData);
    }
  };
</script>

<style scoped lang="scss">
  .login {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-image: url('../../assets/images/login_bg.png');
    background-size: 100% 100%;

    .logo {
      width: 171px;
      height: 36px;
      position: fixed;
      top: 34px;
      right: 40px;
    }

    .header_content {
      text-align: center;
      margin-top: 184px;
      margin-bottom: 126px;
      .title {
        font-family: Microsoft YaHei;
        font-weight: bold;
        font-size: 68px;
        color: #FFFFFF;
        line-height: 89px;
      }

      .sub_title {
        font-size: 32px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 89px;
      }
    }

    .form_content {
      background-color: #FFFFFF;
      margin: 0 50px;
      padding: 0 20px;
      border-radius: 50px 50px 0 0;
      .lable {
        height: 28px;
        font-size: 30px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #020000;
        margin-top: 90px;
        margin-bottom: 28px;
        margin-left: 26px;
      }
      .form-item {
        background-image: url('../../assets/images/input_bg.png');
        background-size: 100% 100%;
        // width: 100%;
        height: 101px;
        display: flex;
        align-items: center;
        margin-bottom: 18px;
        padding-left: 41px;
        padding-right: 10px;
        .prefix {
          font-size: 30px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #020000;
          margin-right: 12px;
        }
        input {
          border: none;
          background:rgba(255,255,255,0.01);
          flex: 1;
          color: #020000;
          font-weight: 500;
        }

        .code_btn {
          width: 240px;
          // padding: 0 16px;
          height: 80px;
          line-height: 80px;
          text-align: center;
          font-size: 26px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #FFFFFF;
          background-image: url('../../assets/images/code_btn_bg.png');
          background-size: 100% 100%;
        }
      }
      .betwen {
        justify-content: space-between;
        
      }
    }
    
    .login_btn {
      width: 612px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      background-image: url('../../assets/images/login_btn-bg.png');
      background-size: 100% 100%;
      // position: fixed;
      // left: 50%;
      // transform: translate(-50%);
      margin: 0 auto;
      margin-top: 106px;
      font-size: 26px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #FFFFFF;
    }
  }
</style>
