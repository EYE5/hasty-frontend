<template>
  <div class="page-container">
    <form class="form" @submit.prevent="login">
      <div class="input-container">
        <it-input
          v-model="item.data.username"
          label-top="Имя пользователя"
          placeholder="Введите имя пользователя"
          :status="item.v.c.username.dirtyMessage ? 'danger' : undefined"
          :message="item.v.c.username.dirtyMessage"
        />
      </div>
      <div class="input-container">
        <it-input
          v-model="item.data.password"
          label-top="Пароль"
          placeholder="Введите пароль"
          :status="item.v.c.password.dirtyMessage ? 'danger' : undefined"
          :message="item.v.c.password.dirtyMessage"
        />
      </div>
      <div class="input-container">
        <it-button type="primary">Войти</it-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import { useController } from "@vueent/core";

import LoginController from "./login";

function setup() {
  const controller = useController(LoginController);

  const item = computed(() => controller.item);
  const loading = computed(() => controller.loading);

  const login = controller.login.bind(controller);

  return { item, loading, login };
}

export default defineComponent({ setup });
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  max-height: 400px;
}
</style>
