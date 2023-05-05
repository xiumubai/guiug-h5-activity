import { loginPassword } from '/@/api';
import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';
import router from '/@/router';
const { VITE_TOKEN_KEY } = import.meta.env;
const token = useCookies().get(VITE_TOKEN_KEY as string);

interface StoreUser {
  token: string;
  info: Record<any, any>;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): StoreUser => ({
    token: token,
    info: {},
  }),
  getters: {
    getUserInfo(): any {
      return this.info || {};
    },
  },
  actions: {
    setInfo(info: any) {
      this.info = info ? info : '';
    },
    setToken(token) {
      this.token = token ? token : ''
    },
    async login(info) {
      const res:any = await loginPassword(info);
      console.log(res);
      
      if (res.status === 200) {
        console.log(2);
        
        this.setToken(res.body['x-access-token'])
        this.setInfo(res.body.name)
        router.push({ path: '/home' });
      }
    },
  },
  persist: true
});
// export const useUserStore = defineStore('app-user', () => {
//   const Token = ref(token);
//   const info = ref<Record<any, any>>({});
//   const setInfo = (info: any) => {
//     info.value = info ? info : '';
//   };
//   const getUserInfo = () => {
//     return info || {};
//   };
//   const login = () => {
//     return new Promise((resolve) => {
//       const { data } = loginPassword();
//       watch(data, () => {
//         setInfo(data.value);
//         // useCookies().set(VITE_TOKEN_KEY as string, data.value.token);
//         resolve(data.value);
//       });
//     });
//   };
//   return {
//     Token,
//     info,
//     setInfo,
//     login,
//     getUserInfo,
//   };
// });
