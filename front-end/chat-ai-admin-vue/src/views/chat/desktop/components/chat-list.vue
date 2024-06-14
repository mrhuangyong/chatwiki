<style lang="less" scoped>
.chat-list-box {
  height: 100%;
  padding: 15px 0;
  overflow: hidden;

  .chat-list-item {
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    padding: 0 24px;
    cursor: pointer;

    &:hover {
      background-color: #edeff2;
    }

    &.active {
      background-color: #edeff2;
      border: 1px solid #d8dde5;
    }
  }

  .chat-item-icon {
    margin-right: 8px;
    font-size: 16px;
    color: rgb(58, 69, 89);
  }

  .chat-item-title {
    flex: 1;
    font-size: 14px;
    color: rgb(58, 69, 89);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

<template>
  <div class="chat-list-box">
    <cu-scroll @onScrollEnd="onScrollEnd">
      <div class="">
        <div class="chat-list-item" :class="{ active: item.openid == props.active }" @click="handleOpenChat(item)"
          v-for="item in props.list" :key="item.id">
          <svg-icon class="chat-item-icon" name="message"></svg-icon>
          <span class="chat-item-title">{{ item.name || item.last_chat_message }}</span>
        </div>
      </div>
    </cu-scroll>
  </div>
</template>

<script setup>
import CuScroll from '@/components/cu-scroll/cu-scroll.vue'

const emit = defineEmits(['openChat', 'onScrollEnd'])

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  active: {
    type: String,
    default: ''
  }
})

const handleOpenChat = (item) => {
  emit('openChat', item)
}

const onScrollEnd = () => {
  emit('onScrollEnd')
}
</script>
