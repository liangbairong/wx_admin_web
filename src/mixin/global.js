/*
 * @Author: 王益
 * @Date: 2019-01-23 10:26:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-05 15:46:26
 * @Description: 自定义minxin，在项目全局注入公共的方法、data等，具体参考vue官方文档
 */
// import Vue from 'vue';

// // 引入全局eventBus实例$bus
// const $bus = new Vue();
export default {
  methods: { 
    /**
     * @author: 梁栢荣
     * @description: 生成时间戳
     * @param  无
     * @return: 19827747377737 随机数字
     * @example：
     * this.$timeStamp()
     */
    $timeStamp() {
      const data = new Date().getTime();
      return data;
    },
  }
};
