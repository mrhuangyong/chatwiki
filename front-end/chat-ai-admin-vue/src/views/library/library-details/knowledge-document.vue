<template>
  <div class="details-library-page">
    <cu-scroll :scrollbar="false">
      <div class="list-tools">
        <div>
          <div class="tool-item">
            <a-button type="primary" @click="handleOpenFileUploadModal">
              <template #icon>
                <PlusOutlined />
              </template>
              <span>上传文档</span>
            </a-button>
          </div>
        </div>
        <div>
          <div class="tool-item">
            <a-input
              style="width: 282px"
              v-model:value="queryParams.file_name"
              placeholder="请输入文档名称搜索"
              @change="onSearch"
            >
              <template #suffix>
                <SearchOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input>
          </div>
        </div>
      </div>
      <div class="list-content">
        <a-table
          :columns="columns"
          :data-source="fileList"
          :pagination="{
            current: queryParams.page,
            total: queryParams.total,
            pageSize: queryParams.size,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100']
          }"
          @change="onTableChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'file_name'">
              <a @click="handlePreview(record)">{{ record.file_name }}</a>
            </template>
            <template v-if="column.key === 'status'">
              <span class="status-tag status-queuing" v-if="record.status == 0"
                ><a-spin size="small" /> 排队中</span
              >
              <span class="status-tag status-learning" v-if="record.status == 1"
                ><a-spin size="small" /> 学习中</span
              >
              <span class="status-tag status-complete" v-if="record.status == 2"
                ><CheckCircleFilled /> 学习完成</span
              >

              <a-tooltip placement="top" v-if="record.status == 3">
                <template #title>
                  <span>{{ record.errmsg }}</span>
                </template>
                <span class="status-tag status-error"><CloseCircleFilled /> 学习失败</span>
              </a-tooltip>
              <template v-if="record.status == 4">
                <span class="status-tag status-complete"><ClockCircleFilled /> 待学习</span>
                <a class="ml8" @click="handlePreview(record)">学习</a>
              </template>
            </template>

            <template v-if="column.key === 'action'">
              <span>
                <a @click="handlePreview(record)">预览</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定要删除吗?" @confirm="onDelete(record)">
                  <a>删除</a>
                </a-popconfirm>
              </span>
            </template>
          </template>
        </a-table>
      </div>
    </cu-scroll>
    <a-modal
      v-model:open="addFileState.open"
      :confirm-loading="addFileState.confirmLoading"
      :maskClosable="false"
      title="上传文档"
      @ok="handleSaveFiles"
      @cancel="handleCloseFileUploadModal"
    >
      <div class="upload-file-box">
        <UploadFilesInput v-model:value="addFileState.fileList" @change="onFilesChange" />
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { reactive, ref, toRaw } from 'vue'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import {
  PlusOutlined,
  SearchOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  EditOutlined,
  ClockCircleFilled
} from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { getLibraryFileList, delLibraryFile, addLibraryFile, getLibraryInfo } from '@/api/library'
import { formatFileSize } from '@/utils/index'
import UploadFilesInput from '../add-library/components/upload-input.vue'
import RecallTesting from './recall-testing.vue'
import KnowledgeConfig from './knowledge-config.vue'
import EditLibrary from './components/edit-library.vue'

const rotue = useRoute()
const router = useRouter()
const query = rotue.query

const activeMenuKey = ref(1)

const handleChangeMenu = (key) => {
  if (key === activeMenuKey.value) {
    return
  }
  activeMenuKey.value = key
  if (key == 3) {
    getInfo(query.id)
  }
}

const libraryInfo = ref({
  library_intro: '',
  library_name: '',
  use_model: '',
  is_offline: null
})

const fileList = ref([])

const queryParams = reactive({
  library_id: query.id,
  file_name: undefined,
  page: 1,
  size: 10,
  total: 0
})

const columns = [
  {
    title: '文档名称',
    dataIndex: 'file_name',
    key: 'file_name'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '文档格式',
    dataIndex: 'file_ext',
    key: 'file_ext'
  },
  {
    title: '文档大小',
    dataIndex: 'file_size_str',
    key: 'file_size'
  },
  {
    title: '上传时间',
    dataIndex: 'create_time',
    key: 'create_time'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '120px'
  }
]

const onTableChange = (pagination) => {
  queryParams.page = pagination.current
  queryParams.size = pagination.pageSize
  getData()
}

const onSearch = () => {
  queryParams.page = 1
  getData()
}

let isLast = false

const onDelete = ({ id }) => {
  if (fileList.value.length == 1) {
    isLast = true
  }

  delLibraryFile({ id }).then(() => {
    if (isLast && queryParams.page > 1) {
      queryParams.page--
    }

    getData()
    message.success('删除成功')
  })
}

const handlePreview = (record) => {
  if (record.status == '4') {
    return router.push({
      path: '/library/document-segmentation',
      query: { document_id: record.id }
    })
  }
  if (record.status == '3') {
    return message.error('学习失败,不可预览')
  }
  if (record.status == '0') {
    return message.error('排队中,稍候可预览')
  }

  router.push({ name: 'libraryPreview', query: { id: record.id } })
}

const getData = () => {
  getLibraryFileList(toRaw(queryParams)).then((res) => {
    libraryInfo.value = res.data.info

    let list = res.data.list || []

    queryParams.total = res.data.total

    fileList.value = list.map((item) => {
      item.file_size_str = formatFileSize(item.file_size)
      item.create_time = dayjs(item.create_time * 1000).format('YYYY-MM-DD HH:mm')
      return item
    })
  })
}

const getInfo = (id) => {
  getLibraryInfo({ id }).then((res) => {
    libraryInfo.value = res.data
  })
}

getData()

const addFileState = reactive({
  open: false,
  fileList: [],
  confirmLoading: false
})

const handleOpenFileUploadModal = () => {
  addFileState.fileList = []
  addFileState.open = true
}

const handleCloseFileUploadModal = () => {
  addFileState.fileList = []
}

const onFilesChange = (files) => {
  addFileState.fileList = files
}

const handleSaveFiles = () => {
  if (addFileState.fileList.length == 0) {
    message.error('请选择文件')
    return
  }

  addFileState.confirmLoading = true

  let formData = new FormData()

  formData.append('library_id', queryParams.library_id)

  addFileState.fileList.forEach((file) => {
    formData.append('library_files', file)
  })

  addLibraryFile(formData)
    .then((res) => {
      getData()

      addFileState.open = false
      addFileState.fileList = []
      addFileState.confirmLoading = false

      router.push('/library/document-segmentation?document_id=' + res.data.file_ids[0])
    })
    .catch(() => {
      addFileState.confirmLoading = false
    })
}

const editLibraryRef = ref(null)
const handleOpenEditLibraryModal = () => {
  editLibraryRef.value.showModal(libraryInfo.value)
}
const handleEditLibrary = (data) => {
  getData()
}
</script>

<style lang="less" scoped>
.details-library-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.test-menu-icon {
  color: #fff;
}
.library-name {
  height: 38px;
  line-height: 38px;
  padding: 0 16px;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 600;
  color: #262626;
  border-radius: 2px;
  background-color: #f2f4f7;
  display: flex;
  align-items: center;
  .anticon-edit {
    margin-left: 8px;
    color: #8c8c8c;
    cursor: pointer;
  }
}
.between-content-box {
  display: flex;
  flex: 1;
  overflow: hidden;
  .left-menu-box {
    width: 232px;
    margin-right: 24px;
  }
  .right-content-box {
    flex: 1;
  }
}

.menu-item {
  width: 232px;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: #f5f5f5;
  border-radius: 2px;
  margin-bottom: 16px;
  cursor: pointer;
  &.active {
    background: #e6efff;
    border: 1px solid #2475fc;
  }
  .title {
    color: #242933;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    margin-left: 8px;
  }
}

.list-tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-tools {
  margin-bottom: 8px;
}

.list-content {
  .status-tag {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    padding: 0 6px;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;

    &.status-queuing {
      color: #2475fc;
      background-color: #e8effc;
    }

    &.status-learning {
      color: #2475fc;
      background-color: #e8effc;
    }

    &.status-complete {
      color: #3a4559;
      background-color: #edeff2;
    }

    &.status-error {
      cursor: pointer;
      color: #fb363f;
      background-color: #f5c6c8;
    }
    &.status-split {
      cursor: pointer;
      background: #faebe6;
      color: #ed744a;
    }
  }
}
.upload-file-box {
  padding: 30px 0;
}
.ml8 {
  margin-left: 8px;
}
</style>
