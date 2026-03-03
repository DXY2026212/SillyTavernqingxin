import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';
import { Schema } from '../../schema';

/**
 * 辅助函数：限制容器大小
 * 保持键值对数量不超过 limit，用于物品栏、装备等
 * 
 * 【特别说明】: 
 * schema.optional() 允许 JSON Patch 执行 "remove" 操作 (在校验逻辑中等同于设置为 undefined)，
 * 配合 omitBy 清理数据，完美解决了 "Cannot remove required key" 报错。
 */
const limitRecord = (schema, limit) => {
  return z.record(z.string(), schema.optional())
    .transform(obj => {
      return _(obj)
        .omitBy(_.isNil)
        .entries()
        .take(limit)
        .fromPairs()
        .value();
    });
};

/**
 * 辅助函数：状态自动计算
 * 根据数值自动附加 Debuff 描述到 "当前状态" 字段
 */
const appendDebuff = (char) => {
  let statusList = [];
  
  // --- 体力状态判定 ---
  if (char.体力值 !== undefined && char.体力值 < 20) {
    statusList.push("【疲劳】体力严重不足，行动迟缓");
  } else if (char.体力值 !== undefined && char.体力值 < 50) {
    statusList.push("【疲惫】体力下降，需要休息");
  }
  
  // --- 精神状态判定 ---
  if (char.精神值 !== undefined && char.精神值 < 20) {
    statusList.push("【精神不稳定】思维混乱，异能控制力下降");
  } else if (char.精神值 !== undefined && char.精神值 < 50) {
    statusList.push("【精神疲惫】注意力难以集中");
  }
  
  // --- 将计算出的状态赋值给字段 ---
  char.当前状态 = statusList.length > 0 ? statusList.join(" | ") : "健康";
  return char;
};

/**
 * 辅助函数：异能等级数值转换
 * 将异能等级字符串转换为数值，用于计算
 */
const abilityLevelToNumber = (level) => {
  const levelMap = { 'F': 1, 'E': 2, 'D': 3, 'C': 4, 'B': 5, 'A': 6, 'S': 7, 'SS': 8, 'SSS': 9, '神明': 10 };
  return levelMap[level] || 1;
};

/**
 * 辅助函数：计算能量上限
 * 根据异能等级和呼吸法等级计算能量上限
 */
const calculateEnergyMax = (abilityLevel, breathingLevel) => {
  const abilityNum = abilityLevelToNumber(abilityLevel);
  const breathingNum = abilityLevelToNumber(breathingLevel);
  return (abilityNum + breathingNum) * 10;
};

/**
 * 角色Schema生成器
 * 用于冷星刃和主角
 */
function getCharacterSchema() {
  return z.object({
    // 异能信息
    异能信息: z.object({
      异能种类: z.string().describe("异能种类：元素类、强化类、精神类、感知类、时间类、空间类、规则类、概念类、亡灵类、神圣类、兽化类、召唤类、天赋类、潜力类、工具类、食物类"),
      异能名称: z.string().describe("异能的具体名称"),
      异能等级: z.string().describe("异能等级：F、E、D、C、B、A、S、SS、SSS、神明"),
      异能潜力: z.string().describe("异能的真实潜力等级"),
      能量值: z.coerce.number()
        .transform(v => _.clamp(v, 0, 9999))
        .describe("当前能量值，不能超过能量上限"),
      能量上限: z.coerce.number()
        .transform(v => _.clamp(v, 0, 99999))
        .describe("能量最大值，由异能等级和呼吸法等级决定")
    }),
    
    // 呼吸法信息
    呼吸法信息: z.object({
      呼吸法名称: z.string().describe("呼吸法的名称"),
      呼吸法等级: z.string().describe("呼吸法等级：F、E、D、C、B、A、S、SS、SSS、神明"),
      呼吸法流派: z.string().describe("呼吸法流派：道家、佛家、墨家、阴阳家、儒家、法家、兵家等")
    }),
    
    // 武道信息
    武道信息: z.object({
      武道境界: z.string().describe("武道境界：初窥门径、登堂入室、小成、大成、炉火纯青、出神入化、登峰造极、超凡入圣、圣境、宗师、大宗师、武圣、武神、武尊、武皇、武道神明"),
      武道名称: z.string().describe("武道的名称"),
      修炼进度: z.coerce.number()
        .transform(v => _.clamp(v, 0, 100))
        .describe("武道修炼进度，达到100时突破至下一境界")
    }),
    
    // 状态信息
    状态信息: z.object({
      好感度: z.coerce.number()
        .transform(v => _.clamp(v, -100, 100))
        .describe("好感度：范围-100~100，反映角色对主角的情感态度"),
      信任度: z.coerce.number()
        .transform(v => _.clamp(v, 0, 100))
        .describe("信任度：范围0~100，反映角色对主角的信任程度"),
      当前心情: z.string().describe("当前心情：平静、兴奋、焦虑、悲伤、愤怒、恐惧、期待等"),
      当前状态: z.string().prefault("健康").describe("当前状态：健康、受伤、中毒、疲劳等，自动计算"),
      体力值: z.coerce.number()
        .transform(v => _.clamp(v, 0, 100))
        .describe("体力值：范围0~100，低于20触发疲劳状态"),
      精神值: z.coerce.number()
        .transform(v => _.clamp(v, 0, 100))
        .describe("精神值：范围0~100，低于20触发精神不稳定状态")
    }),
    
    // 近期目标
    近期目标: limitRecord(z.string(), 8).prefault({}).describe("近期目标列表，最多保持8项"),
    
    // 装备
    装备: z.object({
      上装: z.string().describe("上衣的描述"),
      下装: z.string().describe("下装的描述"),
      内衣: z.string().describe("内衣的描述"),
      鞋子: z.string().describe("鞋子的描述"),
      饰品: z.string().describe("饰品的描述")
    }).prefault({}),
    
    // 物品栏
    物品栏: limitRecord(z.any(), 50).prefault({}).describe("物品栏，最多保持50项")
  }).transform(appendDebuff);
}

/**
 * 主角Schema生成器
 * 主角的结构与角色类似，但可能缺少某些字段
 */
function getProtagonistSchema() {
  return z.object({
    // 异能信息
    异能信息: z.object({
      异能种类: z.string(),
      异能名称: z.string(),
      异能等级: z.string(),
      能量值: z.coerce.number()
        .transform(v => _.clamp(v, 0, 9999)),
      能量上限: z.coerce.number()
        .transform(v => _.clamp(v, 0, 99999))
    }),
    
    // 呼吸法信息
    呼吸法信息: z.object({
      呼吸法名称: z.string(),
      呼吸法等级: z.string(),
      呼吸法流派: z.string()
    }),
    
    // 武道信息
    武道信息: z.object({
      武道境界: z.string(),
      武道名称: z.string(),
      修炼进度: z.coerce.number()
        .transform(v => _.clamp(v, 0, 100))
    }),
    
    // 状态信息
    状态信息: z.object({
      好感度: z.coerce.number()
        .transform(v => _.clamp(v, -100, 100)),
      信任度: z.coerce.number()
        .transform(v => _.clamp(v, 0, 100)),
      当前心情: z.string(),
      当前状态: z.string().prefault("健康"),
      体力值: z.coerce.number()
        .transform(v => _.clamp(v, 0, 100)),
      精神值: z.coerce.number()
        .transform(v => _.clamp(v, 0, 100))
    }),
    
    // 物品栏
    物品栏: limitRecord(z.any(), 50).prefault({})
  }).transform(appendDebuff);
}

// --- 核心 Schema 定义 ---
export const Schema = z.object({
  
  // 1. 世界环境
  世界: z.object({
    当前时间: z.string().describe("当前时间，格式：YYYY-MM-DD HH:MM"),
    当前地点: z.string().describe("当前地点，包含城市、区域、具体位置"),
    当前天气: z.string().describe("当前天气：晴朗、阴沉、小雨、雷暴等"),
    魔兽入侵阶段: z.string().describe("魔兽入侵阶段：第一波F-E级魔兽潮、第二波D-B级魔兽潮、第三波A级魔兽军团、第四波S级魔兽王、第五波SS级及以上魔兽神明"),
    入侵倒计时: z.coerce.number()
      .transform(v => _.clamp(v, 0, 99999))
      .describe("距离魔兽全面入侵的倒计时天数")
  }),
  
  // 2. 冷星刃（主要角色）
  冷星刃: getCharacterSchema(),
  
  // 3. 主角（用户角色）
  主角: getProtagonistSchema()
});

$(() => {
  registerMvuSchema(Schema);
})
