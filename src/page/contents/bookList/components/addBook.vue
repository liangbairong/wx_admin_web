<template>
  <subpage v-if="isShow" @close='close'>
    <el-form :inline="true" :model="form" size="small">
      <el-form-item label="网站">
        <el-select v-model="form.bookSource" placeholder="请选择要爬的网站">
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="(item,i) in CONST.BOOK_TYPE_LIST"
            :key="i"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="书名">
        <el-input v-model="form.bookName" placeholder="搜索书名"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getList">爬虫查询</el-button>
      </el-form-item>
    </el-form>
    
     <el-table :data="tableData" max-height="350" border>
      <el-table-column fixed prop="bookId" label="id" width="150"></el-table-column>
      <el-table-column prop="bookName" label="书名" width="120"></el-table-column>
       <el-table-column label="封面" width="80">
        <template slot-scope="scope">
          <img :src="scope.row.bookImage" class="book-img" alt />
        </template>
      </el-table-column>
      <el-table-column label="简介">
        <template slot-scope="scope">
          <div v-html="scope.row.content"></div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click="add(scope.row)"
            type="text"
            size="small"
          >添加到数据库</el-button>
        </template>
      </el-table-column>
    </el-table>
  </subpage>
</template>

<script>
import subpage from "@/components/public/subpage";
import CONST from "../const";
export default {
  name: "addBook",
  data() {
    return {
      CONST,
      isShow: false,
      form: {
        bookName: "",
        bookSource: 1
      },
      total:0,
      tableData:[],
      loading:false,

    };
  },
  components: {
    subpage
  },
  methods: {
    show() {
      this.isShow = true;
      // this.getList();
    },
    close() {
      this.isShow = false;
    },
    getList() {
      console.log(1);
      this.loading=true;
      this.$api.reptileBook.search(this.form).then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.total=res.total;
        }
        this.loading=false;
      });
    },
    search(){

    },
    add(item){
        this.$api.reptileBook.addBookList({book:item}).then(res => {
        if (res.code == 200) {
         
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.book-img {
  width: 60px;
  height: 100px;
}
</style>