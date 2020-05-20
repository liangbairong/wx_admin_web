<template>
  <div>
    <el-form :inline="true" :model="form" size="small">
      <el-form-item label="书名">
        <el-input v-model="form.bookName" placeholder="搜索书名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="search">查询</el-button>
        <el-button type="primary" @click="add">导入书籍</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border>
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
            @click.native.prevent="update(scope.row)"
            :loading="operateLoading"
            type="text"
            size="small"
          >更新</el-button>
          <el-button
            @click.native.prevent="directory(scope.row)"
            :loading="directoryLoading"
            type="text"
            size="small"
          >目录</el-button>
           <el-button
            @click.native.prevent="deleteRow(scope.row)"
            :loading="directoryLoading"
            type="text"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" @currentChange="currentChange"></pagination>
    <add-book ref="addBook"></add-book>

    <el-dialog title="目录" :visible.sync="dialogVisible" width="60%">
      <el-table :data="directoryData" border>
        <el-table-column prop="directoryTitle" label="章节"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="look(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog :title="bookContentData.directoryTitle" :visible.sync="contentDialogVisible" width="60%">
       <div v-html="bookContentData.bookContent" class="book-content"></div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@/components/public/pagination";
import AddBook from "./components/addBook";
export default {
  name: "bookList", //不设名字 就不缓存
  data() {
    return {
      tableData: [],
      form: {
        bookName: "",
        currentPage: 1,
        limit: 10
      },
      total: 0,
      loading: false,
      operateLoading: false,
      directoryLoading: false,
      dialogVisible: false,
      directoryData: [],

      contentDialogVisible:false,
      bookContentData: {}
    };
  },
  components: {
    "add-book": AddBook,
    pagination
  },
  computed: {},
  created() {
    this.getList();
  },
  methods: {
    getList() {
      console.log(1);
      this.loading = true;
      this.tableData = [];
      this.$api.book.list(this.form).then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.total = res.total;
        }
        this.loading = false;
      });
    },
    search() {
      this.form.currentPage = 1;
      this.total = 0;
      this.getList();
    },
    currentChange(page) {
      this.form.currentPage = page;
      this.getList();
    },
    add() {
      this.$refs.addBook.show();
    },
    update(data) {
      this.operateLoading = true;
      this.$api.reptileBook.addBookDiretory(data).then(res => {
        if (res.code == 200) {
          this.$message.success("小说更新更新中，请过段时间再来查看");
        }
        this.operateLoading = false;
      });
    },
    directory(data) {
      this.directoryLoading = true;
      this.$api.book.directory({ bookId: data.bookId }).then(res => {
        if (res.code == 200) {
          this.dialogVisible = true;
          this.directoryData = res.data;
        }
        this.directoryLoading = false;
      });
    },
    deleteRow(data) {
      this.$api.book.deleteBook({ bookId: data.bookId }).then(res => {
        if (res.code == 200) {

        }
      });
    },
    look(data) {
      this.$api.book.content({ directoryId: data.directoryId }).then(res => {
        if (res.code == 200) {
          this.bookContentData = res.data;
          this.contentDialogVisible=true;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.book-img {
  width: 60px;
  height: 80px;
}
.book-content{
  line-height: 30px;
}
</style>