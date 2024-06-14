<template>
  <div class="empty-box">
    <img src="../../../../assets/img/library/preview/empty.png" alt="" />
    <div class="title">未完成学习，无法查看分段</div>
  </div>
</template>
<script setup>
</script>
<style lang="less" scoped>
.empty-box {
  padding-top: 148px;
  width: 100%;
  height: calc(100% - 20px);
  background: #f2f4f7;
  text-align: center;
  img {
    width: 200px;
    height: 200px;
  }
  .title {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    color: #262626;
  }
}
</style>
