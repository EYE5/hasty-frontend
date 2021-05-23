<template>
  <div>
    <div class="page-container">
      <Loader v-if="loading" size="150px" />
      <router-view v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useController } from "@vueent/core";

import AppController from "./app";
import Loader from "@/components/reusable/global-loader.vue";

function setup() {
  const controller = useController(AppController);

  const loading = computed(() => controller.isLoading);

  return { loading };
}

export default defineComponent({ setup, components: { Loader } });
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}

.header-container {
  display: flex;
  height: 10vh;

  flex-direction: row;
}

.page-container {
  display: flex;
  height: 90vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.input-container {
  margin: 5px 0;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.sm-text {
  font-size: 14px;
}

.ml-15 {
  margin-left: 15px;
}

.mb-15 {
  margin-bottom: 15px;
}

.space-between {
  justify-content: space-between;
}

.form {
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 600px;
  max-height: 400px;
}

.alert {
  max-width: 300px;
  box-sizing: border-box;
}

.empty {
  display: flex;
  flex-direction: column;
}
</style>
