<style lang="less" scoped>
.chat-page {
  display: flex;
  justify-content: space-between;
  height: 100%;

  .page-body {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    max-width: 46.6%;
    height: 100%;
    overflow: hidden;

    .chat-box-body {
      flex: 1;
      overflow: hidden;
    }
  }
  .page-left,
  .page-right {
    width: 280px;
    height: 100%;
    border-radius: 8px;
    background-color: #fafafa;
    box-shadow: 0 2px 16px 0 rgba(14, 27, 58, 0.16);
  }

  .page-left {
    display: flex;
    flex-flow: column nowrap;
    padding: 24px 0;

    .page-left-top,
    .page-left-footer {
      padding: 0 24px;
    }

    .page-left-body {
      flex: 1;
      overflow: hidden;
    }
  }
}

.page-right {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 24px;

  .prompt-tips {
    line-height: 22px;
    padding: 16px;
    font-size: 14px;
    border-radius: 4px;
    color: #3a4559;
    background: #f2f4f7;
  }
  .prompt-form {
    margin-top: 24px;

    .prompt-form-label {
      line-height: 22px;
      margin-bottom: 8px;
      font-size: 14px;
      color: #262626;
    }
  }
}
</style>

<template>
  <div class="chat-page">
    <!-- left -->
    <div class="page-left">
      <div class="page-left-top">
        <a-button block @click="openNewChat"><PlusOutlined /> 新建对话</a-button>
      </div>
      <div class="page-left-body">
        <ChatList
          :list="myChatList"
          :active="openid"
          @openChat="handleOpenChat"
          @onScrollEnd="onChatListScrollEnd"
        />
      </div>
      <div class="page-left-footer">
        <a-button type="primary" block ghost @click="openNewChat"
          ><PlusOutlined /> 新建对话</a-button
        >
      </div>
    </div>
    <!-- body -->
    <div class="page-body">
      <div class="chat-box-body">
        <MessageList
          ref="messageListRef"
          :messages="messageList"
          @clickMsgMeun="onClickMsgMenu"
          @scrollStart="onScrollStart"
          @scrollEnd="onScrollEnd"
        />
      </div>

      <div style="margin-top: 30px" class="chat-box-footer">
        <MessageInput v-model:value="message" @send="onSendMesage" :loading="sendLock" />
      </div>
    </div>
    <!-- right -->
    <div class="page-right">
      <div class="page-right-body">
        <div class="prompt-tips">
          通过修改提示词可知识库可以优化机器人回答的效果。<span style="color: #ed744a"
            >测试时可以直接修改提示词，不用保存即可测试优化效果。提示词优化好之后再点击保存，才会对外生效</span
          >
        </div>

        <div class="prompt-form">
          <div class="prompt-form-label">提示词</div>
          <div clas="prompt-form-item">
            <a-textarea
              :value="robot.prompt"
              :auto-size="{ minRows: 10, maxRows: 10 }"
              placeholder="请输入内容"
              @input="handlePromptChange"
            ></a-textarea>
          </div>
        </div>
      </div>
      <div class="page-right-footer">
        <a-button type="primary" block @click="onSaveRobotPrompt">保存并应用</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEventBus } from '@/hooks/event/useEventBus'
import { useChatStore } from '@/stores/modules/chat'
import { PlusOutlined } from '@ant-design/icons-vue'
import { showErrorMsg, showSuccessMsg } from '@/utils/index'
import MessageList from '../components/message-list.vue'
import ChatList from './components/chat-list.vue'
import MessageInput from './components/message-input.vue'

const emitter = useEventBus()
const chatStore = useChatStore()

const message = ref('')
const messageListRef = ref(null)

const {
  createChat,
  sendMessage,
  getMyChatList,
  openChat,
  onGetChatMessage,
  changeRobotPrompt,
  saveRobotPrompt,
  $reset
} = chatStore
const { messageList, sendLock, myChatList, robot, openid } = storeToRefs(chatStore)

const route = useRoute()

const onSendMesage = async () => {
  if (!message.value) {
    return showErrorMsg('请输入消息内容')
  }

  isAllowedScrollToBottom = true

  sendMessage({
    message: message.value
  })

  message.value = ''
}

const openNewChat = async () => {
  message.value = ''

  let query = route.query || {}

  let data = {
    robot_key: query.robot_key,
    avatar: query.avatar,
    name: query.name,
    nickname: query.nickname,
    is_background: 1
  }

  isAllowedScrollToBottom = true

  await createChat(data)

  let res = await onGetChatMessage()

  if (res) {
    messageListScrollToBottom()
  }
}

const handleOpenChat = async (data) => {
  if (openid.value == data.openid) {
    return
  }

  isAllowedScrollToBottom = true

  let query = route.query || {}

  let params = {
    robot_key: query.robot_key,
    avatar: data.avatar,
    name: data.name,
    nickname: data.nickname,
    is_background: data.is_background,
    openid: data.openid
  }

  await openChat(params)

  let res = await onGetChatMessage()
  if (res) {
    messageListScrollToBottom()
  }
}

// 点击菜单
const onClickMsgMenu = (text) => {
  isAllowedScrollToBottom = true

  sendMessage({
    message: text
  })
}

// 提示词
const handlePromptChange = (e) => {
  changeRobotPrompt(e.currentTarget.value)
}

const onSaveRobotPrompt = async () => {
  await saveRobotPrompt()

  showSuccessMsg('保存成功')
}

// 监听 updateAiMessage 触发消息列表滚动
const onUpdateAiMessage = () => {
  if (messageListRef.value) {
    messageListRef.value.scrollToBottom()
  }
}

// 允许滚动到底部
let isAllowedScrollToBottom = true

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
  console.log('滚动到底部')
}

const messageListScrollToBottom = () => {
  if (messageListRef.value && isAllowedScrollToBottom) {
    messageListRef.value.scrollToBottom()
  }
}

const scrollToMessageById = (id) => {
  if (messageListRef.value) {
    messageListRef.value.scrollToMessage(id)
  }
}

// 监听 messageList 改变
const onMessageListChange = () => {
  if (!isAllowedScrollToBottom) {
    return
  }
}

// 加载会话记录(会话记录加载下一页)
const onChatListScrollEnd = () => {
  // 获取会话记录
  getMyChatList()
}

watch(
  () => messageList.value,
  () => {
    onMessageListChange()
  }
)

onMounted(() => {
  // 创建会话
  openNewChat()
  // 获取会话记录
  getMyChatList()

  // 监听 updateAiMessage 触发消息列表滚动
  emitter.on('updateAiMessage', onUpdateAiMessage)
})

onUnmounted(() => {
  $reset()
  emitter.off('updateAiMessage', onUpdateAiMessage)
})
</script>
