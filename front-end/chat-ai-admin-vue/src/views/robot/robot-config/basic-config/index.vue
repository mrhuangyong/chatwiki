<style lang="less" scoped>
.robot-config-page {
  height: 100%;
  width: 100%;
  padding: 24px 10px 24px 24px;
  overflow: hidden;
  background-color: #fff;

  .scroll-box {
    height: 100%;
    overflow-y: auto;
  }

  .setting-box {
    margin-bottom: 16px;
  }
}
</style>

<template>
  <div class="robot-config-page">
    <div class="scroll-box" ref="scrollBox">
      <div class="setting-box">
        <BasicConfig />
      </div>
      <div class="setting-box">
        <SystemPromptWords />
      </div>
      <div class="setting-box">
        <ModelSettings />
      </div>
      <div class="setting-box">
        <AssociatedKnowledgeBase />
      </div>
      <div class="setting-box">
        <WelcomeWords />
      </div>
      <div class="setting-box">
        <ChatMode />
      </div>
      <div class="setting-box">
        <UnknownProblemPrompt />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRaw, provide } from 'vue'
import { storeToRefs } from 'pinia'
import { message } from 'ant-design-vue'
import BasicConfig from './components/basic-config.vue'
import SystemPromptWords from './components/system-prompt-words.vue'
import ModelSettings from './components/model-settings.vue'
import AssociatedKnowledgeBase from './components/associated-knowledge-base/index.vue'
import WelcomeWords from './components/welcome-words.vue'
import UnknownProblemPrompt from './components/unknown-problem-prompt.vue'
import ChatMode from './components/chat-mode/index.vue'
import { saveRobot } from '@/api/robot/index'
import { useRobotStore } from '@/stores/modules/robot'

const robotStore = useRobotStore()

const scrollBox = ref(null)

const { robotInfo } = storeToRefs(robotStore)
const { getRobot } = robotStore

const scrollBoxToBottom = () => {
  scrollBox.value.scrollTop = scrollBox.value.scrollHeight
}

const saveLoading = ref(false)

// 基本配置
const formState = reactive(robotInfo.value)

const updateRobotInfo = (val) => {
  let newState = JSON.parse(JSON.stringify(val))
  Object.assign(formState, newState)

  saveForm()
}

provide('robotInfo', {
  robotInfo: formState,
  updateRobotInfo,
  scrollBoxToBottom
})

const saveForm = () => {
  let formData = JSON.parse(JSON.stringify(toRaw(formState)))
  let welcomes = formData.welcomes

  welcomes.question = welcomes.question.map((item) => {
    return item.content
  })

  formData.welcomes = JSON.stringify(welcomes)

  let unknown_question_prompt = formData.unknown_question_prompt

  unknown_question_prompt.question = unknown_question_prompt.question.map((item) => {
    return item.content
  })

  formData.unknown_question_prompt = JSON.stringify(unknown_question_prompt)

  delete formData.robot_avatar_url

  saveLoading.value = true

  saveRobot(formData)
    .then((res) => {
      if (res.res != 0) {
        return message.error(res.msg)
      }

      saveLoading.value = false

      message.success('保存成功')

      getRobot(formState.id)
    })
    .catch(() => {
      saveLoading.value = false
    })
}
</script>
