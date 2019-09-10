<template>
  <div class="filelabrary" @contextmenu.prevent  = "menu" @click= "menu">
    <filelibrary ref="menucom"></filelibrary>
  </div>
</template>
<script>
export default {
  name: "index",
  components: {
    filelibrary: resolve =>
      require(["../../components/MediaLibrary/FileLibrary"], resolve)
  },
  methods: {
    menu() {
      this.$refs.menucom.closenumu();
    }
  }
};
</script>
<style lang="less" scoped>
.filelabrary {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>


