<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button class="ant-btn ant-btn-primary" @click="$router.go(-1)">Back Previous Page</a-button>
    </template>
  </a-result>
</template>
