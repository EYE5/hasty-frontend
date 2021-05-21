<template>
  <LoginForm />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import LoginForm from "@/components/forms/login.vue";

function setup() {
  return {};
}

export default defineComponent({ setup, components: { LoginForm } });
</script>

<style></style>
