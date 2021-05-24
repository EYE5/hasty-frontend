<template>
  <div>
    <div v-if="authenticated" class="header-container">
      <div class="header-item">Чаты</div>
      <div class="header-item-right">
        <it-dropdown clickable placement="bottom-right">
          <it-icon name="more_vert" />
          <template v-slot:menu>
            <it-dropdown-menu>
              <it-dropdown-item @click="logout">Выйти</it-dropdown-item>
            </it-dropdown-menu>
          </template>
        </it-dropdown>
      </div>
    </div>

    <div :class="!authenticated ? 'page-container' : ''">
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

  const authenticated = computed(() => controller.authenticated);

  const logout = controller.logout.bind(controller);

  return { loading, authenticated, logout };
}

export default defineComponent({ setup, components: { Loader } });
</script>

<style>
:root {
  --main-shadow: 2px 2px 4px 0px rgba(34, 60, 80, 0.2);
  --main-bg-color: #2c3e50;
  --second-bg-color: #1c2833;
}

body {
  margin: 0;
  background: var(--main-bg-color);
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}

.header-top {
  display: flex;
  height: 6vh;
  max-width: 630px;
  min-width: 320px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}

.header-container {
  display: flex;
  height: 6vh;
  max-width: 585px;
  min-width: 320px;
  padding: 0 10px 0 10px;

  margin: 5px;
  border-radius: 15px;
  align-items: center;
  flex-direction: row;
  background-color: var(--second-bg-color);
  box-shadow: var(--main-shadow);
  color: #ffffff;
}

.header-item-right {
  margin-left: auto;
  cursor: pointer;
}

.current-item-header {
  display: flex;
  height: 6vh;

  min-width: 320px;
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
  flex-basis: 320px;
}

.page-container {
  display: flex;

  width: 100%;
  height: 94vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.main-container {
  display: flex;
  height: 94vh;
  flex-direction: row;
}

.messenger-container {
  display: none;
  height: 94vh;
  width: 100%;

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

.chat-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start !important;
}

.chat {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start !important;
}

@media screen and (min-width: 630px) {
  .messenger-container {
    display: flex;
  }
  .chat-list {
    min-width: 630px;
    max-width: 630px;
  }
}

@media screen and (max-width: 630px) {
}
</style>
