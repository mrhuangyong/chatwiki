<style lang="less" scoped>
.ignore-message-item {
  display: flex;
  margin: 24px 12px;

  .message-item-body {
    flex: 1;
    padding-left: 10px;
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
    position: relative;
    display: inline-block;
    padding: 8px 12px;
    margin-right: 52px;
    margin-top: 2px;
    border-radius: 8px;
    background-color: #fff;
    white-space: pre-wrap;
    word-break: break-all;

    .triangle {
      position: absolute;
      top: 12px;
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: 6px solid white;
    }
  }

  .text-message {
    min-height: 20px;
    line-height: 20px;
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    color: rgb(26, 26, 26);
  }

  .question-list {
    padding-bottom: 4px;

    .question-item {
      cursor: pointer;
      line-height: 20px;
      padding: 6px 12px;
      margin-top: 8px;
      font-size: 14px;
      font-weight: 400;
      border-radius: 4px;
      color: #164799;
      background-color: #e6efff;
    }
  }

  &.robot-message-item {
    .triangle {
      left: -6px;
    }
  }

  &.user-message-item {
    flex-direction: row-reverse;

    .message-item-body {
      text-align: right;
      padding-left: 0;
      padding-right: 10px;
    }

    .message-content {
      margin-left: 52px;
      margin-right: 0;
    }

    .triangle {
      right: -6px;
      transform: rotate(180deg);
    }
  }
}
</style>

<template>
  <div class="ignore-message-item" :class="messageItemClasses" :id="'msg-' + msg.uid">
    <div class="message-item-left">
      <img class="avatar" :src="props.msg.avatar" />
    </div>
    <div class="message-item-body">
      <div class="message-content">
        <span class="triangle"></span>
        <template v-if="props.msg.msg_type == 1">
          <div class="text-message" v-html="escapeHTML(props.msg.content)">
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
            <div class="question-item" v-for="item in props.msg.menu_json.question" :key="item" @click="sendTextMessage(item)">
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
