<template>
  <div class="leng-xingren-settings">
    <div class="inline-drawer">
      <div class="inline-drawer-toggle inline-drawer-header">
        <b>冷星刃状态栏设置</b>
        <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
      </div>
      <div class="inline-drawer-content">
        <div class="settings-block flex-container">
          <input class="menu_button" type="submit" value="刷新状态" @click="handle_refresh" />
        </div>

        <div class="settings-block flex-container">
          <input v-model="settings.show_leng_xingren" type="checkbox" id="show_leng_xingren" />
          <label for="show_leng_xingren">显示冷星刃面板</label>
        </div>

        <div class="settings-block flex-container">
          <input v-model="settings.show_protagonist" type="checkbox" id="show_protagonist" />
          <label for="show_protagonist">显示主角面板</label>
        </div>

        <div class="settings-block flex-container">
          <input v-model="settings.show_world" type="checkbox" id="show_world" />
          <label for="show_world">显示世界信息</label>
        </div>

        <hr class="sysHR" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSettingsStore } from './settings';

const { settings } = storeToRefs(useSettingsStore());

const handle_refresh = () => {
  window.dispatchEvent(new CustomEvent('status-refresh'));
  toastr.success('状态栏已刷新');
};
</script>

<style scoped>
.leng-xingren-settings {
  font-family: 'Noto Sans SC', sans-serif;
  color: #e0e0e0;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
}

.inline-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  z-index: 9999;
}

.inline-drawer-header {
  padding: 15px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.inline-drawer-header:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

.inline-drawer-icon {
  transition: transform 0.3s ease;
}

.inline-drawer-icon.down {
  transform: rotate(0deg);
}

.inline-drawer-content {
  padding: 20px;
  overflow-y: auto;
  max-height: calc(100vh - 60px);
}

.settings-block {
  padding: 12px 0;
  margin-bottom: 15px;
}

.flex-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu_button {
  width: 100%;
  padding: 10px 15px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 14px;
}

.menu_button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(240, 249, 255, 0.3);
}

input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #667eea;
}

label {
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  color: #e0e0e0;
}

.sysHR {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(102, 126, 234, 0.3) 50%, transparent 100%);
  margin: 20px 0;
}
</style>
