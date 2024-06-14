<style lang="less" scoped>
.message-list-wrapper {
  width: 100%;
  height: 100%;
}

.scroll-box {
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.message-list {
  .message-item {
    display: flex;
    margin-top: 24px;

    .user-avatar,
    .robot-avatar {
      display: block;
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    .itme-left {
      margin-right: 8px;
    }

    .itme-right {
      flex: 1;
    }
  }

  .user-message {
    .item-body {
      padding: 5px 0;
    }

    .message-content {
      line-height: 22px;
      font-size: 14px;
      font-weight: 400;
      color: #3a4559;
    }
  }

  .robot-message {
    .item-body {
      padding: 12px 16px;
      border-radius: 8px;
      background-color: #fff;
    }

    .message-content {
      line-height: 22px;
      font-size: 14px;
      font-weight: 400;
      color: #3a4559;
    }
  }

  .message-menus {
    .menu-item {
      line-height: 22px;
      padding: 8px 16px;
      margin-top: 8px;
      font-size: 14px;
      border-radius: 4px;
      color: rgb(22, 71, 153);
      background: #f2f4f7;
      cursor: pointer;
    }
  }

  .quote-file-box {
    padding-top: 12px;
    margin-top: 12px;
    border-top: 1px solid #edeff2;

    .quote-file-label {
      line-height: 22px;
      font-size: 14px;
      font-weight: 400;
      color: #7a8699;
    }

    .file-items {
      .file-item {
        line-height: 22px;
        margin-top: 8px;
        font-size: 14px;
        font-size: 14px;
        cursor: pointer;
      }

      .file-name {
        color: #164799;
      }
    }
  }
}
</style>

<template>
  <div class="message-list-wrapper">
    <div class="scroll-box" ref="scrollBoxRef" @scroll="onScroll">
      <div class="message-list">
        <template v-for="item in props.messages" :key="item.uid">
          <!-- 用户的消息 -->
          <div class="message-item user-message" :id="'msg-' + item.uid" v-if="item.is_customer == 1">
            <div class="itme-left">
              <img class="user-avatar" :src="item.avatar" />
            </div>
            <div class="itme-right">
              <div class="item-body">
                <div class="message-content">{{ item.content }}</div>
              </div>
            </div>
          </div>
          <!-- 机器人的消息 -->
          <div class="message-item robot-message" :id="'msg-' + item.uid" v-else>
            <div class="itme-left">
              <a-spin size="small" :spinning="item.loading">
                <img class="robot-avatar" :src="item.robot_avatar" />
              </a-spin>
            </div>

            <div class="itme-right">
              <div class="item-body">
                <template v-if="item.msg_type == 1">
                  <div class="message-content">{{ item.content }}</div>
                </template>

                <template v-if="item.msg_type == 2">
                  <div class="message-content">{{ item.menu_json.content }}</div>
                  <div class="message-menus">
                    <div class="menu-item" @click="onClickMeun(item)" v-for="(item, index) in item.menu_json.question"
                      :key="index">
                      {{ item }}
                    </div>
                  </div>
                </template>

                <div class="quote-file-box" v-if="item.quote_file && item.quote_file.length">
                  <div class="quote-file-label">
                    <span>答案来源 </span>
                    <a-tooltip placement="top" :overlayInnerStyle="{ width: '400px' }">
                      <template #title>
                        <span>您可以修改相应文档并重新上传，以调整机器人的回答效果。答案来源仅后台测试时可见。</span>
                      </template>
                      <QuestionCircleOutlined />
                    </a-tooltip>
                  </div>

                  <div class="file-items">
                    <div class="file-item" v-for="file in item.quote_file" :key="file.id">
                      <router-link class="file-name"
                        :to="{ name: 'libraryDetails', query: { id: file.library_id } }"><span>{{
                          file.file_name }}</span></router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'

const emit = defineEmits(['clickMsgMeun', 'scroll', 'scrollStart', 'scrollEnd'])

const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  }
})

const onClickMeun = (item) => {
  emit('clickMsgMeun', item)
}

const scrollBoxRef = ref(null)
const scrollOption = {
  scrollTop: 0,
  scrollHeight: 0,
  clientHeight: 0,
  scrollStartDiff: 60,
  scrollEndDiff: 60
}

let scrollEventTimer = null
let onScrollEventLock = false

function onScroll(e) {
  if (onScrollEventLock) {
    return
  }

  if (scrollEventTimer) {
    clearTimeout(scrollEventTimer)
    scrollEventTimer = null
  }

  scrollEventTimer = setTimeout(() => {
    scrollOption.scrollTop = e.target.scrollTop
    scrollOption.scrollHeight = e.target.scrollHeight
    scrollOption.clientHeight = e.target.clientHeight

    emit('scroll', { ...scrollOption })

    let isAtTop = Math.abs(scrollOption.scrollTop) <= scrollOption.scrollStartDiff

    if (isAtTop) {
      onScrollStart()
    }

    let isAtBottom =
      Math.abs(scrollOption.scrollHeight - scrollOption.scrollTop - scrollOption.clientHeight) <=
      scrollOption.scrollEndDiff

    if (isAtBottom) {
      onScrollEnd()
    }
  }, 50)
}

function onScrollStart() {
  // 如果消息列表为空可能是断线重连等逻辑手动清空了消息列表造成的抖动，此时不触发事件
  if (props.messages.length == 0) {
    return
  }
  emit('scrollStart', {
    msg: props.messages[0]
  })
}

function onScrollEnd() {
  // 如果消息列表为空可能是断线重连等逻辑手动清空了消息列表造成的抖动，此时不触发事件
  if (props.messages.length == 0) {
    return
  }

  emit('scrollEnd', {
    msg: props.messages[props.messages.length - 1]
  })
}

const scrollToBottom = () => {
  if (!scrollBoxRef.value) {
    return
  }

  nextTick(() => {
    // 手动控制滚动到底部不触发触底事件
    onScrollEventLock = true

    scrollBoxRef.value.scrollTop = scrollBoxRef.value.scrollHeight + 1

    setTimeout(() => {
      onScrollEventLock = false
    }, 50)
  })
}

function scrollToMessage(id, direction) {
  nextTick(() => {
    // 手动控制滚动到底部不触发触底事件
    onScrollEventLock = true

    if (!direction) {
      direction = 'top'
    }

    let scroller = scrollBoxRef.value
    let element = document.querySelector('#msg-' + id)

    if (direction == 'top') {
      scroller.scrollTop = element.offsetTop
    } else {
      scroller.scrollTop = element.offsetTop - scroller.clientHeight + element.clientHeight
    }

    setTimeout(() => {
      onScrollEventLock = false
    }, 50)
  })
}

defineExpose({
  scrollToBottom,
  scrollToMessage
})
</script>
