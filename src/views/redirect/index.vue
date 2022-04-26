<template></template>

<script lang="ts">
import { defineComponent, render } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  created() {
    const { params, query } = useRoute();
    const { path } = params;
    useRouter()
      .replace({ path: "/" + path, query })
      .catch((err:any) => {
        console.warn("redirect", err);
      });
  },
  render() {},
});
</script>
<style scoped></style>
