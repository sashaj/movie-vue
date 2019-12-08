<template>
  <div>
    <h2>Something went wrong</h2>
    <span>An error has occured</span>
    <router-link to="/">Take me home</router-link>
  </div>
</template>

<script>
export default {
  name: "errorPage"
};
</script>

<style scoped>
span {
  justify-content: center;
}
</style>