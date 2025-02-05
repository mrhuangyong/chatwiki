<style lang="less" scoped>
.message-item {
  display: flex;
  margin: 24px 12px;

  .message-item-body {
    flex: 1;
    padding-left: 8px;
  }

  .avatar {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  }

  .message-content {
    margin-right: 40px;
  }

  .text-message {
    position: relative;
    display: inline-block;
    padding: 12px;
    font-size: 14px;
    min-height: 20px;
    line-height: 20px;
    text-align: left;
    font-weight: 400;
    white-space: pre-wrap;
    word-break: break-all;
    &::before {
      display: inline-block;
      content: '&';
      text-indent: -9999px;
    }
  }

  &.robot-message-item {
    .text-message {
      color: #1a1a1a;
      background-color: #edeff2;
      border-radius: 4px 16px 16px 16px;
    }
  }

  &.user-message-item {
    flex-direction: row-reverse;

    .message-item-body {
      text-align: right;
      padding-left: 0;
      padding-right: 8px;
    }

    .message-content {
      margin-left: 40px;
      margin-right: 0;
    }

    .text-message {
      border-radius: 16px 4px 16px 16px;
      color: #f5f9ff;
      background-color: #2475fc;
    }
  }

  &.welcome-message-item{
    .text-message{
      width: 100%;
      border-radius: 4px 16px 0 0;
    }
  }

  .question-list {
    border: 1px solid #edeff2;
    border-radius: 0 0 16px 16px;
    background-color: #fff;
    .question-item {
      line-height: 20px;
      padding: 6px 12px;
      font-size: 14px;
      font-weight: 400;
      border-bottom: 1px solid #edeff2;
      color: #164799;

      &:last-child{
        border-bottom: 0;
      }
    }
  }
}
</style>

<template>
  <div class="message-item" :class="messageItemClasses" :id="'msg-' + msg.uid">
    <div class="message-item-left">
      <img class="avatar" :src="props.msg.avatar" />
    </div>
    <div class="message-item-body">
      <div class="message-content">
        <template v-if="props.msg.msg_type == 1">
          <div class="text-message"  v-html="escapeHTML(props.msg.content)">
          </div>
          <div class="question-list" v-if="props.msg.menu_json && props.msg.menu_json.question.length">
            <div class="question-item" @click="sendTextMessage(item)" v-for="(item, index) in props.msg.menu_json.question"
              :key="index">
              {{ item }}
            </div>
          </div>
        </template>

        <template v-else-if="props.msg.msg_type == 2">
          <div class="text-message" v-html="escapeHTML(props.msg.menu_json.content)">
          </div>
          <div
            class="question-list"
            v-if="props.msg.menu_json && props.msg.menu_json.question.length"
          >
            <div
              class="question-item"
              v-for="item in props.msg.menu_json.question"
              :key="item"
              @click="sendTextMessage(item)"
            >
              <span>{{ item }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Message } from '@/stores/modules/chat'
import { escapeHTML } from '@/utils/index'

const emit = defineEmits(['sendTextMessage'])

const props = defineProps({
  msg: {
    type: Object as () => Message,
    required: true
  }
})

// 检查是否为用户消息
const isCustomerMessage = computed(() => props.msg.is_customer == 1)

// 计算消息项的类
const messageItemClasses = computed(() => ({
  'user-message-item': isCustomerMessage.value === true,
  'robot-message-item': isCustomerMessage.value === false,
  'welcome-message-item': props.msg.menu_json && props.msg.menu_json.question
}))

const sendTextMessage = (text: string) => {
  emit('sendTextMessage', text)
}
</script>
