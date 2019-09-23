
import http from './http'
import {
  myLocalStorage
} from '@/uilts/uilts'

export default {
  common:{
    login(param) {
      return http({
        url:  process.env.VUE_APP_ROOT + '/common/login',
        method: "post",
        data:{
         ...param,
        }
      })
    }, 
    logout(param){
      return http({
        url:  process.env.VUE_APP_ROOT + '/common/logout',
        method: "post",
        data:{
         ...param,
        }
      })
    }
  },
  user:{
    getUserInfo(param) {
      return http({
        url:  process.env.VUE_APP_ROOT + '/needToken/user/getUserInfo',
        method: "get",
        data:{
         ...param,
        }
      })
    },
    updateUserInfo(param) {
      return http({
        url:  process.env.VUE_APP_ROOT + '/needToken/user/updateUserInfo',
        method: "post",
        data:{
         ...param,
        }
      })
    },
  }
 
 
}