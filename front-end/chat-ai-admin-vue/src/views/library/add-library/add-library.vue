<style lang="less" scoped>

.add-library-page {
  padding: 24px;

  .form-box {
    width: 554px;
    margin: 0 auto;
  }
}

.model-icon {
  height: 18px;
}

.form-item-tip {
  color: #999;
}

.card-box {
  display: flex;
  justify-content: space-between;
}

.use-model-item{
  position: relative;
  width: 226px;
  height: 124px;
  border-radius: 2px;
  border: 2px solid #D9D9D9;
  cursor: pointer;
  padding: 15px;
  margin-bottom: 10px;
}

.use-model-item-top {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  color: #595959;
}

.use-model-item-top-icon {
  margin-right: 5px;
}

.use-model-item-top.active {
  color: #2475fc;
  font-weight: bolder;
}

.use-model-item.active {
  border: 2px solid #2475fc;

  .check-arrow {
    position: absolute;
    display: block;
    right: -1px;
    bottom: -1px;
    width: 24px;
    height: 24px;
    font-size: 24px;
    color: #fff;
  }

  .retrieval-mode-title {
    color: #2475fc;
  }
}

</style>

<template>
  <div class="add-library-page">
    <div class="form-box">
      <a-form :label-col="{ span: 4 }">
        <a-form-item ref="name" label="知识库名称" v-bind="validateInfos.library_name">
          <a-input
            v-model:value="formState.library_name"
            placeholder="请输入知识库名称，最多20个字"
          />
        </a-form-item>

        <a-form-item label="知识库简介" v-bind="validateInfos.library_intro">
          <a-textarea v-model:value="formState.library_intro" placeholder="请输入知识库介绍" />
        </a-form-item>

        <a-form-item ref="name" label="知识库封面" v-bind="validateInfos.robot_avatar_url">
          <AvatarInput v-model:value="formState.robot_avatar_url" @change="onAvatarChange" />
          <div class="form-item-tip">请上传知识库封面，建议尺寸为100*100px.大小不超过100kb</div>
        </a-form-item>

        <a-form-item ref="name" label="知识库文档" v-bind="validateInfos.library_files">
          <UploadFile @change="handleFileChange" />
        </a-form-item>

        <a-form-item label="嵌入模型 " v-bind="validateInfos.use_model">
          <div class="card-box">
            <div class="use-model-item"
              :class="{ active: isActive == item.value }"
              v-for="item in libraryModeList"
              :key="item.value"
              @click="handleSelectLibrary(item)"
            >
              <div
                class="use-model-item-top"
                :class="{ active: isActive == item.value }"
              >
                <svg-icon class="use-model-item-top-icon" style="color: red;" :name="isActive == item.value ? item.iconNameActive : item.iconName"></svg-icon>
                <p>{{item.title}}</p>
              </div>
              <p>{{item.desc}}</p>
              <svg-icon
                class="check-arrow"
                name="check-arrow-filled"
                style="font-size: 24px;color: #fff;"
                v-if="isActive == item.value"
              ></svg-icon>
            </div>
          </div>
          <a-select
            v-model:value="formState.use_model"
            placeholder="请选择嵌入模型"
            @change="handleChangeModel"
          >
            <a-select-opt-group v-for="item in modelList" :key="item.id">
              <template #label>
                <a-flex align="center" :gap="6">
                  <img class="model-icon" :src="item.icon" alt="" />{{item.name}}
                </a-flex>
              </template>
              <a-select-option
                :value="val"
                :model_config_id="item.id"
                v-for="val in item.children"
                :key="val"
              >
                <span v-if="item.name == 'Azure OpenAI Service' && item.deployment_name">{{item.deployment_name}}</span>
                <span v-else>{{ val }}</span>
              </a-select-option>
            </a-select-opt-group>
          </a-select>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button @click="resetForm">取 消</a-button>
          <a-button
            type="primary"
            style="margin-left: 16px"
            :loading="saveLoading"
            @click.prevent="onSubmit"
            >下一步</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import UploadFile from './components/upload-input.vue'
import { createLibrary } from '@/api/library/index'
import { getModelConfigOption } from '@/api/model/index'
import AvatarInput from './avatar-input.vue'
import { DEFAULT_LIBRARY_AVATAR } from '@/constants/index'

const router = useRouter()

const libraryModeList = ref([
  {
    iconName: 'high',
    iconNameActive: 'high-active',
    title: '高质量',
    value: 1,
    is_offline: false,
    desc: '使用在线的嵌入模型，在召回时具有更高的准确度，但需要花费token'
  },
  {
    iconName: 'economic',
    iconNameActive: 'economic-active',
    title: '经济',
    value: 2,
    is_offline: true,
    desc: '使用离线的向量模型，较在线模型准确度稍低，但是不需要消耗token'
  }
])

const useForm = Form.useForm
const isActive = ref(2)
const saveLoading = ref(false)
const formState = reactive({
  library_name: '',
  library_intro: '',
  use_model: undefined,
  model_config_id: '',
  library_files: undefined,
  avatar: DEFAULT_LIBRARY_AVATAR,
  robot_avatar_url: DEFAULT_LIBRARY_AVATAR,
  is_offline: false
})

const validateFiles = (_rule, value) => {
  if (value && value.length > 0) {
    return Promise.resolve()
  } else {
    return Promise.reject(new Error('请上传文件'))
  }
}

const rules = reactive({
  library_name: [{ required: true, message: '请输入库名称', trigger: 'blur' }],
  library_intro: [{ required: true, message: '请输入库简介', trigger: 'blur' }],
  use_model: [{ required: true, message: '请选择嵌入模型', trigger: 'change' }],
  library_files: [
    { required: true, message: '请选择文件', trigger: 'change', validator: validateFiles }
  ]
})

const { validate, validateInfos } = useForm(formState, rules)

const handleFileChange = (fileList) => {
  formState.library_files = fileList
}

const handleChangeModel = (val, option) => {
  formState.model_config_id = option.model_config_id
}

const onAvatarChange = (data) => {
  formState.avatar = data.file
}

const handleSelectLibrary = (item) => {
  formState.is_offline = item.is_offline
  isActive.value = item.value
  formState.use_model = undefined
  getModelList(item.is_offline)
}

const resetForm = () => {
  router.back()
}

const onSubmit = () => {
  validate()
    .then(() => {
      saveForm()
    })
    .catch(() => {
      // console.log('error', err)
    })
}

const saveForm = () => {
  let formData = new FormData()

  formData.append('library_name', formState.library_name)
  formData.append('library_intro', formState.library_intro)
  formData.append('use_model', formState.use_model)
  formData.append('model_config_id', formState.model_config_id)
  formData.append('avatar', formState.avatar || DEFAULT_LIBRARY_AVATAR)
  formData.append('is_offline', formState.is_offline)
  

  formState.library_files.forEach((file) => {
    formData.append('library_files', file)
  })

  saveLoading.value = true

  createLibrary(formData)
    .then((res) => {
      saveLoading.value = false
      message.success('创建成功')
      router.replace({
        path: '/library/document-segmentation',
        query: {
          document_id: res.data.file_ids[0]
        }
      })
    })
    .catch(() => {
      saveLoading.value = false
    })
}

// 获取嵌入模型列表
const modelList = ref([])

const getModelList = (is_offline) => {
  getModelConfigOption({
    model_type: 'TEXT EMBEDDING',
    is_offline
  }).then((res) => {
    let list = res.data || []

    modelList.value = list.map((item) => {
      return {
        id: item.model_config.id,
        name: item.model_info.model_name,
        icon: item.model_info.model_icon_url,
        children: item.model_info.vector_model_list,
        deployment_name: item.model_config.deployment_name,
      }
    })
  })
}

getModelList(true)
</script>
