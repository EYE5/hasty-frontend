<template>
  <div class="page-container">
    <div v-if="!items.length" class="empty">
      <it-icon name="info" color="#3051FF" size="20" />
      Чатов не найдено. Создайте новый!
    </div>
    <div v-else class="chat-list">
      <div v-for="item of items" :key="item.id" class="chat-list-item">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useController } from "@vueent/core";

import ChatsController from "./chats";

function setup() {
  const controller = useController(ChatsController);

  const items = computed(() => controller.items);
  const user = computed(() => controller.item);

  return { items, user };
}

export default defineComponent({ setup });
</script>

<style>
.chat-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start !important;
}
</style>
