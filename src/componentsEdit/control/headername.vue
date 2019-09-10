<template>
  <div class="headername">{{dataInfo.content}}</div>
</template>
<script>
export default {
  name: "headername",
  props: ["dataInfo"]
};
</script>
<style lang="less" scoped>
.headername {
    font-size: 14px;
    text-align: left;
    padding-left: 15px;
}
</style>

