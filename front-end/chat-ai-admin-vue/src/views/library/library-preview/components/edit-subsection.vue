<template>
  <div>
    <a-modal v-model:open="open" title="编辑分段" @ok="handleOk" width="746px">
      <div class="form-box-wrapper">
        <div class="form-item">
          <div class="form-label">分段标题：</div>
          <div class="form-content">
            <a-input v-model:value="title" placeholder="请输入分段标题" />
          </div>
        </div>
        <template v-if="isExcelQa">
          <div class="form-item">
            <div class="form-label">分段问题：</div>
            <div class="form-content">
              <a-textarea
                placeholder="请输入分段问题"
                v-model:value="question"
                style="height: 100px"
              ></a-textarea>
            </div>
          </div>
          <div class="form-item">
            <div class="form-label">分段答案：</div>
            <div class="form-content">
              <a-textarea
                placeholder="请输入分段答案"
                v-model:value="answer"
                style="height: 250px"
              ></a-textarea>
            </div>
          </div>
        </template>
        <div class="form-item" v-else>
          <div class="form-label required">分段内容：</div>
          <div class="form-content">
            <a-textarea
              style="height: 450px"
              v-model:value="content"
              placeholder="请输入分段内容"
            />
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { editParagraph } from '@/api/library'
const emit = defineEmits(['handleEdit'])
const open = ref(false)
const title = ref('')
const content = ref('')
const answer = ref('')
const question = ref('')
const id = ref('')
const detailsInfo = ref({})
const isExcelQa = ref(false)
const showModal = (data) => {
  detailsInfo.value = data
  title.value = data.title
  content.value = data.content
  id.value = data.id
  answer.value = data.answer
  question.value = data.question
  isExcelQa.value = data.isExcelQa
  open.value = true
}
const handleOk = () => {
  if (!content.value && !isExcelQa.value) {
    return message.error('请输入分段内容')
  }
  if (!question.value && isExcelQa.value) {
    return message.error('请输入分段问题')
  }
  if (!answer.value && isExcelQa.value) {
    return message.error('请输入分段答案')
  }
  let data = {
    title: title.value,
    content: content.value,
    id: id.value,
    question: question.value,
    answer: answer.value
  }
  editParagraph(data).then((res) => {
    message.success('修改成功')
    open.value = false
    emit('handleEdit', data)
  })
}
defineExpose({ showModal })
</script>
<style lang="less" scoped>
.form-box-wrapper {
  .form-item {
    margin-top: 16px;
  }
  .form-label {
    color: #262626;
    font-size: 14px;
    line-height: 22px;
    padding-top: 5px;
    &.required::before {
      content: '*';
      display: inline-block;
      color: #fb363f;
      margin-right: 2px;
    }
  }
  .form-content {
    margin-top: 8px;
  }
}
</style>
