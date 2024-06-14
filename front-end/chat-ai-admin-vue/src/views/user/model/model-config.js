const inputDefaultConfig = {
  componentType: 'input',
  placeholder: '',
  defaultValue: ''
}

const radioDefaultConfig = {
  componentType: 'radio',
  defaultValue: undefined
}

const selectDefaultConfig = {
  componentType: 'select',
  defaultValue: undefined
}

const modelFieldConfig = {
  id: {
    hidden: true
  },
  model_types: {
    ...radioDefaultConfig,
    key: 'model_types',
    label: '模型类型',
    optionsKey: 'supported_type',
    options: [],
    disabled: false,
    rules: [
      {
        required: true,
        message: '请选择模型类型',
        trigger: 'change'
      }
    ]
  },
  deployment_name: {
    ...inputDefaultConfig,
    label: '部署名称',
    placeholder: '请与Azure 部署名称保持一致',
    rules: [
      {
        required: true,
        message: '请输入部署名称',
        trigger: 'change'
      }
    ]
  },
  api_endpoint: {
    ...inputDefaultConfig,
    label: 'API 域名',
    placeholder: '请输入您的API 域名',
    rules: [
      {
        required: true,
        message: '请输入API 域名',
        trigger: 'change'
      }
    ]
  },
  api_key: {
    ...inputDefaultConfig,
    label: 'API Key',
    placeholder: '请输入您的API Key',
    rules: [
      {
        required: true,
        message: '请输入API Key',
        trigger: 'change'
      }
    ]
  },
  secret_key: {
    ...inputDefaultConfig,
    label: 'Secret Key',
    placeholder: '请输入您的Secret Key',
    rules: [
      {
        required: true,
        message: '请输入Secret Key',
        trigger: 'change'
      }
    ]
  },
  api_version: {
    ...selectDefaultConfig,
    label: 'API 版本',
    placeholder: '请输入您的API 版本',
    optionsKey: 'api_versions',
    options: [],
    rules: [
      {
        required: true,
        message: '请选择API 版本',
        trigger: 'change'
      }
    ]
  }
}
// 获取模型表单字段配置
export function getModelFieldConfig(fieldName) {
  if (modelFieldConfig[fieldName]) {
    return modelFieldConfig[fieldName]
  }

  let config = { ...inputDefaultConfig }

  config.placeholder = '请输入您的' + fieldName

  return config
}

const defaultModelTableConfig = {
  columns: [
    {
      title: '模型名称',
      dataIndex: 'model_name',
      key: 'model_name',
      langKey: 'views.user.model.model_name'
    },
    {
      title: '模型类型',
      dataIndex: 'model_type',
      key: 'model_type',
      langKey: 'views.user.model.model_type'
    }
  ],
  rows: [],
  showAddBtn: false
}

const modelTableConfig = {
  azure: {
    columns: [
      {
        title: '部署名称',
        dataIndex: 'deployment_name',
        key: 'deployment_name',
        langKey: 'views.user.model.deployment_name'
      },
      {
        title: '模型类型',
        dataIndex: 'model_types',
        key: 'model_types',
        langKey: 'views.user.model.model_types'
      },
      {
        title: 'API版本',
        dataIndex: 'api_version',
        key: 'api_version',
        langKey: 'views.user.model.api_version'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 150,
        langKey: 'common.action'
      }
    ],
    rows: [],
    showAddBtn: true
  }
}

function getModelTableData(data) {
  if (data.model_define == 'azure') {
    return data.config_list
  } else {
    let rows = []

    if (!data.llm_model_list) {
      data.llm_model_list = []
    }

    data.llm_model_list.forEach((item) => {
      rows.push({
        model_name: item,
        model_type: 'LLM'
      })
    })

    if (!data.vector_model_list) {
      data.vector_model_list = []
    }

    data.vector_model_list.forEach((item) => {
      rows.push({
        model_name: item,
        model_type: 'TEXT EMBEDDING'
      })
    })

    return rows
  }
}

// 查看模型时不同的模型显示的列表不一样
export function getModelTableConfig(data) {
  let keys = ['model_define', 'model_icon_url']

  let config = modelTableConfig[data.model_define]

  if (!config) {
    config = defaultModelTableConfig
  }

  keys.forEach((key) => {
    config[key] = data[key]
  })

  config.rows = getModelTableData(data)

  return config
}
