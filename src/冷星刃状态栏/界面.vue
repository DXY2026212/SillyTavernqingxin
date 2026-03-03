<template>
  <div class="leng-xingren-interface">
    <div class="main-container">
      <div class="panel-section">
        <h2 class="section-title">🌟 冷星刃</h2>
        <div v-if="settings.show_leng_xingren" class="character-panel">
          <div class="panel-header">
            <span class="character-name">冷星刃</span>
            <span class="ability-badge" :style="{ background: getAbilityColor(leng_xingren.异能信息.异能等级) }">
              {{ leng_xingren.异能信息.异能等级 }}级
            </span>
          </div>

          <div class="panel-content">
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">异能种类</div>
                <div class="info-value">{{ leng_xingren.异能信息.异能种类 }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">异能名称</div>
                <div class="info-value">{{ leng_xingren.异能信息.异能名称 }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">异能潜力</div>
                <div class="info-value">{{ leng_xingren.异能信息.异能潜力 }}</div>
              </div>
            </div>

            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">呼吸法</div>
                <div class="info-value">{{ leng_xingren.呼吸吸法信息.呼吸法名称 }} ({{ leng_xingren.呼吸吸法信息.呼吸法等级 }}级)</div>
              </div>
              <div class="info-item">
                <div class="info-label">流派</div>
                <div class="info-value">{{ leng_xingren.呼吸吸法信息.呼吸吸法流派 }}</div>
              </div>
            </div>

            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">武道境界</div>
                <div class="info-value">{{ leng_xingren.武道信息.武道境界 }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">修炼进度</div>
                <div class="progress-container">
                  <div class="progress-bar" :style="{ width: leng_xingren.武道信息.修炼进度 + '%' }"></div>
                  <div class="progress-text">{{ leng_xingren.武道信息.修炼进度 }}%</div>
                </div>
              </div>
            </div>

            <div class="status-grid">
              <div class="status-item">
                <div class="status-label">❤️ 好感度</div>
                <div class="status-value" :style="{ color: getAffectionColor(leng_xingren.状态信息.好感度) }">
                  {{ leng_xingren.状态信息.好感度 }}
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar" :style="{ width: getAffectionPercent(leng_xingren.状态信息.好感度) + '%', background: getAffectionColor(leng_xingren.状态信息.好感度) }"></div>
                </div>
              </div>
              <div class="status-item">
                <div class="status-label">🤝 信任度</div>
                <div class="status-value">{{ leng_xingren.状态信息.信任度 }}</div>
                <div class="progress-bar-container">
                  <div class="progress-bar" :style="{ width: leng_xingren.状态信息.信任度 + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="status-grid">
              <div class="status-item">
                <div class="status-label">😊 心情</div>
                <div class="status-value">{{ leng_xingren.状态信息.当前心情 }}</div>
              </div>
              <div class="status-item">
                <div class="status-label">💪 状态</div>
                <div class="status-value">{{ leng_xingren.状态信息.当前状态 }}</div>
              </div>
            </div>

            <div class="status-grid">
              <div class="status-item">
                <div class="status-label">⚡ 体力</div>
                <div class="status-value" :style="{ color: getHealthColor(leng_xingren.状态信息.体力值) }">
                  {{ leng_xingren.状态信息.体力值 }}/100
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar" :style="{ width: leng_xingren.状态信息.体力值 + '%', background: getHealthColor(leng_xingren.状态信息.体力值) }"></div>
                </div>
              </div>
              <div class="status-item">
                <div class="status-label">🧠 精神</div>
                <div class="status-value" :style="{ color: getMentalColor(leng_xingren.状态信息.精神值) }">
                  {{ leng_xingren.状态信息.精神值 }}/100
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar" :style="{ width: leng_xingren.状态信息.精神值 + '%', background: getMentalColor(leng_xingren.状态信息.精神值) }"></div>
                </div>
              </div>
            </div>

            <div class="energy-section">
              <div class="energy-item">
                <div class="energy-label">⚡ 能量</div>
                <div class="energy-value">{{ leng_xingren.异能信息.能量值 }}/{{ leng_xingren.异能信息.能量上限 }}</div>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar energy-bar" :style="{ width: getEnergyPercent(leng_xingren.异能信息.能量值, leng_xingren.异能信息.能量上限) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-section" v-if="settings.show_protagonist">
        <h2 class="section-title">👤 主角</h2>
        <div class="character-panel">
          <div class="panel-header">
            <span class="character-name">主角</span>
            <span class="ability-badge" :style="{ background: getAbilityColor(protagonist.异能信息.异能等级) }">
              {{ protagonist.异能信息.异能等级 || '未知' }}级
            </span>
          </div>

          <div class="panel-content">
            <div v-if="protagonist.异能信息.异能种类" class="info-grid">
              <div class="info-item">
                <div class="info-label">异能种类</div>
                <div class="info-value">{{ protagonist.异能信息.异能种类 }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">异能名称</div>
                <div class="info-value">{{ protagonist.异能信息.异能名称 || '未知' }}</div>
              </div>
            </div>

            <div class="status-grid">
              <div class="status-item">
                <div class="status-label">❤️ 好感度</div>
                <div class="status-value" :style="{ color: getAffectionColor(protagonist.状态信息.好感度) }">
                  {{ protagonist.状态信息.好感度 }}
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar" :style="{ width: getAffectionPercent(protagonist.状态信息.好感度) + '%', background: getAffectionColor(protagonist.状态信息.好感度) }"></div>
                </div>
              </div>
              <div class="status-item">
                <div class="status-label">🤝 信任度</div>
                <div class="status-value">{{ protagonist.状态信息.信任度 }}</div>
                <div class="progress-bar-container">
                  <div class="progress-bar" :style="{ width: protagonist.状态信息.信任度 + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-section" v-if="settings.show_world">
        <h2 class="section-title">🌍 世界信息</h2>
        <div class="world-panel">
          <div class="world-info-grid">
            <div class="world-item">
              <div class="world-icon">⏰</div>
              <div class="world-value">{{ world.当前时间 }}</div>
            </div>
            <div class="world-item">
              <div class="world-icon">📍</div>
              <div class="world-value">{{ world.当前地点 }}</div>
            </div>
            <div class="world-item">
              <div class="world-icon">🌤️</div>
              <div class="world-value">{{ world.当前天气 }}</div>
            </div>
          </div>

          <div class="invasion-section">
            <div class="invasion-title">⚔️ 魔兽入侵</div>
            <div class="invasion-stage">{{ world.魔兽入侵阶段 }}</div>
            <div class="countdown-section">
              <div class="countdown-label">倒计时</div>
              <div class="countdown-value">{{ world.入侵倒计时 }} 天</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from './settings';

const { settings } = storeToRefs(useSettingsStore());

const leng_xingren = ref({
  异能信息: {
    异能种类: '空间类',
    异能名称: '星刃空间',
    异能等级: 'F',
    异能潜力: '神明级',
    能量值: 10,
    能量上限: 100
  },
  呼吸法信息: {
    呼吸法名称: '基础空间呼吸法',
    呼吸法等级: 'F',
    呼吸法流派: '道家'
  },
  武道信息: {
    武道境界: '初窥门径',
    武道名称: '星辰武道',
    修炼进度: 5
  },
  状态信息: {
    好感度: 0,
    信任度: 0,
    当前心情: '平静',
    当前状态: '健康',
    体力值: 100,
    精神值: 100
  },
  装备: {
    上装: '黑色高领紧身衣',
    下装: '黑色战术长裤',
    内衣: '黑色运动内衣',
    鞋子: '黑色战术靴',
    饰品: '无'
  },
  近期目标: {
    觉醒异能: '参加异能觉醒大会',
    补全能量: '寻找方法补全异能能量',
    修炼武道: '提升武道境界'
  },
  物品栏: {
    '国家身份证': 1,
    '异能觉醒大会邀请函': 1,
    '基础空间呼吸法秘籍': 1,
    '星辰武道入门手册': 1,
    '能量补充剂小瓶': 3
  }
});

const protagonist = ref({
  异能信息: {
    异能种类: '未知',
    异能名称: '未知',
    异能等级: '未知',
    能量值: 0,
    能量上限: 0
  },
  呼吸法信息: {
    呼吸法名称: '未知',
    呼吸法等级: '未知',
    呼吸法流派: '未知'
  },
  武道信息: {
    武道境界: '未知',
    武道名称: '未知',
    修炼进度: 0
  },
  状态信息: {
    好感度: 0,
    信任度: 0,
    当前心情: '平静',
    当前状态: '健康',
    体力值: 100,
    精神值: 100
  },
  物品栏: {
    '国家身份证': 1,
    '异能觉醒大会邀请函': 1
  }
});

const world = ref({
  当前时间: '2075-07-16 22:30',
  当前地点: '夜之城 沃森区 All Foods工厂',
  当前天气: '阴沉小雨',
  魔兽入侵阶段: '第一波F-E级魔兽潮',
  入侵倒计时: 1095
});

const getAbilityColor = (level) => {
  const colors = {
    'F': '#6c757d',
    'E': '#f59e0b',
    'D': '#10b981',
    'C': '#3b82f6',
    'B': '#2563eb',
    'A': '#7c3aed',
    'S': '#dc2626',
    'SS': '#991b1b',
    'SSS': '#9333ea',
    '神明': '#8e44ad'
  };
  return colors[level] || '#6c757d';
};

const getAffectionColor = (value) => {
  if (value < -20) return '#dc2626';
  if (value < 0) return '#e74c3c';
  if (value < 20) return '#f59e0b';
  if (value < 50) return '#10b981';
  if (value < 80) return '#3b82f6';
  return '#2563eb';
};

const getAffectionPercent = (value) => {
  return Math.max(0, Math.min(100, (value + 100) / 2));
};

const getHealthColor = (value) => {
  if (value < 20) return '#dc2626';
  if (value < 50) return '#f59e0b';
  if (value < 80) return '#10b981';
  return '#3b82f6';
};

const getMentalColor = (value) => {
  if (value < 20) return '#dc2626';
  if (value < 50) return '#f59e0b';
  if (value < 80) return '#10b981';
  return '#3b82f6';
};

const getEnergyPercent = (current, max) => {
  if (max === 0) return 0;
  return (current / max) * 100;
};

const handleStatusRefresh = (event) => {
  if (event.detail && event.detail.stat_data) {
    const data = event.detail.stat_data;
    
    if (data.冷星刃) {
      leng_xingren.value = data.冷星刃;
    }
    
    if (data.主角) {
      protagonist.value = data.主角;
    }
    
    if (data.世界) {
      world.value = data.世界;
    }
  }
};

onMounted(() => {
  window.addEventListener('status-refresh', handleStatusRefresh);
});

onUnmounted(() => {
  window.removeEventListener('status-refresh', handleStatusRefresh);
});
</script>

<style scoped>
.leng-xingren-interface {
  font-family: 'Noto Sans SC', sans-serif;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  color: #e0e0e0;
  padding: 20px;
}

.main-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.panel-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #667eea;
  text-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
}

.character-panel {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 15px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.character-name {
  font-size: 1.3rem;
  font-weight: bold;
  color: #e0e0e0;
}

.ability-badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
}

.panel-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.info-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 12px;
  border-radius: 8px;
}

.info-label {
  font-size: 0.9rem;
  color: #a0aec0;
  margin-bottom: 5px;
}

.info-value {
  font-size: 1.1rem;
  font-weight: 500;
  color: #e0e0e0;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.status-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
}

.status-label {
  font-size: 0.9rem;
  color: #a0aec0;
  margin-bottom: 8px;
}

.status-value {
  font-size: 1.3rem;
  font-weight: bold;
  color: #e0e0e0;
  margin-bottom: 8px;
}

.progress-bar-container {
  height: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}

.energy-section {
  background: rgba(102, 126, 234, 0.1);
  padding: 15px;
  border-radius: 8px;
}

.energy-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.energy-label {
  font-size: 1rem;
  color: #667eea;
}

.energy-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e0e0e0;
}

.energy-bar {
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.world-panel {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 15px;
}

.world-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.world-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  padding: 12px;
  border-radius: 8px;
}

.world-icon {
  font-size: 1.5rem;
}

.world-value {
  font-size: 1rem;
  color: #e0e0e0;
}

.invasion-section {
  background: rgba(220, 38, 38, 0.2);
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
}

.invasion-title {
  font-size: 1.1rem;
  color: #ff6b6b;
  margin-bottom: 10px;
}

.invasion-stage {
  font-size: 1.3rem;
  font-weight: bold;
  color: #e0e0e0;
  margin-bottom: 10px;
}

.countdown-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.countdown-label {
  font-size: 0.9rem;
  color: #a0aec0;
}

.countdown-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6b6b;
}

@media (max-width: 768px) {
  .main-container {
    grid-template-columns: 1fr;
  }
  
  .info-grid,
  .status-grid,
  .world-info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
