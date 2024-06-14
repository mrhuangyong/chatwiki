<style lang="less" scoped>
.message-input-box {
  display: flex;
  padding: 12px 28px 8px 28px;

  .message-input-body {
    flex: 1;
  }

  .message-input {
    position: relative;
    height: 40px;
    border-radius: 16px;
    border: 1px solid #f8f9fa;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
    transition: all 0.2s;

    .text-input {
      border: none;
      height: 100%;
      width: 100%;
      padding: 0 32px 0 12px;
      color: rgb(26, 26, 26);
      font-size: 16px;
      font-weight: 400;
      background: none;

      &::placeholder {
        font-size: 16px;
        font-weight: 400;
        color: rgb(191, 191, 191);
      }
    }

    .send-btn {
      position: absolute;
      right: 12px;
      top: 10px;
      font-size: 20px;
      color: #b3b3b3;
      transition: all 0.2s;
    }

    &.is-set {
      border: 1px solid #2475fc;

      .send-btn {
        color: #2475fc;
      }
    }
  }
}
</style>

<template>
  <div class="message-input-box">
    <div class="message-input-body">
      <div class="message-input" :class="{ 'is-set': props.value.length > 0 }">
        <input
          class="text-input"
          type="text"
          :value="value"
          placeholder="在此输入您想了解的内容"
          @change="onChange"
          @keyup.enter="handleEnter" 
        />
        <svg-icon name="paper-airplane" class="send-btn" @click="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:value', 'send' ])

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:value', target.value)
}

const sendMessage = () => {
  if (props.value.trim()) {
    emit('send', props.value)
  }
}

const handleEnter = (e: KeyboardEvent) => {
  if (!props.value.trim()) {
    return
  }

  e.preventDefault()
  sendMessage()
}
</script>
