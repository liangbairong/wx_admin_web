<template>
  <div class="pagination">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
      currentPage:1,
    };
  },
  props: {
    total: {
      type: Number,
      required: true,
      default:0,
    },
  },
  methods: {
    init(){
      this.currentPage=1;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$emit('currentChange', val)
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination{
  text-align: right;
  margin-bottom: 0;
}
</style>