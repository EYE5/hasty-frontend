<template>
  <div class="page-container">
    <it-alert
      v-if="Boolean(alert)"
      :type="alert.type"
      :title="alert.title"
      :body="alert.body"
      class="alert mb-15"
    />
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
          type="password"
          placeholder="Введите пароль"
          :status="item.v.c.password.dirtyMessage ? 'danger' : undefined"
          :message="item.v.c.password.dirtyMessage"
        />
      </div>
      <div class="input-container row space-between">
        <it-button type="primary">Войти</it-button>
        <router-link class="sm-text ml-15" to="/register">
          Регистрация
        </router-link>
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

  const alert = computed(() => controller.alert);

  const login = controller.login.bind(controller);

  return { item, login, alert };
}

export default defineComponent({ setup });
</script>
