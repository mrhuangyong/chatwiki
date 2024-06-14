<style lang="less" scoped>
.left-menus {
  padding: 8px;

  .menu-item {
    height: 40px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #595959;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      color: #2475fc;
    }

    .menu-icon {
      margin-right: 4px;
      width: 16px;
      height: 16px;
    }
    .menu-name {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &.active {
      color: #2475fc;
      background-color: #e6efff;
    }
    .svg-action{
      font-size: 16px;
      margin-right: 4px;
      margin-top: 4px;
    }
  }
}
</style>

<template>
  <div class="left-menus">
    <div
      class="menu-item"
      :class="{ active: item.path == activeMenu }"
      v-for="item in menus"
      :key="item.key"
      @click="onChange(item)"
    >
      <span>
        <span v-if="item.svg">
          <svg-icon :name="item.svgActive" v-if="item.path == activeMenu"></svg-icon>
          <svg-icon :name="item.svg" v-else></svg-icon>
        </span>
        
        <component v-if="item.icon" class="menu-icon" :is="item.icon"></component>
      </span>
      <span class="menu-name">{{ item.name }}</span>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, createVNode } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { SettingFilled, AppstoreFilled, KeyOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const route = useRoute()
// createVNode('div', { style: 'color:red;' }, content),
const menus = ref([
  {
    name: '模型管理',
    key: 'model',
    path: '/user/model',
    icon: AppstoreFilled
  },
  {
    name: '团队管理',
    key: 'manage',
    path: '/user/manage',
    svg: 'team-manage-active',
    svgActive: 'team-manage'
  },
  {
    name: '账号设置',
    key: 'account',
    path: '/user/account',
    icon: SettingFilled
  },
  {
    name: '企业设置',
    key: 'enterprise',
    path: '/user/enterprise',
    svg: 'enterprise',
    svgActive: 'enterprise-active'
  },
])

const activeMenu = computed(() => {
  return route.path
})

const onChange = (item) => {
  if (item.path == activeMenu.value) {
    return
  }

  router.push(item.path)
}
</script>
