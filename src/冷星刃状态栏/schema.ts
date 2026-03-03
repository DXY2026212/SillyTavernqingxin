import { z } from 'zod';

export const Schema = z.object({
  冷星刃: z.object({
    异能信息: z.object({
      异能种类: z.string(),
      异能名称: z.string(),
      异能等级: z.string(),
      异能潜力: z.string(),
      能量值: z.number(),
      能量上限: z.number()
    }),
    呼吸法信息: z.object({
      呼吸法名称: z.string(),
      呼吸法等级: z.string(),
      呼吸法流派: z.string()
    }),
    武道信息: z.object({
      武道境界: z.string(),
      武道名称: z.string(),
      修炼进度: z.number()
    }),
    状态信息: z.object({
      好感度: z.number(),
      信任度: z.number(),
      当前心情: z.string(),
      当前状态: z.string(),
      体力值: z.number(),
      精神值: z.number()
    }),
    装备: z.object({
      上装: z.string(),
      下装: z.string(),
      内衣: z.string(),
      鞋子: z.string(),
      饰品: z.string()
    }),
    近期目标: z.record(z.string(), z.string()),
    物品栏: z.record(z.string(), z.any())
  }),
  主角: z.object({
    异能信息: z.object({
      异能种类: z.string(),
      异能名称: z.string(),
      异能等级: z.string(),
      能量值: z.number(),
      能量上限: z.number()
    }),
    呼吸法信息: z.object({
      呼吸法名称: z.string(),
      呼吸法等级: z.string(),
      呼吸法流派: z.string()
    }),
    武道信息: z.object({
      武道境界: z.string(),
      武道名称: z.string(),
      修炼进度: z.number()
    }),
    状态信息: z.object({
      好感度: z.number(),
      信任度: z.number(),
      当前心情: z.string(),
      当前状态: z.string(),
      体力值: z.number(),
      精神值: z.number()
    }),
    物品栏: z.record(z.string(), z.any())
  }),
  世界: z.object({
    当前时间: z.string(),
    当前地点: z.string(),
    当前天气: z.string(),
    魔兽入侵阶段: z.string(),
    入侵倒计时: z.number()
  })
});
