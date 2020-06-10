
import http from './http'
import {
  myLocalStorage
} from '@/uilts/uilts'

const ROOT=process.env.VUE_APP_ROOT
export default {
  common:{
    login(param) {
      return http({
        url:  ROOT + '/admin/user/login',
        method: "post",
        data:{
         ...param,
        }
      })
    }, 
    logout(param){
      return http({
        url: ROOT + '/admin/user/logout',
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
        url:  ROOT + '/admin/user/get',
        method: "get",
        data:{
         ...param,
        }
      })
    },
    updateUserInfo(param) {
      return http({
        url: ROOT + '/admin/user/update',
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
        url:  ROOT + '/common/book/list',
        data:param
      })
    },
    directory(param){
      return http({
        url:  ROOT + '/common/book/directory',
        data:param
      })
    },
    content(param){
      return http({
        url:  ROOT + '/common/book/content',
        data:param
      })
    },
    deleteBook(param){
      return http({
        url:  ROOT + '/common/book/deleteBook',
        method: "post",
        data:param
      })
    },
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