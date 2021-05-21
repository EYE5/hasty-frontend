<template>
  <el-card class="form" shadow="never">
    <el-form>
      <el-form-item label="Логин">
        <el-input
          placeholder="Пожалуйста введите логин"
          v-model="form.username"
        />
      </el-form-item>
      <el-form-item label="Пароль">
        <el-input
          placeholder="Пожалуйста введите пароль"
          v-model="form.password"
          show-password
        />
      </el-form-item>
      <el-form-item label="Пароль еще раз">
        <el-input
          placeholder="Повторно введите пароль"
          v-model="form.passwordAgain"
          show-password
        />
      </el-form-item>
      <el-row type="flex" justify="center" :gutter="20" class="row-bg">
        <el-col :span="14">
          <el-form-item>
            <el-button type="primary"> Зарегестрироваться </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <router-link to="/login">Войти</router-link>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

function setup() {
  const form = reactive({ username: "", password: "", passwordAgain: "" });
  return { form };
}

export default defineComponent({ setup });
</script>

<style></style>
