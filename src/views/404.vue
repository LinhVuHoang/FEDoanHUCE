<template>
  <a-result status="404" title="404" sub-title="Xin lỗi, trang này không tồn tại!">
    <template #extra>
      <a-button class="ant-btn ant-btn-primary" @click="$router.go(-1)">Trở về trang trước</a-button>
    </template>
  </a-result>
</template>
