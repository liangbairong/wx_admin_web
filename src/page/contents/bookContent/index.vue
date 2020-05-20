<template>
  <div>
    <div v-html="bookData.bookContent"></div>
  </div>
</template>

<script>
export default {
  name: "bookContent",
  data() {
    return {
      directoryId: "",
      bookData: {}
    };
  },
  created() {
    this.directoryId = this.$route.query.directoryId;
    this.getContent();
  },
  methods: {
    getContent() {
      this.$api.book.content({ directoryId: this.directoryId }).then(res => {
        if (res.code == 200) {
          this.bookData = res.data;
        }
      });
    }
  }
};
</script>