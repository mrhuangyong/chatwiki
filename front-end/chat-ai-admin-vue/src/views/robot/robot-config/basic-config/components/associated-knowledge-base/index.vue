<style lang="less" scoped>
.setting-box {
  .actions-box {
    display: flex;
    align-items: center;
    line-height: 22px;
    font-size: 14px;
    color: #595959;

    .action-btn {
      cursor: pointer;
    }

    .save-btn {
      color: #2475fc;
    }
  }

  .library-list {
    display: flex;
    flex-flow: row wrap;
    gap: 16px;
    padding: 0 16px 16px 16px;

    .library-item {
      position: relative;
      width: 336px;
      padding: 14px 16px;
      border-radius: 2px;
      border: 1px solid #d8dde5;
      background-color: #fff;

      .library-name {
        width: 100%;
        line-height: 22px;
        font-size: 14px;
        font-weight: 600;
        color: #262626;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .library-intro {
        width: 100%;
        line-height: 20px;
        font-size: 12px;
        color: #8c8c8c;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .close-btn {
        position: absolute;
        top: 28px;
        right: 16px;
        font-size: 16px;
        color: #8c8c8c;
        cursor: pointer;
      }
    }
  }
}
</style>

<template>
  <edit-box class="setting-box" title="关联知识库" icon-name="guanlianzhishiku" v-model:isEdit="isEdit"
    :bodyStyle="{ padding: 0 }">
    <template #extra>
      <div class="actions-box">
        <span class="action-btn" @click="handleOpenRecallSettingsAlert">召回设置</span>
        <a-divider type="vertical" />
        <span class="action-btn" @click="handleOpenSelectLibraryAlert">关联知识库</span>
      </div>
    </template>
    <div class="library-list" v-if="selectedLibraryRows.length > 0">
      <div class="library-item" v-for="item in selectedLibraryRows" :key="item.id">
        <span class="close-btn" @click="handleRemoveCheckedLibrary(item)">
          <CloseCircleOutlined />
        </span>
        <div class="library-name">{{ item.library_name }}</div>
        <div class="library-intro">{{ item.library_intro }}</div>
      </div>
    </div>
    <LibrarySelectAlert ref="librarySelectAlertRef" @change="onChangeLibrarySelected" />
    <RecallSettingsAlert ref="recallSettingsAlertRef" @change="onChangeRecallSettings" />
  </edit-box>
</template>

<script setup>
import { getLibraryList } from '@/api/library/index'
import { ref, reactive, inject, watchEffect, computed, toRaw } from 'vue'
import { CloseCircleOutlined } from '@ant-design/icons-vue'
import EditBox from '../edit-box.vue'
import LibrarySelectAlert from './library-select-alert.vue'
import RecallSettingsAlert from './recall-settings-alert.vue'
const isEdit = ref(false)

const { robotInfo, updateRobotInfo } = inject('robotInfo')

const formState = reactive({
  library_ids: [],
  rerank_status: 0,
  rerank_use_model: undefined,
  rerank_model_config_id: '',
  top_k: 0,
  similarity: 0,
  search_type: 1
})

// 知识库
const libraryList = ref([])
const librarySelectAlertRef = ref(null)
const selectedLibraryRows = computed(() => {
  return libraryList.value.filter((item) => {
    return formState.library_ids.includes(item.id)
  })
})

// 移除知识库
const handleRemoveCheckedLibrary = (item) => {
  let index = formState.library_ids.indexOf(item.id)

  formState.library_ids.splice(index, 1)

  onSave()
}

const onChangeLibrarySelected = (checkedList) => {
  formState.library_ids = [...checkedList]

  onSave()
}

const handleOpenSelectLibraryAlert = () => {
  librarySelectAlertRef.value.open([...formState.library_ids])
}

// 召回设置
const recallSettingsAlertRef = ref(null)

const handleOpenRecallSettingsAlert = () => {
  recallSettingsAlertRef.value.open(toRaw(formState))
}

const onChangeRecallSettings = (data) => {
  formState.rerank_status = data.rerank_status
  formState.rerank_use_model = data.rerank_use_model
  formState.rerank_model_config_id = data.rerank_model_config_id
  formState.top_k = data.top_k
  formState.similarity = data.similarity
  formState.search_type = data.search_type

  onSave()
}

const onSave = () => {
  let formData = { ...toRaw(formState) }

  formData.library_ids = formData.library_ids.join(',')

  updateRobotInfo({ ...formData })
}

// 获取知识库
const getList = async () => {
  const res = await getLibraryList()
  if (res) {
    libraryList.value = res.data || []
  }
}

getList()

watchEffect(() => {
  formState.library_ids = robotInfo.library_ids.split(',')
  formState.rerank_status = robotInfo.rerank_status || 0
  formState.rerank_use_model = robotInfo.rerank_use_model || undefined
  formState.rerank_model_config_id = robotInfo.rerank_model_config_id || ''
  formState.top_k = robotInfo.top_k
  formState.similarity = robotInfo.similarity
  formState.search_type = robotInfo.search_type
})
</script>
