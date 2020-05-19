
import http from './http'
import {
  myLocalStorage
} from '@/uilts/uilts'

const ROOT=process.env.VUE_APP_ROOT
export default {
  common:{
    login(param) {
      return http({
        url:  ROOT + '/common/login',
        method: "post",
        data:{
         ...param,
        }
      })
    }, 
    logout(param){
      return http({
        url: ROOT + '/common/logout',
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
        url:  ROOT + '/user/get',
        method: "get",
        data:{
         ...param,
        }
      })
    },
    updateUserInfo(param) {
      return http({
        url: ROOT + '/user/update',
        method: "post",
        data:{
         ...param,
        }
      })
    },
  },
  book:{
    list(param){
      return http({
        url:  ROOT + '/book/list',
        data:param
      })
    },
    directory(param){
      return http({
        url:  ROOT + '/book/directory',
        data:param
      })
    }
  },
  reptileBook:{
    search(param){
      return http({
        url:  ROOT + '/reptileBook/search',
        data:param
      })
    },
    addBookList(param){
      return http({
        url: ROOT + '/reptileBook/addBookList',
        method: "post",
        data:param
      })
    },
    addBookDiretory(param){
      return http({
        url: ROOT + '/reptileBook/addBookDiretory',
        method: "post",
        data:param
      })
    }
    
  }
 
 
}