<style lang="less" scoped>
.chat-page {
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #f0f2f5;

  .chat-page-body {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;

    .messages-list-wrap {
      flex: 1;
      overflow: hidden;
    }
  }
  .technical-support-text{
    line-height: 20px;
    padding-bottom: 4px;
    font-size: 12px;
    color: #bfbfbf;
    text-align: center
  }
}
</style>

<template>
  <div class="chat-page">
    <div class="chat-page-header">
      <CuNavbar :title="externalConfigH5.pageTitle" :background-color="externalConfigH5.pageStyle.navbarBackgroundColor" v-if="externalConfigH5.navbarShow == 1" />
    </div>
    <div class="chat-page-body">
      <div class="messages-list-wrap">
        <MessageList
          ref="messageListRef"
          :messages="messageList"
          @scrollStart="onScrollStart"
          @scrollEnd="onScrollEnd"
        >
          <template v-for="item in messageList" :key="item.uid">
            <MessageItem :msg="item" @sendTextMessage="sendTextMessage" />
          </template>
        </MessageList>
      </div>
    </div>
    <div class="chat-page-footer">
      <MessageInput v-model:value="message" @send="onSendMesage" :loading="sendLock" />
      <div class="technical-support-text">由chatwiki提供软件支持</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { showToast } from 'vant'
import { storeToRefs } from 'pinia'
import { useEventBus } from '@/hooks/event/useEventBus'
import { useChatStore } from '@/stores/modules/chat'
import CuNavbar from '@/components/cu-navbar/index.vue'
import MessageInput from './components/message-input.vue'
import MessageList from './components/messages/message-list.vue'
import MessageItem from './components/messages/message-item.vue'

type MessageListComponent = {  
  scrollToMessage: (id: number | string) => void;
  scrollToBottom: () => void;   
};  

const emitter = useEventBus()
const chatStore = useChatStore()

const { sendMessage, onGetChatMessage, $reset } = chatStore

const { messageList, sendLock, externalConfigH5 } = storeToRefs(chatStore)

// 允许滚动到底部
let isAllowedScrollToBottom = true
const messageListRef = ref<null | MessageListComponent>(null);  

const scrollToMessageById = (id: number | string) => {
  if (messageListRef.value) {
    messageListRef.value.scrollToMessage(id)
  }
}

const handleMessageListScrollToBottom = () => {
  if (messageListRef.value && isAllowedScrollToBottom) {
    messageListRef.value.scrollToBottom()
  }
}

// 滚动到顶部
const onScrollStart = async () => {
  isAllowedScrollToBottom = false
  let msgId = messageList.value[0].uid

  let res = await onGetChatMessage()

  if (res) {
    scrollToMessageById(msgId)
  }
}

// 监听滚动到底部
const onScrollEnd = () => {
  // console.log('滚动到底部')
}

const init = async () => {
  isAllowedScrollToBottom = true

  let res = await onGetChatMessage()

  if (res) {
    handleMessageListScrollToBottom()
  }
}

// 发送消息
const message = ref('')

const sendTextMessage = (val: string) => {
  if (!val) {
    return showToast('请输入消息内容')
  }

  sendMessage({
    message: val
  })
}

const onSendMesage = async () => {
  if (!message.value) {
    return showToast('请输入消息内容')
  }

  isAllowedScrollToBottom = true

  sendTextMessage(message.value)

  message.value = ''
}

// 监听 updateAiMessage 触发消息列表滚动
const onUpdateAiMessage = () => {
  if (messageListRef.value) {
    handleMessageListScrollToBottom()
  }
}

onMounted(() => {
    init()

  // 获取对话记录
  // getMyChatList()

  // 监听 updateAiMessage 触发消息列表滚动
  emitter.on('updateAiMessage', onUpdateAiMessage)
})

onUnmounted(() => {
  $reset()
  emitter.off('updateAiMessage', onUpdateAiMessage)
})
</script>
