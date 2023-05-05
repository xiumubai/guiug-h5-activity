<template>
  <div class="login">
    <h2>登录</h2>
    <van-form @submit="onSubmit">
      <van-field 
        v-model="formData.phone"
        type="tel"
        clearable
        name="phone"
        :rules="userTel"
        placeholder="请输入手机号" />
      <van-field
        v-model="formData.code"
        center
        clearable
        name="code"
        placeholder="请输入短信验证码"
        type="digit"
        >
        <template #button>
          <van-button
            type="primary"
            @click="sendCode"
            :disabled="disabled"
          >
            {{codeMsg}}
          </van-button>
        </template>
      </van-field>
      <div style="margin: 0.4267rem;">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          >登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts" setup name="LoginPage">

  import { reactive, ref } from 'vue';
  
  import { getValidateCode } from '/@/api';
  import { showFailToast } from 'vant';
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
      validator: value => {
        return /^1[23456789]\d{9}$/.test(value);
      },
      message: "请输入正确格式的手机号"
    }
  ])
  const codeMsg =  ref("获取短信验证码")
  const codeNum = ref(60)
  const disabled = ref(false)
  const codeRes = ref()

  // 获取短信验证码
  const sendCode = async () => {
    // 验证手机号格式是否正确
    if (!userTel[1].validator(formData.phone)) {
      showFailToast('请输入正确格式的手机号');
      return;
    };

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
  const onSubmit = (values) => {
    const { phone, code } = values

    if (codeRes.value !== code) {
      showFailToast('验证码不正确');
      return
    }
    if (phone && code) {
      userStore.login(formData);
    }
  };
</script>

<style scoped lang="scss">
  .login {
    // padding: 20px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    h2 {
      text-align: center;
      letter-spacing: 10px;
      padding: 10px 0;
    }
    .van-form {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
    }
  }
</style>
