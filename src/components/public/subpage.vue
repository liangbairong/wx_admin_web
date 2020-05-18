<template>
  <transition name="el-zoom-in-top">
    <div class="subpage">
      <el-button @click="close" size="small" class="close">关闭</el-button>
      <slot/>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'subpage',
     data(){ 
       return{

       }
     },
     methods:{
       close(){
         this.$emit('close')
       }
     }
  }
</script>
<style lang="scss" scoped>
.close{
  position: absolute;
  right: 20px;top: 20px;
}
</style>